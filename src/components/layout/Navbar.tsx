"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeProvider";
import { AccentPicker } from "@/components/ui/AccentPicker";
import { CursorPicker } from "@/components/cursor/CursorPicker";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/theory", label: "Theory" },
  { href: "/lab", label: "Lab" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 shadow-lg shadow-background/50 border-b border-border"
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="mx-auto max-w-[1150px] px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-brand to-brandSecondary shadow-lg shadow-brand/50 group-hover:scale-110 transition-transform" />
            <span className="font-heading font-semibold text-sm tracking-tight">
              EDS CodeTantra
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-foreground ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-foreground transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CursorPicker />
            <AccentPicker />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border/50 mt-2 pt-4">
            <ul className="flex flex-col items-center gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`transition-colors hover:text-foreground ${
                      pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
