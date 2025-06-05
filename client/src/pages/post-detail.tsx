import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import BlogHeader from "@/components/blog-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { BlogPost } from "@shared/schema";

export default function PostDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/posts/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <>
        <BlogHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <BlogHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
              <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => setLocation("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.slice(3)}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{paragraph.slice(4)}</h3>;
      }
      if (paragraph.startsWith('```')) {
        const nextEndIndex = content.indexOf('```', content.indexOf(paragraph) + 3);
        if (nextEndIndex !== -1) {
          const codeBlock = content.substring(content.indexOf(paragraph) + paragraph.length + 1, nextEndIndex);
          return (
            <pre key={index} className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto mb-4">
              <code>{codeBlock}</code>
            </pre>
          );
        }
      }
      if (paragraph.startsWith('- ')) {
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-2">
            <li className="text-gray-700">{paragraph.slice(2)}</li>
          </ul>
        );
      }
      if (paragraph.trim() === '') {
        return null;
      }
      return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>;
    });
  };

  return (
    <>
      <BlogHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>

        <Card className="material-shadow">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    post.category === 'Angular' 
                      ? 'bg-red-100 text-red-800 hover:bg-red-100' 
                      : post.category === 'React'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      : post.category === 'Microfrontends'
                      ? 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                      : 'bg-green-100 text-green-800 hover:bg-green-100'
                  }`}
                >
                  {post.category}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                {formatContent(post.content)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
