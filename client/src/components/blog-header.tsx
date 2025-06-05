import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Code2, Menu } from "lucide-react";
import { useState } from "react";

export default function BlogHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white material-elevation-1 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-8 h-8 bg-[hsl(var(--material-blue))] rounded-full flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-medium text-gray-900">DevBlog</h1>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <Button 
                variant="ghost" 
                className={`hover:text-[hsl(var(--material-blue))] transition-colors duration-200 ${
                  location === '/' ? 'text-[hsl(var(--material-blue))]' : 'text-gray-700'
                }`}
              >
                Home
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-[hsl(var(--material-blue))] transition-colors duration-200"
              onClick={() => {
                const event = new CustomEvent('filter-posts', { detail: 'Angular' });
                window.dispatchEvent(event);
              }}
            >
              Angular
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-[hsl(var(--material-blue))] transition-colors duration-200"
              onClick={() => {
                const event = new CustomEvent('filter-posts', { detail: 'React' });
                window.dispatchEvent(event);
              }}
            >
              React
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-[hsl(var(--material-blue))] transition-colors duration-200"
              onClick={() => {
                const event = new CustomEvent('filter-posts', { detail: 'Microfrontends' });
                window.dispatchEvent(event);
              }}
            >
              Microfrontends
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-[hsl(var(--material-blue))] transition-colors duration-200"
              onClick={() => {
                const event = new CustomEvent('filter-posts', { detail: 'UI Trends' });
                window.dispatchEvent(event);
              }}
            >
              UI Trends
            </Button>
          </nav>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  const event = new CustomEvent('filter-posts', { detail: 'Angular' });
                  window.dispatchEvent(event);
                  setMobileMenuOpen(false);
                }}
              >
                Angular
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  const event = new CustomEvent('filter-posts', { detail: 'React' });
                  window.dispatchEvent(event);
                  setMobileMenuOpen(false);
                }}
              >
                React
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  const event = new CustomEvent('filter-posts', { detail: 'Microfrontends' });
                  window.dispatchEvent(event);
                  setMobileMenuOpen(false);
                }}
              >
                Microfrontends
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  const event = new CustomEvent('filter-posts', { detail: 'UI Trends' });
                  window.dispatchEvent(event);
                  setMobileMenuOpen(false);
                }}
              >
                UI Trends
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
