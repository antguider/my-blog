// Core blog types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  imageUrl?: string;
  slug?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  viewCount?: number;
  likes?: number;
  relatedPosts?: BlogPost[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount?: number;
  color?: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  postCount?: number;
  joinDate?: Date;
}

export interface BlogFilters {
  category?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: 'date' | 'title' | 'readTime' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  meta?: {
    lastUpdated: Date;
    cacheExpiry: Date;
  };
}

