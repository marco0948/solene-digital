import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendContactNotification } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Database setup endpoint (for production)
  app.post("/api/setup-db", async (req, res) => {
    try {
      console.log("Setting up database tables...");
      
      // Create contacts table
      await storage.db.execute(`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create services table
      await storage.db.execute(`
        CREATE TABLE IF NOT EXISTS services (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          icon VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create team_members table
      await storage.db.execute(`
        CREATE TABLE IF NOT EXISTS team_members (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL,
          bio TEXT,
          image_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log("✅ Database tables created successfully!");
      
      // Insert default services
      await storage.db.execute(`
        INSERT INTO services (title, description, icon) VALUES
        ('Digital Strategy', 'Clear roadmaps designed around your business goals. We analyze your market, audience, and opportunities to create actionable growth plans.', 'target'),
        ('Social Media Management', 'Consistent, on-brand content with purpose. We manage your social presence to build community and drive meaningful engagement.', 'megaphone'),
        ('Content & Copywriting', 'Words that connect, convert, and build trust. Strategic content that speaks to your audience and supports your business objectives.', 'pen-tool'),
        ('Performance Marketing', 'Paid campaigns optimized for sustainable growth. Meta and Google Ads that deliver measurable results and positive ROI.', 'trending-up'),
        ('Branding & Presence', 'Cohesive digital identities across platforms. Visual identity, messaging, and online presence that reflects your brand essence.', 'palette'),
        ('Analytics & Optimization', 'Insights that guide smarter decisions. We track performance, analyze data, and continuously optimize for better results.', 'bar-chart')
        ON CONFLICT (id) DO NOTHING;
      `);

      console.log("✅ Default services inserted successfully!");
      
      res.json({ success: true, message: "Database setup completed successfully!" });
    } catch (error) {
      console.error("❌ Database setup error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      
      // Send email notification
      try {
        await sendContactNotification(input.email, input.name, input.message);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get(api.team.list.path, async (req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  // Seed data function
  try {
    await seedDatabase();
  } catch (error) {
    console.error("Failed to seed database:", error);
    // Don't fail the entire app if seeding fails
  }

  return httpServer;
}

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({
      title: "SEO Optimization",
      description: "Boost your search rankings and drive organic traffic with our data-driven SEO strategies.",
      icon: "Search"
    });
    await storage.createService({
      title: "Social Media Marketing",
      description: "Engage your audience and build brand loyalty across all major social platforms.",
      icon: "Share2"
    });
    await storage.createService({
      title: "Content Strategy",
      description: "Create compelling content that resonates with your target audience and drives conversions.",
      icon: "FileText"
    });
    await storage.createService({
      title: "PPC Advertising",
      description: "Maximize ROI with targeted pay-per-click campaigns on Google and Social Media.",
      icon: "MousePointerClick"
    });
  }

  const existingTeam = await storage.getTeamMembers();
  if (existingTeam.length === 0) {
    await storage.createTeamMember({
      name: "Carmela Vargas",
      role: "Founder and Chief Strategy & Revenue Lead",
      bio: "Over a decade of experience driving measurable growth across healthcare, digital marketing, real estate, food & beverage, and agri-trading. Leads growth strategy, revenue planning, and overall client direction.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });
    await storage.createTeamMember({
      name: "Adrian Baua",
      role: "Founder and Digital Systems Lead",
      bio: "Specializes in high-performing Meta and Google Ads, funnel optimization, and automation systems. Focus on scalable, data-driven execution that maximizes return on ad spend.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });
  }
}
