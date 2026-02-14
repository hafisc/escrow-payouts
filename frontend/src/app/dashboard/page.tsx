"use client";

import { useAuthStore } from "@/store/auth";
import { MilestoneStepper } from "@/components/shared/MilestoneStepper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ShieldCheck, Trophy, Bell, Clock, Wallet, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import { Project, Milestone } from "@/types";

export default function DashboardPage() {
    const { user } = useAuthStore();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        activeCount: 0,
        completionRate: 0,
        pendingRelease: 0,
        totalBalance: 0 // Mocked for now since backend doesn't return wallet balance yet
    });

    // State for the "Live Transaction" demo
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                const data: Project[] = response.data.data;
                setProjects(data);

                // Calculate Stats
                const active = data.filter(p => p.status === 'active').length;
                const completed = data.filter(p => p.status === 'completed').length;
                const total = data.length;
                const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

                let pendingAmount = 0;
                data.forEach(p => {
                    p.milestones.forEach(m => {
                        if (m.status === 'in_escrow') pendingAmount += Number(m.amount);
                    });
                });

                setStats({
                    activeCount: active,
                    completionRate: rate,
                    pendingRelease: pendingAmount,
                    totalBalance: 12500000 // Mock Balance
                });

                if (data.length > 0) {
                    setSelectedProject(data[0]);
                }

            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProjects();
        }
    }, [user]);

    // Transform milestones for stepper
    const getStepperSteps = (project: Project) => {
        return project.milestones.map((m) => {
            let status: "pending" | "current" | "completed" | "issue" = "pending";
            if (m.status === 'released') status = "completed";
            if (m.status === 'in_escrow') status = "current";
            if (m.status === 'disputed') status = "issue";

            return {
                title: m.title,
                description: `ID: #${m.id}`,
                status: status,
                amount: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(m.amount)
            };
        });
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 min-h-screen p-6 bg-background text-foreground pb-20">

            {/* 1. Header */}
            <div className="relative">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-white mb-1">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg">Welcome back, <span className="text-primary font-bold">{user?.name}</span>.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="hidden md:flex gap-2 border-white/10 hover:bg-white/5 bg-black/20 backdrop-blur-md text-white">
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
                <Card className="bg-gradient-to-br from-black via-zinc-900 to-primary/20 border-white/10 shadow-2xl relative overflow-hidden group h-full">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/30 rounded-full blur-[50px] group-hover:bg-primary/40 transition-colors" />

                    <CardContent className="pt-6 relative flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium mb-1 flex items-center gap-2">
                                    <Wallet className="w-4 h-4" /> Total Balance (Est)
                                </p>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.totalBalance)}
                                </h2>
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
                <Card className="bg-card/50 backdrop-blur-md border-white/5 hover:border-primary/50 transition-colors h-full">
                    <CardContent className="pt-6 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Active Projects</p>
                            <h2 className="text-3xl font-bold text-white mt-1">{stats.activeCount}</h2>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary/20" />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${stats.completionRate}%` }}
                                className="bg-primary h-full rounded-full shadow-[0_0_10px_var(--primary)]"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">{stats.completionRate}% Completion Rate</p>
                    </CardContent>
                </Card>

                {/* Stats 3 */}
                <Card className="bg-card/50 backdrop-blur-md border-white/5 hover:border-yellow-500/50 transition-colors h-full">
                    <CardContent className="pt-6 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">In Escrow (Locked)</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mt-1">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.pendingRelease)}
                            </h2>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-yellow-500" /> Funds are safe
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Active Projects Section */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-primary" />
                        Your Projects
                    </h2>
                    <Button variant="ghost" className="text-muted-foreground hover:text-white">View All</Button>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <p className="text-muted-foreground">No projects found. Create one to get started!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => {
                            // Determine logic for card
                            const totalMilestones = project.milestones?.length || 0;
                            const completedMilestones = project.milestones?.filter(m => m.status === 'released').length || 0;
                            const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

                            // Find next action
                            const currentMilestone = project.milestones?.find(m => m.status === 'in_escrow' || m.status === 'pending');
                            const nextAction = currentMilestone ? `Complete: ${currentMilestone.title}` : "All Done";

                            return (
                                <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                                    <ProjectCard
                                        title={project.title}
                                        client={project.client?.name || 'Unknown'}
                                        role={user?.role === 'client' ? 'Client' : 'Freelancer'}
                                        budget={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(project.total_budget)}
                                        progress={progress}
                                        status={project.status}
                                        nextAction={nextAction}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 4. Recent Milestone Logic */}
            {selectedProject && selectedProject.milestones && selectedProject.milestones.length > 0 && (
                <div className="relative z-10">
                    <h2 className="text-xl font-bold text-white mb-4">Milestone Tracker: <span className="text-primary font-normal">{selectedProject.title}</span></h2>
                    <Card className="bg-black/40 border-primary/20 shadow-2xl backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-white">
                                <span className="flex items-center gap-2"><ShieldCheck className="text-primary" /> Secure Transaction Flow</span>
                                <span className="text-muted-foreground text-xs font-mono bg-white/5 px-2 py-1 rounded">ID: #{selectedProject.id}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MilestoneStepper steps={getStepperSteps(selectedProject)} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
