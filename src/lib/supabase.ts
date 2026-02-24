import { createClient } from '@supabase/supabase-js';

// VITE_ အစရှိတဲ့ နာမည်တွေနဲ့ Variables တွေကို လှမ်းခေါ်ခြင်း
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);