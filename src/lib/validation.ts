import { z } from "zod";

const phone = z.string().min(7).max(25);
const email = z.string().email();
const consent = z.literal("on", {
  errorMap: () => ({ message: "Consent is required before submission." })
});

export const candidateSchema = z.object({
  fullName: z.string().min(2).max(120),
  mobile: phone,
  email,
  location: z.string().min(2).max(120),
  passportStatus: z.string().min(2).max(80),
  preferredCountry: z.string().min(2).max(100),
  jobCategory: z.string().min(2).max(120),
  experience: z.string().min(1).max(80),
  message: z.string().max(1500).optional().default(""),
  whatsappConsent: consent,
  privacyAgreement: consent,
  sourcePage: z.string().max(120).optional().default("/apply"),
  website: z.string().max(0).optional().default("")
});

export const requirementSchema = z.object({
  companyName: z.string().min(2).max(160),
  contactPerson: z.string().min(2).max(120),
  designation: z.string().min(2).max(120),
  email,
  phone,
  country: z.string().min(2).max(100),
  projectLocation: z.string().min(2).max(160),
  categories: z.string().min(2).max(300),
  workers: z.string().min(1).max(60),
  salaryRange: z.string().min(1).max(120),
  facilities: z.string().min(2).max(160),
  contractDuration: z.string().min(2).max(120),
  visaDetails: z.string().min(2).max(500),
  mobilizationTime: z.string().min(2).max(120),
  message: z.string().max(1500).optional().default(""),
  whatsappConsent: consent,
  termsAgreement: consent,
  sourcePage: z.string().max(120).optional().default("/manpower-requirement"),
  website: z.string().max(0).optional().default("")
});

export type CandidatePayload = z.infer<typeof candidateSchema>;
export type RequirementPayload = z.infer<typeof requirementSchema>;
