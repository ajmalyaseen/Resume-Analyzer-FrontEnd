"use client";

import { useState } from "react";
import {
    Upload,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Loader2,
    FileText,
    X,
    ChevronRight
} from "lucide-react";
import { analyzeResume } from "@/services/api";

interface AnalysisResult {
    match_percentage: string | number;
    matches: string[];
    missing: string[];
    suggestions: string | string[];
}

const AnalyzerPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAnalyzeResume = async () => {
        if (!selectedFile || !jobDescription) return;

        try {
            setIsAnalyzing(true);
            setErrorMessage(null);

            const data = await analyzeResume(selectedFile, jobDescription);
            setAnalysisResult(data);
        } catch (error: any) {
            console.error("Analysis Error:", error);
            setErrorMessage("Analysis failed. Please check your connection and try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        setAnalysisResult(null);
        setErrorMessage(null);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-zinc-100 p-5 md:p-12 pb-32">
            <div className="max-w-4xl mx-auto pt-10">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-tight">
                        Resume <span className="text-indigo-400">Intelligence</span>
                    </h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-base md:text-lg">
                        Compare your resume against any job description and get expert AI feedback instantly.
                    </p>
                </div>

                {/* Input Section */}
                {!analysisResult ? (
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-10 shadow-2xl space-y-8">
                        {/* File Upload Area */}
                        <label className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:border-indigo-500/50 transition-all cursor-pointer">
                            {!selectedFile ? (
                                <div className="text-center">
                                    <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                                    <p className="text-zinc-300 font-medium">Upload Your Resume</p>
                                    <p className="text-zinc-500 text-xs mt-1">PDF files only</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
                                    <FileText className="text-indigo-400" />
                                    <span className="text-white text-sm truncate max-w-[200px] font-medium">{selectedFile.name}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedFile(null);
                                        }}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            />
                        </label>

                        {/* Job Description Textarea */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-zinc-400 ml-1">Job Description</label>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job requirements here..."
                                className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-5 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-all resize-none placeholder:text-zinc-600"
                            />
                        </div>

                        {/* Analysis Action Button */}
                        <button
                            onClick={handleAnalyzeResume}
                            disabled={!selectedFile || !jobDescription || isAnalyzing}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 active:scale-[0.98]"
                        >
                            {isAnalyzing ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                            ) : (
                                <ChevronRight className="w-5 h-5" />
                            )}
                            {isAnalyzing ? "Analyzing Strategy..." : "Analyze Match"}
                        </button>
                    </div>
                ) : (
                    /* Analysis Results Presentation */
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <button
                            onClick={resetAnalysis}
                            className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors flex items-center gap-1 group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Analyze another resume
                        </button>

                        {/* Match Score Hero Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-indigo-100 font-medium mb-2 uppercase tracking-widest text-xs">Overall Match Score</p>
                                <h2 className="text-7xl md:text-8xl font-black text-white">{analysisResult.match_percentage}</h2>
                            </div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                        </div>

                        {/* Breakdown Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Matching Skills Section */}
                            <div className="bg-[#0a0a0a] border border-green-500/10 rounded-[2rem] p-8 transition-colors hover:border-green-500/20">
                                <div className="flex items-center gap-3 mb-6 text-green-400">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <h3 className="text-xl font-bold">Matching Skills</h3>
                                </div>
                                <ul className="space-y-3">
                                    {analysisResult.matches.map((skill, index) => (
                                        <li key={index} className="text-zinc-400 flex items-start gap-2 text-sm md:text-base">
                                            <span className="text-green-500 mt-1">•</span> {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Missing Requirements Section */}
                            <div className="bg-[#0a0a0a] border border-red-500/10 rounded-[2rem] p-8 transition-colors hover:border-red-500/20">
                                <div className="flex items-center gap-3 mb-6 text-red-400">
                                    <AlertCircle className="w-6 h-6" />
                                    <h3 className="text-xl font-bold">Missing Elements</h3>
                                </div>
                                <ul className="space-y-3">
                                    {analysisResult.missing.map((requirement, index) => (
                                        <li key={index} className="text-zinc-400 flex items-start gap-2 text-sm md:text-base">
                                            <span className="text-red-500 mt-1">•</span> {requirement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Optimization Suggestions */}
                        <div className="bg-[#0a0a0a] border border-indigo-500/10 rounded-[2rem] p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6 text-indigo-400">
                                <Lightbulb className="w-6 h-6" />
                                <h3 className="text-2xl font-bold">How to reach 100%?</h3>
                            </div>
                            <div className="space-y-4 text-zinc-300 leading-relaxed text-base md:text-lg">
                                {Array.isArray(analysisResult.suggestions) ? (
                                    analysisResult.suggestions.map((suggestion, index) => (
                                        <p key={index} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            {suggestion}
                                        </p>
                                    ))
                                ) : (
                                    <p className="bg-white/5 p-6 rounded-xl border border-white/5">
                                        {analysisResult.suggestions}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {errorMessage && (
                    <div className="mt-8 p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-center font-medium animate-in fade-in duration-300">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzerPage;
