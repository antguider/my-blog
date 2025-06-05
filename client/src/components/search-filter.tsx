import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (category: string | null) => void;
  activeFilter: string | null;
}

export default function SearchFilter({ onSearch, onFilter, activeFilter }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleFilterEvent = (event: CustomEvent) => {
      onFilter(event.detail);
    };

    window.addEventListener('filter-posts', handleFilterEvent as EventListener);
    return () => window.removeEventListener('filter-posts', handleFilterEvent as EventListener);
  }, [onFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterClick = (category: string | null) => {
    onFilter(category);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg material-elevation-1 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--material-blue))] focus:border-[hsl(var(--material-blue))] outline-none transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleFilterClick(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === null
                  ? 'bg-[hsl(var(--material-blue))] text-white hover:bg-[hsl(var(--material-blue-dark))]'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Posts
            </Button>
            <Button
              onClick={() => handleFilterClick('Angular')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === 'Angular'
                  ? 'bg-[hsl(var(--material-blue))] text-white hover:bg-[hsl(var(--material-blue-dark))]'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Angular
            </Button>
            <Button
              onClick={() => handleFilterClick('React')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === 'React'
                  ? 'bg-[hsl(var(--material-blue))] text-white hover:bg-[hsl(var(--material-blue-dark))]'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              React
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
