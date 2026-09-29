export const CANONICAL_LATakia_REFERENCE = 'latakia-coastal-land' as const;

// The old public record is intentionally suppressed at the application boundary.
// It is not deleted or mutated in Supabase; operations can reconcile it safely.
const SUPPRESSED_LEGACY_REFERENCES = new Set([
  'coastal-commercial-land-latakia-31b21a2d',
]);

export function isSuppressedLegacyOpportunity(identity: { slug?: string | null } | null | undefined) {
  return Boolean(identity?.slug && SUPPRESSED_LEGACY_REFERENCES.has(identity.slug));
}
