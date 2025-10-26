import { BlogPost, Category, Author } from '../types';

export const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern React Applications with TypeScript',
    excerpt: 'Learn how to create scalable and maintainable React applications using TypeScript best practices.',
    content: `
# Building Modern React Applications with TypeScript

TypeScript has become an essential tool for building robust React applications. In this comprehensive guide, we'll explore how to leverage TypeScript's powerful type system to create more maintainable and scalable applications.

## Why TypeScript with React?

TypeScript brings several benefits to React development:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete and refactoring capabilities
- **Improved Documentation**: Types serve as living documentation
- **Easier Refactoring**: Safe refactoring with confidence

## Setting Up TypeScript with React

To get started with TypeScript in your React project, you can use Create React App with the TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

## Essential TypeScript Patterns

### Component Props Typing

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children }) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### State Management with TypeScript

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Type-safe state updates
  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
};
\`\`\`

## Advanced Patterns

### Generic Components

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

## Best Practices

1. **Use strict mode**: Enable strict TypeScript configuration
2. **Define interfaces**: Create clear interfaces for your data structures
3. **Avoid any**: Use specific types instead of \`any\`
4. **Use utility types**: Leverage TypeScript's built-in utility types
5. **Type your API responses**: Create interfaces for API data

## Conclusion

TypeScript significantly improves the development experience when building React applications. By following these patterns and best practices, you can create more robust, maintainable, and scalable applications.

Start implementing TypeScript in your React projects today and experience the benefits of type safety and enhanced developer experience.
    `,
    author: 'John Doe',
    date: '2024-01-15',
    category: 'React',
    tags: ['React', 'TypeScript', 'Frontend', 'JavaScript'],
    readTime: 8,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Mastering CSS Grid and Flexbox for Modern Layouts',
    excerpt: 'A comprehensive guide to creating responsive and flexible layouts using CSS Grid and Flexbox.',
    content: `
# Mastering CSS Grid and Flexbox for Modern Layouts

CSS Grid and Flexbox are powerful layout systems that have revolutionized how we create web layouts. This guide will help you master both technologies and understand when to use each.

## Understanding CSS Grid

CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.

### Basic Grid Setup

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
\`\`\`

### Grid Areas

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Understanding Flexbox

Flexbox is a one-dimensional layout method for laying out items in rows or columns.

### Basic Flexbox Setup

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
\`\`\`

### Flexbox Properties

- \`justify-content\`: Controls alignment along the main axis
- \`align-items\`: Controls alignment along the cross axis
- \`flex-direction\`: Sets the direction of the main axis
- \`flex-wrap\`: Controls whether items wrap to new lines

## When to Use Grid vs Flexbox

### Use CSS Grid when:
- You need to create two-dimensional layouts
- You want to define both rows and columns
- You need precise control over item placement
- You're creating page layouts

### Use Flexbox when:
- You need to align items in one dimension
- You want to distribute space between items
- You're creating component-level layouts
- You need to handle dynamic content

## Responsive Design Patterns

### Mobile-First Approach

\`\`\`css
/* Mobile styles */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet styles */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
\`\`\`

## Advanced Techniques

### Subgrid (CSS Grid Level 2)

\`\`\`css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.child-grid {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 2;
}
\`\`\`

### Flexbox with CSS Custom Properties

\`\`\`css
.flex-container {
  display: flex;
  --flex-gap: 1rem;
  gap: var(--flex-gap);
}

@media (min-width: 768px) {
  .flex-container {
    --flex-gap: 2rem;
  }
}
\`\`\`

## Conclusion

Both CSS Grid and Flexbox are essential tools for modern web development. Understanding when and how to use each will help you create more efficient and maintainable layouts.

Remember:
- Use Grid for two-dimensional layouts
- Use Flexbox for one-dimensional layouts
- Combine both for complex designs
- Always consider responsive design
- Test across different devices and browsers
    `,
    author: 'Jane Smith',
    date: '2024-01-10',
    category: 'CSS',
    tags: ['CSS', 'Layout', 'Grid', 'Flexbox', 'Responsive'],
    readTime: 6,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Getting Started with Next.js 14: The Complete Guide',
    excerpt: 'Explore the latest features of Next.js 14 and learn how to build full-stack React applications.',
    content: `
# Getting Started with Next.js 14: The Complete Guide

Next.js 14 brings exciting new features and improvements that make building React applications even more powerful. In this guide, we'll explore everything you need to know to get started.

## What's New in Next.js 14

### Turbopack (Beta)
Turbopack is a new bundler that's significantly faster than Webpack, especially for large applications.

### Server Components
Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client.

### App Router
The new App Router provides a more intuitive file-based routing system with improved performance.

## Setting Up Your First Next.js Project

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Understanding the App Directory

The \`app\` directory is the new way to structure your Next.js application:

\`\`\`
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── about/
    └── page.tsx
\`\`\`

### Root Layout

\`\`\`typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A modern Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
\`\`\`

## Server Components vs Client Components

### Server Component (Default)

\`\`\`typescript
// app/components/ServerComponent.tsx
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
\`\`\`

### Client Component

\`\`\`typescript
'use client'

import { useState } from 'react'

function ClientComponent() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

## Data Fetching Patterns

### Server-Side Rendering (SSR)

\`\`\`typescript
// app/posts/page.tsx
async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'no-store' // Always fetch fresh data
  })

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

### Static Site Generation (SSG)

\`\`\`typescript
// app/posts/[id]/page.tsx
async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.id}\`, {
    cache: 'force-cache' // Cache indefinitely
  })

  return <PostContent post={post} />
}

export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
  return posts.map(post => ({ id: post.id }))
}
\`\`\`

## API Routes

\`\`\`typescript
// app/api/posts/route.ts
export async function GET() {
  const posts = await fetchPosts()
  return Response.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newPost = await createPost(body)
  return Response.json(newPost, { status: 201 })
}
\`\`\`

## Styling with Tailwind CSS

Next.js works seamlessly with Tailwind CSS:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

\`\`\`typescript
// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Next.js 14
        </h1>
        <p className="text-lg text-gray-600">
          Build amazing applications with the latest features.
        </p>
      </div>
    </main>
  )
}
\`\`\`

## Deployment

### Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Other Platforms

Next.js can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Best Practices

1. **Use Server Components by default**: Only use Client Components when necessary
2. **Optimize images**: Use the \`next/image\` component
3. **Implement proper caching**: Use appropriate cache strategies
4. **Monitor performance**: Use Next.js Analytics
5. **Follow SEO best practices**: Use proper metadata and structured data

## Conclusion

Next.js 14 provides powerful tools for building modern web applications. By leveraging Server Components, the App Router, and other new features, you can create faster, more efficient applications.

Start building with Next.js 14 today and experience the future of React development!
    `,
    author: 'Mike Johnson',
    date: '2024-01-05',
    category: 'Next.js',
    tags: ['Next.js', 'React', 'Full-stack', 'SSR', 'SSG'],
    readTime: 10,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'The Future of Web Development: AI and Machine Learning',
    excerpt: 'Discover how AI and machine learning are shaping the future of web development.',
    content: `
# The Future of Web Development: AI and Machine Learning

The integration of AI and machine learning into web development is transforming how we build and interact with applications. Let's explore the current trends and future possibilities.

## Current AI Applications in Web Development

### Code Generation and Assistance

AI-powered tools like GitHub Copilot and ChatGPT are revolutionizing how developers write code:

- **Automatic code completion**
- **Bug detection and fixing**
- **Code refactoring suggestions**
- **Documentation generation**

### Intelligent User Interfaces

Modern web applications are incorporating AI to create more intuitive user experiences:

- **Personalized content recommendations**
- **Smart search functionality**
- **Automated content moderation**
- **Voice and gesture recognition**

## Machine Learning in Frontend Development

### Client-Side ML with TensorFlow.js

\`\`\`javascript
import * as tf from '@tensorflow/tfjs';

// Load a pre-trained model
const model = await tf.loadLayersModel('/path/to/model.json');

// Make predictions
const prediction = model.predict(inputTensor);
\`\`\`

### Real-time Image Recognition

\`\`\`javascript
// Using TensorFlow.js for image classification
async function classifyImage(imageElement) {
  const model = await tf.loadLayersModel('/models/mobilenet/model.json');
  const tensor = tf.browser.fromPixels(imageElement);
  const resized = tf.image.resizeBilinear(tensor, [224, 224]);
  const normalized = resized.div(255.0);
  const batched = normalized.expandDims(0);
  
  const predictions = await model.predict(batched).data();
  return predictions;
}
\`\`\`

## AI-Powered Development Tools

### Automated Testing

AI can help generate and maintain test cases:

\`\`\`javascript
// AI-generated test cases
describe('User Authentication', () => {
  it('should authenticate valid user credentials', async () => {
    const result = await authenticateUser('user@example.com', 'password123');
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });
  
  it('should reject invalid credentials', async () => {
    const result = await authenticateUser('invalid@example.com', 'wrongpassword');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid credentials');
  });
});
\`\`\`

### Performance Optimization

AI can analyze and optimize application performance:

- **Bundle size optimization**
- **Image compression**
- **Caching strategies**
- **Load time prediction**

## The Future Landscape

### WebAssembly and AI

WebAssembly enables running AI models directly in the browser:

\`\`\`javascript
// Loading a WebAssembly AI model
const wasmModule = await WebAssembly.instantiateStreaming(
  fetch('/models/ai-model.wasm')
);
\`\`\`

### Edge Computing

AI processing at the edge reduces latency and improves user experience:

- **CDN-based AI processing**
- **Edge function execution**
- **Real-time data processing**
- **Offline AI capabilities**

## Ethical Considerations

### Privacy and Data Protection

- **Data minimization**
- **Transparent AI decisions**
- **User consent management**
- **Secure data handling**

### Bias and Fairness

- **Algorithmic bias detection**
- **Diverse training data**
- **Fairness metrics**
- **Inclusive design principles**

## Getting Started with AI in Web Development

### 1. Learn the Basics

- Understand machine learning fundamentals
- Learn about neural networks
- Explore AI APIs and services

### 2. Choose Your Tools

- **TensorFlow.js** for client-side ML
- **OpenAI API** for text generation
- **Google Cloud AI** for cloud services
- **Azure Cognitive Services** for Microsoft ecosystem

### 3. Start Small

Begin with simple AI integrations:

\`\`\`javascript
// Simple sentiment analysis
async function analyzeSentiment(text) {
  const response = await fetch('/api/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}
\`\`\`

## Conclusion

The future of web development is increasingly intertwined with AI and machine learning. By understanding these technologies and their applications, developers can create more intelligent, efficient, and user-friendly applications.

Key takeaways:
- AI is becoming an essential tool for developers
- Machine learning can enhance user experiences
- Privacy and ethics must be prioritized
- Start learning AI concepts now to stay competitive

The future is here, and it's powered by artificial intelligence!
    `,
    author: 'Sarah Wilson',
    date: '2024-01-01',
    category: 'AI/ML',
    tags: ['AI', 'Machine Learning', 'Web Development', 'Future Tech', 'Innovation'],
    readTime: 7,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
    description: 'Everything about React development'
  },
  {
    id: '2',
    name: 'CSS',
    slug: 'css',
    description: 'Styling and layout techniques'
  },
  {
    id: '3',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Full-stack React framework'
  },
  {
    id: '4',
    name: 'AI/ML',
    slug: 'ai-ml',
    description: 'Artificial Intelligence and Machine Learning'
  }
];

export const authors: Author[] = [
  {
    id: '1',
    name: 'John Doe',
    bio: 'Senior React Developer with 5+ years of experience in building scalable web applications.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    bio: 'Frontend Developer specializing in CSS and modern layout techniques.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    socialLinks: {
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith'
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    bio: 'Full-stack developer passionate about Next.js and modern web technologies.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    socialLinks: {
      twitter: 'https://twitter.com/mikejohnson',
      linkedin: 'https://linkedin.com/in/mikejohnson',
      github: 'https://github.com/mikejohnson'
    }
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    bio: 'AI/ML Engineer exploring the intersection of artificial intelligence and web development.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    socialLinks: {
      twitter: 'https://twitter.com/sarahwilson',
      linkedin: 'https://linkedin.com/in/sarahwilson',
      github: 'https://github.com/sarahwilson'
    }
  }
];
