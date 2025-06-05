import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { BlogPost } from "@shared/schema";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post.id}`}>
      <Card className="bg-white material-shadow hover:material-shadow-hover transition-all duration-300 cursor-pointer overflow-hidden h-full">
        <CardContent className="p-6 flex flex-col h-full">
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
            <span className="text-gray-500 text-sm">{post.date}</span>
          </div>
          
          <h2 className="text-xl font-medium text-gray-900 mb-3 hover:text-[hsl(var(--material-blue))] transition-colors duration-200 line-clamp-2 flex-grow-0">
            {post.title}
          </h2>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700 font-medium">{post.author}</span>
            </div>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
