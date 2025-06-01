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
    
    // Add sample certificates if none exist
    this.initializeSampleData().catch(console.error);
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

  private async initializeSampleData(): Promise<void> {
    if (this.certificates.size === 0) {
      // Add sample certificates for demonstration
      await this.createCertificate({
        referenceNumber: 'GIL-2024-001234',
        filename: 'sample-diamond-cert-1.pdf',
        caratWeight: '1.52',
        colorGrade: 'G',
        clarityGrade: 'VS1',
        cutGrade: 'Excellent',
        issueDate: new Date('2024-01-15'),
      });

      await this.createCertificate({
        referenceNumber: 'GIL-2024-005678',
        filename: 'sample-diamond-cert-2.pdf',
        caratWeight: '2.08',
        colorGrade: 'F',
        clarityGrade: 'VVS2',
        cutGrade: 'Excellent',
        issueDate: new Date('2024-02-20'),
      });

      await this.createCertificate({
        referenceNumber: 'GIL-2024-009999',
        filename: 'sample-diamond-cert-3.pdf',
        caratWeight: '0.75',
        colorGrade: 'H',
        clarityGrade: 'SI1',
        cutGrade: 'Very Good',
        issueDate: new Date('2024-03-10'),
      });
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
      id,
      referenceNumber: insertCertificate.referenceNumber,
      filename: insertCertificate.filename,
      caratWeight: insertCertificate.caratWeight || null,
      colorGrade: insertCertificate.colorGrade || null,
      clarityGrade: insertCertificate.clarityGrade || null,
      cutGrade: insertCertificate.cutGrade || null,
      issueDate: insertCertificate.issueDate || new Date(),
      uploadDate: new Date(),
      isActive: true,
    };
    
    this.certificates.set(id, certificate);
    this.saveCertificates();
    return certificate;
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return Array.from(this.certificates.values())
      .filter(cert => cert.isActive)
      .sort((a, b) => {
        const bTime = b.uploadDate ? b.uploadDate.getTime() : 0;
        const aTime = a.uploadDate ? a.uploadDate.getTime() : 0;
        return bTime - aTime;
      });
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
