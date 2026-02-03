import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import link from '../assets/links.svg'
import youtube from '../assets/youtube.svg'
import twitter from '../assets/twitter.svg'
import newIcon from '../assets/new.svg'
import CreatePost from "../components/CreatePost"

function Sidebar({onPostCreated, onYoutubeClick, onTwitterClick, onLogout}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

 
    return (
        <div className="h-screen w-80 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-950 border border-purple-500/20 rounded-2xl p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 mb-12">
                <img src={logo} alt="Second Brain logo" className="w-10 h-10" />
                <h1 className="text-2xl font-bold text-purple-300">Second Brain</h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-3 flex-1">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/30 rounded-lg px-4 py-3 transition-all duration-200 group">
                    <img src={newIcon} alt="New icon" className="w-6 h-6" />
                    <span className="text-slate-200 font-medium group-hover:text-white">Add New Link</span>
                </button>
                 <button onClick={() => onPostCreated()} className="flex items-center gap-3 w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/30 rounded-lg px-4 py-3 transition-all duration-200 group">
                    <img src={link} alt="YouTube icon" className="w-6 h-6" />
                    <span className="text-slate-200 font-medium group-hover:text-white">All Links</span>
                </button>
                <button onClick={() => onYoutubeClick()} className="flex items-center gap-3 w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/30 rounded-lg px-4 py-3 transition-all duration-200 group">
                    <img src={youtube} alt="YouTube icon" className="w-6 h-6" />
                    <span className="text-slate-200 font-medium group-hover:text-white">YouTube</span>
                </button>
                <button onClick={() => onTwitterClick()} className="flex items-center gap-3 w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/30 rounded-lg px-4 py-3 transition-all duration-200 group">
                    <img src={twitter} alt="Twitter icon" className="w-6 h-6" />
                    <span className="text-slate-200 font-medium group-hover:text-white">Twitter</span>
                </button>
            </nav>

            {/* Logout Button */}
            <button className="flex items-center gap-3 w-full text-slate-400 hover:text-slate-200 px-4 py-3 rounded-lg transition-all duration-200 group">
                <span className="text-xl">⏻</span>
                <span onClick={() => onLogout()} className="font-medium">Logout</span>
            </button>

            {/* Create Post Modal */}
            <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPostCreated={onPostCreated}/>
        </div>
    )
}

export default Sidebar
