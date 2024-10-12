import React, { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Hanoi() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-teal-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            className="h-14 w-14 text-yellow-400"
            src="logo.png"
            alt="Soulace logo"
          />
          <h1 className="text-3xl font-bold random">Soulace</h1>
        </div>
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Play Tower of Hanoi!</h2>
          <iframe 
            src="https://tower-of-hanoi.github.io/" 
            title="Tower of Hanoi Game" 
            className="w-full h-[600px] border-none" 
            allowFullScreen
          />
        </section>
      </main>
    </div>
  )
}
