require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Routes
app.post('/api/submit-request', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    
    const { data, error } = await supabase
      .from('access_requests')
      .insert([{ first_name: firstName, last_name: lastName, status: 'pending' }]);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/check-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('access_requests')
      .select('status')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({ success: true, status: data.status });
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
