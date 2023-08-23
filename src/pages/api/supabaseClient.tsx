import { createClient } from "@supabase/supabase-js";
import { env } from "process";
// Create a single supabase client for interacting with your database

const supabaseUrl = env.SUPABASE_URL || "";
const supabaseKey = env.SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
