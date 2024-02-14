import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yssfqilimzmkjdxusinw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc2ZxaWxpbXpta2pkeHVzaW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4Mzc2NDUsImV4cCI6MjAyMzQxMzY0NX0.2OeYXuh6O0StcrDFFEsKScYPmLiHOCELvFNmtWzqZ_I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
