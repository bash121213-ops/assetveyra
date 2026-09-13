import { z } from 'zod';

export const createOpportunitySchema = z.object({
  assetId: z.string().uuid(),
  ownerOrganizationId: z.string().uuid(),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  investmentThesis: z.string().min(20).max(10000),
  structure: z.string().min(2).max(100),
  minimumTicket: z.number().positive().optional(),
  targetReturn: z.number().min(-1).max(100).optional(),
});

export type CreateOpportunityInput = z.infer<typeof createOpportunitySchema>;
