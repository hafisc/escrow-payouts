"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Assuming I have this or will make simple state
import { AlertTriangle, MessageSquare, MoreHorizontal, CheckCircle, Scale, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

// Mock Disputes
const DISPUTES = [
    { id: 101, project: "E-Commerce Redesign", client: "Alice", freelancer: "Bob", amount: 5000000, reason: "Incomplete Deliverables", status: "open", date: "2026-02-14" },
    { id: 102, project: "Logo Design", client: "Charlie", freelancer: "Diana", amount: 1500000, reason: "Ghosting / No Response", status: "open", date: "2026-02-13" },
    { id: 99, project: "SEO Audit", client: "Eve", freelancer: "Frank", amount: 2000000, reason: "Quality Issues", status: "resolved", date: "2026-02-10" },
];

export default function DisputesPage() {
    const [filter, setFilter] = useState("open");

    const filteredDisputes = DISPUTES.filter(d => filter === 'all' || d.status === filter);

    return (
        <div className="space-y-6 p-6 min-h-screen bg-background relative overflow-hidden pb-20">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-br from-red-900/10 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                        <h1 className="text-3xl font-black text-white tracking-tight">Dispute Resolution Center</h1>
                    </div>
                    <p className="text-muted-foreground">Mediate and resolve conflicts between clients and freelancers.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={filter === 'open' ? 'destructive' : 'outline'} onClick={() => setFilter('open')}>Open Cases</Button>
                    <Button variant={filter === 'resolved' ? 'default' : 'outline'} className={filter === 'resolved' ? 'bg-green-600 hover:bg-green-500' : ''} onClick={() => setFilter('resolved')}>Resolved</Button>
                    <Button variant={filter === 'all' ? 'secondary' : 'outline'} onClick={() => setFilter('all')}>All History</Button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <Card className="bg-red-500/10 border-red-500/20">
                    <CardContent className="pt-6 text-center">
                        <h2 className="text-3xl font-bold text-red-500">{DISPUTES.filter(d => d.status === 'open').length}</h2>
                        <p className="text-xs uppercase tracking-wider text-red-400/70 font-bold mt-1">Active Disputes</p>
                    </CardContent>
                </Card>
                <Card className="bg-orange-500/10 border-orange-500/20">
                    <CardContent className="pt-6 text-center">
                        <h2 className="text-3xl font-bold text-orange-500">IDR 6.5M</h2>
                        <p className="text-xs uppercase tracking-wider text-orange-400/70 font-bold mt-1">Funds at Risk</p>
                    </CardContent>
                </Card>
                <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="pt-6 text-center">
                        <h2 className="text-3xl font-bold text-green-500">14</h2>
                        <p className="text-xs uppercase tracking-wider text-green-400/70 font-bold mt-1">Cases Resolved (This Month)</p>
                    </CardContent>
                </Card>
            </div>

            {/* List */}
            <div className="grid gap-4 relative z-10">
                {filteredDisputes.map((dispute, i) => (
                    <motion.div
                        key={dispute.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="hover:border-primary/50 transition-colors group">
                            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${dispute.status === 'open' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                                    }`}>
                                    <Scale className="w-6 h-6" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-white truncate">Case #{dispute.id}: {dispute.project}</h3>
                                        {dispute.status === 'open' && <Badge variant="destructive" className="uppercase text-[10px]">Action Required</Badge>}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        <span className="text-white font-medium">{dispute.client}</span> vs <span className="text-white font-medium">{dispute.freelancer}</span> • Report Date: {dispute.date}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-mono bg-white/5 inline-flex px-2 py-1 rounded text-red-300 border border-red-500/20">
                                        <AlertTriangle className="w-3 h-3" />
                                        Reason: {dispute.reason}
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="text-right shrink-0">
                                    <p className="text-xs text-muted-foreground uppercase font-bold">Disputed Amount</p>
                                    <p className="text-xl font-bold text-white">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(dispute.amount)}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 shrink-0">
                                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">Review Case</Button>
                                    <Button size="icon" variant="ghost"><MessageSquare className="w-4 h-4" /></Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
                {filteredDisputes.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white">All Clear!</h3>
                        <p className="text-muted-foreground">No disputes found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
