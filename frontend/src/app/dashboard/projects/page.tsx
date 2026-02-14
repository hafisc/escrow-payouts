"use client";

import { useAuthStore } from "@/store/auth";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, PlusCircle, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import { Project } from "@/types";
import Link from 'next/link';

export default function ProjectsPage() {
    const { user } = useAuthStore();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data.data);
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

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 pb-20 min-h-screen bg-background relative">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        {user?.role === 'admin' ? 'All Projects' : 'My Projects'}
                    </h1>
                    <p className="text-muted-foreground">Manage ongoing and completed work.</p>
                </div>

                {user?.role === 'client' && (
                    <Link href="/dashboard/new-project">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-shadow">
                            <PlusCircle className="mr-2 h-4 w-4" /> New Project
                        </Button>
                    </Link>
                )}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 relative z-10">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        className="pl-9 bg-black/20 border-white/10 focus:border-primary h-12 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Button variant={statusFilter === 'all' ? 'default' : 'outline'} onClick={() => setStatusFilter("all")}>All</Button>
                    <Button variant={statusFilter === 'active' ? 'default' : 'outline'} onClick={() => setStatusFilter("active")}>Active</Button>
                    <Button variant={statusFilter === 'completed' ? 'default' : 'outline'} onClick={() => setStatusFilter("completed")}>Completed</Button>
                </div>
            </div>

            {/* Grid */}
            {filteredProjects.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10 relative z-10">
                    <p className="text-muted-foreground">No projects found matching criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {filteredProjects.map((project, i) => {
                        const totalMilestones = project.milestones?.length || 0;
                        const completedMilestones = project.milestones?.filter(m => m.status === 'released').length || 0;
                        const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

                        const currentMilestone = project.milestones?.find(m => m.status === 'in_escrow' || m.status === 'pending');
                        const nextAction = currentMilestone ? `Next: ${currentMilestone.title}` : "All Done";

                        let mappedStatus: "active" | "completed" | "dispute" | "pending" = "pending";
                        if (project.status === 'active') mappedStatus = "active";
                        if (project.status === 'completed') mappedStatus = "completed";
                        if (project.status === 'disputed') mappedStatus = "dispute";

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <ProjectCard
                                    title={project.title}
                                    client={project.client?.name || 'Unknown'}
                                    role={user?.role === 'client' ? 'Client' : (user?.role === 'admin' ? 'Admin' : 'Freelancer')}
                                    budget={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(project.total_budget)}
                                    progress={progress}
                                    status={mappedStatus}
                                    nextAction={nextAction}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
