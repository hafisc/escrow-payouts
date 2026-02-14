"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Shield, User, Globe, Mail } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pb-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <h1 className="text-3xl font-black text-white mb-2">Settings</h1>
                <p className="text-muted-foreground mb-8">Manage your account preferences and security.</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="space-y-2">
                        <Button
                            variant={activeTab === 'profile' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('profile')}
                        >
                            <User className="mr-2 h-4 w-4" /> Profile
                        </Button>
                        <Button
                            variant={activeTab === 'security' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('security')}
                        >
                            <Lock className="mr-2 h-4 w-4" /> Security
                        </Button>
                        <Button
                            variant={activeTab === 'notifications' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell className="mr-2 h-4 w-4" /> Notifications
                        </Button>
                        <Button
                            variant={activeTab === 'api' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setActiveTab('api')}
                        >
                            <Globe className="mr-2 h-4 w-4" /> API & Integrations
                        </Button>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <Card className="bg-card/50 backdrop-blur border-white/10">
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" defaultValue="Hafisch" className="bg-black/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue="Admin" className="bg-black/20" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input id="email" defaultValue="admin@escrowy.com" className="pl-9 bg-black/20" disabled />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input id="bio" placeholder="Tell us about yourself" className="bg-black/20" />
                                    </div>
                                    <Button className="bg-primary text-white mt-4">Save Changes</Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Security Tab (Mock) */}
                        {activeTab === 'security' && (
                            <Card className="bg-card/50 backdrop-blur border-white/10">
                                <CardHeader>
                                    <CardTitle>Password & Authentication</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Current Password</Label>
                                        <Input type="password" className="bg-black/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>New Password</Label>
                                        <Input type="password" className="bg-black/20" />
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl border border-primary/20 mt-4">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-6 h-6 text-primary" />
                                            <div>
                                                <h3 className="font-bold text-white">Two-Factor Authentication</h3>
                                                <p className="text-xs text-muted-foreground">Add an extra layer of security.</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/20">Enable 2FA</Button>
                                    </div>
                                    <Button className="bg-primary text-white mt-4">Update Password</Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Other tabs can be empty placeholders or similar */}
                    </div>
                </div>
            </div>
        </div>
    );
}
