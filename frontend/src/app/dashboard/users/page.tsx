"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Loader2, MoreVertical, ShieldCheck, UserCheck, UserX } from "lucide-react";

// Mock Data
const MOCK_USERS = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "client", status: "active", verified: true },
    { id: 2, name: "Bob Smith", email: "bob@freelance.net", role: "freelancer", status: "active", verified: true },
    { id: 3, name: "Charlie Day", email: "charlie@client.co", role: "client", status: "pending", verified: false },
    { id: 4, name: "Diana Prince", email: "diana@code.io", role: "freelancer", status: "banned", verified: true },
    { id: 5, name: "Eve Polastri", email: "eve@secure.me", role: "admin", status: "active", verified: true },
];

export default function UserManagementPage() {
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    const filteredUsers = MOCK_USERS.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "all" || u.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-8 p-6 pb-20 min-h-screen bg-background text-foreground relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage platform users, roles, and permissions.</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    <Button variant={filterRole === 'all' ? 'default' : 'ghost'} size="sm" onClick={() => setFilterRole('all')}>All</Button>
                    <Button variant={filterRole === 'client' ? 'default' : 'ghost'} size="sm" onClick={() => setFilterRole('client')}>Clients</Button>
                    <Button variant={filterRole === 'freelancer' ? 'default' : 'ghost'} size="sm" onClick={() => setFilterRole('freelancer')}>Freelancers</Button>
                </div>
            </div>

            {/* Search & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                <div className="md:col-span-3 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users by name or email..."
                        className="pl-9 bg-black/20 border-white/10 focus:border-primary h-12 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Card className="bg-primary/20 border-primary/30 flex items-center justify-center">
                    <div className="text-center">
                        <span className="text-2xl font-bold text-white">{filteredUsers.length}</span>
                        <p className="text-xs text-primary-foreground/70 uppercase font-bold tracking-wider">Users Found</p>
                    </div>
                </Card>
            </div>

            {/* Users List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {filteredUsers.map((u, i) => (
                    <motion.div
                        key={u.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:border-primary/50 transition-colors group overflow-hidden relative">
                            {/* Status Indicator */}
                            <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl ${u.status === 'active' ? 'bg-green-500/20 text-green-500' :
                                    u.status === 'banned' ? 'bg-red-500/20 text-red-500' :
                                        'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                {u.status}
                            </div>

                            <CardContent className="pt-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-lg font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
                                    {u.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white truncate group-hover:text-primary transition-colors">{u.name}</h3>
                                    <p className="text-xs text-muted-foreground truncate mb-2">{u.email}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="border-white/10 bg-white/5 text-xs capitalize">{u.role}</Badge>
                                        {u.verified && <Badge variant="success" className="gap-1"><ShieldCheck className="w-3 h-3" /> Verified</Badge>}
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </CardContent>

                            {/* Action Footer */}
                            <div className="px-6 py-3 bg-black/20 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground hover:text-white">View Profile</Button>
                                {u.status === 'active' ? (
                                    <Button variant="ghost" size="sm" className="text-xs h-7 text-red-400 hover:bg-red-500/10 hover:text-red-500">Ban User</Button>
                                ) : (
                                    <Button variant="ghost" size="sm" className="text-xs h-7 text-green-400 hover:bg-green-500/10 hover:text-green-500">Unban</Button>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
