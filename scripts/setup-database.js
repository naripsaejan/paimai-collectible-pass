// Database Setup Script
// Run this to setup the database in Supabase

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kplqzpwiyqawjftctlhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHF6cHdpeXFhd2pmdGN0bGh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODIxNzIxOSwiZXhwIjoyMDczNzkzMjE5fQ.YsYogLloevVTHeI0ILWQV9GduEViYARVwSsPuMhJY58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');
    
    // Test connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error);
      return;
    }
    
    console.log('✅ Database connection successful!');
    console.log('📊 Database is ready to use');
    
    // Check if tables exist
    const tables = ['users', 'wallets', 'bitkub_wallets', 'campaign_progress', 'stamps'];
    
    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        if (error) {
          console.log(`⚠️  Table '${table}' not found - please run the SQL script in Supabase Dashboard`);
        } else {
          console.log(`✅ Table '${table}' exists`);
        }
      } catch (err) {
        console.log(`⚠️  Table '${table}' not found - please run the SQL script in Supabase Dashboard`);
      }
    }
    
    console.log('\n🎉 Database setup completed!');
    console.log('📝 Next steps:');
    console.log('1. Run the SQL script in Supabase Dashboard if tables are missing');
    console.log('2. Start the development server: npm run dev');
    console.log('3. Test the application at http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

setupDatabase();

