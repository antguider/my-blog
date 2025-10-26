import { useState, useEffect, useCallback } from 'react';
import { BlogPost, Category, Author, BlogFilters, PaginationOptions } from '../types/blog';
import { blogService } from '../lib/blog';

// Custom hooks for blog data
export function useBlogPosts(filters: BlogFilters = {}, paginationOptions: PaginationOptions = { page: 1, limit: 10 }) {
  const [data, setData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await blogService.getPostsWithPagination(filters, paginationOptions);
      setData(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters, paginationOptions]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { data, loading, error, pagination, refetch: fetchPosts };
}

export function useBlogPost(id: string) {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await blogService.getPostWithRelated(id);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [fetchPost]);

  return { data, loading, error, refetch: fetchPost };
}

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const categories = await blogService.getAllCategories();
      setData(categories);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { data, loading, error, refetch: fetchCategories };
}

export function useAuthors() {
  const [data, setData] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAuthors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const authors = await blogService.getAllAuthors();
      setData(authors);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return { data, loading, error, refetch: fetchAuthors };
}

export function useHomePageData() {
  const [data, setData] = useState<{
    featuredPosts: BlogPost[];
    recentPosts: BlogPost[];
    popularPosts: BlogPost[];
    categories: Category[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHomePageData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await blogService.getHomePageData();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomePageData();
  }, [fetchHomePageData]);

  return { data, loading, error, refetch: fetchHomePageData };
}

export function useSearchPosts(query: string) {
  const [data, setData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchPosts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await blogService.searchPostsWithHighlight(searchQuery);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPosts(query);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, searchPosts]);

  return { data, loading, error };
}
