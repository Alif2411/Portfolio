"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(78,222,163,0.05)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="#"
            className="font-sans font-black tracking-tighter text-primary text-xl uppercase"
          >
            ALIF.DEV
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-base text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Resume CTA & Dark Mode (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1-aOlV16-jrzH3Izqy03EsaZnQXlUzOsj/view?usp=drive_link"
              target="_blank"
              className="bg-primary text-on-primary font-bold px-6 py-2 rounded-full hover:shadow-[0_0_20px_rgba(78,222,163,0.4)] transition-all active:scale-95"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-on-surface hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-white/5 mt-2 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base text-on-surface-variant hover:text-primary transition-colors duration-200 px-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 px-2">
                <a
                  href="https://drive.google.com/file/d/1-aOlV16-jrzH3Izqy03EsaZnQXlUzOsj/view?usp=drive_link"
                  target="_blank"
                  className="inline-block bg-primary text-on-primary font-bold px-6 py-2 rounded-full shadow-[0_0_20px_rgba(78,222,163,0.2)]"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
