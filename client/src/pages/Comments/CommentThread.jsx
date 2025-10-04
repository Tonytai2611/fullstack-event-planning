import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/api.js';

const CommentThread = ({ comment, eventId, onReply, currentUser, depth = 0, onUpdate, onDelete }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replyFiles, setReplyFiles] = useState([]);
    const [replyPreviews, setReplyPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);
    const [isUpdating, setIsUpdating] = useState(false);

    // Image modal state
    const [selectedImage, setSelectedImage] = useState(null);

    const maxDepth = 3;
    const canReply = depth < maxDepth && currentUser;
    const isOwner = currentUser && comment.user._id === currentUser._id;

    const handleReplyFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                alert('Only image files are allowed');
                return false;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                return false;
            }
            return true;
        });

        if (replyFiles.length + validFiles.length > 5) {
            alert('Maximum 5 images per comment');
            return;
        }

        setReplyFiles(prev => [...prev, ...validFiles]);

        // Create preview URLs
        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setReplyPreviews(prev => [...prev, e.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeReplyFile = (index) => {
        setReplyFiles(prev => prev.filter((_, i) => i !== index));
        setReplyPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleReply = async () => {
        if (!replyText.trim() && replyFiles.length === 0) {
            alert('Please enter text or select images');
            return;
        }

        setIsSubmitting(true);
        try {
            await onReply(replyText.trim(), comment._id, replyFiles);
            setReplyText('');
            setReplyFiles([]);
            setReplyPreviews([]);
            setShowReplyForm(false);
        } catch (error) {
            console.error('Error posting reply:', error);
            alert('Failed to post reply. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async () => {
        if (!editText.trim()) {
            alert('Comment text cannot be empty');
            return;
        }

        setIsUpdating(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ text: editText.trim() })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update comment');
            }

            const data = await response.json();
            if (data.success) {
                setIsEditing(false);
                if (onUpdate) onUpdate(data.comment);
                alert('Comment updated successfully!');
            }
        } catch (error) {
            console.error('Error updating comment:', error);
            alert(`Error updating comment: ${error.message}`);
            setEditText(comment.text);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/${comment._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete comment');
            }

            const data = await response.json();
            if (data.success) {
                if (onDelete) onDelete(comment._id);
                alert('Comment deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert(`Error deleting comment: ${error.message}`);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getUserDisplayName = (user) => {
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        return user.username;
    };

    const getUserInitial = (user) => {
        return user.firstName?.[0] || user.username?.[0] || 'U';
    };

    return (
        <div className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''} mb-4`}>
            {/* Main Comment */}
            <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {comment.user.avatar ? (
                            <img 
                                src={comment.user.avatar} 
                                alt={getUserDisplayName(comment.user)}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-[#569DBA] to-[#4A90B8] rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                    {getUserInitial(comment.user)}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gray-900">
                                    {getUserDisplayName(comment.user)}
                                </h4>
                                <span className="text-xs text-gray-500">
                                    {formatDate(comment.createdAt)}
                                </span>
                                {comment.editedAt && (
                                    <span className="text-xs text-gray-400 italic">
                                        (edited)
                                    </span>
                                )}
                                {depth > 0 && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                        Reply
                                    </span>
                                )}
                            </div>

                            {/* Action Dropdown for Owner */}
                            {isOwner && (
                                <div className="relative group">
                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 top-6 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[100px]">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Text Content - Editable */}
                        {isEditing ? (
                            <div className="mb-3">
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-[#569DBA] focus:ring-2 focus:ring-[#569DBA]/20"
                                    rows={3}
                                />
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        onClick={handleEdit}
                                        disabled={isUpdating || !editText.trim()}
                                        className="px-3 py-1 bg-[#569DBA] text-white text-sm rounded-md hover:bg-[#4A90B8] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUpdating ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditText(comment.text);
                                        }}
                                        className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {comment.text && (
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-3">
                                        {comment.text}
                                    </p>
                                )}
                                
                                {/* Attachments */}
                                {comment.attachments && comment.attachments.length > 0 && (
                                    <div className="mb-3">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {comment.attachments.map((attachment, index) => (
                                                <div key={attachment._id || index} className="relative">
                                                    <img
                                                        src={`${API_BASE_URL}${attachment.url}`}
                                                        alt={attachment.filename}
                                                        className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                                                        onClick={() => setSelectedImage(`${API_BASE_URL}${attachment.url}`)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        
                        {/* Actions */}
                        {!isEditing && (
                            <div className="flex items-center space-x-4">
                                {canReply && (
                                    <button
                                        onClick={() => setShowReplyForm(!showReplyForm)}
                                        className="text-xs text-[#569DBA] hover:text-[#4A90B8] font-medium transition-colors"
                                    >
                                        {showReplyForm ? 'Cancel Reply' : 'Reply'}
                                    </button>
                                )}
                                
                                {!canReply && depth >= maxDepth && (
                                    <span className="text-xs text-gray-400">
                                        Max reply depth reached
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reply Form */}
            {showReplyForm && canReply && (
                <div className="mt-3 ml-13">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                {currentUser.avatar ? (
                                    <img 
                                        src={currentUser.avatar} 
                                        alt={getUserDisplayName(currentUser)}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-[#569DBA] rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">
                                            {getUserInitial(currentUser)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder={`Reply to ${getUserDisplayName(comment.user)}...`}
                                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-[#569DBA] focus:ring-2 focus:ring-[#569DBA]/20"
                                    rows={2}
                                />
                                
                                {/* File Upload */}
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        id={`reply-files-${comment._id}`}
                                        multiple
                                        accept="image/*"
                                        onChange={handleReplyFileSelect}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={`reply-files-${comment._id}`}
                                        className="inline-flex items-center px-2 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                    >
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Add Images
                                    </label>
                                </div>

                                {/* Reply Image Previews */}
                                {replyPreviews.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {replyPreviews.map((url, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-16 h-16 object-cover rounded border"
                                                />
                                                <button
                                                    onClick={() => removeReplyFile(index)}
                                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500">
                                        Replying to {getUserDisplayName(comment.user)}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setShowReplyForm(false);
                                                setReplyText('');
                                                setReplyFiles([]);
                                                setReplyPreviews([]);
                                            }}
                                            className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleReply}
                                            disabled={isSubmitting || (!replyText.trim() && replyFiles.length === 0)}
                                            className="px-4 py-1 bg-[#569DBA] text-white text-xs rounded-md hover:bg-[#4A90B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting ? 'Posting...' : 'Post Reply'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-3">
                    {comment.replies.map((reply, index) => (
                        <CommentThread
                            key={reply._id || index}
                            comment={reply}
                            eventId={eventId}
                            onReply={onReply}
                            currentUser={currentUser}
                            depth={depth + 1}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl max-h-full p-4">
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentThread;