import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ugxqilcquusfwvkmlzwo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHFpbGNxdXVzZnd2a21sendvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjkyMjQsImV4cCI6MjA2NTgwNTIyNH0._9-SE7_ADmiZusVlZ5zGCJ9vCeCEoLB7p8ojIx7iJ0A";

export const supabase = createClient(supabaseUrl, supabaseKey);
