AI Meeting Summarizer
An AI-powered, full-stack application designed to instantly summarize meeting transcripts. Users can upload a text transcript or a PDF file, provide a custom prompt, and generate a structured, editable summary. The final summary can be saved and shared with colleagues via email.



How it Works
Input Transcript: Users can either paste a raw text transcript directly into a textarea or upload a PDF document containing the meeting notes.

Provide a Prompt: A custom instruction is given to the AI to guide the summarization process (e.g., "Summarize in bullet points for executives," or "Extract all action items and assignees").

Generate Summary: The application sends the transcript and prompt to a backend server, which uses the Groq AI API to generate a summary.

Review & Edit: The AI-generated summary is displayed in an editable textarea, allowing the user to make any necessary changes.

Share via Email: The user can enter a list of recipient email addresses to share the final summary directly from the application.

View History: All generated summaries are saved in a MongoDB database and can be viewed in the "Recent Summaries" section, allowing users to reload previous transcripts and prompts.

Tech Stack
This project is a monorepo with a separate frontend and backend.

Frontend
Framework: Next.js (React)

Styling: Tailwind CSS

Deployment: Vercel or Netlify

Backend
Framework: Node.js with Express.js

Database: MongoDB with Mongoose for ODM

AI Service: Groq API

File Handling: Multer for file uploads and pdf-parse for PDF text extraction.

Email Service: Nodemailer

Deployment: Render or Heroku

Environment Setup
To run this project locally, you will need to set up both the backend and frontend environments.

1. Clone the Repository
git clone https://github.com/your-username/ai-meeting-summarizer.git
cd ai-meeting-summarizer

2. Backend Setup
Navigate to the backend directory and install the dependencies.

cd backend
npm install

Create a .env file in the backend directory and add the following environment variables.

# Groq API Key
GROQ_API_KEY=your_groq_api_key_here

# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string_here

# Server Port
PORT=5001

# Nodemailer SMTP Credentials (use Ethereal for testing or a real provider)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=user@example.com
EMAIL_PASS=your-app-password

3. Frontend Setup
Navigate to the frontend directory (from the root) and install the dependencies.

cd ../frontend  # or your frontend folder name
npm install

Create a .env.local file in the frontend directory and add the following variable to point to your local backend server.

NEXT_PUBLIC_BACKEND_URL=http://localhost:5001

Running the Application
You need to run both the backend and frontend servers simultaneously in separate terminal windows.

Start the Backend Server
In the backend directory:

npm start 
# Or use: node index.js

The backend server will be running on http://localhost:5001.

Start the Frontend Development Server
In the frontend directory:

npm run dev

The frontend application will be available at http://localhost:3000.
