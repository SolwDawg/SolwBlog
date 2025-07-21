import { useState } from 'react';
import { router, Head, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import UserHeader from '../../../components/user-header';

interface Comment {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    category: {
        id: number;
        name: string;
    };
    comments: Comment[];
    comments_count: number;
    created_at: string;
}

interface PostShowProps {
    post: Post;
}

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: unknown;
}

export default function PostShow({ post }: PostShowProps) {
    const [comment, setComment] = useState('');
    const { auth } = usePage<PageProps>().props;

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(route('user.posts.comments.store', post.id), {
            content: comment
        }, {
            onSuccess: () => {
                setComment('');
                toast.success('Bình luận đã được thêm thành công');
            },
            onError: (errors) => {
                toast.error(errors.content || 'Không thể thêm bình luận');
            },
        });
    };

    const handleDeleteComment = (commentId: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa bình luận này không?')) {
            router.delete(route('user.posts.comments.destroy', [post.id, commentId]), {
                onSuccess: () => {
                    toast.success('Bình luận đã được xóa thành công');
                },
                onError: () => {
                    toast.error('Không thể xóa bình luận');
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Head title={post.title} />
            <Toaster richColors closeButton position="top-right" />
            <UserHeader />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">{post.title}</h1>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {post.category.name}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                            <span className="text-slate-400">•</span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8" />
                                </svg>
                                {post.comments_count} bình luận
                            </span>
                        </div>
                    </div>
                                        <Button
                        variant="outline"
                        onClick={() => router.visit(route('user.posts.index'))}
                        className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700"
                    >
                        ← Về danh sách bài viết
                    </Button>
                </div>

                {/* Post Content */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="prose prose-lg max-w-none prose-slate">
                            <div
                                className="text-slate-700 leading-relaxed text-lg"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h2 className="text-2xl font-bold text-slate-800">Bình luận</h2>
                            <span className="text-slate-500">({post.comments_count})</span>
                        </div>

                                                {/* Add Comment Form */}
                        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Chia sẻ suy nghĩ của bạn</h3>
                            <form onSubmit={handleSubmitComment} className="space-y-4">
                                <Textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Viết bình luận của bạn..."
                                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm"
                                    rows={4}
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Đăng bình luận
                                </Button>
                            </form>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4">
                            {post.comments.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <p className="text-slate-500 text-lg">Chưa có bình luận nào</p>
                                    <p className="text-slate-400">Hãy là người đầu tiên chia sẻ suy nghĩ của bạn!</p>
                                </div>
                            ) : (
                                post.comments.map((comment) => (
                                    <div key={comment.id} className="group bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:border-slate-300/50 transition-all duration-200 hover:shadow-md">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                    {comment.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-slate-800">{comment.user.name}</span>
                                                    <div className="text-sm text-slate-500">
                                                        {new Date(comment.created_at).toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            {comment.user.id === auth.user.id && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-slate-700 leading-relaxed pl-13">{comment.content}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
