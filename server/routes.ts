import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCertificateSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { z } from "zod";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  dest: uploadsDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const fileExtension = file.originalname?.toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) || 
        fileExtension?.endsWith('.pdf') || 
        fileExtension?.endsWith('.jpg') || 
        fileExtension?.endsWith('.jpeg') || 
        fileExtension?.endsWith('.png')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Certificate verification endpoint
  app.get("/api/certificates/verify/:referenceNumber", async (req, res) => {
    try {
      const { referenceNumber } = req.params;
      
      if (!referenceNumber) {
        return res.status(400).json({ message: "Reference number is required" });
      }

      const certificate = await storage.getCertificateByReference(referenceNumber);
      
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }

      res.json({ certificate });
    } catch (error) {
      console.error("Error verifying certificate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get certificate file
  app.get("/api/certificates/file/:referenceNumber", async (req, res) => {
    try {
      const { referenceNumber } = req.params;
      const certificate = await storage.getCertificateByReference(referenceNumber);
      
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
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

  // Admin login endpoint
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

      // In a real app, you'd use proper session management
      res.json({ message: "Login successful", admin: { id: admin.id, username: admin.username } });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Upload certificate endpoint
  app.post("/api/certificates/upload", upload.single('certificateFile'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Certificate file is required" });
      }

      const validationSchema = insertCertificateSchema.extend({
        referenceNumber: z.string().min(1, "Reference number is required"),
      });

      const validationResult = validationSchema.safeParse({
        ...req.body,
        filename: req.file.filename,
        caratWeight: req.body.caratWeight ? parseFloat(req.body.caratWeight) : undefined,
      });

      if (!validationResult.success) {
        // Clean up uploaded file if validation fails
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationResult.error.errors 
        });
      }

      // Check if reference number already exists
      const existingCertificate = await storage.getCertificateByReference(validationResult.data.referenceNumber);
      if (existingCertificate) {
        fs.unlinkSync(req.file.path);
        return res.status(409).json({ message: "Reference number already exists" });
      }

      // Rename file to include reference number
      const fileExtension = path.extname(req.file.originalname);
      const newFilename = `${validationResult.data.referenceNumber}${fileExtension}`;
      const newFilePath = path.join(uploadsDir, newFilename);
      
      fs.renameSync(req.file.path, newFilePath);

      const certificate = await storage.createCertificate({
        ...validationResult.data,
        filename: newFilename,
      });

      res.status(201).json({ certificate });
    } catch (error) {
      console.error("Error uploading certificate:", error);
      
      // Clean up uploaded file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all certificates (admin only)
  app.get("/api/certificates", async (req, res) => {
    try {
      const certificates = await storage.getAllCertificates();
      res.json({ certificates });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete certificate (admin only)
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
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
