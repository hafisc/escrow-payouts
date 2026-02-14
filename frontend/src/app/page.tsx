"use client";

import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Zap, Lock } from "lucide-react";
import React from "react";

export default function LandingPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-white">

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-background/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_var(--primary)]">E</span>
            Escrowy.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors">Sign In</Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/80 text-white shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        {/* Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-bold mb-8 backdrop-blur-md">
              <Shield className="w-4 h-4" /> Trusted by 10,000+ Freelancers
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Secure Payments for the <br /> <span className="text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.6)]">Gen Z Era.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Don&apos;t get scammed. Lock your funds, verify deliverables with AI, and release payments instantly. The future of freelancing is trustless.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-transform hover:scale-105">
                  Start Escrow Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 bg-transparent text-white backdrop-blur-md">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Smart Contracts", icon: Lock, desc: "Funds are locked in a secure vault until milestones are 100% verified." },
            { title: "AI Audits", icon: Zap, desc: "Our AI scans code deliverables for bugs & security flaws before payout." },
            { title: "Instant Release", icon: CheckCircle, desc: "Once approved, funds are transferred to your wallet in seconds." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
