import { ChevronRight, Menu } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/shared/Sidebar";
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative bg-[url('/bg-grain.png')]">
                {/* Optional: Add a subtle animated grain or gradient overlay here if assets allowed */}
                <div className="absolute inset-0 bg-background/80 pointer-events-none" />

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-background/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
                    <span className="font-black text-xl text-primary tracking-tighter drop-shadow-[0_0_10px_var(--primary)]">Escrowy.</span>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -mr-2 text-white hover:text-primary transition-colors">
                        <Menu />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-8 relative z-10 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {children}
                </div>
            </div>
        </div>
    );
}
