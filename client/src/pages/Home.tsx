import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Globe2, Rocket, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useServices } from "@/hooks/use-content";

export default function Home() {
  const { data: services } = useServices();

  // Animations
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-foreground">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen" />
          {/* Abstract Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Award Winning Digital Agency
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] mb-8 tracking-tight"
            >
              We Craft <span className="gradient-text">Digital</span><br />
              Experiences That <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Grow.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            >
              Solene Digital helps ambitious brands scale through strategic marketing, cutting-edge design, and data-driven development.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button size="lg" className="rounded-full text-lg px-8 py-7 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="rounded-full text-lg px-8 py-7 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                  Our Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Our Expertise
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Comprehensive digital solutions tailored to your unique business challenges.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Fallback Static Services if API is loading or fails */}
            {(!services || services.length === 0) && [
              { icon: Globe2, title: "Digital Strategy", desc: "Data-backed roadmaps for sustainable growth." },
              { icon: Rocket, title: "Performance Marketing", desc: "Campaigns that convert and deliver ROI." },
              { icon: Zap, title: "Web Development", desc: "Fast, secure, and beautiful digital experiences." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="group relative bg-secondary/30 p-8 rounded-3xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <s.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-4 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}

            {/* Dynamic Services */}
            {services?.slice(0, 3).map((service) => (
              <motion.div 
                key={service.id}
                variants={fadeInUp}
                className="group relative bg-secondary/30 p-8 rounded-3xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <BarChart3 className="w-7 h-7" /> {/* Default icon if dynamic one is tricky */}
                </div>
                <h3 className="text-2xl font-bold font-display mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
                Ready to transform <br />
                your digital presence?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of successful businesses who chose Solene.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 rounded-full px-10 py-7 text-lg font-semibold">
                  Get a Free Audit
                </Button>
              </Link>
            </div>
            {/* Using Unsplash image for abstract tech vibe */}
            <div className="w-full md:w-1/3 aspect-square relative">
              {/* abstract modern architecture building minimal */}
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Modern building"
                className="w-full h-full object-cover rounded-3xl opacity-80 mix-blend-overlay"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
