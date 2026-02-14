"use client";

import { motion } from "framer-motion";
import { Check, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type StepStatus = "pending" | "current" | "completed" | "issue";

interface StepperProps {
    steps: {
        title: string;
        description: string;
        status: StepStatus;
        amount?: string;
    }[];
}

export function MilestoneStepper({ steps }: StepperProps) {
    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            <div className="relative flex justify-between items-center">
                {/* Background Connector Line */}
                <div className="absolute top-6 left-0 w-full h-1 bg-white/10 dark:bg-white/5 -z-10 rounded-full" />

                {/* Dynamic Progress Line (Visual only for now, can be calculated) */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "50%" }} // Mock progress for demo
                    className="absolute top-6 left-0 h-1 bg-primary shadow-[0_0_10px_var(--primary)] -z-10 rounded-full transition-all duration-1000"
                />

                {steps.map((step, index) => {
                    const isCompleted = step.status === "completed";
                    const isCurrent = step.status === "current";

                    return (
                        <div key={index} className="flex flex-col items-center group relative w-1/4">

                            {/* Icon Circle */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 z-10 backdrop-blur-md",
                                    isCompleted ? "bg-primary border-primary text-primary-foreground shadow-[0_0_15px_var(--primary)]" :
                                        isCurrent ? "bg-background border-primary text-primary ring-4 ring-primary/20 animate-pulse" :
                                            "bg-card/50 border-white/10 text-muted-foreground"
                                )}
                            >
                                {isCompleted ? <Check className="w-6 h-6" /> :
                                    isCurrent ? <Clock className="w-6 h-6" /> :
                                        <span className="font-bold">{index + 1}</span>
                                }
                            </motion.div>

                            {/* Text Content */}
                            <div className="mt-4 text-center px-2">
                                <h3 className={cn(
                                    "text-sm font-bold capitalize mb-1 transition-colors",
                                    isCurrent ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" : "text-foreground"
                                )}>
                                    {step.title}
                                </h3>
                                <p className="text-xs text-muted-foreground">{step.description}</p>
                                {step.amount && (
                                    <span className={cn(
                                        "mt-2 inline-block px-2 py-0.5 text-xs font-semibold rounded-md border",
                                        isCompleted ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/5 border-white/10 text-muted-foreground"
                                    )}>
                                        {step.amount}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
