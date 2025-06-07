import { certificates, admins, type Certificate, type InsertCertificate, type Admin, type InsertAdmin } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import fs from "fs";
import path from "path";

// In-memory cache for frequently accessed data
class CacheManager {
  private cache = new Map<string, { data: any; expiry: number }>();
  private defaultTTL = 1000 * 60 * 10; // 10 minutes

  set(key: string, data: any, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  invalidate(pattern: string): void {
    const keys = Array.from(this.cache.keys());
    for (const key of keys) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new CacheManager();

export interface IStorage {
  // Certificate operations
  getCertificateByReference(referenceNumber: string): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  getAllCertificates(): Promise<Certificate[]>;
  deleteCertificate(id: number): Promise<boolean>;
  updateCertificateStatus(id: number, isActive: boolean): Promise<boolean>;
  
  // Admin operations
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Initialize with default admin - with delay to ensure database is ready
    setTimeout(() => {
      this.initializeDefaultAdmin().catch(error => {
        console.error('Error initializing default admin:', error);
      });
    }, 1000);
  }

  private async initializeDefaultAdmin(): Promise<void> {
    try {
      const existingAdmin = await this.getAdminByUsername('admin');
      if (!existingAdmin) {
        await this.createAdmin({ username: 'admin', password: 'admin123' });
      }
    } catch (error) {
      console.error('Error initializing default admin:', error);
    }
  }

  async getCertificateByReference(referenceNumber: string): Promise<Certificate | undefined> {
    const cacheKey = `cert:${referenceNumber}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
      // Check both reportNumber (GIL format) and referenceNumber (legacy format)
      const [certificate] = await db.select().from(certificates).where(
        eq(certificates.reportNumber, referenceNumber)
      );
      
      if (certificate) {
        cache.set(cacheKey, certificate, 1000 * 60 * 30); // Cache for 30 minutes
        return certificate;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error fetching certificate by reference:', error);
      return undefined;
    }
    
    return undefined;
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const [certificate] = await db
      .insert(certificates)
      .values(insertCertificate)
      .returning();
    
    // Invalidate certificates cache
    cache.invalidate('certs:all');
    cache.set(`cert:${certificate.reportNumber}`, certificate, 1000 * 60 * 30);
    
    return certificate;
  }

  async getAllCertificates(): Promise<Certificate[]> {
    const cacheKey = 'certs:all';
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
      const certificateList = await db.select().from(certificates)
        .orderBy(desc(certificates.reportDate))
        .limit(1000); // Limit for performance
      
      cache.set(cacheKey, certificateList, 1000 * 60 * 5); // Cache for 5 minutes
      
      return certificateList;
    } catch (error) {
      console.error('Error fetching all certificates:', error);
      return [];
    }
  }

  async deleteCertificate(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(certificates)
        .where(eq(certificates.id, id))
        .returning();
      
      if (result.length > 0) {
        // Invalidate cache
        cache.invalidate('certs:all');
        cache.invalidate(`cert:${result[0].reportNumber}`);
      }
      
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting certificate:', error);
      return false;
    }
  }

  async updateCertificateStatus(id: number, isActive: boolean): Promise<boolean> {
    try {
      const result = await db
        .update(certificates)
        .set({ isActive })
        .where(eq(certificates.id, id))
        .returning();
      
      if (result.length > 0) {
        // Invalidate cache
        cache.invalidate('certs:all');
        cache.invalidate(`cert:${result[0].reportNumber}`);
      }
      
      return result.length > 0;
    } catch (error) {
      console.error('Error updating certificate status:', error);
      return false;
    }
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || undefined;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const [admin] = await db
      .insert(admins)
      .values(insertAdmin)
      .returning();
    return admin;
  }
}

export const storage = new DatabaseStorage();
