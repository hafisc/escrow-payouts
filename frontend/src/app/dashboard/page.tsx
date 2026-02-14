"use client";

import { useAuthStore } from "@/store/auth";
import { MilestoneStepper } from "@/components/shared/MilestoneStepper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, Sliders, ShieldCheck, Trophy, Bell, Clock, Wallet } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuthStore();

    const mockSteps = [
        { title: "Deposit", description: "Funds Secured", status: "completed" as "completed", amount: "$500" },
        { title: "Review", description: "Submission", status: "current" as "current", amount: "$0" },
        { title: "Release", description: "To Freelancer", status: "pending" as "pending", amount: "$500" },
    ];

    return (
        <div className="space-y-8 min-h-screen p-6 bg-background text-foreground">

            {/* 1. Header with Stats & Violet Glow */}
            <div className="relative">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-white mb-1">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg">Manage your secure transactions.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="hidden md:flex gap-2 border-white/10 hover:bg-white/5 bg-black/20 backdrop-blur-md">
                            <Bell className="w-4 h-4" /> Notifications
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-shadow">
                            <PlusCircle className="mr-2 h-4 w-4" /> New Escrow Project
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. Wallet & Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <Card className="bg-gradient-to-br from-black via-zinc-900 to-primary/20 border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/30 rounded-full blur-[50px] group-hover:bg-primary/40 transition-colors" />

                    <CardContent className="pt-6 relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium mb-1 flex items-center gap-2">
                                    <Wallet className="w-4 h-4" /> Total Balance
                                </p>
                                <h2 className="text-4xl font-bold tracking-tight text-white">$12,450.00</h2>
                            </div>
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                                <ShieldCheck className="w-6 h-6 text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="mt-8 flex gap-3">
                            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/5 backdrop-blur-sm flex-1">
                                Deposit
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent text-white flex-1">
                                Withdraw
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats 2 */}
                <Card className="bg-card/50 backdrop-blur-md border-white/5 hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Active Projects</p>
                            <h2 className="text-3xl font-bold text-white mt-1">4</h2>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary/20" />
                            <div className="bg-primary h-full w-3/4 rounded-full shadow-[0_0_10px_var(--primary)]" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">75% Completion Rate</p>
                    </CardContent>
                </Card>

                {/* Stats 3 */}
                <Card className="bg-card/50 backdrop-blur-md border-white/5 hover:border-yellow-500/50 transition-colors">
                    <CardContent className="pt-6 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Pending Release</p>
                            <h2 className="text-3xl font-bold text-yellow-500 mt-1">$2,100</h2>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-yellow-500" /> Awaiting approval
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Active Projects Section */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-primary" />
                        Active Escrows
                    </h2>
                    <Button variant="ghost" className="text-muted-foreground hover:text-white">View All</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProjectCard
                        title="E-Commerce Redesign"
                        client="TechCorp Inc."
                        role="Freelancer"
                        budget="$4,000"
                        progress={65}
                        status="active"
                        nextAction="Submit Milestone 2"
                    />
                    <ProjectCard
                        title="Python AI Microservice"
                        client="StartUp Co."
                        role="Freelancer"
                        budget="$1,200"
                        progress={90}
                        status="pending"
                        nextAction="Wait for Release"
                    />
                    <ProjectCard
                        title="Mobile App MVP"
                        client="Green Energy Ltd."
                        role="Freelancer"
                        budget="$8,500"
                        progress={20}
                        status="active"
                        nextAction="Start Phase 1"
                    />
                </div>
            </div>

            {/* 4. Recent Milestone Logic */}
            <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-4">Live Transactions</h2>
                <Card className="bg-black/40 border-primary/20 shadow-2xl backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex justify-between text-white">
                            <span>E-Commerce Redesign</span>
                            <span className="text-primary text-sm font-normal">ID: #88219</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MilestoneStepper steps={mockSteps} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
