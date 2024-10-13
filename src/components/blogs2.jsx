'use client'

import React, { useState } from 'react'
import { MessageCircle, ThumbsUp, Send, ChevronDown, ChevronUp, User } from 'lucide-react'
import { Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const initialForumPosts = [
  {
    id: 1,
    author: 'Jane Doe',
    avatar: '/placeholder.svg?height=40&width=40',
    content: `What are your thoughts on the new curriculum changes? I've been reviewing the proposed modifications, and I'm particularly interested in how they might affect our children's learning experience and future academic prospects.

    On one hand, I appreciate the emphasis on critical thinking and problem-solving skills. However, I'm concerned about the potential reduction in traditional subject matter. I'd love to hear other parents' perspectives on this balance between innovative learning approaches and fundamental knowledge.`,
    likes: 15,
    comments: [
      { id: 1, author: 'John Smith', content: 'I think they’re generally positive, but I’m concerned about the increased workload.' },
      { id: 2, author: 'Emily Brown', content: 'I appreciate the focus on practical skills, but I hope they don’t neglect the fundamentals.' }
    ],
    timestamp: '2 hours ago',
    liked: false
  },
  {
    id: 2,
    author: 'John Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    content: `Looking for recommendations on after-school programs in Delhi. Any suggestions? My children are interested in a mix of academic enrichment and creative activities, and I’m hoping to find something that can cater to both these needs.

    Ideally, I’m looking for programs that offer a balance of subjects like math and science tutoring, along with arts and music classes. It would be great if the program also incorporates some physical activities or sports. Has anyone had positive experiences with comprehensive after-school programs in the area?`,
    likes: 7,
    comments: [],
    timestamp: '4 hours ago',
    liked: false
  },
  {
    id: 3,
    author: 'Priya Sharma',
    avatar: '/placeholder.svg?height=40&width=40',
    content: `How are parents handling the transition to online learning? With the recent shift to digital platforms, I’m curious about the strategies other families are using to ensure their children stay engaged and motivated during virtual classes.

    In our household, we’ve set up a dedicated study area and implemented a structured daily routine to mimic the school environment as much as possible. However, we’re still facing challenges with maintaining focus during long online sessions. I’d love to hear about any successful techniques or tools other parents have discovered to make this transition smoother for their kids.`,
    likes: 23,
    comments: [],
    timestamp: '1 day ago',
    liked: false
  }
]

export default function Blogs2() {
  const [forumPosts, setForumPosts] = useState(initialForumPosts)
  const [newPost, setNewPost] = useState('')
  const [showComments, setShowComments] = useState({})
  const [newComments, setNewComments] = useState({})

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (newPost.trim() === '') return

    const newForumPost = {
      id: forumPosts.length + 1,
      author: 'Current User',
      avatar: '/placeholder.svg?height=40&width=40',
      content: newPost,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      liked: false
    }

    setForumPosts([newForumPost, ...forumPosts])
    setNewPost('')
  }

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault()
    if (!newComments[postId] || newComments[postId].trim() === '') return

    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { id: post.comments.length + 1, author: 'Current User', content: newComments[postId] }
          ]
        }
      }
      return post
    })

    setForumPosts(updatedPosts)
    setNewComments(prev => ({ ...prev, [postId]: '' }))
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const handleLike = (postId) => {
    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        }
      }
      return post
    })
    setForumPosts(updatedPosts)
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
        <h2 className="text-2xl font-semibold mb-6">Blogs & Discussions</h2>
        <p className="mb-6 text-gray-400">  Welcome to the Parents' Hub! Here, you can discuss anything related to your children's education, share insights, ask questions, and connect with other parents who are going through similar experience.</p>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Create a New Post</h3>
          <form onSubmit={handlePostSubmit}>
            <textarea
              className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4"
              rows={4}
              placeholder="Share your thoughts or ask a question..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Post
            </button>
          </form>
        </div>
        <div className="space-y-6">
          {forumPosts.map((post) => (
            <div key={post.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <User className="w-10 h-10 rounded-full mr-4"></User>
                <div>
                  <h4 className="font-semibold">{post.author}</h4>
                  <p className="text-gray-400 text-sm">{post.timestamp}</p>
                </div>
              </div>
              <p className="mb-4 whitespace-pre-line">{post.content}</p>
              <div className="flex items-center space-x-4 text-gray-400">
                <button
                  className={`flex items-center space-x-1 hover:text-white ${post.liked ? 'text-red-500' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp size={18} />
                  <span>{post.likes}</span>
                </button>
                <button
                  className="flex items-center space-x-1 hover:text-white"
                  onClick={() => toggleComments(post.id)}
                >
                  <MessageCircle size={18} />
                  <span>{post.comments.length}</span>
                  {showComments[post.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              {showComments[post.id] && (
                <div className="mt-4 space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-700 rounded p-3">
                      <p className="font-semibold">{comment.author}</p>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                  <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="mt-4">
                    <textarea
                      className="w-full bg-gray-700 text-white rounded-lg p-3 mb-2"
                      rows={2}
                      placeholder="Add a comment..."
                      value={newComments[post.id] || ''}
                      onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Comment
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
