// Same pattern as src/sanity/env.ts — fail loudly here if a var is
// missing, not silently as `undefined` deep inside a Server Action.

export const supabaseUrl = assertValue(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  "Missing environment variable: NEXT_PUBLIC_SUPABASE_URL"
);

export const supabaseAnonKey = assertValue(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  "Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
