import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:shadow-accent/50 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight font-display text-foreground">
                SOLÈNE<br/><span className="text-accent">DIGITAL</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Grow with clarity.<br/>Scale with intention.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61586126195597", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/solenedigitalph/", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-6 text-foreground">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Our Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'About Us' ? '/about' : item === 'Our Services' ? '/services' : '/contact'} className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-6 text-foreground">Services</h3>
            <ul className="space-y-4">
              {['Digital Strategy', 'Content Marketing', 'Performance Marketing'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-6 text-foreground">Let's Connect</h3>
            <p className="text-muted-foreground mb-4">
              Ready to build your growth strategy?
            </p>
            <Link href="/contact">
              <Button className="btn-primary rounded-full font-semibold group">
                Book a Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SOLÈNE DIGITAL. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
