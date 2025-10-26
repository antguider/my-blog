import React from 'react';
import { useBlogPosts, useCategories } from '../hooks/useBlog';
import { BlogPost, Category } from '../types/blog';

interface BlogPageProps {
  categoryFilter?: string;
  searchQuery?: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ categoryFilter, searchQuery }) => {
  const filters = {
    category: categoryFilter,
    search: searchQuery,
  };

  const { data: posts, loading, error, pagination } = useBlogPosts(filters, { page: 1, limit: 12 });
  const { data: categories } = useCategories();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Posts</h2>
        <p className="text-gray-600">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
      
      {/* Category Filter */}
      {categories && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className={`px-4 py-2 rounded-full ${
                !categoryFilter 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Categories
            </button>
            {categories.map((category: Category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full ${
                  categoryFilter === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: BlogPost) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-2 rounded ${
                  pagination.page === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {post.category}
          </span>
          {post.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.author}</span>
          <span>{post.readTime} min read</span>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPage;

