// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rnvviujvpthbvcdnwckl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJudnZpdWp2cHRoYnZjZG53Y2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNDA3NTYsImV4cCI6MjA1OTcxNjc1Nn0.CQVy5dsy_iwjYijWirkncMDQACEhn6EicM2PdVNXp30";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);