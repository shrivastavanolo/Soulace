import React, { useState, useRef } from 'react'
import { Menu, FileText, Gamepad2, HelpCircle, School, Video } from 'lucide-react'
import {  LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"


const cards = [
  { title: 'Abacus', icon: FileText, description: 'Challenge your mind and master the ancient art of rapid calculations with just your fingers and beads!' },
  { title: 'Cant Unsee', icon: Gamepad2, description: 'Test your logic and strategy as you race to solve this timeless puzzle by perfectly stacking discs in record time!' },
  { title: 'Tower of Hanoi', icon: School, description: 'Dive into the world of colorful twists and turns – can you solve the ultimate 3D puzzle faster than anyone?' },
  { title: 'Rubix Cube', icon: Video, description: 'Sharpen your eye for design in this addictive game where spotting the smallest details makes all the difference!' },
]

export default function Games() {
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
        <section ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link to={`/${card.title.split(' ')[0].toLowerCase()}`} key={card.title}>
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