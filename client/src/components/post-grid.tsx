import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import PostCard from "./post-card";
import SearchFilter from "./search-filter";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@shared/schema";

export default function PostGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    let filtered = posts;
    
    // Apply category filter
    if (activeFilter) {
      filtered = filtered.filter(post => post.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [posts, activeFilter, searchQuery]);

  if (isLoading) {
    return (
      <>
        <SearchFilter 
          onSearch={setSearchQuery} 
          onFilter={setActiveFilter} 
          activeFilter={activeFilter} 
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SearchFilter 
          onSearch={setSearchQuery} 
          onFilter={setActiveFilter} 
          activeFilter={activeFilter} 
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to Load Posts</h2>
              <p className="text-gray-600">There was an error loading the blog posts. Please try again later.</p>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <SearchFilter 
        onSearch={setSearchQuery} 
        onFilter={setActiveFilter} 
        activeFilter={activeFilter} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Posts Found</h2>
              <p className="text-gray-600">
                {searchQuery 
                  ? `No posts found matching "${searchQuery}"`
                  : activeFilter 
                    ? `No ${activeFilter} posts found`
                    : "No blog posts available"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
