import React, { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Cantunsee() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-teal-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            className="h-14 w-14 text-yellow-400"
            src="/logo.png"
            alt="Soulace logo"
          />
          <h1 className="text-3xl font-bold random">Soulace</h1>
        </div>
      </header>
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
