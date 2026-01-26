import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
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
      name: "Alex Solene",
      role: "Founder & CEO",
      bio: "Digital marketing visionary with 10+ years of experience transforming brands.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });
    await storage.createTeamMember({
      name: "Sarah Jenkins",
      role: "Head of Strategy",
      bio: "Expert in crafting comprehensive digital strategies that deliver measurable results.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });
    await storage.createTeamMember({
      name: "Michael Chen",
      role: "Creative Director",
      bio: "Award-winning designer passionate about creating memorable brand experiences.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    });
  }
}
