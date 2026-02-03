import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
     
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-sm border-b border-slate-700/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} aria-label="Go to Second Brain home" className="p-0 focus:outline-none">
              <img src={logo} alt="Second Brain logo" className="w-10 h-10" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">Second Brain</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-slate-300 hover:text-white transition-colors duration-300 font-medium"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Hero Section */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Your Digital
            <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Second Brain
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Save, organize, and instantly access your favorite YouTube videos and Twitter posts in one beautiful place. Build your personal knowledge vault.
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-purple-500/50 hover:-translate-y-1"
          >
            <span>Start Building Your Brain</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 w-full">
          {/* Feature 1 */}
          <div className="group relative p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/40 hover:border-purple-500/60 rounded-2xl transition-all duration-400 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-900/0 group-hover:from-purple-600/10 group-hover:to-purple-900/5 transition-all duration-400 rounded-2xl" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl flex items-center justify-center mb-4 border border-red-500/30 group-hover:border-red-500/60 transition-colors">
                <span className="text-4xl">🎥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">YouTube Videos</h3>
              <p className="text-slate-400">Effortlessly save and organize your favorite YouTube videos with automatic previews and quick access.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/40 hover:border-purple-500/60 rounded-2xl transition-all duration-400 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-900/0 group-hover:from-purple-600/10 group-hover:to-purple-900/5 transition-all duration-400 rounded-2xl" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30 group-hover:border-blue-500/60 transition-colors">
                <span className="text-4xl">𝕏</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Twitter Posts</h3>
              <p className="text-slate-400">Capture tweets that inspire you and keep them organized for future reference and inspiration.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/40 hover:border-purple-500/60 rounded-2xl transition-all duration-400 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-900/0 group-hover:from-purple-600/10 group-hover:to-purple-900/5 transition-all duration-400 rounded-2xl" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30 group-hover:border-purple-500/60 transition-colors">
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Organize & Access</h3>
              <p className="text-slate-400">Create your personal knowledge library with instant access to everything you save. Never lose important content again.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full bg-gradient-to-r from-slate-800/40 to-slate-900/40 border border-slate-700/30 rounded-2xl p-12 mb-20 backdrop-blur-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-purple-400 mb-2">∞</div>
              <p className="text-slate-400">Save Unlimited Content</p>
            </div>
            <div>
              <div className="text-5xl font-black text-purple-400 mb-2">⚡</div>
              <p className="text-slate-400">Instant Access Anytime</p>
            </div>
            <div>
              <div className="text-5xl font-black text-purple-400 mb-2">🔒</div>
              <p className="text-slate-400">Your Data, Secure & Private</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl">
          <h3 className="text-4xl font-bold mb-6">Ready to Build Your Second Brain?</h3>
          <p className="text-lg text-slate-300 mb-8">
            Join thousands of knowledge seekers who are organizing their digital lives with Second Brain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            >
              Sign Up Free
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 border border-purple-500/50 hover:border-purple-400 text-purple-300 hover:text-purple-200 rounded-lg font-semibold transition-all duration-300"
            >
              Already Have an Account?
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-slate-700/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm">
          <p>© 2026 Second Brain. Your personal knowledge vault in the cloud.</p>
        </div>
      </footer>
    </div>
  )
}
