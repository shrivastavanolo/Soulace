import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

export default function Cantunsee() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Test Your Memory!</h2>
          <iframe 
            src="https://cantunsee.space/" 
            title="Can't Unsee Game" 
            className="w-full h-[600px] border-none" 
            allowFullScreen
          />
        </section>
      </main>
    </div>
  );
}
