import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://snwicyaziwpzzxklswyn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2ljeWF6aXdwenp4a2xzd3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NDYzNjUsImV4cCI6MjA0OTMyMjM2NX0.ykOGTZcJs4FH_9tqwb196dDiWPK1As_GolL_KFrRhQM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
