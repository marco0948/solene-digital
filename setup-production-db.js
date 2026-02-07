import { drizzle } from 'drizzle-orm/node-postgres';
import { pool } from './server/db.js';
import { schema } from './shared/schema.js';

const db = drizzle(pool, { schema });

async function setupProductionDatabase() {
  try {
    console.log('Setting up production database tables...');
    
    // Create contacts table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create services table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create team_members table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Database tables created successfully!');
    
    // Insert some default services
    await db.execute(`
      INSERT INTO services (title, description, icon) VALUES
      ('Digital Strategy', 'Clear roadmaps designed around your business goals. We analyze your market, audience, and opportunities to create actionable growth plans.', 'target'),
      ('Social Media Management', 'Consistent, on-brand content with purpose. We manage your social presence to build community and drive meaningful engagement.', 'megaphone'),
      ('Content & Copywriting', 'Words that connect, convert, and build trust. Strategic content that speaks to your audience and supports your business objectives.', 'pen-tool'),
      ('Performance Marketing', 'Paid campaigns optimized for sustainable growth. Meta and Google Ads that deliver measurable results and positive ROI.', 'trending-up'),
      ('Branding & Presence', 'Cohesive digital identities across platforms. Visual identity, messaging, and online presence that reflects your brand essence.', 'palette'),
      ('Analytics & Optimization', 'Insights that guide smarter decisions. We track performance, analyze data, and continuously optimize for better results.', 'bar-chart')
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('✅ Default services inserted successfully!');
    
  } catch (error) {
    console.error('❌ Database setup error:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

setupProductionDatabase();
