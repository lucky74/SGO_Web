import { createClient } from '@supabase/supabase-js';

// WARNING: These keys should ideally be in .env variables
// But for quick setup in your local environment, we can place them here.
// When deploying to Vercel, make sure to add them as Environment Variables.

const supabaseUrl = 'https://dlezmjcuhoxwjmwficsz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZXptamN1aG94d2ptd2ZpY3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1OTkyNzYsImV4cCI6MjA4NTE3NTI3Nn0.ZYQXMtn0pS0vMYvF5fPLlHWbTbc69fakxPuBXvkq1Sw';

export const supabase = createClient(supabaseUrl, supabaseKey);
