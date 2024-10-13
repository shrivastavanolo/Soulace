'use client'

import React, { useState, useRef } from 'react'
import { Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const schools = [
  { name: 'Aster Public School', location: 'New Delhi', type: 'Co-educational' },
  { name: 'Delhi Public School', location: 'New Delhi', type: 'Co-educational' },
  { name: 'St. Mary\'s School', location: 'Mumbai', type: 'All-girls' },
  { name: 'The Bishop\'s School', location: 'Pune', type: 'All-boys' },
]

export default function Schools() {
  const browseSchoolsRef = useRef(null)
  const addSchoolRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleLogout = () => {
    navigate('/');
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


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
        <section className="mb-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src="school.jpg" className="rounded-full w-full max-w-md mx-auto"
              width="400"
              height="800"></img>
              </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Welcome to Soulace School Connect</h2>
          <p className="text-xl mb-6 text-gray-300">Discover and connect with schools across India</p>
          </div>
          
        </section>
        <section ref={browseSchoolsRef} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Browse Schools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schools.map((school, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg ">
                <div className="p-6 bg-gray-800 rounded-lg p-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/20 group-hover:-translate-y-1 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{school.name}</h3>
                  <p className="text-gray-400">Location: {school.location}</p>
                  <p className="text-gray-400">Type: {school.type}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section ref={addSchoolRef} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Add Your School
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <form className="space-y-4">
                  <input type="text" placeholder="School Name" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  <input type="email" placeholder="Email" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  <input type="tel" placeholder="Phone" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  <textarea placeholder="Message" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32"></textarea>
                  <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send
                  </button>
                </form>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Why Add Your School?</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Increase visibility to potential students and parents</li>
                  <li>Showcase your school's unique features and achievements</li>
                  <li>Connect with the broader educational community</li>
                  <li>Enhance your online presence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
