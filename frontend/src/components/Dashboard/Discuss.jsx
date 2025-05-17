import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Discuss.css';

const Discuss = () => {
    const [discussions, setDiscussions] = useState([]);
    const [myDiscussions, setMyDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }
        fetchDiscussions();
        fetchMyDiscussions();
    }, [navigate]);

    const getAuthHeader = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return { Authorization: `Bearer ${user?.token}` };
    };

    const fetchDiscussions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/discussions', {
                headers: getAuthHeader()
            });
            setDiscussions(response.data);
        } catch (error) {
            console.error('Error fetching discussions:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    };

    const fetchMyDiscussions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/discussions/my-discussions', {
                headers: getAuthHeader()
            });
            setMyDiscussions(response.data);
        } catch (error) {
            console.error('Error fetching my discussions:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/discussions', newDiscussion, {
                headers: getAuthHeader()
            });
            setNewDiscussion({ title: '', content: '' });
            fetchDiscussions();
            fetchMyDiscussions();
        } catch (error) {
            console.error('Error creating discussion:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/discussions/${id}`, {
                headers: getAuthHeader()
            });
            fetchDiscussions();
            fetchMyDiscussions();
        } catch (error) {
            console.error('Error deleting discussion:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return null;
    }

    return (
        <div className="discuss-container">
            <h1 className="discuss-title">Discuss Forum</h1>

            {/* Create New Discussion */}
            <div className="story-form">
                <h2 className="form-title">Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                        rows="4"
                        required
                    />
                    <button type="submit">
                        Post
                    </button>
                </form>
            </div>

            {/* My Discussions */}
            <div className="discussions-section">
                <h2 className="section-title">My Posts</h2>
                <div className="story-grid">
                    {myDiscussions.map((discussion) => (
                        <div key={discussion._id} className="story-card">
                            <h3 className="story-title">{discussion.title}</h3>
                            <p className="story-content">{discussion.content}</p>
                            <button
                                onClick={() => handleDelete(discussion._id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Discussions */}
            <div className="discussions-section">
                <h2 className="section-title">All Posts</h2>
                <div className="story-grid">
                    {discussions.map((discussion) => (
                        <div key={discussion._id} className="story-card">
                            <h3 className="story-title">{discussion.title}</h3>
                            <p className="story-content">{discussion.content}</p>
                            <p className="story-author">
                                Posted by: {discussion.user?.name || 'Anonymous'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Discuss; 