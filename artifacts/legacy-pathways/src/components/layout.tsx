import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import headerLogo from "../assets/lp-header-logo-transparent.png";
import badgeLogoWhite from "../assets/lp-badge-white.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-people", label: "Our People" },
  { href: "/education", label: "Education" },
  { href: "/stories", label: "Stories & Podcasts" },
  { href: "/tours", label: "Legacy Tours" },
  { href: "/takrouna", label: "Takrouna Carving" },
  { href: "/shop", label: "Shop" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col w-full selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src={headerLogo} alt="Legacy Pathways" className="h-14 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b shadow-lg py-4 px-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-serif py-2 border-b border-border/50 ${
                  location === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="bg-secondary text-secondary-foreground mt-auto py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <img src={badgeLogoWhite} alt="Legacy Pathways" className="h-28 w-auto" />
            <p className="text-muted text-sm max-w-sm font-serif">
              Preserving and presenting the stories and legacy of Māori servicemen connected with Ōhinemutu, Te Arawa and Muruika Urupā.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-white">Explore</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/our-people" className="hover:text-white transition-colors">Our People</Link></li>
              <li><Link href="/education" className="hover:text-white transition-colors">Education</Link></li>
              <li><Link href="/tours" className="hover:text-white transition-colors">Legacy Tours</Link></li>
              <li><Link href="/takrouna" className="hover:text-white transition-colors">Takrouna Carving Project</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4 text-white">Organisation</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/share-a-story" className="hover:text-white transition-colors">Share a Story</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-xs text-muted/60 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Legacy Pathways. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Ka maumahara tonu tātou ki a rātou.</p>
        </div>
      </footer>
    </div>
  );
}
