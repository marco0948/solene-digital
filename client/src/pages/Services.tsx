import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useServices } from "@/hooks/use-content";
import { Activity, BarChart, Code2, Layers, Megaphone, Smartphone } from "lucide-react";

// Icon mapping helper since icon names come as strings from DB
const iconMap: Record<string, any> = {
  "activity": Activity,
  "bar-chart": BarChart,
  "code-2": Code2,
  "layers": Layers,
  "megaphone": Megaphone,
  "smartphone": Smartphone,
  // default fallback
  "default": Layers
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
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            We deliver end-to-end digital solutions designed to elevate your brand and drive measurable growth.
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
            {services?.map((service) => {
              const Icon = iconMap[service.icon] || iconMap.default;
              
              return (
                <motion.div 
                  key={service.id}
                  variants={item}
                  className="group bg-card hover:bg-primary/5 border border-border hover:border-primary/20 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}

            {/* If no services in DB, show default ones */}
            {(!services || services.length === 0) && (
              <>
                 {[
                   { t: "Web Development", d: "Custom websites built with modern technologies for speed and scale.", i: Code2 },
                   { t: "SEO Optimization", d: "Improve your rankings and drive organic traffic to your business.", i: BarChart },
                   { t: "Brand Strategy", d: "Define your voice and visual identity to stand out in the market.", i: Layers },
                 ].map((s, idx) => (
                   <motion.div 
                    key={idx}
                    variants={item}
                    className="group bg-card hover:bg-primary/5 border border-border hover:border-primary/20 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                      <s.i className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-3 text-foreground">{s.t}</h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">{s.d}</p>
                  </motion.div>
                 ))}
              </>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
