import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iedczxshmwcuuhhvxust.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZGN6eHNobXdjdXVoaHZ4dXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MTg3NDgsImV4cCI6MjA2NDE5NDc0OH0.6a21eNRVt9FLbW_U-wYbyYrFNk80oR4FmuYPUqqgpvE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
