import { pgTable, text, serial, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  filename: text("filename"),
  gemImagePath: text("gem_image_path"),
  gemType: text("gem_type").notNull(),
  shape: text("shape").notNull(),
  dimensions: text("dimensions").notNull(),
  caratWeight: decimal("carat_weight", { precision: 6, scale: 3 }).notNull(),
  colorGrade: text("color_grade").notNull(),
  clarityGrade: text("clarity_grade").notNull(),
  cutGrade: text("cut_grade").notNull(),
  polish: text("polish"),
  symmetry: text("symmetry"),
  fluorescence: text("fluorescence"),
  treatment: text("treatment"),
  origin: text("origin"),
  inscription: text("inscription"),
  comments: text("comments"),
  certificationDate: text("certification_date").notNull(),
  examinedBy: text("examined_by").notNull(),
  approvedBy: text("approved_by").notNull(),
  labLocation: text("lab_location"),
  equipmentUsed: text("equipment_used"),
  tablePercentage: text("table_percentage"),
  depthPercentage: text("depth_percentage"),
  crownAngle: text("crown_angle"),
  pavilionAngle: text("pavilion_angle"),
  issueDate: timestamp("issue_date").defaultNow(),
  uploadDate: timestamp("upload_date").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  uploadDate: true,
  issueDate: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
