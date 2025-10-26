import React from 'react';
import { useBlogPost } from '../hooks/useBlog';
import { BlogPost } from '../types/blog';

interface BlogPostPageProps {
  postId: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ postId }) => {
  const { data: postData, loading, error } = useBlogPost(postId);

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
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Post Not Found</h2>
        <p className="text-gray-500">The requested blog post could not be found.</p>
      </div>
    );
  }

  const { relatedPosts, ...post } = postData;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
            {post.viewCount && (
              <>
                <span>•</span>
                <span>{post.viewCount} views</span>
              </>
            )}
          </div>
          
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

const RelatedPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold mb-2 line-clamp-2">{post.title}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{post.author}</span>
          <span>{post.readTime} min</span>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;

