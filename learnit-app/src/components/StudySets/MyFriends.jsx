/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from "react-icons/fi";

const MyFriends = () => {
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/getFriends', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFriends(data.friends);
            }
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const removeFriend = async (friendId) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/removeFriend', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friendId })
            });

            if (response.ok) {
                fetchFriends();
            }
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    const filteredFriends = friends.filter(friend =>
        friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-[80%] min-w-[80%] h-full flex flex-col p-6 overflow-hidden">
            <div className="w-full max-w-2xl mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 rounded-lg bg-slate-700 text-cstm_white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent_green_dark"
                />
            </div>

            <div className="w-full flex overflow-y-auto">
                <div className="w-full flex flex-col gap-4">
                    {filteredFriends.length > 0 ? (
                        filteredFriends.map((friend) => (
                            <motion.div
                                key={friend._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full bg-slate-700 p-4 rounded-lg"
                            >
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img
                                                src={friend.avatar ? `data:image/jpeg;base64,${friend.avatar}` : '/default-avatar.png'}
                                                alt={friend.displayName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-cstm_white font-medium">{friend.displayName}</h3>
                                            <p className="text-gray-400 text-sm">@{friend.username}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFriend(friend._id)}
                                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        <FiTrash2 className='w-4 h-4' />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="w-full text-center text-gray-400">
                            {searchQuery ? "No friends match your search" : "You haven't added any friends yet"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyFriends;

