/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db } from "./lib/firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { handleFirestoreError } from "./lib/errorHandlers";
import { 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  Users, 
  Menu, 
  X,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2
} from "lucide-react";

// Types
interface BookingForm {
  name: string;
  phone: string;
  location: string;
}

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About Us", href: "#about" },
    { name: "Booking", href: "#booking" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-zinc-950/90 backdrop-blur-xl py-3 border-b border-zinc-800/50 shadow-2xl" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: Logo */}
        <a href="#" className="flex items-center gap-2 group w-fit">
          <div className="bg-amber-500 p-1.5 rounded-lg transition-transform group-hover:rotate-12">
            <Car className="text-zinc-950 w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-white">SAI<span className="text-amber-500">BALAJI</span></span>
        </a>

        {/* Center: Nav Links */}
        <div className="hidden md:flex justify-center items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-xs font-bold text-zinc-400 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right: Action Buttons */}
        <div className="hidden md:flex justify-end items-center gap-4">
          <a 
            href="tel:9225533284" 
            className="flex items-center gap-2 text-zinc-300 hover:text-amber-500 px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-widest border border-zinc-800 hover:border-amber-500"
          >
            <Phone className="w-4 h-4" /> CALL
          </a>
          <a 
            href="#booking" 
            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-6 py-2.5 rounded-full text-xs font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20 uppercase tracking-widest"
          >
            BOOK NOW
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden justify-end">
          <button 
            className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-white" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6">
              {navItems.map((item, idx) => (
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.name} 
                  href={item.href} 
                  className="text-2xl font-black text-white hover:text-amber-500 flex justify-between items-center group uppercase tracking-tighter"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <ChevronRight className="w-5 h-5 text-zinc-800 transition-transform group-hover:translate-x-1 group-hover:text-amber-500" />
                </motion.a>
              ))}
              <div className="pt-6 border-t border-zinc-800 flex flex-col gap-4">
                <a 
                  href="tel:9225533284" 
                  className="flex items-center justify-center gap-3 bg-white text-zinc-950 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-5 h-5" /> CALL NOW
                </a>
                <a 
                  href="#booking" 
                  className="bg-amber-500 text-zinc-950 text-center py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-amber-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  BOOK NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="mb-12">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block mb-3"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-5xl font-extrabold ${light ? "text-white" : "text-zinc-900"}`}
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [form, setForm] = useState<BookingForm>({ name: "", phone: "", location: "" });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }
    
    // Prevent common fake patterns (e.g., 0000000000)
    if (/^(.)\1+$/.test(form.phone)) {
      setPhoneError("Please enter a genuine mobile number");
      return;
    }

    setPhoneError("");
    
    if (form.name && form.phone && form.location) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "bookings"), {
          name: form.name,
          phone: form.phone,
          location: form.location,
          status: "pending",
          createdAt: serverTimestamp(),
        });

        // Trigger Email Notification
        await fetch("/api/notify-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            location: form.location,
          }),
        }).catch(err => console.warn("Email trigger failed:", err));

        setShowConfirmation(true);
        setForm({ name: "", phone: "", location: "" });
      } catch (error) {
        console.error("Booking error:", error);
        handleFirestoreError(error, "create", "bookings");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=2000" 
            alt="Swift Dzire Car" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-sm mb-4 block">Premium Travel Partner</span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-6">
              SaiBalaji <br />
              <span className="text-amber-500">Tours</span> & Travelers
            </h1>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-lg">
              Experience the pinnacle of comfort and reliability with our premium Swift Dzire car services. Your journey, our commitment.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:9225533284" className="bg-white hover:bg-zinc-200 text-zinc-950 px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                <Phone className="w-5 h-5" /> CALL NOW
              </a>
              <a href="#booking" className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-amber-500/20">
                BOOK NOW <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 right-10 hidden lg:flex gap-10">
          <div className="text-right">
            <p className="text-4xl font-bold text-white">100+</p>
            <p className="text-xs text-amber-500 tracking-widest uppercase">Happy Clients</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-white">24/7</p>
            <p className="text-xs text-amber-500 tracking-widest uppercase">Support</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <SectionHeading subtitle="Who We Are" title="Our Swift Dzire Service" light />
              <p className="text-zinc-400 mb-12 leading-relaxed text-lg">
                At SaiBalaji Tours and Travelers, we redefine local and outstation travel. Our flagship fleet features the iconic Swift Dzire, a vehicle synonymous with reliability and comfort for Indian roads.
              </p>
            </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: <ShieldCheck className="text-amber-500" />, title: "Premium Comfort", desc: "Plush seating for up to 5 members." },
                  { icon: <Clock className="text-amber-500" />, title: "Dual Zone AC", desc: "Stay cool in the harshest summers." },
                  { icon: <Star className="text-amber-500" />, title: "High Efficiency", desc: "Best-in-class mileage for cost-effective travel." },
                  { icon: <Users className="text-amber-500" />, title: "Smooth Ride", desc: "Advanced suspension for uneven terrains." },
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-4 bg-zinc-950 rounded-2xl border border-zinc-800"
                  >
                    <div className="bg-zinc-900 p-2 rounded-lg h-fit">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 text-sm">{feature.title}</h4>
                      <p className="text-zinc-500 text-xs">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1">
              <SectionHeading subtitle="Secure Your Ride" title="Quick Booking" />
              <p className="text-zinc-600 mb-8 max-w-md">
                Plan your next trip in seconds. Just fill in your details and destination, and we'll take care of the rest. Our professional drivers are ready for your call.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-900">
                  <CheckCircle2 className="text-amber-500" />
                  <span className="font-semibold">Professional Experienced Drivers</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-900">
                  <CheckCircle2 className="text-amber-500" />
                  <span className="font-semibold">Clean & Sanitized Vehicles</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-900">
                  <CheckCircle2 className="text-amber-500" />
                  <span className="font-semibold">No Hidden Charges</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-950 p-8 rounded-3xl shadow-2xl space-y-6"
              >
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">User Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Contact Number</label>
                  <input 
                    type="tel" 
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className={`w-full bg-zinc-900 border ${phoneError ? "border-red-500" : "border-zinc-800"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors`}
                    value={form.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 10) {
                        setForm({...form, phone: val});
                        if (phoneError) setPhoneError("");
                      }
                    }}
                  />
                  {phoneError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-wider"
                    >
                      {phoneError}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Travel Location</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your destination"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    value={form.location}
                    onChange={(e) => setForm({...form, location: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 py-4 rounded-xl font-bold tracking-widest uppercase transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"} <ChevronRight className="w-5 h-5" />
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-zinc-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="The Fleet" title="Swift Dzire Luxury" light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
            ].map((url, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden aspect-video relative group"
              >
                <img 
                  src={url} 
                  alt={`Swift Dzire Gallery ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading subtitle="Get In Touch" title="Contact Us Anytime" light />
              <div className="space-y-8 mt-10">
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <Users className="text-amber-500 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs font-bold uppercase mb-1">Owner Name</p>
                    <p className="text-white text-xl font-bold">Sainath Jadhav</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <Phone className="text-amber-500 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs font-bold uppercase mb-1">Phone Number</p>
                    <a href="tel:9225533284" className="text-white text-xl font-bold hover:text-amber-500 transition-colors">9225533284</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <Mail className="text-amber-500 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs font-bold uppercase mb-1">Email Address</p>
                    <a href="mailto:saibalajitours11@gmail.com" className="text-white text-xl font-bold hover:text-amber-500 transition-colors">saibalajitours11@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-3xl overflow-hidden grayscale opacity-70 border border-zinc-800 h-80 lg:h-full">
                {/* Simplified Map Simulation */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1211699861!2d73.9145564143694!3d18.56791462255474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b20075%3A0x273105cd63f698b6!2sViman%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="bg-amber-500 p-1 rounded-lg">
                  <Car className="text-zinc-950 w-5 h-5" />
                </div>
                <span className="text-lg font-extrabold tracking-tighter text-white uppercase">SAI<span className="text-amber-500">BALAJI</span></span>
              </a>
              <p className="text-zinc-500 text-sm">© 2026 SaiBalaji Tours and Travelers. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6 items-center">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
              onClick={() => setShowConfirmation(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 bg-zinc-900 p-10 rounded-[2.5rem] max-w-lg w-full text-center border border-zinc-800 shadow-3xl"
            >
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                <CheckCircle2 className="text-zinc-950 w-10 h-10" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4">Booking Confirmed!</h3>
              <p className="text-zinc-400 mb-8">
                Thank you, <span className="text-white font-bold">{form.name}</span>. We've received your request for travel to <span className="text-amber-500 font-bold">{form.location}</span>. Our team will contact you shortly at {form.phone}.
              </p>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 py-4 rounded-2xl font-bold uppercase tracking-widest"
              >
                GREAT!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
