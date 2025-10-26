import { BlogPost, Category, Author, BlogFilters, PaginationOptions, BlogResponse } from '../types/blog';
import { BaseBlogRepository } from './BlogRepository';

// In-memory data store (for static data)
class InMemoryBlogRepository extends BaseBlogRepository {
  private posts: BlogPost[] = [];
  private categories: Category[] = [];
  private authors: Author[] = [];

  constructor(initialData: {
    posts: BlogPost[];
    categories: Category[];
    authors: Author[];
  }) {
    super();
    this.posts = initialData.posts;
    this.categories = initialData.categories;
    this.authors = initialData.authors;
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return [...this.posts];
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    return this.posts.find(post => post.id === id) || null;
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.posts.find(post => post.slug === slug) || null;
  }

  async getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
    return this.posts.filter(post => post.category === categoryId);
  }

  async getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
    return this.posts.filter(post => post.author === authorId);
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    return this.posts.filter(post => post.featured);
  }

  async searchPosts(query: string): Promise<BlogPost[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getRelatedPosts(postId: string, limit: number = 5): Promise<BlogPost[]> {
    const currentPost = await this.getPostById(postId);
    if (!currentPost) return [];

    const relatedPosts = this.posts
      .filter(post => 
        post.id !== postId && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, limit);

    return relatedPosts;
  }

  async getAllCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categories.find(category => category.id === id) || null;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.categories.find(category => category.slug === slug) || null;
  }

  async getAllAuthors(): Promise<Author[]> {
    return [...this.authors];
  }

  async getAuthorById(id: string): Promise<Author | null> {
    return this.authors.find(author => author.id === id) || null;
  }

  async incrementViewCount(postId: string): Promise<void> {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.viewCount = (post.viewCount || 0) + 1;
    }
  }

  async getPopularPosts(limit: number = 10): Promise<BlogPost[]> {
    return this.posts
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, limit);
  }

  async getRecentPosts(limit: number = 10): Promise<BlogPost[]> {
    return this.posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
}

export default InMemoryBlogRepository;

