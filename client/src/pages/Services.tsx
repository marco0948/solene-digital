import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useServices } from "@/hooks/use-content";
import { BarChart, Megaphone, PenTool, Target, Palette, TrendingUp } from "lucide-react";

// Icon mapping for new services
const iconMap: Record<string, any> = {
  "bar-chart": BarChart,
  "megaphone": Megaphone,
  "pen-tool": PenTool,
  "target": Target,
  "palette": Palette,
  "trending-up": TrendingUp,
  // default fallback
  "default": BarChart
};

export default function Services() {
  const { data: services, isLoading } = useServices();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Official SOLÈNE DIGITAL services
  const officialServices = [
    {
      title: "Digital Strategy",
      description: "Clear roadmaps designed around your business goals. We analyze your market, audience, and opportunities to create actionable growth plans.",
      icon: "target"
    },
    {
      title: "Social Media Management",
      description: "Consistent, on-brand content with purpose. We manage your social presence to build community and drive meaningful engagement.",
      icon: "megaphone"
    },
    {
      title: "Content & Copywriting",
      description: "Words that connect, convert, and build trust. Strategic content that speaks to your audience and supports your business objectives.",
      icon: "pen-tool"
    },
    {
      title: "Performance Marketing",
      description: "Paid campaigns optimized for sustainable growth. Meta and Google Ads that deliver measurable results and positive ROI.",
      icon: "trending-up"
    },
    {
      title: "Branding & Presence",
      description: "Cohesive digital identities across platforms. Visual identity, messaging, and online presence that reflects your brand essence.",
      icon: "palette"
    },
    {
      title: "Analytics & Optimization",
      description: "Insights that guide smarter decisions. We track performance, analyze data, and continuously optimize for better results.",
      icon: "bar-chart"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-20 bg-secondary/30 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Strategic digital solutions designed to help purpose-driven brands grow with clarity and intention.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-secondary/50 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Use official services as primary content */}
            {officialServices.map((service, index) => {
              const Icon = iconMap[service.icon] || iconMap.default;
              
              return (
                <motion.div 
                  key={index}
                  variants={item}
                  className="group bg-card hover:bg-primary/5 border border-border hover:border-accent/30 rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-accent text-accent group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}

            {/* Fallback to dynamic services if they exist */}
            {services?.map((service) => {
              const Icon = iconMap[service.icon] || iconMap.default;
              
              return (
                <motion.div 
                  key={service.id}
                  variants={item}
                  className="group bg-card hover:bg-primary/5 border border-border hover:border-accent/30 rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-accent text-accent group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
