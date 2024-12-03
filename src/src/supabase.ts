import { type Database } from "./types/database/database.types";
import { createClient } from "@supabase/supabase-js";

export default createClient<Database>(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_KEY);
