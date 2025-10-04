import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { API_BASE_URL } from '../../config/api';

const Comments = ({ eventId }) => {
    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        fetchComments();
    }, [eventId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/comments/event/${eventId}`);
            const data = await response.json();
            
            if (data.success) {
                setComments(data.comments);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        
        if (!newComment.trim()) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/event/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ text: newComment }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                setNewComment('');
                fetchComments(); // Refresh comments
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleSubmitReply = async (e, parentCommentId) => {
        e.preventDefault();
        
        if (!replyText.trim()) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/event/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    text: replyText, 
                    parentCommentId: parentCommentId 
                }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                setReplyText('');
                setReplyingTo(null);
                fetchComments(); // Refresh comments
            }
        } catch (error) {
            console.error('Error posting reply:', error);
        }
    };

    const handleEditComment = async (commentId) => {
        if (!editText.trim()) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ text: editText }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                setEditingComment(null);
                setEditText('');
                fetchComments(); // Refresh comments
            }
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            
            const data = await response.json();
            
            if (data.success) {
                fetchComments(); // Refresh comments
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const renderComment = (comment, depth = 0) => (
        <div key={comment._id} className={`border-l-2 border-gray-200 ${depth > 0 ? 'ml-8' : ''} mb-4`}>
            <div className="pl-4 py-2">
                <div className="flex items-start space-x-3">
                    <img
                        src={comment.user?.avatar || '/images/avatar.png'}
                        alt={comment.user?.username}
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg px-3 py-2">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-sm">
                                    {comment.user?.username}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                                {comment.editedAt && (
                                    <span className="text-xs text-gray-400">(edited)</span>
                                )}
                            </div>
                            
                            {editingComment === comment._id ? (
                                <div className="space-y-2">
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="w-full p-2 border rounded-md resize-none"
                                        rows="2"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditComment(comment._id)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingComment(null);
                                                setEditText('');
                                            }}
                                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm">{comment.text}</p>
                            )}
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-1">
                            <button
                                onClick={() => setReplyingTo(comment._id)}
                                className="text-xs text-blue-500 hover:underline"
                            >
                                Reply
                            </button>
                            
                            {currentUser?._id === comment.user?._id && !comment.isDeleted && (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditingComment(comment._id);
                                            setEditText(comment.text);
                                        }}
                                        className="text-xs text-gray-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {replyingTo === comment._id && (
                            <form onSubmit={(e) => handleSubmitReply(e, comment._id)} className="mt-2">
                                <div className="flex space-x-2">
                                    <img
                                        src={currentUser?.avatar || '/images/avatar.png'}
                                        alt="Your avatar"
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write a reply..."
                                            className="w-full p-2 border rounded-md resize-none"
                                            rows="2"
                                        />
                                        <div className="flex space-x-2 mt-1">
                                            <button
                                                type="submit"
                                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                                            >
                                                Reply
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setReplyingTo(null);
                                                    setReplyText('');
                                                }}
                                                className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                
                {/* Render nested replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2">
                        {comment.replies.map(reply => renderComment(reply, depth + 1))}
                    </div>
                )}
            </div>
        </div>
    );

    if (!currentUser) {
        return (
            <div className="text-center py-4 text-gray-500">
                Please log in to view and post comments.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Discussion</h2>
            
            {/* New comment form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex space-x-3">
                    <img
                        src={currentUser?.avatar || '/images/avatar.png'}
                        alt="Your avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="w-full p-3 border rounded-lg resize-none"
                            rows="3"
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </form>
            
            {/* Comments list */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-4">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    comments.map(comment => renderComment(comment))
                )}
            </div>
        </div>
    );
};

export default Comments;