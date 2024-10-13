import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Menu, Send, Loader2 } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_KEY = ""
const MAX_RETRIES = 100
const RETRY_DELAY = 1000

const Card = ({ title, content }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-300">{content}</p>
  </div>
)

const Button = ({ children, onClick, className, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
)

const Input = ({ value, onChange, onKeyPress, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    placeholder={placeholder}
    className="w-full p-3 bg-gray-800 rounded-full border border-gray-700 focus:ring-2 focus:ring-teal-500 text-white"
  />
)

export default function Tips2() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const chatRef = useRef(null)
  const chatContainerRef = useRef(null)

  const genAI = new GoogleGenerativeAI(API_KEY)

  const generateResponse = useCallback(async (retryCount = 0) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const prompt = `You are Charlie, an AI assistant specializing in parenting advice. Provide a helpful and concise response to the following question or statement about parenting: "${input}". Do not use any markdown formatting in your response.`
    
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }])
      setError(null)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => generateResponse(retryCount + 1), RETRY_DELAY)
      } else {
        setError("Failed to generate response. Please try again.")
        setLoading(false)
      }
    }
  }, [input, genAI])

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }])
      setLoading(true)
      setError(null)
      generateResponse()
      setInput('')
    }
  }, [input, generateResponse])

  useEffect(() => {
    if (showChat && messages.length === 0) {
      setInput("Hi, I'm looking for parenting advice.")
      handleSend()
    }
  }, [showChat, messages.length, handleSend])

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (showChat) {
      chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showChat])

  const handleLogout = () => {
    navigate('/');
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <header className="bg-teal-900 p-4 flex justify-between items-center">
    <Link to="/parent" className="flex items-center space-x-2">
      <img
        className="h-14 w-14 text-yellow-400"
        src="/logo.png"
        alt="Soulace logo"
      />
      <h1 className="text-3xl font-bold random">Soulace</h1>
    </Link>

    <button 
      className="md:hidden" 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  </header>
  {/* {isMenuOpen && (
    // <nav className="bg-teal-900 p-4 md:hidden random">
    //   <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
    //     <LogOut className="mr-2 h-4 w-4" />
    //     Log out
    //   </Button>
    // </nav>
  )} */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Expert Parenting Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            title="Consistency is Key"
            content="Establish clear routines and stick to them consistently. This helps children feel secure and understand expectations. Create a structured daily schedule for meals, bedtime, and activities. Be patient and persistent, as it may take time for children to adapt to new routines."
          />
          <Card
            title="Positive Reinforcement"
            content="Praise good behavior and efforts to encourage repetition. Be specific in your praise, focusing on the action rather than general compliments. Use a reward system for major achievements, but be careful not to overuse it. Remember, your attention and words can be the most powerful reinforcement."
          />
          <Card
            title="Active Listening"
            content="Give your child your full attention when they speak. This builds trust and improves communication. Make eye contact, put away distractions, and show genuine interest in what they're saying. Reflect back what you've heard to ensure understanding and validate their feelings."
          />
        </div>

        {!showChat && (
          <Button onClick={() => setShowChat(true)} className="w-full max-w-md mx-auto block">
            Chat with Charlie
          </Button>
        )}

        {showChat && (
          <div ref={chatContainerRef} className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Chat with Charlie</h3>
            <div ref={chatRef} className="h-96 overflow-y-auto mb-4 pr-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-teal-600' : 'bg-gray-700'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 px-4 py-2 rounded-lg">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                </div>
              )}
            </div>
            {error && (
              <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
                {error}
              </div>
            )}
            <div className="flex items-center mt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question about parenting..."
              />
              <Button onClick={handleSend} className="ml-2 px-4" disabled={loading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}