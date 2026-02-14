"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderGit2,
    Wallet,
    Users,
    Gavel,
    FileText,
    Settings,
    LogOut,
    ChevronRight,
    Shield
} from "lucide-react";

interface SidebarProps {
    className?: string;
    isOpen?: boolean;
    setIsOpen?: (val: boolean) => void;
}

export function Sidebar({ className, isOpen, setIsOpen }: SidebarProps) {
    const { user, logout } = useAuthStore();
    const pathname = usePathname();

    const clientLinks = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/projects", label: "My Projects", icon: FolderGit2 },
        { href: "/dashboard/transactions", label: "Transactions", icon: Wallet },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    const freelancerLinks = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/projects", label: "Active Jobs", icon: FolderGit2 },
        { href: "/dashboard/wallet", label: "My Wallet", icon: Wallet },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    const adminLinks = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/users", label: "User Management", icon: Users },
        { href: "/dashboard/projects", label: "All Projects", icon: FolderGit2 },
        { href: "/dashboard/disputes", label: "Dispute Center", icon: Gavel },
        { href: "/dashboard/audit-logs", label: "AI Audit Logs", icon: FileText },
        { href: "/dashboard/settings", label: "System Settings", icon: Settings },
    ];

    const getLinks = () => {
        if (user?.role === 'admin') return adminLinks;
        if (user?.role === 'freelancer') return freelancerLinks;
        return clientLinks;
    };

    const links = getLinks();

    return (
        <aside className={cn(
            "hidden md:flex bg-black/40 backdrop-blur-3xl border-r border-white/5 h-screen w-72 flex-col fixed inset-y-0 left-0 transition-transform z-30 shadow-2xl",
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>

            {/* Logo */}
            <div className="flex items-center h-24 px-8 relative overflow-hidden group border-b border-white/5">
                <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Link href="/" className="font-black text-2xl text-white tracking-tighter flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-900 text-white flex items-center justify-center font-bold shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:rotate-12 transition-transform">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        Escrowy<span className="text-primary">.</span>
                        <span className="block text-[10px] font-normal text-muted-foreground tracking-widest uppercase">Secure Payments</span>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
                <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                    {user?.role === 'admin' ? 'Administration' : 'Menu'}
                </p>

                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all group relative overflow-hidden",
                                isActive
                                    ? "bg-primary/20 text-white shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
                            <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-white/40 group-hover:text-white")} />
                            {link.label}
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary animate-pulse" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile */}
            <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/5">
                <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg ring-2 ring-black group-hover:ring-primary/50 transition-all">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{user?.name || 'Guest Details'}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <p className="text-xs text-muted-foreground truncate capitalize">
                                {user?.role || 'Visitor'}
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-500/20 rounded-xl transition-all duration-300"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
