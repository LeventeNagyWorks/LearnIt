/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { ImUserPlus } from "react-icons/im";
import { FaUserClock } from "react-icons/fa6";


const AddFriends = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const searchUsers = async () => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            // Check both localStorage and sessionStorage for the token
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (!token) {
                navigate('/login', { replace: true });
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/api/searchUsers?query=${searchQuery}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 401) {
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    navigate('/login', { replace: true });
                    return;
                }

                const data = await response.json();
                if (response.ok) {
                    setSearchResults(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(searchUsers, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const sendFriendRequest = async (userId) => {
        try {
            // Check both storage locations for token
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (!token) {
                navigate('/login', { replace: true });
                return;
            }

            const response = await fetch('http://localhost:3001/api/sendFriendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ recipientId: userId })
            });

            if (response.ok) {
                setSearchResults(prev =>
                    prev.map(user =>
                        user._id === userId
                            ? { ...user, requestSent: true }
                            : user
                    )
                );
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };


    return (
        <div className="w-full h-full flex flex-col p-6">
            <div className="w-full flex max-w-2xl mx-auto mb-6 p-4 rounded-lg bg-slate-700 text-cstm_white focus-within:ring-2 focus-within:ring-accent_green_dark transition-all duration-200">
                <div className="w-full flex items-center gap-2">
                    <FiSearch className="text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-cstm_white placeholder-gray-400 focus:outline-none"
                    />
                    {isLoading && (
                        <div className="w-5 h-5 border-2 border-accent_green_dark border-t-transparent rounded-full animate-spin"></div>
                    )}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
                {searchResults.map((user) => (
                    <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-700 p-4 rounded-lg flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src={user.avatar ? `data:image/jpeg;base64,${user.avatar}` : '/default-avatar.png'}
                                    alt={user.displayName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-cstm_white font-medium">{user.displayName}</h3>
                                <p className="text-gray-400 text-sm">@{user.username}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => sendFriendRequest(user._id)}
                            disabled={user.requestSent}
                            className={`px-2 py-2 rounded-lg duration-500 ${user.requestSent
                                ? 'bg-gray-600 text-gray-400'
                                : 'bg-accent_green_dark text-cstm_bg_dark hover:bg-accent_green_dark2'
                                } transition-colors`}
                        >
                            {user.requestSent ? (<FaUserClock className='w-5 h-5' />) : (<ImUserPlus className='w-5 h-5' />)}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AddFriends;
