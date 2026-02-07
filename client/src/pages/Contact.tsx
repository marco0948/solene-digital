import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api, type ContactInput } from "@shared/routes";
import { useContactMutation } from "@/hooks/use-content";

export default function Contact() {
  const mutation = useContactMutation();
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(api.contacts.create.input),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ContactInput) {
    mutation.mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        form.reset();
      }
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold mb-6 text-foreground"
          >
            Let's talk about your goals.
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            If you're ready to grow with clarity and intention, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-8 text-foreground">Get in Touch</h2>
              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email", content: "solenedigitalph@gmail.com" },
                  { icon: Phone, title: "Mobile", content: "+63 952 457 1358" },
                  { icon: Phone, title: "Viber", content: "+63 917 160 1639" },
                  { icon: MapPin, title: "Location", content: "Based in Philippines | Working with brands everywhere" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-12 p-6 bg-card rounded-2xl border border-border">
                <h3 className="text-xl font-bold font-display mb-3 text-foreground">Partnership Inquiry</h3>
                <p className="text-muted-foreground leading-relaxed">
                  SOLÈNE DIGITAL partners with a limited number of clients to ensure focus and quality. 
                  We're currently accepting new partnerships for Q2 2026.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-lg border border-border">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8">We'll be in touch shortly to discuss your growth strategy.</p>
                  <Button onClick={() => setSuccess(false)} variant="outline" className="btn-secondary">
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-2xl font-bold font-display mb-6 text-foreground">Send us a message</h2>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Full Name" {...field} className="h-12 bg-secondary/20 border-border focus:border-accent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} className="h-12 bg-secondary/20 border-border focus:border-accent" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your business goals and how we can help..." 
                              className="min-h-[150px] bg-secondary/20 resize-none border-border focus:border-accent" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="btn-primary w-full h-12 text-lg font-semibold"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
