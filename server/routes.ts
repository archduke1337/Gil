import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCertificateSchema, gilCertificateSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  dest: uploadsDir,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/certificates/verify/:referenceNumber", async (req, res) => {
    try {
      const { referenceNumber } = req.params;
      const certificate = await storage.getCertificateByReference(referenceNumber);
      
      if (!certificate) {
        return res.status(404).json({ 
          message: "Certificate not found",
          found: false,
          certificate: null
        });
      }

      res.json({ 
        message: "Certificate verified successfully",
        found: true,
        certificate
      });
    } catch (error) {
      console.error("Error verifying certificate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/certificates/file/:referenceNumber", async (req, res) => {
    try {
      const { referenceNumber } = req.params;
      const certificate = await storage.getCertificateByReference(referenceNumber);
      
      if (!certificate || !certificate.filename) {
        return res.status(404).json({ message: "Certificate file not found" });
      }

      const filePath = path.join(uploadsDir, certificate.filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Certificate file not found" });
      }

      res.sendFile(filePath);
    } catch (error) {
      console.error("Error serving certificate file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const admin = await storage.getAdminByUsername(username);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ message: "Login successful", admin: { id: admin.id, username: admin.username } });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/certificates", async (req, res) => {
    try {
      const certificates = await storage.getAllCertificates();
      res.json({ certificates });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ message: "Failed to fetch certificates" });
    }
  });

  app.post("/api/certificates/upload", upload.single('certificateFile'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { referenceNumber, reportNumber, labName } = req.body;
      
      if (!referenceNumber) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Reference number is required" });
      }

      const existingCertificate = await storage.getCertificateByReference(referenceNumber);
      if (existingCertificate) {
        fs.unlinkSync(req.file.path);
        return res.status(409).json({ message: "Certificate with this reference number already exists" });
      }

      const certificateData = {
        referenceNumber,
        reportNumber: reportNumber || referenceNumber,
        labName: labName || "GIL",
        reportDate: new Date().toISOString(),
        filename: req.file.filename,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        shape: "Not specified",
        caratWeight: "Not specified",
        colorGrade: "Not specified",
        clarityGrade: "Not specified",
        cutGrade: "Not specified",
        measurements: "Not specified",
        polish: "Not specified",
        symmetry: "Not specified",
        fluorescence: "Not specified",
        comments: "Uploaded certificate file",
        examinedBy: "GIL Team",
        approvedBy: "GIL Director"
      };

      const certificate = await storage.createCertificate(certificateData);
      res.json({ message: "Certificate uploaded successfully", certificate });
    } catch (error) {
      console.error("Error uploading certificate:", error);
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (cleanupError) {
          console.error("Error cleaning up file:", cleanupError);
        }
      }
      res.status(500).json({ message: "Failed to upload certificate" });
    }
  });

  app.post("/api/certificates", async (req, res) => {
    try {
      const result = insertCertificateSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid certificate data", 
          errors: result.error.errors 
        });
      }

      const certificate = await storage.createCertificate(result.data);
      res.json({ message: "Certificate created successfully", certificate });
    } catch (error) {
      console.error("Error creating certificate:", error);
      res.status(500).json({ message: "Failed to create certificate" });
    }
  });

  app.post("/api/certificates/gil", async (req, res) => {
    try {
      const result = gilCertificateSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid GIL certificate data", 
          errors: result.error.errors 
        });
      }

      const certificate = await storage.createCertificate({
        ...result.data,
        labName: "GIL",
        reportDate: new Date().toISOString()
      });
      
      res.json({ message: "GIL certificate created successfully", certificate });
    } catch (error) {
      console.error("Error creating GIL certificate:", error);
      res.status(500).json({ message: "Failed to create GIL certificate" });
    }
  });

  app.delete("/api/certificates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid certificate ID" });
      }

      const success = await storage.deleteCertificate(id);
      if (!success) {
        return res.status(404).json({ message: "Certificate not found" });
      }

      res.json({ message: "Certificate deleted successfully" });
    } catch (error) {
      console.error("Error deleting certificate:", error);
      res.status(500).json({ message: "Failed to delete certificate" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}