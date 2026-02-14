"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/auth";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

const projectSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    total_budget: z.coerce.number().min(10000), // Min 10,000 IDR
    milestones: z.array(z.object({
        title: z.string().min(3),
        amount: z.coerce.number().min(10000),
    })).min(1, "At least one milestone required"),
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
    const { user } = useAuthStore();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            milestones: [{ title: "Initial Deposit", amount: 10000 }] // Default
        }
    });

    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);

    const onSubmit = async (data: ProjectForm) => {
        try {
            const response = await api.post("/projects", {
                ...data,
                status: 'draft',
                client_id: user?.id
            });
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create project");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden p-6">
            {/* Background Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10">
                <Card className="backdrop-blur-xl bg-card/60 border-primary/20 shadow-2xl shadow-primary/10">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                            Create New Project
                        </CardTitle>
                        <CardDescription>Define your project details and milestones for secure escrow.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input {...register("title")} id="title" placeholder="e.g. Website Redesign" className="bg-background/50 border-white/10 focus:border-primary" />
                                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea {...register("description")} id="description" placeholder="Describe the scope of work..." className="bg-background/50 border-white/10 focus:border-primary min-h-[100px]" />
                                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="total_budget">Total Budget (IDR)</Label>
                                <Input {...register("total_budget")} id="total_budget" type="number" placeholder="5000000" className="bg-background/50 border-white/10 focus:border-primary" />
                                {errors.total_budget && <p className="text-xs text-red-500">{errors.total_budget.message}</p>}
                            </div>

                            {/* Milestone Section (Simplification: User enters total milestones, backend logic could split it, but explicitly define 1 for now) */}
                            <div className="p-4 border border-white/10 rounded-lg bg-black/20">
                                <h3 className="text-sm font-bold text-white mb-2">Milestone Structure</h3>
                                <p className="text-xs text-muted-foreground mb-4">For this MVP, one initial milestone is created automatically based on budget. Use the dashboard later to add more.</p>
                            </div>

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Project"}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
