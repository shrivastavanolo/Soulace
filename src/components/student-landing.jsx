import React, { useState, useRef } from 'react'
import { Menu, FileText, Gamepad2, LogOut, HelpCircle, School, Video } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"




const cards = [
  { title: 'Report', icon: FileText, description: 'View and generate student progress reports' },
  { title: 'Games', icon: Gamepad2, description: 'Educational games to make learning fun' },
  { title: 'Quiz', icon: HelpCircle, description: 'Interactive quizzes to test knowledge' },
  { title: 'School', icon: School, description: 'Manage curriculum in collaboration with schools' },
  { title: 'Doubts', icon: Video, description: 'AI Doubt Solver Bot for Images and Text' },
]

export default function Studentlanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cardsRef = useRef(null)
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Make Learning Soulful with{' '}
            <span className="text-teal-400">Soulace!</span>
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            Have Spirited Studies with interactive lessons, games, and quizzes.
          </p>
          <button 
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition-colors text-lg"
            onClick={scrollToCards}
          >
            Get Started
          </button>
        </section>
        <section className="mb-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/child.jpg"
              alt="Students learning together"
              className="rounded-full w-full max-w-md mx-auto"
              width="400"
              height="800"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg text-gray-300">
              At Soulace, we believe in making learning an exciting journey. Our platform offers a diverse range of interactive content, from engaging games to thought-provoking quizzes, all designed to make your educational experience both fun and effective. Join us in revolutionizing the way you learn!
            </p>
          </div>
        </section>
        <section ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link to={`/${card.title.toLowerCase()}`} key={card.title}>
            <div key={card.title} className="relative group">
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/20 group-hover:-translate-y-1 h-full flex flex-col">
                <card.icon className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400 mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.description}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </section>
      </main>
      
    </div>

  )
}