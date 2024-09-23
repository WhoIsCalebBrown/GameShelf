import React, {useState} from 'react';

const Comment = ({comment, onReply, depth = 0}) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = (e) => {
        e.preventDefault();
        onReply(comment.id, replyText);
        setReplyText('');
        setShowReplyForm(false);
    };

    return (
        <li className="mb-4 p-4 bg-gray-800 text-gray-300 rounded-lg">
            <div className="flex items-start mb-2">
                <img src={comment.user?.profile_photo || "https://i.pravatar.cc/300"} alt="User Avatar"
                     className="w-10 h-10 rounded-full mr-3"/>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{comment.user?.name}</span>
                        <span
                            className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="mb-2">{comment.text}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <button
                            className="flex items-center text-blue-500 hover:bg-blue-700 hover:text-white px-2 py-1 rounded transition-colors">
                            <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                <g id="Complete">
                                    <g id="thumbs-up">
                                        <path
                                            d="M7.3,11.4,10.1,3a.6.6,0,0,1,.8-.3l1,.5a2.6,2.6,0,0,1,1.4,2.3V9.4h6.4a2,2,0,0,1,1.9,2.5l-2,8a2,2,0,0,1-1.9,1.5H4.3a2,2,0,0,1-2-2v-6a2,2,0,0,1,2-2h3v10"
                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth="2"/>
                                    </g>
                                </g>
                            </svg>
                            {comment.likes_count || 0}
                        </button>
                        <button
                            className="flex items-center text-blue-500 hover:bg-blue-700 hover:text-white px-2 py-1 rounded transition-colors">
                            <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                <title/>
                                <g id="Complete">
                                    <g id="thumbs-down">
                                        <path
                                            d="M7.3,12.6,10.1,21a.6.6,0,0,0,.8.3l1-.5a2.6,2.6,0,0,0,1.4-2.3V14.6h6.4a2,2,0,0,0,1.9-2.5l-2-8a2,2,0,0,0-1.9-1.5H4.3a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h3V2.6"
                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth="2"/>
                                    </g>
                                </g>
                            </svg>
                            {comment.likes_count || 0}
                        </button>
                        {depth < 2 && (
                            <button onClick={() => setShowReplyForm(!showReplyForm)}
                                    className="hover:underline">Reply</button>
                        )}
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
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-2">Submit
                            </button>
                        </form>
                    )}
                    {comment.replies && comment.replies.length > 0 && (
                        <>
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className={`mt-2 flex items-center text-blue-500 hover:bg-blue-700 hover:text-white px-2 py-1 rounded transition-colors`}
                                style={{textDecoration: 'none'}}
                            >
                            <span className={`transition-transform duration-200 ${showReplies ? 'rotate-180' : ''}`}>
                                {showReplies ? (
                                    <svg fill="currentColor" height="15px" width="15px" version="1.1" id="Layer_1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink"
                                         viewBox="0 0 407.437 407.437" xmlSpace="preserve">
                                        <polygon
                                            points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "/>
                                    </svg>
                                ) : (
                                    <svg fill="currentColor" height="15px" width="15px" version="1.1" id="Layer_1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink"
                                         viewBox="0 0 407.437 407.437" xmlSpace="preserve">
                                        <polygon
                                            points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "/>
                                    </svg>
                                )}
                            </span>
                                <span className="ml-1">{comment.replies.length} replies</span>
                            </button>
                            {showReplies && (
                                <ul className="ml-8 mt-4">
                                    {comment.replies.map(reply => (
                                        <Comment key={reply.id} comment={reply} onReply={onReply}/>
                                    ))}
                                </ul>
                            )}
                        </>
                    )
                    }
                </div>
            </div>
        </li>
    );
};

export default Comment;
