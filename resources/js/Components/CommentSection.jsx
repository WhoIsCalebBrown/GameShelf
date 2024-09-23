import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';

const CommentSection = ({ gameId, initialComments, user }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const tempComment = {
            id: Date.now(),
            game_id: gameId, // Ensure this is defined
            user: user,
            text: newComment,
        };

        setComments([...comments, tempComment]);
        setNewComment('');

        try {
            const response = await axios.post(`/api/games/${gameId}/comments`, { text: newComment, game_id: gameId });
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

    const handleReplySubmit = async (parentId, replyText) => {
        try {
            const response = await axios.post(`/api/games/${gameId}/comments`, { text: replyText, parent_id: parentId, game_id: gameId });
            setComments((prevComments) =>
                prevComments.map(comment =>
                    comment.id === parentId ? {...comment, replies: [...(comment.replies || []), response.data]} : comment
                )
            );
        } catch (error) {
            console.error('Error posting reply:', error.response?.data || error.message);
            alert('Failed to add reply. Please try again.');
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
                    <Comment key={comment.id} comment={comment} onReply={handleReplySubmit} />
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
