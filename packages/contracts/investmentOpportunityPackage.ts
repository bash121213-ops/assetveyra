import { z } from 'zod';

const checklistItemSchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1),
  item: z.string().min(1),
  required: z.boolean(),
  status: z.enum(['open', 'received', 'under_review', 'verified', 'not_applicable']),
  owner: z.enum(['seller', 'platform', 'external_advisor']).optional(),
  notes: z.string().optional(),
}).strict();

export const investmentOpportunityPackageSchema = z.object({
  schemaVersion: z.literal('1.0'),
  reference: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(3),
  status: z.enum(['draft', 'submitted', 'verification', 'compliance_review', 'approved', 'published', 'suspended', 'archived']),
  verificationStatus: z.enum(['unverified', 'in_progress', 'verified_within_scope']),
  source: z.literal('seller_provided'),
  asset: z.object({
    assetType: z.literal('land'), countryCode: z.string().length(2), region: z.string().min(1), city: z.string().min(1), coastal: z.boolean(),
    area: z.object({ statedValue: z.number().positive(), statedUnit: z.string().min(1), squareMeters: z.number().positive().nullable() }).strict(),
    landUse: z.string().min(1), planningStatus: z.string().min(1), titleClaim: z.string().min(1),
    askingPrice: z.object({ amount: z.number().positive(), currency: z.string().length(3), negotiable: z.boolean().optional() }).strict(),
  }).strict(),
  investmentThesis: z.string().min(50), developmentConcept: z.array(z.string().min(1)).min(1), targetInvestorTypes: z.array(z.string().min(1)).min(1), highlights: z.array(z.string().min(1)).min(1), limitations: z.array(z.string().min(1)).min(1),
  dueDiligence: z.array(checklistItemSchema).min(1),
  dataRoom: z.object({ ndaRequired: z.boolean(), accessMode: z.enum(['controlled', 'open']), folders: z.array(z.string().min(1)).min(1) }).strict(),
  outreach: z.object({ arSubject: z.string().min(1), enSubject: z.string().min(1), approvalRequiredBeforeSending: z.literal(true) }).strict(),
}).strict();

export type InvestmentOpportunityPackage = z.infer<typeof investmentOpportunityPackageSchema>;
