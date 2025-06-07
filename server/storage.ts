import { certificates, admins, type Certificate, type InsertCertificate, type Admin, type InsertAdmin } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
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
    for (const key of this.cache.keys()) {
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
        await this.createAdmin({ username: 'admin', password: 'password' });
      }
    } catch (error) {
      console.error('Error initializing default admin:', error);
    }
  }

  async getCertificateByReference(referenceNumber: string): Promise<Certificate | undefined> {
    // Check both reportNumber (GIL format) and referenceNumber (legacy format)
    const [certificate] = await db.select().from(certificates).where(
      eq(certificates.reportNumber, referenceNumber)
    );
    
    if (certificate) return certificate;
    
    // Fallback to legacy referenceNumber field
    const [legacyCertificate] = await db.select().from(certificates).where(
      eq(certificates.referenceNumber, referenceNumber)
    );
    return legacyCertificate || undefined;
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const [certificate] = await db
      .insert(certificates)
      .values(insertCertificate)
      .returning();
    return certificate;
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return await db.select().from(certificates).where(eq(certificates.isActive, true));
  }

  async deleteCertificate(id: number): Promise<boolean> {
    const result = await db
      .update(certificates)
      .set({ isActive: false })
      .where(eq(certificates.id, id))
      .returning();
    return result.length > 0;
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
