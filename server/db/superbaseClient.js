const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); 
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const service = process.env.SECRET_KEY;

const supabase = createClient(supabaseUrl, service);

module.exports = supabase;
