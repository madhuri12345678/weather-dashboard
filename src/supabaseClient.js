import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qcmuvsewlksqbxaedych.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbXV2c2V3bGtzcWJ4YWVkeWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NjIzNjgsImV4cCI6MjA2NDAzODM2OH0.bMOJg-xBpTKQQ2-aIJZiH-AV0JWyzBmw90801SpZScA";

export const supabase = createClient(supabaseUrl, supabaseKey);
