# Resume Analyzer (Frontend)

An AI-powered application to analyze resumes against job descriptions and find matching jobs.

## Project Structure
- `/frontend`: Next.js frontend application.
- `.env.example`: Environment variables template for the frontend.

## Getting Started

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `frontend` folder.
   - You can use `.env.example` as a template:
     ```bash
     cp .env.example .env
     ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Key Features
- **Resume Matcher**: Compute match percentage against job descriptions.
- **Skill Gap Analysis**: Identify missing requirements.
- **Job Recommendations**: Find relevant roles based on your profile.

## Deployment
The easiest way to deploy is via [Vercel](https://vercel.com/new).
