import BlogHeader from "@/components/blog-header";
import SearchFilter from "@/components/search-filter";
import PostGrid from "@/components/post-grid";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <BlogHeader />
      <SearchFilter />
      <PostGrid />
      
      {/* Floating Action Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[hsl(var(--material-blue))] hover:bg-[hsl(var(--material-blue-dark))] text-white material-elevation-2 hover:material-shadow-hover transition-all duration-300 p-0"
          size="icon"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}
