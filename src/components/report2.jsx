import React, { useState, useCallback } from 'react'
import { Menu, Send, Loader2, PlusCircle, Trash2, Award, TrendingUp, Star, ChevronUp, ChevronDown } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const API_KEY = ""
const MAX_RETRIES = 100
const RETRY_DELAY = 1000

const genAI = new GoogleGenerativeAI(API_KEY)

const removeAsterisks = (text) => {
  return text.replace(/\*/g, '')
}

const SubjectCard = ({ subject, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const marks = parseInt(subject.marksObtained, 10)
  const totalMarks = parseInt(subject.totalMarks, 10)
  const percentage = totalMarks > 0 ? (marks / totalMarks) * 100 : 0
  const isGoodMark = percentage >= 70

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg border-l-4 border-indigo-500">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-200 flex items-center">
          {subject.name || `Subject ${index + 1}`}
        </h4>
        <div className="flex items-center space-x-2">
          <span className={`font-bold ${isGoodMark ? 'text-emerald-400' : 'text-amber-400'}`}>
            {marks}/{totalMarks} ({percentage.toFixed(2)}%)
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-200"
            aria-label={isExpanded ? "Collapse subject details" : "Expand subject details"}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-2 text-sm text-gray-300">
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
            <div 
              className={`h-2.5 rounded-full ${isGoodMark ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          {isGoodMark ? (
            <p className="text-emerald-400">Excellent performance in this subject.</p>
          ) : (
            <p className="text-amber-400">There's room for improvement in this subject.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function Report2() {
  const [subjects, setSubjects] = useState([{ name: '', marksObtained: '', totalMarks: '' }])
  const [studentName, setStudentName] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [reportCard, setReportCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addSubject = () => {
    if (subjects.length < 6) {
      setSubjects([...subjects, { name: '', marksObtained: '', totalMarks: '' }])
    }
  }

  const removeSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index)
    setSubjects(newSubjects)
  }

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects]
    newSubjects[index][field] = value
    setSubjects(newSubjects)
  }

  const generateReportCard = useCallback(async (retryCount = 0) => {
    setLoading(true)
    setError(null)

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const subjectsData = subjects.map(s => `${s.name}: ${s.marksObtained}/${s.totalMarks}`).join(', ')
    const prompt = `Generate a detailed, encouraging, and constructive report card for the parent of a student named ${studentName} in class ${studentClass}. The student's marks are as follows: ${subjectsData}. 

    Provide the following sections:
    1. Overall Assessment (5-6 sentences)
    2. Subject-wise Performance (2-3 sentences per subject)
    3. Areas of Excellence (3-4 points)
    4. Opportunities for Growth (3-4 points)
    5. Recommendations for Parents (4-5 practical suggestions)

    Use a respectful and informative tone. Provide insights into the student's performance that go beyond just the numerical grades. The tone should be supportive and focused on the student's development. Avoid using any emojis or excessive enthusiasm.

    Important: Do not use any asterisks, stars, bullet points, or any kind of formatting in your response. Use plain text only, with each point on a new line.`

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = removeAsterisks(response.text())
      setReportCard(text)
    } catch (error) {
      console.error("Error generating report card:", error)
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => generateReportCard(retryCount + 1), RETRY_DELAY)
      } else {
        setError("Failed to generate report card. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }, [studentName, studentClass, subjects])

  const handleSubmit = (e) => {
    e.preventDefault()
    generateReportCard()
  }

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
    <nav className="bg-teal-900 p-4 md:hidden random">
      <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </nav>
  )}


      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-300 mb-1">Student Name</label>
              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student's name"
                className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="studentClass" className="block text-sm font-medium text-gray-300 mb-1">Student Class</label>
              <input
                id="studentClass"
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Enter student's class"
                className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4 text-indigo-400">Subjects and Marks</h3>
          {subjects.map((subject, index) => (
            <div key={index} className="flex flex-wrap items-center mb-4 space-x-2">
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                placeholder="Subject name"
                className="flex-grow p-2 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 mb-2 md:mb-0"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={subject.marksObtained}
                  onChange={(e) => handleSubjectChange(index, 'marksObtained', e.target.value)}
                  placeholder="Marks"
                  className="w-20 p-2 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                />
                <span className="text-gray-400">/</span>
                <input
                  type="number"
                  value={subject.totalMarks}
                  onChange={(e) => handleSubjectChange(index, 'totalMarks', e.target.value)}
                  placeholder="Total"
                  className="w-20 p-2 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                />
                {subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="p-2 bg-red-800 text-red-200 rounded-full hover:bg-red-700 transition-colors"
                    aria-label={`Remove subject ${subject.name || index + 1}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {subjects.length < 6 && (
            <button
              type="button"
              onClick={addSubject}
              className="mb-4 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Subject
            </button>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin inline-block mr-2" />
                Generating Report Card...
              </>
            ) : (
              <>
                <Send className="mr-2" />
                Generate Report Card
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="bg-red-900 border-l-4 border-red-500 text-red-200 p-4 rounded-lg mb-4 max-w-2xl mx-auto">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {reportCard && (
          <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-2xl mb-8 max-w-4xl mx-auto">
            <div className="border-b-4 border-indigo-600 pb-4 mb-6">
              <h2 className="text-4xl font-bold mb-2 text-center text-indigo-400">{studentName}'s Report Card</h2>
              <div className="flex justify-center items-center space-x-2">
                <Award className="h-8 w-8 text-yellow-400" />
                <p className="text-2xl font-semibold text-gray-300">Class {studentClass}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-400 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Academic Performance
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {subjects.map((subject, index) => (
                  <SubjectCard
                    key={index}
                    subject={subject}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-400 flex items-center">
                <Star className="h-6 w-6 mr-2" />
                Detailed Assessment
              </h3>
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-inner">
                <div className="prose max-w-none text-gray-300">
                  {reportCard.split('\n\n').map((section, index) => (
                    <div key={index} className="mb-4">
                      {section.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2 text-lg">{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-400">This report card was generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        
        )}
      </main>
    </div>
  )
}