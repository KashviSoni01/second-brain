import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Login() {
  const navigate = useNavigate()

  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
  const handleLogin = async () => {
    try {
      setError(null)
      setLoading(true)
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login success:", data)
        navigate("/home") 
      } else {
        setError(data.message || "Login failed")
      }

    } catch (err) {
      console.error("Login error", err)
      setError("Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden flex items-center justify-center px-6">
    
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      </div>
     
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(700px circle at 50% 40%, rgba(88,28,135,0.04), transparent 60%)' }} />

      <div className="group relative border border-slate-800/50 rounded-2xl shadow-2xl w-[460px] min-h-[660px] bg-gradient-to-br from-slate-900/70 to-slate-900/60 backdrop-blur-xl flex flex-col items-center space-y-6 md:space-y-7 px-9 py-9 transition-transform duration-300 hover:scale-[1.02] hover:border-purple-500/30 hover:shadow-purple-500/15 overflow-hidden ring-1 ring-slate-700/50">

       
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-purple-900/0 group-hover:from-purple-600/3 group-hover:to-purple-900/2 transition-all duration-300" />
       
        <div className="pointer-events-none absolute -inset-8 opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(168,85,247,0.03), transparent 70%)' }} />

       
        <div className="w-full bg-gradient-to-r from-slate-950/50 to-slate-900/30 border border-slate-800/40 rounded-lg px-6 py-4 flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-purple-200 bg-clip-text text-transparent">
            Second Brain
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          Login to Your Account
        </h2>

        {/* Error Banner */}
        {error && (
          <div className="w-full rounded-lg border border-red-500/40 bg-red-900/20 text-red-300 text-sm px-4 py-3">
            {error}
          </div>
        )}

        {/* Username */}
        <div className="flex flex-col w-full">
          <label className="text-xs font-medium text-slate-300 mb-2">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"/></svg>
            </span>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); if (error) setError(null); }}
              minLength={3}
              maxLength={8}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950/50 border border-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Username must be 3–8 characters.</p>
        </div>

        {/* Password */}
        <div className="flex flex-col w-full">
          <label className="text-xs font-medium text-slate-300 mb-2">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 17a2 2 0 100-4 2 2 0 000 4z"/><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 10V8a6 6 0 1112 0v2"/></svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(null); }}
              minLength={3}
              className="w-full pl-10 pr-16 py-3 rounded-lg bg-slate-950/50 border border-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
           <p className="text-[11px] text-slate-400 mt-1">Password Must be min 3 characters.</p>
        </div>

        

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={
            loading ||
            !username ||
            !password ||
            username.length < 3 ||
            username.length > 8 ||
            password.length < 3
          }
          className="w-72 h-10 rounded-lg bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-xs text-slate-400">
          Don&apos;t have an account?
          <span
            onClick={() => navigate('/signup')}
            className="ml-1 font-semibold text-purple-300 cursor-pointer hover:text-purple-200 hover:underline"
          >
            Sign Up
          </span>
        </p>

        {/* Compact badges row to balance bottom space */}
        <div className="mt-auto w-full flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-700/50 bg-slate-900/40 text-[11px] text-slate-300">
            <svg className="w-3.5 h-3.5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/></svg>
            Private by design
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-700/50 bg-slate-900/40 text-[11px] text-slate-300">
            <svg className="w-3.5 h-3.5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 15l-3.5 2.1 1-4.1L6 10l4.2-.4L12 6l1.8 3.6 4.2.4-3.5 2.9 1 4.1z"/></svg>
            Encrypted sync
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-700/50 bg-slate-900/40 text-[11px] text-slate-300">
            <svg className="w-3.5 h-3.5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            Local-first
          </span>
        </div>

      </div>
    </div>
  )
}
