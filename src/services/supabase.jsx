import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_PROJECT_URL_SUPABASE
const supabaseKey = import.meta.env.VITE_PROJECT_ANON_KEY_SUPABASE
const supabaseAdminKey = import.meta.env.VITE_SUPABASE_ADMIN_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const supabase_pro = createClient(supabaseUrl, supabaseAdminKey)
export { supabase, supabase_pro }
