import React, { useState } from 'react'

function CreatePost({ isOpen, onClose, onPostCreated }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("youtube");

    if (!isOpen) return null;

    const sendPost = async () => {
        try {
            const res=await fetch("http://localhost:3001/api/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    link,
                    type
                })

            });
            const data = await res.json();
            if(res.ok) {
                console.log("Post Created", data)
                setTitle("")
                setLink("")
                setType("youtube")
                onPostCreated()
            } else {
                alert(data.message)
            }
        } catch(err) {
            console.log("Post error", err)
            alert("Server error")
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-900/95 border border-purple-500/30 rounded-xl p-8 w-96 shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Add New Content</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-slate-200 mb-2 font-medium">Title</label>
                    <input
                        type="text"
                        placeholder="Enter title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                    />
                </div>

                {/* Link Input */}
                <div className="mb-4">
                    <label className="block text-slate-200 mb-2 font-medium">Link</label>
                    <input
                        type="url"
                        placeholder="Paste the link here..."
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                    />
                </div>

                {/* Type Selection */}
                <div className="mb-6">
                    <label className="block text-slate-200 mb-3 font-medium">Type</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value="youtube"
                                checked={type === "youtube"}
                                onChange={(e) => setType(e.target.value)}
                                className="w-4 h-4 cursor-pointer accent-purple-500"
                            />
                            <span className="text-slate-200">YouTube</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value="twitter"
                                checked={type === "twitter"}
                                onChange={(e) => setType(e.target.value)}
                                className="w-4 h-4 cursor-pointer accent-purple-500"
                            />
                            <span className="text-slate-200">Twitter</span>
                        </label>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 font-medium transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={sendPost}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2.5 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost
