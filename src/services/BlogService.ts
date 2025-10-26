import { BlogPost, Category, Author, BlogFilters, PaginationOptions, BlogResponse } from '../types/blog';
import { BaseBlogRepository } from '../repositories/BlogRepository';

// Service layer for business logic
export class BlogService {
  constructor(protected repository: BaseBlogRepository) {}

  async getPostsWithPagination(
    filters: BlogFilters = {},
    pagination: PaginationOptions = { page: 1, limit: 10 }
  ): Promise<BlogResponse<BlogPost[]>> {
    let posts = await this.repository.getAllPosts();

    // Apply filters
    posts = this.applyFilters(posts, filters);

    // Apply sorting
    posts = this.applySorting(posts, pagination.sortBy, pagination.sortOrder);

    // Apply pagination
    const total = posts.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return {
      data: paginatedPosts,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages
      },
      meta: {
        lastUpdated: new Date(),
        cacheExpiry: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
      }
    };
  }

  async getPostWithRelated(id: string): Promise<BlogPost & { relatedPosts: BlogPost[] } | null> {
    const post = await this.repository.getPostById(id);
    if (!post) return null;

    const relatedPosts = await this.repository.getRelatedPosts(id, 3);
    
    // Increment view count
    await this.repository.incrementViewCount(id);

    return {
      ...post,
      relatedPosts
    };
  }

  async getCategoryWithPosts(categoryId: string): Promise<Category & { posts: BlogPost[] } | null> {
    const category = await this.repository.getCategoryById(categoryId);
    if (!category) return null;

    const posts = await this.repository.getPostsByCategory(categoryId);
    
    return {
      ...category,
      posts
    };
  }

  async getAuthorWithPosts(authorId: string): Promise<Author & { posts: BlogPost[] } | null> {
    const author = await this.repository.getAuthorById(authorId);
    if (!author) return null;

    const posts = await this.repository.getPostsByAuthor(authorId);
    
    return {
      ...author,
      posts
    };
  }

  async searchPostsWithHighlight(query: string): Promise<BlogPost[]> {
    const posts = await this.repository.searchPosts(query);
    
    // Add search highlighting (simplified)
    return posts.map((post: BlogPost) => ({
      ...post,
      title: this.highlightText(post.title, query),
      excerpt: this.highlightText(post.excerpt, query)
    }));
  }

  async getHomePageData(): Promise<{
    featuredPosts: BlogPost[];
    recentPosts: BlogPost[];
    popularPosts: BlogPost[];
    categories: Category[];
  }> {
    const [featuredPosts, recentPosts, popularPosts, categories] = await Promise.all([
      this.repository.getFeaturedPosts(),
      this.repository.getRecentPosts(5),
      this.repository.getPopularPosts(5),
      this.repository.getAllCategories()
    ]);

    return {
      featuredPosts,
      recentPosts,
      popularPosts,
      categories
    };
  }

  private applyFilters(posts: BlogPost[], filters: BlogFilters): BlogPost[] {
    return posts.filter(post => {
      if (filters.category && post.category !== filters.category) return false;
      if (filters.author && post.author !== filters.author) return false;
      if (filters.featured !== undefined && post.featured !== filters.featured) return false;
      if (filters.tags && !filters.tags.some(tag => post.tags.includes(tag))) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }
      if (filters.dateRange) {
        const postDate = new Date(post.date);
        if (postDate < filters.dateRange.start || postDate > filters.dateRange.end) return false;
      }
      return true;
    });
  }

  private applySorting(
    posts: BlogPost[], 
    sortBy: PaginationOptions['sortBy'] = 'date', 
    sortOrder: PaginationOptions['sortOrder'] = 'desc'
  ): BlogPost[] {
    return posts.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'readTime':
          comparison = a.readTime - b.readTime;
          break;
        case 'viewCount':
          comparison = (a.viewCount || 0) - (b.viewCount || 0);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  private highlightText(text: string, query: string): string {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Public methods to access repository data
  async getAllCategories(): Promise<Category[]> {
    return this.repository.getAllCategories();
  }

  async getAllAuthors(): Promise<Author[]> {
    return this.repository.getAllAuthors();
  }
}
