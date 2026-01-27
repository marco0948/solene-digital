import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="/image.png" 
                alt="Solène Digital" 
                className="w-10 h-10 rounded-full shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105 object-cover"
              />
              <span className="text-2xl font-bold tracking-tight font-display text-white">
                Solène<span className="text-primary"> Digital</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Clarity. Strategy. Revenue. A boutique digital marketing and revenue growth studio.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61586126195597", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "https://www.instagram.com/solenedigitalph/", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-6">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Our Team', 'Careers', 'News'].map((item) => (
                <li key={item}>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-6">Services</h3>
            <ul className="space-y-4">
              {['Digital Strategy', 'SEO Optimization', 'Content Marketing', 'Web Development'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-6">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get the latest digital trends and insights.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="Enter your email" 
                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-primary h-12 rounded-lg"
              />
              <Button className="w-full h-12 rounded-lg font-semibold group">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Solene Digital. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
