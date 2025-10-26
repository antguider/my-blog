# Migration Guide: From Single File to Layered Architecture

## Overview

This guide will help you migrate your existing components from the monolithic `blogData.ts` approach to the new layered architecture.

## Migration Steps

### 1. Update Imports

**Before:**
```typescript
import { blogPosts, categories, authors } from '../data/blogData';
```

**After:**
```typescript
import { useBlogPosts, useCategories, useAuthors } from '../hooks/useBlog';
import { BlogFilters, PaginationOptions } from '../types/blog';
```

### 2. Replace Direct Data Access with Hooks

**Before:**
```typescript
const BlogPage = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [loading, setLoading] = useState(false);
  
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => 
      post.category === selectedCategory
    );
  }, [selectedCategory]);
  
  // Manual pagination
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
};
```

**After:**
```typescript
const BlogPage = () => {
  const filters: BlogFilters = {
    category: selectedCategory,
    search: searchTerm,
  };
  
  const pagination: PaginationOptions = {
    page: currentPage,
    limit: postsPerPage,
    sortBy: 'date',
    sortOrder: 'desc',
  };
  
  const { data: postsResponse, loading, error } = useBlogPosts(filters, pagination);
  const posts = postsResponse?.data || [];
};
```

### 3. Add Loading and Error States

**Before:**
```typescript
// No loading or error handling
return (
  <div>
    {posts.map(post => <PostCard key={post.id} post={post} />)}
  </div>
);
```

**After:**
```typescript
if (loading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

return (
  <div>
    {posts.map(post => <PostCard key={post.id} post={post} />)}
  </div>
);
```

### 4. Update Component Props and Types

**Before:**
```typescript
interface PostCardProps {
  post: any; // No type safety
}
```

**After:**
```typescript
import { BlogPost } from '../types/blog';

interface PostCardProps {
  post: BlogPost; // Type-safe
}
```

## Component-Specific Migrations

### BlogPage Component

**Key Changes:**
1. Replace `blogPosts` import with `useBlogPosts` hook
2. Replace `categories` import with `useCategories` hook
3. Add loading and error states
4. Use new pagination structure
5. Update filtering logic to use the service layer

**Migration Checklist:**
- [x] Update imports
- [x] Replace data access with hooks
- [x] Add loading states
- [x] Add error handling
- [x] Update pagination logic
- [x] Update filtering logic

### BlogPostPage Component

**Key Changes:**
1. Replace `blogPosts.find()` with `useBlogPost` hook
2. Replace `authors.find()` with `useAuthors` hook
3. Add loading and error states
4. Use related posts from the service response

**Migration Checklist:**
- [x] Update imports
- [x] Replace data access with hooks
- [x] Add loading states
- [x] Add error handling
- [x] Update related posts logic

### HomePage Component

**Key Changes:**
1. Use `useHomePageData` hook for aggregated data
2. Add loading and error states
3. Remove manual data aggregation

**Example:**
```typescript
const HomePage = () => {
  const { data: homeData, loading, error } = useHomePageData();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      <FeaturedPosts posts={homeData.featuredPosts} />
      <RecentPosts posts={homeData.recentPosts} />
      <PopularPosts posts={homeData.popularPosts} />
      <Categories categories={homeData.categories} />
    </div>
  );
};
```

## Testing the Migration

### 1. Check for Type Errors
```bash
npm run type-check
```

### 2. Test Loading States
- Verify loading spinners appear
- Check that data loads correctly

### 3. Test Error Handling
- Simulate network errors
- Verify error messages display

### 4. Test Functionality
- Search functionality
- Category filtering
- Pagination
- Related posts

## Common Issues and Solutions

### Issue 1: Type Errors
**Problem:** TypeScript errors after migration
**Solution:** Ensure all imports use the new types from `../types/blog`

### Issue 2: Infinite Re-renders
**Problem:** Component re-renders continuously
**Solution:** Check that filters and pagination objects are properly memoized

### Issue 3: Data Not Loading
**Problem:** Components show no data
**Solution:** Verify the blog service is properly initialized with data

### Issue 4: Performance Issues
**Problem:** Slow loading or rendering
**Solution:** Check that caching is working properly

## Rollback Plan

If you need to rollback:

1. **Keep the old `blogData.ts` file** as a backup
2. **Revert imports** to use the old data structure
3. **Remove new architecture files** if needed
4. **Test functionality** to ensure everything works

## Benefits After Migration

1. **Better Performance**: Built-in caching reduces API calls
2. **Type Safety**: Full TypeScript support
3. **Error Handling**: Graceful error states
4. **Loading States**: Better user experience
5. **Maintainability**: Cleaner, more organized code
6. **Testability**: Each layer can be tested independently
7. **Scalability**: Easy to add new features

## Next Steps

After completing the migration:

1. **Add Search Functionality**: Use the `useSearchPosts` hook
2. **Implement Analytics**: Track post views and interactions
3. **Add Caching Controls**: Implement cache invalidation
4. **Performance Monitoring**: Add performance metrics
5. **Error Tracking**: Integrate with error tracking services

## Support

If you encounter issues during migration:

1. Check the console for errors
2. Verify all imports are correct
3. Ensure the blog service is properly initialized
4. Test with a simple component first
5. Refer to the example components provided

The new architecture provides a solid foundation for building a scalable, maintainable blog application!

