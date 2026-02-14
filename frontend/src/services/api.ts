import axios from "axios";

const CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
    HEADERS: {
        "Content-Type": "multipart/form-data",
    }
};

/**
 * Fetches relevant job opportunities based on the provided resume.
 * @param resumeFile - The resume PDF file to analyze.
 * @returns A list of matching jobs.
 */
export const findJobs = async (resumeFile: File) => {
    const payload = new FormData();
    payload.append("resume", resumeFile);

    try {
        const response = await axios.post(`${CONFIG.BASE_URL}/find-jobs`, payload, {
            headers: CONFIG.HEADERS,
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error("API Error (findJobs):", error);
        throw error;
    }
}

/**
 * Analyzes a resume against a specific job description.
 * @param resumeFile - The resume PDF file.
 * @param jobDescription - The job description text.
 * @returns An analysis object with match percentage and feedback.
 */
export const analyzeResume = async (resumeFile: File, jobDescription: string) => {
    const payload = new FormData();
    payload.append("resume", resumeFile);
    payload.append("job_description", jobDescription);

    try {
        const response = await axios.post(`${CONFIG.BASE_URL}/analyze`, payload, {
            headers: CONFIG.HEADERS,
        });

        if (response.status !== 200) {
            throw new Error(`Failed to analyze resume: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error("API Error (analyzeResume):", error);
        throw error;
    }
}
