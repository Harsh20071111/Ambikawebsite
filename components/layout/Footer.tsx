import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

const footerLinks = {
    quickLinks: [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About Us", href: "/about" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" },
    ],
    products: [
        { name: "Hydraulic Trolleys", href: "/products" },
        { name: "Cultivators", href: "/products" },
        { name: "Rotavators", href: "/products" },
        { name: "Ploughs", href: "/products" },
        { name: "Seed Drills", href: "/products" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-[#0D1610] text-white relative overflow-hidden">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#f4c025] to-transparent" />

            <div className="max-w-7xl mx-auto px-4 lg:px-10 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
                    {/* About */}
                    <div className="space-y-5">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <div className="w-10 h-10 bg-[#1a4d2e] rounded-lg flex items-center justify-center">
                                <span className="text-white font-extrabold text-sm">A</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                AMBIKA ENGINEERING
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering Indian farmers with reliable, world-class agricultural
                            machinery since 1995. Built tough for modern farming.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" },
                            ].map(({ icon: Icon, href }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    className="w-10 h-10 bg-white/5 hover:bg-[#1a4d2e] rounded-lg flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#1a4d2e]"
                                >
                                    <Icon className="w-4 h-4 text-gray-400" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 uppercase tracking-widest text-gray-500">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-px bg-[#f4c025] transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 uppercase tracking-widest text-gray-500">
                            Products
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.products.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-px bg-[#f4c025] transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 uppercase tracking-widest text-gray-500">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#f4c025] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">
                                    Industrial Area, Phase II,
                                    <br />
                                    Ludhiana, Punjab 141003
                                </span>
                            </li>
                            <li>
                                <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 text-[#f4c025] flex-shrink-0" />
                                    <span className="text-sm">+91 98765 43210</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@agritech.in" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 text-[#f4c025] flex-shrink-0" />
                                    <span className="text-sm">info@ambikaengineering.com</span>
                                </a>
                            </li>
                        </ul>
                        {/* WhatsApp CTA */}
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Ambika Engineering. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
