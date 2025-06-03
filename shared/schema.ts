import { pgTable, text, serial, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  // GIL Certificate Fields (Primary)
  reportNumber: text("report_number").notNull().unique(),
  reportDate: timestamp("report_date").notNull(),
  shape: text("shape").notNull(),
  measurements: text("measurements").notNull(),
  caratWeight: decimal("carat_weight", { precision: 6, scale: 3 }).notNull(),
  colorGrade: text("color_grade").notNull(),
  clarityGrade: text("clarity_grade").notNull(),
  cutGrade: text("cut_grade").notNull(),
  polish: text("polish").notNull(),
  symmetry: text("symmetry").notNull(),
  fluorescence: text("fluorescence").notNull(),
  inscription: text("inscription"),
  comments: text("comments"),
  gemologistName: text("gemologist_name").notNull(),
  signatureDate: timestamp("signature_date").notNull(),
  
  // Legacy Support Fields
  referenceNumber: text("reference_number"), // Maps to reportNumber for legacy
  filename: text("filename"),
  gemImagePath: text("gem_image_path"),
  gemType: text("gem_type").default("Diamond"),
  dimensions: text("dimensions"), // Maps to measurements for legacy
  treatment: text("treatment"),
  origin: text("origin"),
  certificationDate: text("certification_date"), // Maps to signatureDate for legacy
  examinedBy: text("examined_by"), // Maps to gemologistName for legacy
  approvedBy: text("approved_by"), // Maps to gemologistName for legacy
  labLocation: text("lab_location"),
  equipmentUsed: text("equipment_used"),
  tablePercentage: text("table_percentage"),
  depthPercentage: text("depth_percentage"),
  crownAngle: text("crown_angle"),
  pavilionAngle: text("pavilion_angle"),
  girdleThickness: text("girdle_thickness"),
  culetSize: text("culet_size"),
  laserInscription: text("laser_inscription"),
  photoIncluded: boolean("photo_included").default(false),
  plotDiagram: boolean("plot_diagram").default(false),
  
  // System Fields
  issueDate: timestamp("issue_date").defaultNow(),
  uploadDate: timestamp("upload_date").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// GIL Certificate Schema (Primary)
export const gilCertificateSchema = z.object({
  reportNumber: z.string().min(1, "Report number is required"),
  reportDate: z.date({ required_error: "Report date is required" }),
  shape: z.string().min(1, "Shape is required"),
  measurements: z.string().min(1, "Measurements are required"),
  caratWeight: z.string().min(1, "Carat weight is required"),
  colorGrade: z.string().min(1, "Color grade is required"),
  clarityGrade: z.string().min(1, "Clarity grade is required"),
  cutGrade: z.string().min(1, "Cut grade is required"),
  polish: z.string().min(1, "Polish is required"),
  symmetry: z.string().min(1, "Symmetry is required"),
  fluorescence: z.string().min(1, "Fluorescence is required"),
  inscription: z.string().optional(),
  comments: z.string().optional(),
  gemologistName: z.string().min(1, "Gemologist name is required"),
  signatureDate: z.date({ required_error: "Signature date is required" }),
  isActive: z.boolean().default(true),
});

// Legacy Certificate Schema (Backward compatibility)
export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  uploadDate: true,
  issueDate: true,
}).extend({
  // Make legacy fields optional for backward compatibility
  referenceNumber: z.string().optional(),
  gemType: z.string().optional(),
  dimensions: z.string().optional(),
  certificationDate: z.string().optional(),
  examinedBy: z.string().optional(),
  approvedBy: z.string().optional(),
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
