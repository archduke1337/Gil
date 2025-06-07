import { pgTable, text, serial, timestamp, decimal, boolean, index } from "drizzle-orm/pg-core";
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
  
  // Enhanced GIL Fields
  digitallySignedBy: boolean("digitally_signed_by").default(false),
  colorGradeDiagram: boolean("color_grade_diagram").default(false),
  clarityPlotDiagram: boolean("clarity_plot_diagram").default(false),
  certificateNotes: text("certificate_notes"),
  verifierUrl: text("verifier_url").default("https://gilab.info/verify"),
  proportionsDiagram: text("proportions_diagram"),
  clarityDiagram1: text("clarity_diagram1"),
  clarityDiagram2: text("clarity_diagram2"),
  
  // System Fields
  issueDate: timestamp("issue_date").defaultNow(),
  uploadDate: timestamp("upload_date").defaultNow(),
  isActive: boolean("is_active").default(true),
}, (table) => ({
  // Performance indexes for fast queries
  reportNumberIdx: index("report_number_idx").on(table.reportNumber),
  referenceNumberIdx: index("reference_number_idx").on(table.referenceNumber),
  isActiveIdx: index("is_active_idx").on(table.isActive),
  reportDateIdx: index("report_date_idx").on(table.reportDate),
  uploadDateIdx: index("upload_date_idx").on(table.uploadDate),
  // Composite index for common queries
  activeReportsIdx: index("active_reports_idx").on(table.isActive, table.reportDate),
}));

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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
