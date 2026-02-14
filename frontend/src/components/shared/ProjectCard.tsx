"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    title: string;
    client: string;
    role: string; // broadened to string or specific union
    budget: string;
    progress: number; // 0-100
    status: "active" | "completed" | "dispute" | "pending";
    nextAction: string;
}

export function ProjectCard({ title, client, role, budget, progress, status, nextAction }: ProjectCardProps) {

    const statusColor = {
        active: "bg-primary shadow-[0_0_15px_var(--primary)] text-white",
        completed: "bg-green-500 shadow-[0_0_15px_#22c55e] text-white",
        dispute: "bg-red-500 shadow-[0_0_15px_#ef4444] text-white",
        pending: "bg-yellow-500 shadow-[0_0_15px_#eab308] text-black"
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="border-l-4 border-l-primary overflow-hidden shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.2)] bg-card/60 backdrop-blur-md border-y border-r border-white/5 relative group">

                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>

                <CardHeader className="pb-2 relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1 drop-shadow-md">
                                <ShieldCheck className="w-3 h-3" /> Escrow Protected
                            </p>
                            <CardTitle className="text-lg font-black text-white line-clamp-1 tracking-tight">{title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {role === 'Client' ? 'Hiring:' : 'Client:'} <span className="font-semibold text-white/90">{client}</span>
                            </p>
                        </div>
                        <div className={cn("px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", statusColor[status])}>
                            {status}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Total Budget</p>
                            <p className="text-2xl font-black text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{budget}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-primary font-mono mb-1">{progress}% Complete</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_10px_var(--primary)]"
                        />
                    </div>

                    <div className="mt-4 p-3 bg-black/40 rounded-lg border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-xs text-white/80">
                            <AlertTriangle className="w-3 h-3 text-yellow-500 animate-pulse" />
                            <span className="font-bold text-yellow-500">Next:</span> {nextAction}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-2 relative z-10">
                    <Button className="w-full group bg-white/5 hover:bg-primary/20 text-white border border-white/10 transition-all hover:border-primary/50">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-primary" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
