import { createBlogService } from '../services/CachedBlogService';
import { BlogPost, Category, Author } from '../types/blog';

// Import your existing data
import { blogPosts, categories, authors } from '../data/blogData';

// Create the blog service instance
export const blogService = createBlogService({
  posts: blogPosts as BlogPost[],
  categories,
  authors
});

// Export types for convenience
export type { BlogPost, Category, Author } from '../types/blog';
export type { BlogFilters, PaginationOptions, BlogResponse } from '../types/blog';

