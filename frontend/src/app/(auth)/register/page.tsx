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
import Link from "next/link";
import { Loader2 } from "lucide-react";
import React from "react";

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["client", "freelancer"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });
    const { login } = useAuthStore();
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);

    const onSubmit = async (data: RegisterForm) => {
        try {
            const response = await api.post("/register", data);
            login(response.data.data.user, response.data.data.access_token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 to-background opacity-40 pointer-events-none" />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 p-4"
            >
                <Card className="backdrop-blur-xl bg-card/60 border-primary/20 shadow-2xl shadow-primary/20">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                            Join Escrowy
                        </CardTitle>
                        <CardDescription>Create your account and secure your deals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input {...register("name")} id="name" type="text" placeholder="John Doe" className="bg-background/50 border-white/10 focus:border-primary" />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register("email")} id="email" type="email" placeholder="m@example.com" className="bg-background/50 border-white/10 focus:border-primary" />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register("password")} id="password" type="password" className="bg-background/50 border-white/10 focus:border-primary" />
                                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>I am a:</Label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 border p-3 rounded-lg w-full justify-center has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors cursor-pointer">
                                        <input type="radio" value="client" {...register("role")} className="accent-primary" /> Client
                                    </label>
                                    <label className="flex items-center gap-2 border p-3 rounded-lg w-full justify-center has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors cursor-pointer">
                                        <input type="radio" value="freelancer" {...register("role")} className="accent-primary" /> Freelancer
                                    </label>
                                </div>
                                {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
                            </div>

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 mt-2 transition-all hover:scale-[1.02]" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground mt-4">
                                Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Sign In</Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
