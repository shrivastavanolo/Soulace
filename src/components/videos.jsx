import React, { useState, useEffect, useRef, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Menu, Send, Loader2, Upload, MessageSquare, Bot, User, ArrowLeft } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const API_KEY = "";
const MAX_RETRIES = 100;
const RETRY_DELAY = 1000;

const genAI = new GoogleGenerativeAI(API_KEY);

export default function Doubts() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showChatbot, setShowChatbot] = useState(false);
    const [userQuery, setUserQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatContainerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleFileChange = (e) => {
        console.log('File selected:', e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload an image or text file.');
            return;
        }

        setLoading(true);
        setError('');
        setShowChatbot(false);
        setChatHistory([]);

        const fileType = file.type;
        console.log('Processing file of type:', fileType);

        try {
            let text = '';

            if (fileType.startsWith('image/')) {
                text = await processImage(file);
            } else if (fileType === 'text/plain') {
                text = await processTextFile(file);
            } else {
                alert('Unsupported file type. Please upload an image or text file.');
                setLoading(false);
                return;
            }

            console.log('Extracted text:', text);
            await sendTextToApi(text);
            setShowChatbot(true);
            setChatHistory([{ role: 'bot', content: 'Hello! I have processed your file. How can I assist you?' }]);
        } catch (error) {
            setError('Failed to process the file. Please try again.');
            console.error('Error in handleSubmit:', error);
        } finally {
            setLoading(false);
        }
    };

    const processImage = async (file) => {
        console.log('Processing image...');
        return new Promise((resolve, reject) => {
            Tesseract.recognize(
                file,
                'eng',
                {
                    logger: (progress) => console.log('Tesseract progress:', progress),
                }
            ).then(({ data: { text } }) => {
                console.log('Image processed successfully');
                resolve(text);
            }).catch((error) => {
                console.error('Error processing the image:', error);
                reject(error);
            });
        });
    };

    const processTextFile = (file) => {
        console.log('Processing text file...');
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log('Text file read successfully');
                resolve(e.target.result);
            };
            reader.onerror = (error) => {
                console.error('Error reading text file:', error);
                reject(error);
            };
            reader.readAsText(file);
        });
    };

    const sendTextToApi = async (text) => {
        const apiUrl = "https://free-ap-south-1.cosmocloud.io/development/api/ai/rag";
        const headers = {
            "Content-Type": "application/json",
            "projectId": "66f8007659c9b368f802a635",
            "environmentId": "66f8007659c9b368f802a636"
        };

        const chunkSize = 150;
        for (let i = 0; i < text.length; i += chunkSize) {
            const chunk = text.slice(i, i + chunkSize).trim();
            if (chunk) {
                const body = JSON.stringify({ text: chunk });
                console.log('Sending to API:', body);
                try {
                    const response = await fetch(apiUrl, {
                        method: "POST",
                        headers: headers,
                        body: body
                    });

                    if (!response.ok) {
                        console.error(`Failed to send chunk:`, response.statusText);
                    }
                } catch (error) {
                    console.error(`Error posting chunk:`, error);
                }
            }
        }
    };

    const handleChatSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!userQuery.trim()) return;

        setLoading(true);
        setChatHistory(prev => [...prev, { role: 'user', content: userQuery }]);
        setUserQuery('');

        try {
            // Send user query to Cosmo API
            const cosmoResponse = await sendToCosmoApi(userQuery);
            console.log('Cosmo API response:', cosmoResponse);

            // Process Cosmo response with Gemini
            const geminiResponse = await processWithGemini(cosmoResponse);
            console.log('Gemini response:', geminiResponse);

            setChatHistory(prev => [...prev, { role: 'bot', content: geminiResponse }]);
        } catch (error) {
            console.error('Error in chat processing:', error);
            setChatHistory(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error while processing your request.' }]);
        } finally {
            setLoading(false);
        }
    }, [userQuery]);

    const sendToCosmoApi = async (query, limit = 3) => {
        const apiUrl = "https://free-ap-south-1.cosmocloud.io/development/api/ai/rag";
        const headers = {
            "Content-Type": "application/json",
            "projectId": "66f8007659c9b368f802a635",
            "environmentId": "66f8007659c9b368f802a636"
        };

        const urlWithParams = `${apiUrl}?query=${encodeURIComponent(query)}&limit=${limit}`;

        try {
            const response = await fetch(urlWithParams, {
                method: "GET",
                headers: headers
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Response:", jsonResponse);
                return jsonResponse;
            } else {
                console.error(`Failed to send request:`, response.statusText);
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };

    const processWithGemini = async (cosmoResponse) => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Based on this information: ${JSON.stringify(cosmoResponse)}, please provide a helpful and concise response.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    };

  const handleLogout = () => {
    navigate('/');
  };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-teal-700 p-4 flex justify-between items-center">
        <Link to="/student" className="flex items-center space-x-2">
          <img
            className="h-14 w-14 text-yellow-400"
            src="/logo.png"
            alt="Soulace logo"
          />
          <h1 className="text-3xl font-bold random">Soulace</h1>
        </Link>
        <nav className="hidden md:flex space-x-4 items-center random">
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </nav>
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>
      {isMenuOpen && (
        <nav className="bg-teal-700 p-4 md:hidden random">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </nav>
      )}

            <main className="container mx-auto px-4 py-8">
                {!showChatbot ? (
                    <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-200 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">🕵️ Doubt Solver Bot</h2>
                        <div className="mb-4">
                            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
                                Upload Image or Text File
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all duration-300">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-400">Image or Text file (MAX. 800x400px)</p>
                                    </div>
                                    <input id="file-upload" type="file" accept=".txt,image/*" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin inline-block mr-2" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2" />
                                    Process File
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto overflow-hidden">
                        <div className="bg-teal-700 p-4 flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                                <MessageSquare className="h-6 w-6 mr-2" />
                                Doubt Solver Bot
                            </h3>
                            <button
                                onClick={() => setShowChatbot(false)}
                                className="text-white hover:text-gray-200 transition-colors"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="h-6 w-6" />
                            </button>
                        </div>
                        <div ref={chatContainerRef} className="h-96 overflow-y-auto p-4 space-y-4">
                            {chatHistory.map((message, index) => (
                                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-3/4 p-3 rounded-lg ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                        <div className="flex items-center mb-1">
                                            {message.role === 'user' ? <User className="h-4 w-4 mr-2" /> : <Bot className="h-4 w-4 mr-2" />}
                                            <span className="font-semibold">{message.role === 'user' ? 'You' : 'Bot'}</span>
                                        </div>
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-700">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                    placeholder="Ask a question..."
                                    className="flex-grow p-2 bg-gray-700 rounded-l-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-300 ease-in-out flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
                                    <span className="sr-only">Send message</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900 border-l-4 border-red-500 text-red-200 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}
            </main>
        </div>
    );
}