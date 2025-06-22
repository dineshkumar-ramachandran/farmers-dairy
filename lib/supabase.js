import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ugxqilcquusfwvkmlzwo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_API_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);
