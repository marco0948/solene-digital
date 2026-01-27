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
  await seedDatabase();

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
