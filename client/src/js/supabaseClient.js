import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
