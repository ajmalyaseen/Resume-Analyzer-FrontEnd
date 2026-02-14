"use client";

import { useRouter } from "next/navigation";
import {
  MoveRight,
  FileText,
  CheckCircle,
  BarChart3,
  Briefcase
} from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const LANDING_FEATURES: FeatureItem[] = [
  {
    title: "ATS Optimization",
    description: "Ensure your resume passes through Applicant Tracking Systems with flying colors.",
    icon: <FileText className="h-6 w-6" />,
    colorClass: "bg-indigo-500/10 text-indigo-400"
  },
  {
    title: "Skill Matching",
    description: "Identify missing skills that recruiters are looking for in your target roles.",
    icon: <CheckCircle className="h-6 w-6" />,
    colorClass: "bg-purple-500/10 text-purple-400"
  },
  {
    title: "Smart Insights",
    description: "Get data-driven scores and detailed feedback on how to improve every section.",
    icon: <BarChart3 className="h-6 w-6" />,
    colorClass: "bg-cyan-500/10 text-cyan-400"
  },
  {
    title: "Job Matching",
    description: "Find job opportunities that perfectly match your profile and experience level.",
    icon: <Briefcase className="h-6 w-6" />,
    colorClass: "bg-emerald-500/10 text-emerald-400"
  }
];

export default function LandingPage() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/home");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Ambient Background Illumination */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <main className="container mx-auto px-6 pt-32 pb-20 text-center md:pt-48">
        {/* Hero Content Section */}
        <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-1000">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="text-sm font-medium text-indigo-400">Powered by AI</span>
            <div className="mx-2 h-4 w-[1px] bg-white/10" />
            <span className="text-sm text-zinc-400">Unlock your career potential</span>
          </div>

          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl leading-tight">
            Resume Analyzer <br />
            <span className="text-zinc-500">Optimized for Success</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Upload your resume and get instant feedback, skill gap analysis, and
            tailored recommendations to land your dream job.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
            <button
              onClick={navigateToHome}
              className="group relative flex h-14 items-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-8 font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] active:scale-95"
            >
              Get Started
              <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button className="flex h-14 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
              View Sample Report
            </button>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="mt-40 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {LANDING_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-left backdrop-blur-sm transition-all hover:bg-white/[0.04] hover:border-white/10 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 duration-300 ${feature.colorClass}`}>
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-white/5 py-12 text-center text-sm text-zinc-500">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} Resume Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

