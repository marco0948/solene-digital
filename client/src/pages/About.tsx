import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTeam } from "@/hooks/use-content";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const { data: team, isLoading } = useTeam();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight text-white">
                We Are <br/>
                <span className="text-primary">Solène Digital.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Founded by Carmela Vargas and Adrian Baua, Solène Digital is a founder-led, boutique digital marketing and revenue growth studio built for businesses that want more than vanity metrics. We partner with healthcare providers, e-commerce brands, real estate companies, and more that value transparency and long-term growth.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-primary pl-6">
                  <h3 className="text-4xl font-bold text-white mb-2">Multiple</h3>
                  <p className="text-muted-foreground">Industries Served</p>
                </div>
                <div className="border-l-2 border-primary pl-6">
                  <h3 className="text-4xl font-bold text-white mb-2">Founder-</h3>
                  <p className="text-muted-foreground">Led Execution</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* office meeting creative team working together */}
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                alt="Our Team" 
                className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-3xl translate-x-6 translate-y-6 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Why Clients Choose Solène Digital</h2>
            <p className="text-muted-foreground text-lg">
              Strategy-first approach, transparent pricing, measurable results, founder-led execution, and customized solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Strategy First", desc: "Every engagement begins with a clear growth and revenue blueprint." },
              { title: "Transparent Pricing", desc: "Clear separation between strategy and execution, no hidden fees." },
              { title: "Measurable Results", desc: "Performance tracked through defined KPIs tied to leads and revenue." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 rounded-2xl shadow-sm border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{v.title}</h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-16 text-center">Meet Our Founders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
               [1,2,3,4].map(i => <div key={i} className="h-96 bg-secondary animate-pulse rounded-2xl" />)
            ) : (
              team?.map((member, i) => (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-xl">{member.name}</h3>
                    <p className="text-primary-foreground/80 font-medium">{member.role}</p>
                    <p className="text-white/60 text-sm mt-2 line-clamp-2">{member.bio}</p>
                  </div>
                </motion.div>
              ))
            )}
            
            {/* Fallback if no team data */}
            {(!team || team.length === 0) && !isLoading && (
              <div className="col-span-full text-center py-10 bg-secondary/20 rounded-2xl">
                <p className="text-muted-foreground">Team members coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
