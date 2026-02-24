import { createClient } from '@supabase/supabase-js';

// Vercel ရဲ့ Environment Variables ကနေ လှမ်းဖတ်ခိုင်းခြင်း
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);