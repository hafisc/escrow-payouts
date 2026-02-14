import { ChevronRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";

interface SidebarProps {
    className?: string;
    isOpen?: boolean;
    setIsOpen?: (val: boolean) => void;
}

export function Sidebar({ className, isOpen, setIsOpen }: SidebarProps) {
    const { user, logout } = useAuthStore();
    return (
        <aside className={cn("hidden md:flex bg-card/10 backdrop-blur-2xl border-r border-white/5 h-screen w-64 flex-col fixed inset-y-0 left-0 transition-transform z-30", isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")}>

            {/* Logo */}
            <div className="flex items-center h-20 px-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Link href="/" className="font-black text-2xl text-white tracking-tighter flex items-center gap-2 relative z-10">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-900 text-white flex items-center justify-center font-bold shadow-[0_0_15px_var(--primary)] group-hover:scale-110 transition-transform">E</span>
                    Escrowy<span className="text-primary">.</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-white/70 hover:text-white hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all group">
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                    Dashboard
                </Link>
                <Link href="/dashboard/projects" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-white/70 hover:text-white hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all group">
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                    My Projects
                </Link>
                <Link href="/dashboard/transactions" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-white/70 hover:text-white hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all group">
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                    Transactions
                </Link>
            </nav>

            {/* Profile */}
            <div className="p-4 border-t border-white/5 bg-black/20 m-4 rounded-2xl backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{user?.name || 'Guest User'}</p>
                        <p className="text-xs text-primary truncate capitalize flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            {user?.role || 'Visitor'}
                        </p>
                    </div>
                </div>
                <button onClick={logout} className="w-full py-2 text-xs font-semibold text-white/50 hover:text-white bg-white/5 hover:bg-red-500/20 hover:border-red-500/50 border border-transparent rounded-lg transition-all">
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
