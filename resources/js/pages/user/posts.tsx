import { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Toaster } from "sonner";
import { CalendarDays, MessageSquare, Tag, Search, Filter } from 'lucide-react';
import UserHeader from '../../components/user-header';

interface Post {
    id: number;
    title: string;
    content: string;
    category: {
        id: number;
        name: string;
    };
    comments_count: number;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
}

interface PaginatedData {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface PostsPageProps {
    posts?: PaginatedData;
    categories?: Category[];
    filters?: {
        search?: string;
        category?: string;
        sort?: string;
    };
}

const defaultPosts: PaginatedData = {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    links: [
        {
            url: null,
            label: '1',
            active: true
        }
    ]
};

const defaultFilters = {
    search: '',
    category: '',
    sort: ''
};

export default function PostsPage({
    posts = defaultPosts,
    categories = [],
    filters = defaultFilters
}: PostsPageProps) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category ?? 'all');
    const [sortBy, setSortBy] = useState(filters?.sort ?? 'latest');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('user.posts.index'),
            { search: value, category: selectedCategory, sort: sortBy },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        router.get(
            route('user.posts.index'),
            {
                search,
                category: value === 'all' ? '' : value,
                sort: sortBy
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true
            }
        );
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        router.get(
            route('user.posts.index'),
            { search, category: selectedCategory, sort: value },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handlePageChange = (page: number) => {
        router.get(
            route('user.posts.index'),
            { page, search, category: selectedCategory, sort: sortBy },
            { preserveState: true, preserveScroll: true }
        );
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    return (
        <>
            <UserHeader />
            <Head title="Bài viết" />
            <Toaster richColors closeButton position="top-right" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Bài viết
                            </h1>
                        </div>
                        <p className="text-slate-600 text-lg">
                            Khám phá và đọc các bài viết thú vị từ cộng đồng
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-slate-600" />
                            <h2 className="text-lg font-semibold text-slate-800">Bộ lọc & Tìm kiếm</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm bài viết..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm"
                                />
                            </div>

                            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                                <SelectTrigger className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm">
                                    <SelectValue placeholder="Chọn danh mục" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={handleSortChange}>
                                <SelectTrigger className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80 backdrop-blur-sm">
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Mới nhất</SelectItem>
                                    <SelectItem value="most_commented">Nhiều bình luận nhất</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Results Count */}
                    {posts.data.length > 0 && (
                        <div className="mb-6">
                            <p className="text-slate-600">
                                Hiển thị <span className="font-semibold text-slate-800">{posts.data.length}</span> trong tổng số{' '}
                                <span className="font-semibold text-slate-800">{posts.total}</span> bài viết
                            </p>
                        </div>
                    )}

                    {/* Posts Grid */}
                    {posts.data.length === 0 ? (
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Không tìm thấy bài viết nào</h3>
                            <p className="text-slate-600">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {posts.data.map((post) => (
                                <div
                                    key={post.id}
                                    className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="p-6">
                                        {/* Category Badge */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                                                <Tag className="w-3 h-3 mr-1" />
                                                {post.category?.name || 'Chưa phân loại'}
                                            </span>
                                            <div className="text-xs text-slate-500">
                                                {post.created_at ? new Date(post.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold mb-3 line-clamp-2 text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                                            {post.title || 'Không có tiêu đề'}
                                        </h2>

                                        {/* Content Preview */}
                                        <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                                            <div
                                                className="text-slate-700 leading-relaxed text-lg"
                                                dangerouslySetInnerHTML={{ __html: post.content ? truncateContent(post.content) : 'Không có nội dung' }}
                                            />
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <CalendarDays className="w-4 h-4" />
                                                <span>{post.created_at ? new Date(post.created_at).toLocaleDateString('vi-VN') : 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="w-4 h-4" />
                                                <span>{post.comments_count || 0} bình luận</span>
                                            </div>
                                        </div>

                                        {/* Read More Button */}
                                        <Button
                                            onClick={() => router.visit(route('user.posts.show', post.id))}
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105"
                                        >
                                            Đọc thêm
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.data.length > 0 && posts.last_page > 1 && (
                        <div className="mt-12">
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                                <nav className="flex justify-center">
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => handlePageChange(posts.current_page - 1)}
                                            disabled={posts.current_page === 1}
                                            className="bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700 disabled:opacity-50"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Trước
                                        </Button>

                                        <div className="flex items-center space-x-1">
                                            {Array.isArray(posts.links) && posts.links.map((link, i) => {
                                                // Skip Previous and Next buttons (they're handled separately)
                                                if (!link || link.label === '&laquo; Previous' || link.label === 'Next &raquo;' || link.label === 'pagination.previous' || link.label === 'pagination.next') {
                                                    return null;
                                                }

                                                // Handle ellipsis
                                                if (link.label === '...') {
                                                    return (
                                                        <span key={i} className="px-3 py-2 text-slate-500">...</span>
                                                    );
                                                }

                                                // Skip if no URL
                                                if (!link.url) {
                                                    return null;
                                                }

                                                // Parse page number
                                                const page = parseInt(link.label);
                                                if (isNaN(page)) {
                                                    return null;
                                                }

                                                return (
                                                    <Button
                                                        key={i}
                                                        variant={link.active ? "default" : "outline"}
                                                        onClick={() => handlePageChange(page)}
                                                        className={
                                                            link.active
                                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-10 h-10 p-0"
                                                                : "bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700 w-10 h-10 p-0"
                                                        }
                                                    >
                                                        {link.label}
                                                    </Button>
                                                );
                                            })}
                                        </div>

                                        <Button
                                            variant="outline"
                                            onClick={() => handlePageChange(posts.current_page + 1)}
                                            disabled={posts.current_page === posts.last_page}
                                            className="bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700 disabled:opacity-50"
                                        >
                                            Sau
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
