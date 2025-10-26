// Repository pattern for data access
import { BlogPost, Category, Author } from '../types/blog';

export interface BlogRepository {
  // Posts
  getAllPosts(): Promise<BlogPost[]>;
  getPostById(id: string): Promise<BlogPost | null>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getPostsByCategory(categoryId: string): Promise<BlogPost[]>;
  getPostsByAuthor(authorId: string): Promise<BlogPost[]>;
  getFeaturedPosts(): Promise<BlogPost[]>;
  searchPosts(query: string): Promise<BlogPost[]>;
  getRelatedPosts(postId: string, limit?: number): Promise<BlogPost[]>;
  
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  
  // Authors
  getAllAuthors(): Promise<Author[]>;
  getAuthorById(id: string): Promise<Author | null>;
  
  // Analytics
  incrementViewCount(postId: string): Promise<void>;
  getPopularPosts(limit?: number): Promise<BlogPost[]>;
  getRecentPosts(limit?: number): Promise<BlogPost[]>;
}

// Abstract base repository
export abstract class BaseBlogRepository implements BlogRepository {
  abstract getAllPosts(): Promise<BlogPost[]>;
  abstract getPostById(id: string): Promise<BlogPost | null>;
  abstract getPostBySlug(slug: string): Promise<BlogPost | null>;
  abstract getPostsByCategory(categoryId: string): Promise<BlogPost[]>;
  abstract getPostsByAuthor(authorId: string): Promise<BlogPost[]>;
  abstract getFeaturedPosts(): Promise<BlogPost[]>;
  abstract searchPosts(query: string): Promise<BlogPost[]>;
  abstract getRelatedPosts(postId: string, limit?: number): Promise<BlogPost[]>;
  abstract getAllCategories(): Promise<Category[]>;
  abstract getCategoryById(id: string): Promise<Category | null>;
  abstract getCategoryBySlug(slug: string): Promise<Category | null>;
  abstract getAllAuthors(): Promise<Author[]>;
  abstract getAuthorById(id: string): Promise<Author | null>;
  abstract incrementViewCount(postId: string): Promise<void>;
  abstract getPopularPosts(limit?: number): Promise<BlogPost[]>;
  abstract getRecentPosts(limit?: number): Promise<BlogPost[]>;
}
