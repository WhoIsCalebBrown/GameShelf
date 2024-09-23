import React from 'react';

const Comment = ({ comment }) => {
    return (
        <li className="mb-4 p-4 bg-gray-800 text-gray-300 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
                <img src={comment.user?.profile_photo || "https://i.pravatar.cc/300"} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <span className="font-semibold">{comment.user?.name}</span>
                    <span className="text-sm text-gray-500 ml-2">{comment.created_at}</span>
                </div>
            </div>
            <p className="mb-2">{comment.text}</p>
            <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-400 hover:text-white">
                    👍{/* {comment.likes_count || 0} */}
                </button>
                <button className="flex items-center text-gray-400 hover:text-white">
                    👎
                </button>
                <button className="text-blue-500 hover:underline">Reply</button>
            </div>
            <button className="mt-2 text-blue-500 hover:underline">Replies</button>
        </li>
    );
};

export default Comment;
