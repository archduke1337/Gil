import { certificates, admins, type Certificate, type InsertCertificate, type Admin, type InsertAdmin } from "@shared/schema";
import fs from "fs";
import path from "path";

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

export class MemStorage implements IStorage {
  private certificates: Map<number, Certificate>;
  private admins: Map<number, Admin>;
  private currentCertificateId: number;
  private currentAdminId: number;
  private certificatesFile: string;

  constructor() {
    this.certificates = new Map();
    this.admins = new Map();
    this.currentCertificateId = 1;
    this.currentAdminId = 1;
    this.certificatesFile = path.join(process.cwd(), 'certificates-data.json');
    
    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Initialize with default admin
    this.createAdmin({ username: 'admin', password: 'password' });
    
    // Load existing certificates from file
    this.loadCertificates();
  }

  private loadCertificates(): void {
    try {
      if (fs.existsSync(this.certificatesFile)) {
        const data = fs.readFileSync(this.certificatesFile, 'utf-8');
        const certificatesData = JSON.parse(data);
        
        for (const cert of certificatesData.certificates || []) {
          this.certificates.set(cert.id, {
            ...cert,
            issueDate: new Date(cert.issueDate),
            uploadDate: new Date(cert.uploadDate),
          });
          if (cert.id >= this.currentCertificateId) {
            this.currentCertificateId = cert.id + 1;
          }
        }
      }
    } catch (error) {
      console.error('Error loading certificates:', error);
    }
  }

  private saveCertificates(): void {
    try {
      const certificatesArray = Array.from(this.certificates.values());
      const data = {
        certificates: certificatesArray,
        lastUpdate: new Date().toISOString(),
      };
      fs.writeFileSync(this.certificatesFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving certificates:', error);
    }
  }

  async getCertificateByReference(referenceNumber: string): Promise<Certificate | undefined> {
    return Array.from(this.certificates.values()).find(
      (cert) => cert.referenceNumber === referenceNumber && cert.isActive
    );
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const id = this.currentCertificateId++;
    const certificate: Certificate = {
      ...insertCertificate,
      id,
      uploadDate: new Date(),
      issueDate: insertCertificate.issueDate || new Date(),
      isActive: true,
    };
    
    this.certificates.set(id, certificate);
    this.saveCertificates();
    return certificate;
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return Array.from(this.certificates.values())
      .filter(cert => cert.isActive)
      .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
  }

  async deleteCertificate(id: number): Promise<boolean> {
    const certificate = this.certificates.get(id);
    if (certificate) {
      certificate.isActive = false;
      this.saveCertificates();
      return true;
    }
    return false;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      (admin) => admin.username === username
    );
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = this.currentAdminId++;
    const admin: Admin = { ...insertAdmin, id };
    this.admins.set(id, admin);
    return admin;
  }
}

export const storage = new MemStorage();
