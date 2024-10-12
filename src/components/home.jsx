import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Users, Sparkles, Brain, Rocket, Menu, X } from "lucide-react"
import { Routes, Route, Link } from 'react-router-dom';



export default function Home() {
  const [loginType, setLoginType] = useState(null)
  const [showSignup, setShowSignup] = useState(false)
  
  const loginRef = useRef(null)
  const signupRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogin = (type) => {
    setLoginType(type)
    setShowSignup(false)
    setTimeout(() => scrollToSection(loginRef), 100)
  }

  const handleSignup = () => {
    setShowSignup(true)
    setLoginType(null)
    setTimeout(() => scrollToSection(signupRef), 100)
  }

  return (

    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            className="h-14 w-14 text-yellow-400"
            src="/logo.png"
            alt="Soulace logo"
          />
          <h1 className="text-3xl font-bold random">Soulace</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                <span className="text-yellow-400">Where Education</span><br />
                <span className="text-turquoise-400">Meets Soul</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-gray-400 md:text-2xl">
                Soulace is an AI-powered educational platform that transforms learning into an exciting adventure. 
                We believe that education should be a joyful journey shared between parents and students, 
                fostering a love for knowledge that lasts a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
              
                <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors" onClick={() => handleLogin('student')}>
                  <Users ref={loginRef} className="mr-2 h-4 w-4" />
                  Login as Student
                </Button>

                <Button className="bg-green-500 text-gray-900 hover:bg-green-600 transition-colors" onClick={() => handleLogin('parent')}>
                  <Users className="mr-2 h-4 w-4" />
                  Login as Parent
                </Button>
                <Button variant="outline" className="bg-red-500 border-yellow-400 text-gray-900 hover:bg-red-600 hover:text-gray-900 transition-colors" onClick={handleSignup}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {loginType && (
          <section className="w-full py-12 bg-gray-800">
            <div className="container px-4 md:px-6 mx-auto">
              <h2  className="text-3xl font-bold text-center mb-8 text-turquoise-400">
                Login as {loginType === 'student' ? 'Student' : 'Parent'}
              </h2>
              <form  className="max-w-md mx-auto space-y-4">
                <Input placeholder="Email" type="email" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                <Input placeholder="Password" type="password" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                <Link to={loginType === 'student' ? '/student' : '/parent'} className="block w-full">
                <Button type="submit" className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors">
                  Login
                </Button>
                </Link>
              </form>
            </div>
          </section>
        )}


        {showSignup && (
          <section ref={signupRef} className="w-full py-12 bg-gray-800">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-turquoise-400">
                Sign Up for Soulace
              </h2>
              <form className="max-w-md mx-auto space-y-4">
                <Input placeholder="Full Name" type="text" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                <Input placeholder="Email" type="email" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                <Input placeholder="Password" type="password" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                <select className="w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md p-2">
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
                <Button type="submit" className="w-full bg-red-500 text-gray-900 hover:bg-turquoise-600 transition-colors">
                  Create Account
                </Button>
              </form>
            </div>
          </section>
        )}

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">Why Choose Soulace?</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center group">
                <div className="bg-gray-700 p-4 rounded-full mb-4 group-hover:bg-yellow-500 transition-colors">
                  <Brain className="h-12 w-12 text-yellow-500 group-hover:text-gray-900 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-turquoise-400 group-hover:text-yellow-400 transition-colors">AI-Powered Learning</h3>
                <p className="text-sm text-gray-400 mt-2">Personalized learning paths adapted to each student's unique needs and pace.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-gray-700 p-4 rounded-full mb-4 group-hover:bg-turquoise-500 transition-colors">
                  <Users className="h-12 w-12 text-turquoise-500 group-hover:text-gray-900 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-turquoise-400 group-hover:text-yellow-400 transition-colors">Parent-Student Connection</h3>
                <p className="text-sm text-gray-400 mt-2">Foster stronger bonds through shared learning experiences and progress tracking.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-gray-700 p-4 rounded-full mb-4 group-hover:bg-yellow-500 transition-colors">
                  <Rocket className="h-12 w-12 text-yellow-500 group-hover:text-gray-900 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-turquoise-400 group-hover:text-yellow-400 transition-colors">Engaging Content</h3>
                <p className="text-sm text-gray-400 mt-2">Interactive lessons, games, and challenges that make learning fun and memorable.</p>
              </div>
            </div>
          </div>
        </section>



        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">About Soulace</h2>
                <p className="text-gray-400 mb-4">
                  At Soulace, we're reimagining education for the digital age. Our platform combines cutting-edge AI technology 
                  with a deep understanding of how students learn best. We believe that learning should be a joyful, 
                  collaborative experience that brings families closer together.
                </p>
                <p className="text-gray-400">
                  Whether you're a student looking to excel in your studies or a parent wanting to support your child's 
                  educational journey, Soulace provides the tools, content, and community to make learning an adventure you'll love.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold mb-4 text-turquoise-400">Our Mission</h3>
                <p className="text-gray-400">
                  To create a world where every learner can discover their potential, pursue their passions, and develop a 
                  lifelong love for learning, supported by the power of AI and the warmth of human connection.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">Get in Touch</h2>
            <form className="max-w-md mx-auto space-y-4">
              <Input placeholder="Your Name" type="text" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
              <Input placeholder="Your Email" type="email" className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
              <textarea 
                placeholder="Your Message" 
                rows="4" 
                className="w-full bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              ></textarea>
              <Button type="submit" className="w-full bg-yellow-500 text-gray-900 hover:bg-turquoise-600 transition-colors">
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700 bg-gray-900">
        <p className="text-xs text-gray-400">© 2024 Soulace. All rights reserved.</p>
      </footer>
    </div>
  )
}