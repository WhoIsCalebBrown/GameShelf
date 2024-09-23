import React, { useState } from 'react';

const Comment = ({ comment, onReply }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = (e) => {
        e.preventDefault();
        onReply(comment.id, replyText);
        setReplyText('');
        setShowReplyForm(false);
    };
    console.log(comment);

    return (
        <li className="mb-4 p-4 bg-gray-800 text-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
                <img src={comment.user?.profile_photo || "https://i.pravatar.cc/300"} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <span className="font-semibold">{comment.user?.name}</span>
                    <span className="text-sm text-gray-500 ml-2">{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
            </div>
            <p className="mb-2">{comment.text}</p>
            <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-400 hover:text-white">
                    👍 {comment.likes_count || 0}
                </button>
                <button className="flex items-center text-gray-400 hover:text-white">
                    👎
                </button>
                <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-blue-500 hover:underline">Reply</button>
            </div>
            {showReplyForm && (
                <form onSubmit={handleReplySubmit} className="mt-2">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        required
                        className="w-full p-2 bg-gray-700 text-white rounded-lg"
                    ></textarea>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-2">Submit</button>
                </form>
            )}
            {comment.replies && comment.replies.length > 0 && (
                <>
                    <button onClick={() => setShowReplies(!showReplies)} className="mt-2 text-blue-500 hover:underline">
                        {showReplies ? 'Hide replies' : `${comment.replies.length} replies`}
                    </button>
                    {showReplies && (
                        <ul className="ml-8 mt-4">
                            {comment.replies.map(reply => (
                                <Comment key={reply.id} comment={reply} onReply={onReply} />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </li>
    );
};

export default Comment;
