"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Helper component for Icons
const IconClipboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
  </svg>
);

const IconSend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5  transition-transform group-hover:translate-x-1">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const IconSparkles = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:rotate-12">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

const IconHistory = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
);

const IconLoad = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const IconFile = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg> );


// Component: UploadForm
function UploadForm({ transcript, setTranscript, prompt, setPrompt, onSubmit, isLoading, selectedFile, setSelectedFile }) {
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.01]">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">1. Input Transcript & Prompt</h2>
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="mb-4">
          <label htmlFor="transcriptFile" className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF Transcript
          </label>
          <div className="mt-2 flex items-center justify-center w-full">
            <label htmlFor="transcriptFile" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IconFile />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF file only</p>
              </div>
              <input id="transcriptFile" type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
            </label>
          </div>
          {selectedFile && <p className="text-sm text-gray-600 mt-2">Selected file: {selectedFile.name}</p>}
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white/60 px-2 text-sm text-gray-500">OR</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-2">
            Paste Transcript
          </label>
          <textarea
            id="transcript"
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm bg-white text-gray-900"
            placeholder="Paste your meeting notes here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Custom Instruction / Prompt
          </label>
          <input
            type="text"
            id="prompt"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm bg-white text-gray-900"
            placeholder="e.g., 'Summarize in bullet points for executives'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="group w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              
              <span>Generate Summary</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Component: SummaryDisplay
// --- SummaryDisplay ---
// --- inside SummaryDisplay ---
function SummaryDisplay({ summary, setSummary }) {
  const [showToast, setShowToast] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // auto hide after 2s
  };

  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.01] relative">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">2. Review & Edit Summary</h2>
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-gray-200 relative">
        <div className="relative">
          <textarea
            rows={12}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm bg-white text-gray-900 pr-12"
            placeholder="AI-generated summary will appear here..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          {summary && (
            <button
              onClick={handleCopyToClipboard}
              className="absolute top-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition shadow"
              title="Copy to Clipboard"
            >
              <IconClipboard />
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="absolute top-2 right-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md text-sm animate-fadeIn">
           Summary copied!
        </div>
      )}
    </div>
  );
}



// Component: ShareControls
function ShareControls({ summary, recipients, setRecipients, onShare, isSharing, shareStatus }) {
  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.01]">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">3. Share Summary</h2>
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="mb-4">
          <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Email Addresses (comma-separated)
          </label>
          <input
            type="email"
            id="recipients"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition shadow-sm bg-white text-gray-900"
            placeholder="e.g., colleague1@example.com, manager@example.com"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
        </div>
        <button
          onClick={onShare}
          disabled={!summary.trim() || !recipients.trim() || isSharing}
          className="group w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isSharing ? (
            <>
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <IconSend />
              <span>Share via Email</span>
            </>
          )}
        </button>
        {shareStatus.message && (
          <p className={`mt-4 text-sm text-center font-medium ${shareStatus.success ? 'text-green-700' : 'text-red-700'}`}>
            {shareStatus.message}
          </p>
        )}
      </div>
    </div>
  );
}

// Component: HistoryDisplay
// --- HistoryDisplay ---
function HistoryDisplay({ history, isLoading, onLoadTranscript }) {
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  if (isLoading) {
    return (
      <div className="w-full text-center p-6">
        <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading History...</p>
      </div>
    );
  }

  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.01]">
      <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center gap-2">4. Recent Summaries</h2>
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No history found. Generate a summary to see it here.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {history.map((item) => (
              <div key={item._id} className="bg-white/50">
                <button
                  onClick={() => toggleExpand(item._id)}
                  className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition rounded-md"
                >
                  <div>
                    <p className="font-semibold text-blue-800">{item.prompt}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  <span
                    className={`transform transition-transform text-gray-600 ${
                      expandedId === item._id ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedId === item._id && (
                  <div className="p-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-2 text-gray-700">Summary:</h4>
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                      {item.summary}
                    </pre>
                    <button
                      onClick={() => onLoadTranscript(item)}
                      className="mt-4 flex items-center text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg transition"
                    >
                      <IconLoad />
                      Load this Transcript & Prompt
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// Main Page
export default function SummarizerPage() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState('');
  const [shareStatus, setShareStatus] = useState({ success: false, message: '' });
  const [history, setHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
        const response = await fetch(`${backendUrl}/api/history`);
        if (!response.ok) throw new Error('Failed to fetch history');
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setIsHistoryLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleGenerateSummary = async () => {
    if (!prompt.trim() && !transcript.trim() && !selectedFile) {
        setError("Please provide a transcript or a file, and a prompt.");
        return;
    }
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('transcript', transcript);
      if (selectedFile) {
        formData.append('transcriptFile', selectedFile);
      }
      
      const response = await fetch(`${backendUrl}/api/summarize`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);

      // Refresh history after generating a new summary
      const historyResponse = await fetch(`${backendUrl}/api/history`);
      const newHistory = await historyResponse.json();
      setHistory(newHistory);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate summary: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    setShareStatus({ success: false, message: '' });

    const recipientList = recipients.split(',').map(email => email.trim()).filter(Boolean);
    if (recipientList.length === 0) {
      setShareStatus({ success: false, message: 'Please enter at least one valid email.' });
      setIsSharing(false);
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
      const response = await fetch(`${backendUrl}/api/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, recipients: recipientList }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email.');
      }

      setShareStatus({ success: true, message: 'Email sent successfully!' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setShareStatus({ success: false, message: `Error: ${errorMessage}` });
    } finally {
      setIsSharing(false);
    }
  };

  const handleLoadTranscript = (item) => {
    setTranscript(item.transcript);
    setPrompt(item.prompt);
    setSummary(item.summary);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx global>{`
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
      <main className="relative min-h-screen flex flex-col items-center justify-start sm:px-6 md:px-8 bg-gray-50 font-sans overflow-hidden">
        {/* Background Gradient Shapes */}
        <div className="absolute -top-20 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute -top-20 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

        <div className="z-10 w-full max-w-4xl flex flex-col items-center">
          <div className="w-full -top-20 text-center mb-10">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center whitespace-nowrap">
  AI Meeting Summarizer
</h1>

            <p className="text-lg text-gray-600 mt-4">
                Instantly summarize and share your meeting notes.
            </p>
          </div>

          <div className="w-full max-w-3xl space-y-8">
            <UploadForm
              transcript={transcript}
              setTranscript={setTranscript}
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerateSummary}
              isLoading={isLoading}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <SummaryDisplay
              summary={summary}
              setSummary={setSummary}
            />
            <ShareControls
              summary={summary}
              recipients={recipients}
              setRecipients={setRecipients}
              onShare={handleShare}
              isSharing={isSharing}
              shareStatus={shareStatus}
            />
            <HistoryDisplay
              history={history}
              isLoading={isHistoryLoading}
              onLoadTranscript={handleLoadTranscript}
            />
          </div>
        </div>
      </main>
    </>
  );
}
