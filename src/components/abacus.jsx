import React from 'react';

function Abacus() {
  return (
    <>
    {/* <div className="min-h-screen bg-gray-900 text-white"> */}
      <header className="bg-teal-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            className="h-14 w-14 text-yellow-400"
           src="/logo.png" 
          >
          </img>
          <h1 className="text-3xl font-bold random">Soulace</h1>
        </div>
      </header>
    <div>
    <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Calculate with Abacus!</h2>
          <iframe 
            src="https://www.online-calculator.com/online-abacus/#google_vignette" 
            title="Abacus Calculator" 
            className="w-full h-[600px] border-none" 
            allowFullScreen
          />
        </section>
      </main>
    </div>
    </>
  );
}

export default Abacus;
