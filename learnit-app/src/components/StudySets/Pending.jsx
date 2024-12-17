/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProfileImage } from '../../utils/profileImage';

const Pending = () => {
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('received');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/getPendingRequests', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSentRequests(data.sentRequests);
                setReceivedRequests(data.receivedRequests);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleAccept = async (userId) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/acceptFriendRequest', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                fetchRequests(); // Refresh the requests list
            }
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleReject = async (userId) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/rejectFriendRequest', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                fetchRequests(); // Refresh the requests list
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-6">
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('received')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'received'
                        ? 'bg-accent_green_dark text-cstm_bg_dark'
                        : 'bg-slate-700 text-cstm_white'
                        }`}
                >
                    Received Requests
                </button>
                <button
                    onClick={() => setActiveTab('sent')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'sent'
                        ? 'bg-accent_green_dark text-cstm_bg_dark'
                        : 'bg-slate-700 text-cstm_white'
                        }`}
                >
                    Sent Requests
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeTab === 'received' ? (
                    receivedRequests.map((user) => (
                        <motion.div
                            key={user._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-700 p-4 rounded-lg"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={user.avatar ? `data:image/jpeg;base64,${user.avatar}` : getProfileImage(null)}
                                        alt={user.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-cstm_white font-medium">{user.displayName}</h3>
                                    <p className="text-gray-400 text-sm">@{user.username}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(user._id)}
                                    className="flex-1 px-4 py-2 bg-accent_green_dark text-cstm_bg_dark rounded-lg hover:bg-accent_green_dark2"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleReject(user._id)}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    sentRequests.map((user) => (
                        <motion.div
                            key={user._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-700 p-4 rounded-lg"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={user.avatar ? `data:image/jpeg;base64,${user.avatar}` : getProfileImage(null)}
                                        alt={user.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-cstm_white font-medium">{user.displayName}</h3>
                                    <p className="text-gray-400 text-sm">@{user.username}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 mt-2 text-center">Request Pending</p>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Pending;
