// components/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ gameId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/games/${gameId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [gameId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/games/${gameId}/comments`, { text: newComment });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                        <p className="mb-2">{comment.text}</p>
                        <small className="text-gray-600">{new Date(comment.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
