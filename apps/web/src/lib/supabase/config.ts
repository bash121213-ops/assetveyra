export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://tnuewoctpsekdxyqkumv.supabase.co';

// This is a publishable/anon client credential. It is intentionally safe to use
// in browser/server client code; authorization is enforced by Supabase RLS.
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_BdeQtSammNBfSTJXCTwbig_GqmIzYtN';
