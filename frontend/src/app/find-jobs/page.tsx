"use client";

import { useState } from "react";
import {
    Upload,
    Briefcase,
    ExternalLink,
    Loader2,
    FileText,
    X,
    Sparkles
} from "lucide-react";
import { findJobs } from "@/services/api";

interface Job {
    title: string;
    url: string;
    score: number;
    content: string;
}

const FindJobsPage = () => {
    const [selectedResume, setSelectedResume] = useState<File | null>(null);
    const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedResume(file);
            setErrorMessage(null);
        }
    };

    const handleSearchJobs = async () => {
        if (!selectedResume) return;

        try {
            setIsSearching(true);
            setErrorMessage(null);

            const response = await findJobs(selectedResume);
            setRecommendedJobs(response.jobs || []);

            if (response.jobs?.length === 0) {
                setErrorMessage("No matching jobs found for your profile.");
            }
        } catch (error: any) {
            console.error("Job Search Error:", error);
            setErrorMessage("Failed to fetch jobs. Please try again later.");
        } finally {
            setIsSearching(false);
        }
    };

    const clearSelectedFile = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedResume(null);
        setRecommendedJobs([]);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-zinc-100 p-5 md:p-12 pb-32">
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4 pt-10">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-tight">
                        Find Your Next <span className="text-indigo-400">Opportunity</span>
                    </h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                        Upload your resume and let our AI match you with the best roles across the web.
                    </p>
                </div>

                {/* Upload Form Section */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-10 mb-16 shadow-2xl relative overflow-hidden transition-all hover:border-white/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />

                    <div className="flex flex-col gap-8 relative z-10">
                        <label className="group flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-white/10 rounded-[1.5rem] bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer">
                            {!selectedResume ? (
                                <div className="text-center px-4">
                                    <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3 group-hover:-translate-y-1 transition-transform" />
                                    <p className="text-zinc-300 font-medium text-sm md:text-base">Select Your Resume (PDF)</p>
                                    <p className="text-zinc-500 text-xs mt-1">We'll analyze your skills for best matches</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 bg-indigo-500/20 p-4 rounded-xl border border-indigo-500/30">
                                    <FileText className="text-indigo-400" />
                                    <span className="text-white font-medium text-sm truncate max-w-[150px] md:max-w-xs">
                                        {selectedResume.name}
                                    </span>
                                    <button onClick={clearSelectedFile} className="hover:text-red-400 transition-colors ml-2">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                            <input type="file" className="hidden" accept=".pdf" onChange={handleFileSelect} />
                        </label>

                        <button
                            onClick={handleSearchJobs}
                            disabled={!selectedResume || isSearching}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/10 active:scale-[0.98]"
                        >
                            {isSearching ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                            {isSearching ? "Searching for Jobs..." : "Find Best Matches"}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6 pb-20">
                    {recommendedJobs.length > 0 && (
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 animate-in fade-in duration-500">
                            <Briefcase className="text-indigo-400 w-6 h-6" /> Recommended Roles
                        </h2>
                    )}

                    {recommendedJobs.map((job, index) => (
                        <div
                            key={index}
                            className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] p-6 hover:border-indigo-500/30 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full" />

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 relative z-10">
                                <div className="space-y-2">
                                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                                        {job.title}
                                    </h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                                        Match Score: {(job.score * 100).toFixed(0)}%
                                    </div>
                                </div>
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white text-sm font-bold rounded-xl border border-indigo-600/20 transition-all active:scale-95"
                                >
                                    Apply Now <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                            <p className="mt-5 text-zinc-500 text-sm leading-relaxed border-t border-white/5 pt-5 italic group-hover:text-zinc-400 transition-colors">
                                {job.content.length > 180 ? job.content.substring(0, 180) + "..." : job.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Error/Information Messages */}
                {errorMessage && (
                    <div className="mt-6 p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-center font-medium animate-in fade-in duration-300">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindJobsPage;
