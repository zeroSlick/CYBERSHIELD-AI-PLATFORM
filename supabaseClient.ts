
import { createClient } from '@supabase/supabase-js';

// Enterprise Cluster Configuration - Using hardcoded credentials for the operational environment
const supabaseUrl = 'https://madcumvmwqboyfxgsumy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZGN1bXZtd3Fib3lmeGdzdW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0OTI5NzMsImV4cCI6MjA4NDA2ODk3M30._aCSZ_FQVa5WgMqksK6JjyS_bOWc8wXKibcRYb7zknA';

// Initialize core security client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
