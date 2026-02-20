"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Pages where the navbar should always be solid/dark because there is no hero image
  const isDarkPage = pathname.startsWith("/products/") && pathname !== "/products";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force "scrolled" style if we are on a dark page
  const useScrolledStyle = scrolled || isDarkPage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useScrolledStyle
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-sm transition-colors duration-300 ${useScrolledStyle
                ? "bg-[#1a4d2e] text-white"
                : "bg-white/15 backdrop-blur-sm text-white border border-white/20"
                }`}
            >
              A
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors duration-300 ${useScrolledStyle ? "text-[#1c180d]" : "text-white"
                }`}
            >
              <span className={useScrolledStyle ? "text-[#1a4d2e]" : "text-white"}>AMBIKA</span>
              <span className={useScrolledStyle ? "text-[#1c180d]" : "text-white/80"}> ENGINEERING</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:transition-all hover:after:w-full ${useScrolledStyle
                  ? "text-gray-600 hover:text-[#1a4d2e] after:bg-[#1a4d2e]"
                  : "text-white/80 hover:text-white after:bg-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${useScrolledStyle
                ? "bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-sm"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                }`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <Button
              asChild
              className={`hidden md:inline-flex font-semibold rounded-lg gap-2 transition-all ${useScrolledStyle
                ? "bg-[#1a4d2e] hover:bg-[#164025] text-white shadow-sm"
                : "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-sm"
                }`}
            >
              <a href="tel:+919876543210">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button
                  className={`p-2 rounded-lg transition-colors ${useScrolledStyle
                    ? "text-[#1c180d] hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                    }`}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-gray-200">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setOpen(false)}
                    >
                      <div className="w-9 h-9 bg-[#1a4d2e] rounded-lg flex items-center justify-center">
                        <span className="text-white font-extrabold text-sm">A</span>
                      </div>
                      <span className="text-xl font-bold tracking-tight">
                        <span className="text-[#1a4d2e]">AMBIKA</span>
                        <span className="text-[#1c180d]"> ENGINEERING</span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex flex-col p-6 gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-base font-medium text-[#1c180d] hover:text-[#1a4d2e] hover:bg-[#1a4d2e]/5 transition-colors py-3 px-4 rounded-lg"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto p-6 border-t border-gray-200 space-y-3">
                    <a
                      href="https://wa.me/919876543210"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <Button
                      asChild
                      className="w-full bg-[#1a4d2e] hover:bg-[#164025] text-white font-semibold gap-2"
                    >
                      <a href="tel:+919876543210">
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
