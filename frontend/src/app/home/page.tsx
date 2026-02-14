"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    FileText,
    Search,
    ArrowRight,
    Sparkles,
    LayoutGrid,
    Zap
} from "lucide-react";

interface ServiceFeature {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    gradientColor: string;
    buttonLabel: string;
    hintIcon: React.ReactNode;
}

const NAVIGATION_FEATURES: ServiceFeature[] = [
    {
        title: "Analyze Your Resume",
        description: "Get a comprehensive ATS score, detailed feedback, and optimization tips to stand out to recruiters.",
        icon: <FileText className="w-8 h-8" />,
        path: "/analyzer",
        gradientColor: "from-blue-500 to-indigo-600",
        buttonLabel: "Start Analysis",
        hintIcon: <Zap className="w-5 h-5" />
    },
    {
        title: "Find Your Job",
        description: "Discover curated job opportunities that perfectly match your skills and experience level using AI.",
        icon: <Search className="w-8 h-8" />,
        path: "/find-jobs",
        gradientColor: "from-purple-500 to-pink-600",
        buttonLabel: "Explore Jobs",
        hintIcon: <Sparkles className="w-5 h-5" />
    }
];

export default function MenuPage() {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="relative min-h-screen bg-[#020202] text-zinc-100 overflow-hidden font-sans selection:bg-indigo-500/30">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />

                {/* Texture Overlays */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Application Main Surface */}
            <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 min-h-screen flex flex-col items-center justify-center">

                {/* Introduction Section */}
                <div className="text-center mb-16 space-y-6 max-w-4xl animate-in fade-in duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-4">
                        <Sparkles className="w-3 h-3" />
                        <span>AI-Powered Career Intelligence</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-[1.1]">
                        Elevate Your <span className="text-indigo-400">Career Journey</span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Choose your path forward. Whether you want to optimize your profile or find your next big opportunity, we&apos;ve got you covered.
                    </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    {NAVIGATION_FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => handleNavigation(feature.path)}
                            className="group relative p-[1px] rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02] cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Visual Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradientColor} opacity-20 group-hover:opacity-40 rounded-[2.5rem] transition-opacity`} />

                            {/* Card Content Container */}
                            <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-start overflow-hidden">
                                {/* Decorative Light Source */}
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.gradientColor} opacity-[0.03] blur-3xl -mr-20 -mt-20 group-hover:opacity-10 transition-opacity`} />

                                {/* Feature Icon Block */}
                                <div className={`mb-8 p-4 rounded-2xl bg-gradient-to-br ${feature.gradientColor} text-white shadow-lg shadow-indigo-500/10 group-hover:shadow-indigo-500/20 transition-all duration-500 group-hover:-translate-y-1`}>
                                    {feature.icon}
                                </div>

                                {/* Textual Information */}
                                <div className="space-y-4 relative z-10">
                                    <h2 className="text-3xl font-bold text-white group-hover:text-indigo-100 transition-colors">
                                        {feature.title}
                                    </h2>
                                    <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Action Bar */}
                                <div className="mt-12 w-full flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3 py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-semibold transition-all group-hover:bg-white/10 group-hover:border-white/20">
                                        <span>{feature.buttonLabel}</span>
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <div className="p-3 rounded-full bg-white/5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                        {feature.hintIcon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Interactive Cue */}
                <div className="mt-20 flex items-center gap-3 text-zinc-500 text-sm animate-bounce opacity-50">
                    <LayoutGrid className="w-4 h-4" />
                    <span>Select an option to continue</span>
                </div>
            </main>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

