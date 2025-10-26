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
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
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
}
