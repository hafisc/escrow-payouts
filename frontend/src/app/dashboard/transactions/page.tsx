"use client";

import { useAuthStore } from "@/store/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Download, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// Mock Data
const TRANSACTIONS = [
    { id: 1, type: "deposit", amount: 1500000, status: "completed", date: "2026-02-14", ref: "TXN-88219" },
    { id: 2, type: "escrow_lock", amount: 2000000, status: "pending", date: "2026-02-14", ref: "ESC-11029" },
    { id: 3, type: "widthdrawal", amount: 500000, status: "completed", date: "2026-02-10", ref: "WDR-99210" },
    { id: 4, type: "deposit", amount: 3000000, status: "completed", date: "2026-02-08", ref: "TXN-77123" },
];

export default function TransactionsPage() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-6 p-6 pb-20 min-h-screen bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Transactions</h1>
                    <p className="text-muted-foreground">Monitor your financial activity securely.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export CSV</Button>
                </div>
            </div>

            {/* Search */}
            <div className="flex gap-4 relative z-10">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by Reference ID..." className="pl-9 bg-black/20" />
                </div>
                <Button variant="outline"><Filter className="w-4 h-4" /></Button>
            </div>

            {/* List */}
            <Card className="bg-card/40 backdrop-blur-md border-white/5 relative z-10">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {TRANSACTIONS.map((txn, i) => (
                        <motion.div
                            key={txn.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'deposit' ? 'bg-green-500/20 text-green-500' :
                                        txn.type === 'escrow_lock' ? 'bg-yellow-500/20 text-yellow-500' :
                                            'bg-red-500/20 text-red-500'
                                    }`}>
                                    {txn.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> :
                                        txn.type === 'escrow_lock' ? <ArrowUpRight className="w-5 h-5 rotate-45" /> :
                                            <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-bold text-white capitalize">{txn.type.replace('_', ' ')}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{txn.ref} • {txn.date}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className={`font-bold ${txn.type === 'widthdrawal' ? 'text-white' : 'text-primary'
                                    }`}>
                                    {txn.type === 'widthdrawal' ? '-' : '+'}
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(txn.amount)}
                                </p>
                                <Badge variant={txn.status === 'completed' ? 'success' : 'warning'} className="text-[10px] uppercase">
                                    {txn.status}
                                </Badge>
                            </div>
                        </motion.div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
