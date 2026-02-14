"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, Search, Terminal, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

// Mock Logs
const initialLogs = [
    { id: 1, type: "system", message: "System initialized. Version 1.2.0", timestamp: "2026-02-14 10:00:00", level: "info" },
    { id: 2, type: "auth", message: "User Admin logged in from 192.168.1.5", timestamp: "2026-02-14 10:05:22", level: "success" },
    { id: 3, type: "project", message: "Project #12 'Redesign E-Commerce' created by Client A", timestamp: "2026-02-14 11:30:12", level: "info" },
    { id: 4, type: "ai_scan", message: "AI Scan initiated for Milestone #45 (File: backend.zip)", timestamp: "2026-02-14 12:00:01", level: "warning" },
    { id: 5, type: "ai_scan", message: "Vulnerability Detected: Hardcoded API Key found in config.js", timestamp: "2026-02-14 12:00:05", level: "error" },
    { id: 6, type: "transaction", message: "Payment of IDR 5,000,000 received for Escrow #12", timestamp: "2026-02-14 14:22:18", level: "success" },
];

export default function AuditLogsPage() {
    const [logs, setLogs] = useState(initialLogs);
    const [isScanning, setIsScanning] = useState(false);

    const refreshLogs = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            // Simulate new log
            const newLog = {
                id: Date.now(),
                type: "system",
                message: "Manual Log Refresh Triggered by Admin",
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                level: "info"
            };
            setLogs(prev => [newLog, ...prev]);
        }, 1000);
    };

    return (
        <div className="space-y-6 p-6 min-h-screen bg-black/95 text-green-400 font-mono relative overflow-hidden">
            {/* Matrix Effect Background hint */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-center border-b border-green-500/20 pb-4">
                <div className="flex items-center gap-3">
                    <Terminal className="w-8 h-8 text-green-500 animate-pulse" />
                    <h1 className="text-2xl font-bold tracking-wider uppercase">System Audit Logs</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-green-500/20 text-green-400 hover:bg-green-500/10 hover:text-green-300" onClick={refreshLogs}>
                        <RotateCw className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-500 text-black font-bold">
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4 text-xs uppercase tracking-widest border-b border-green-500/10 pb-6">
                <div className="p-4 border border-green-500/20 bg-green-500/5 rounded">
                    <span className="block text-green-500/50 mb-1">Total Events</span>
                    <span className="text-xl font-bold">{logs.length}</span>
                </div>
                <div className="p-4 border border-red-500/20 bg-red-500/5 rounded text-red-400">
                    <span className="block text-red-500/50 mb-1">Errors / Alerts</span>
                    <span className="text-xl font-bold">1</span>
                </div>
                <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded text-blue-400">
                    <span className="block text-blue-500/50 mb-1">System Uptime</span>
                    <span className="text-xl font-bold">99.9%</span>
                </div>
                <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 rounded text-yellow-400">
                    <span className="block text-yellow-500/50 mb-1">Active Sessions</span>
                    <span className="text-xl font-bold">42</span>
                </div>
            </div>

            {/* Logs Terminal */}
            <div className="bg-black border border-green-500/30 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.1)] overflow-hidden">
                <div className="bg-green-900/10 p-2 border-b border-green-500/20 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-xs text-green-500/50">root@escrowy-server:~ tail -f /var/log/syslog</span>
                </div>

                <div className="p-4 space-y-2 h-[500px] overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed">
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-4 border-b border-green-500/5 pb-2 hover:bg-green-500/5 transition-colors p-1 rounded"
                        >
                            <span className="text-green-500/40 w-40 shrink-0">{log.timestamp}</span>
                            <span className={`w-24 shrink-0 font-bold uppercase ${log.level === 'error' ? 'text-red-500' :
                                    log.level === 'warning' ? 'text-yellow-500' :
                                        log.level === 'success' ? 'text-green-400' :
                                            'text-blue-400'
                                }`}>
                                [{log.type}]
                            </span>
                            <span className={`flex-1 ${log.level === 'error' ? 'text-red-400 font-bold' : 'text-green-100/80'}`}>
                                {log.level === 'error' && <AlertCircle className="inline w-3 h-3 mr-1" />}
                                {log.message}
                            </span>
                        </motion.div>
                    ))}
                    <div className="animate-pulse text-green-500">_</div>
                </div>
            </div>
        </div>
    );
}
