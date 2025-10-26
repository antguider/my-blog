import { BlogPost, Category, Author, BlogFilters, PaginationOptions, BlogResponse } from '../types/blog';
import { BlogService } from './BlogService';
import InMemoryBlogRepository from '../repositories/InMemoryBlogRepository';

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// Simple in-memory cache implementation
class BlogCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Generate cache keys
  static getPostsKey(filters: any, pagination: any): string {
    return `posts:${JSON.stringify({ filters, pagination })}`;
  }

  static getPostKey(id: string): string {
    return `post:${id}`;
  }

  static getCategoryKey(id: string): string {
    return `category:${id}`;
  }

  static getAuthorKey(id: string): string {
    return `author:${id}`;
  }

  static getHomePageKey(): string {
    return 'homepage';
  }
}

// Cached blog service
export class CachedBlogService extends BlogService {
  private cache = new BlogCache();

  async getPostsWithPagination(filters: any, pagination: any): Promise<BlogResponse<BlogPost[]>> {
    const cacheKey = BlogCache.getPostsKey(filters, pagination);
    const cached = this.cache.get<BlogResponse<BlogPost[]>>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await super.getPostsWithPagination(filters, pagination);
    this.cache.set(cacheKey, result);
    return result;
  }

  async getPostWithRelated(id: string): Promise<(BlogPost & { relatedPosts: BlogPost[] }) | null> {
    const cacheKey = BlogCache.getPostKey(id);
    const cached = this.cache.get<(BlogPost & { relatedPosts: BlogPost[] }) | null>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await super.getPostWithRelated(id);
    if (result) {
      this.cache.set(cacheKey, result);
    }
    return result;
  }

  async getCategoryWithPosts(categoryId: string): Promise<(Category & { posts: BlogPost[] }) | null> {
    const cacheKey = BlogCache.getCategoryKey(categoryId);
    const cached = this.cache.get<(Category & { posts: BlogPost[] }) | null>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await super.getCategoryWithPosts(categoryId);
    if (result) {
      this.cache.set(cacheKey, result);
    }
    return result;
  }

  async getAuthorWithPosts(authorId: string): Promise<(Author & { posts: BlogPost[] }) | null> {
    const cacheKey = BlogCache.getAuthorKey(authorId);
    const cached = this.cache.get<(Author & { posts: BlogPost[] }) | null>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await super.getAuthorWithPosts(authorId);
    if (result) {
      this.cache.set(cacheKey, result);
    }
    return result;
  }

  async getHomePageData(): Promise<{
    featuredPosts: BlogPost[];
    recentPosts: BlogPost[];
    popularPosts: BlogPost[];
    categories: Category[];
  }> {
    const cacheKey = BlogCache.getHomePageKey();
    const cached = this.cache.get<{
      featuredPosts: BlogPost[];
      recentPosts: BlogPost[];
      popularPosts: BlogPost[];
      categories: Category[];
    }>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const result = await super.getHomePageData();
    this.cache.set(cacheKey, result);
    return result;
  }

  async searchPostsWithHighlight(query: string): Promise<BlogPost[]> {
    const result = await super.searchPostsWithHighlight(query);
    return result;
  }

  // Clear cache methods
  clearPostCache(postId: string): void {
    this.cache.delete(BlogCache.getPostKey(postId));
    this.cache.delete(BlogCache.getHomePageKey());
  }

  clearCategoryCache(categoryId: string): void {
    this.cache.delete(BlogCache.getCategoryKey(categoryId));
  }

  clearAuthorCache(authorId: string): void {
    this.cache.delete(BlogCache.getAuthorKey(authorId));
  }

  clearAllCache(): void {
    this.cache.clear();
  }
}

// Factory function to create blog service with data
export function createBlogService(data: {
  posts: BlogPost[];
  categories: Category[];
  authors: Author[];
}): CachedBlogService {
  const repository = new InMemoryBlogRepository(data);
  return new CachedBlogService(repository);
}
