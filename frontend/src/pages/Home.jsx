import React from 'react'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
   const navigate = useNavigate()
  const [allPosts, setAllPosts] = useState([])
  const [posts, setPosts] = useState([]);


  const youtubeCount = allPosts.filter(post => post.type === "youtube").length
  const twitterCount = allPosts.filter(post => post.type === "twitter").length

  const convertYouTubeLink = (url) => {
    const videoId = url.split("v=")[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }, 300); // wait for DOM to paint

    return () => clearTimeout(timer);
  }, [posts]);


  const getNormalizedTwitterUrl = (url) => {
    if (!url) return "";
    const match = url.match(/(\d{15,})/);
    if (match) {
      return `https://twitter.com/i/web/status/${match[1]}`;
    }
    return url.replace("x.com", "twitter.com");
  };


  useEffect(() => {
    fetchposts()
  }, [])

  const fetchposts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/post", {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      if (res.ok) {
        setAllPosts(data.posts)
        setPosts(data.posts)
      } else {
        console.log(data.message)
      }
    }
    catch (err) {
      console.log("Fetch posts error", err)
    }
  }

  const handleDelete = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/post/${postId}`, {
        method: "DELETE",
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        setPosts(prev => prev.filter(post => post._id != postId))
        setAllPosts(prev => prev.filter(post => post._id != postId))
      } else {
        alert(data.message)
      }
    } catch (err) {
      console.log("Delete error", err)
    }
  }

  const handleLogout = async() => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      const data = await res.json();

      if(res.ok) {
        navigate('/login')
      } else {
        alert(data.message)
      }
    } catch(err) {
      console.log("Logout Error", err)
    }
  }
  const youtubeFilter = () => {
    setPosts(allPosts.filter(post => post.type === 'youtube'))
  }

  const twitterFilter = () => {
    setPosts(allPosts.filter(post => post.type === 'twitter'))
  }
  return (
    
    <div className="flex flex-row gap-6 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <Sidebar onPostCreated={fetchposts} onYoutubeClick={youtubeFilter} onTwitterClick={twitterFilter} onLogout={handleLogout}/>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Content Library</h1>
          <p className="text-slate-400">Save and organize your favorite YouTube videos and Twitter posts</p>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500/20 to-purple-900/20 rounded-full flex items-center justify-center border border-purple-500/30">
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Your library is empty</h2>
              <p className="text-slate-400 mb-6 max-w-sm">
                Start building your second brain by adding your first content.
              </p>
            </div>
          </div>

        ) : (

          <div className="grid grid-cols-3 gap-6 p-6">
            {posts.map((post) => (
              <div key={post._id} className="group relative bg-gradient-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80 border border-slate-700/40 hover:border-purple-500/60 rounded-2xl shadow-2xl overflow-hidden transition-all duration-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-900/0 group-hover:from-purple-600/10 group-hover:to-purple-900/5 transition-all duration-400 pointer-events-none" />

                {/* Card Header with title and delete */}
                <div className="relative px-6 py-5 flex justify-between items-start border-b border-slate-700/20 bg-slate-900/30 backdrop-blur-sm">
                  <div className="flex-1 pr-4">
                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">{post.title}</h3>
                  </div>
                  <button onClick={() => handleDelete(post._id)} className="flex-shrink-0 p-2.5 text-slate-500 hover:text-red-400 bg-slate-800/40 hover:bg-red-500/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 border border-slate-700/30 hover:border-red-500/40">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Card Content - Media */}
                <div className="relative p-5">
                  {post.type === "youtube" && (
                    <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-700/30">
                      <iframe
                        width="100%"
                        height="180"
                        src={convertYouTubeLink(post.link)}
                        title="YouTube video"
                        allowFullScreen
                        className="w-full"
                      />
                    </div>
                  )}

                  {post.type === "twitter" && (
                    <div>
                      <blockquote className="twitter-tweet">
                        <a href={getNormalizedTwitterUrl(post.link)}></a>
                      </blockquote>

                      <a
                        href={getNormalizedTwitterUrl(post.link)}
                        target="_blank"
                        className="text-blue-400 text-sm"
                      >
                        Open on X
                      </a>
                    </div>
                  )}


                </div>

                {/* Card Footer */}
                <div className="relative px-6 py-4 bg-gradient-to-r from-slate-900/50 to-slate-900/30 border-t border-slate-700/20 backdrop-blur-sm flex items-center justify-end">
                </div>
              </div>
            ))}
          </div>

        )}



        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 mt-auto pt-8 border-t border-slate-800/50">
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">{allPosts.length}</p>
            <p className="text-sm text-slate-400">Total Content</p>
          </div>
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">{youtubeCount}</p>
            <p className="text-sm text-slate-400">YouTube Videos</p>
          </div>
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">{twitterCount}</p>
            <p className="text-sm text-slate-400">Twitter Posts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
