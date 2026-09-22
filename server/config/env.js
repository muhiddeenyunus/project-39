export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "[SLE]",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "[SYNC KEY]",
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "[SYNC KEY]",
  jwtSecret: process.env.JWT_SECRET || "[SYNC KEY]",
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || "[SYNC KEY]",
  paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "[SYNC KEY]",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development",
};

export function useSupabase() {
  return String(env.supabaseUrl).startsWith("http");
}

export function usePaystack() {
  return String(env.paystackSecretKey).startsWith("sk_");
}
