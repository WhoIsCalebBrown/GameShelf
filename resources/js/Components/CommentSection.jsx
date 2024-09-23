import React, { useState } from 'react';
import axios from 'axios';

const CommentSection = ({ gameId, initialComments, user }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const tempComment = {
            id: Date.now(),
            game_id: gameId,
            user: user,
            text: newComment,
        };

        setComments([...comments, tempComment]);
        setNewComment('');

        try {
            const response = await axios.post(`/api/games/${gameId}/comments`, { text: newComment });
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === tempComment.id ? response.data : comment
                )
            );
        } catch (error) {
            console.error('Error posting comment:', error.response?.data || error.message);
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== tempComment.id)
            );
            alert('Failed to add comment. Please try again.');
        }
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6 text-white">
            <h2 className="text-3xl font-bold mb-6">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                    className="w-full p-4 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Submit
                </button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="mb-4 p-4 bg-gray-800 text-gray-300 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <img src={comment.user?.profile_photo || "https://i.pravatar.cc/300"} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <span className="font-semibold">{comment.user?.name}</span>
                                <span className="text-sm text-gray-500 ml-2">1 day ago (edited)</span>
                            </div>
                        </div>
                        <p className="mb-2">{comment.text}</p>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center text-gray-400 hover:text-white">
                                👍{/* {comment.likes_count || 0}*/}
                            </button>
                            <button className="flex items-center text-gray-400 hover:text-white">
                                👎
                            </button>
                            <button className="text-blue-500 hover:underline">Reply</button>
                        </div>
                        <button className="mt-2 text-blue-500 hover:underline">Replies</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
