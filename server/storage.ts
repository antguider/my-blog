import { users, blogPosts, type User, type InsertUser, type BlogPost, type InsertBlogPost } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private currentUserId: number;
  private currentPostId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.initializeBlogPosts();
  }

  private initializeBlogPosts() {
    const posts: Omit<BlogPost, 'id'>[] = [
      // Angular Posts
      {
        title: "Understanding Angular Signals: A Comprehensive Guide",
        category: "Angular",
        author: "Sarah Chen",
        date: "Dec 15, 2024",
        readTime: "8 min read",
        excerpt: "Explore the new reactive programming paradigm in Angular with Signals. Learn how to implement fine-grained reactivity and improve your application's performance with this revolutionary feature.",
        content: `Angular Signals represent a fundamental shift in how we handle reactivity in Angular applications. This guide explores the concepts, implementation, and best practices for using signals effectively.

## What are Angular Signals?

Signals are a reactive primitive that allows Angular to track state changes with fine-grained precision. Unlike traditional change detection, signals provide a more efficient way to update the UI when data changes.

## Key Benefits

- Improved performance through fine-grained reactivity
- Better debugging and developer experience
- Simplified state management patterns
- Reduced complexity in component communication

## Implementation Example

\`\`\`typescript
import { signal, computed, effect } from '@angular/core';

// Create a signal
const count = signal(0);

// Create a computed signal
const doubleCount = computed(() => count() * 2);

// Create an effect
effect(() => {
  console.log(\`Count is: \${count()}\`);
});

// Update the signal
count.set(5); // Logs: Count is: 5
\`\`\`

This example demonstrates the basic usage of signals, computed values, and effects in Angular applications.

## Best Practices

1. Use signals for local component state
2. Combine signals with computed values for derived data
3. Implement effects for side effects and logging
4. Consider signal-based services for global state

Signals represent the future of Angular development, offering a more intuitive and performant approach to reactivity.`
      },
      {
        title: "Advanced Angular Routing Techniques",
        category: "Angular",
        author: "Mike Rodriguez",
        date: "Dec 12, 2024",
        readTime: "12 min read",
        excerpt: "Master complex routing scenarios with lazy loading, guards, resolvers, and nested routes. Discover best practices for large-scale Angular applications and improve your navigation architecture.",
        content: `Angular's routing system is one of its most powerful features, enabling developers to create sophisticated single-page applications with complex navigation patterns.

## Lazy Loading Strategies

Lazy loading is essential for large applications. It reduces initial bundle size and improves load times.

\`\`\`typescript
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];
\`\`\`

## Route Guards

Implement canActivate, canDeactivate, and canLoad guards to control access to routes:

\`\`\`typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }
}
\`\`\`

## Advanced Patterns

- Nested routing for complex layouts
- Route resolvers for data preloading
- Custom route matching strategies
- Dynamic route configuration

These techniques enable scalable and maintainable routing architectures.`
      },
      {
        title: "RxJS Operators Every Angular Developer Should Know",
        category: "Angular",
        author: "Elena Popov",
        date: "Dec 10, 2024",
        readTime: "15 min read",
        excerpt: "Deep dive into essential RxJS operators like map, switchMap, combineLatest, and merge. Learn when and how to use each operator effectively in your Angular applications.",
        content: `RxJS is the backbone of Angular's reactive programming model. Understanding key operators is crucial for building efficient Angular applications.

## Essential Operators

### map
Transforms emitted values:
\`\`\`typescript
source$.pipe(
  map(value => value * 2)
)
\`\`\`

### switchMap
Switches to a new observable, cancelling previous:
\`\`\`typescript
searchTerm$.pipe(
  switchMap(term => this.searchService.search(term))
)
\`\`\`

### combineLatest
Combines multiple observables:
\`\`\`typescript
combineLatest([user$, permissions$]).pipe(
  map(([user, permissions]) => ({ user, permissions }))
)
\`\`\`

## Best Practices

1. Always unsubscribe to prevent memory leaks
2. Use async pipe in templates when possible
3. Choose the right operator for the job
4. Consider using takeUntil for cleanup

Master these operators to write more efficient and maintainable Angular code.`
      },
      {
        title: "Testing Angular Components with Jest and Testing Library",
        category: "Angular",
        author: "David Kim",
        date: "Dec 8, 2024",
        readTime: "10 min read",
        excerpt: "Learn modern testing strategies for Angular applications. Set up Jest, write effective unit tests, and use Angular Testing Library for better component testing practices.",
        content: `Testing is crucial for maintaining high-quality Angular applications. Modern testing approaches focus on user behavior rather than implementation details.

## Setting Up Jest

Replace Karma with Jest for faster test execution:

\`\`\`json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
\`\`\`

## Angular Testing Library

Focus on testing user interactions:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/angular';

test('should increment counter when button is clicked', async () => {
  await render(CounterComponent);
  
  const button = screen.getByText('Increment');
  fireEvent.click(button);
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
\`\`\`

## Best Practices

- Test user behavior, not implementation
- Use data-testid for reliable element selection
- Mock external dependencies
- Write integration tests for critical paths

Effective testing strategies lead to more maintainable and reliable applications.`
      },
      {
        title: "Angular Standalone Components: The Future of Angular",
        category: "Angular",
        author: "Anna Thompson",
        date: "Dec 5, 2024",
        readTime: "9 min read",
        excerpt: "Discover how standalone components simplify Angular development. Learn migration strategies, best practices, and how to build modern Angular apps without NgModules.",
        content: `Standalone components represent a significant evolution in Angular architecture, simplifying application structure and reducing boilerplate code.

## What are Standalone Components?

Standalone components don't require NgModules and can import their dependencies directly:

\`\`\`typescript
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`<div>{{ user.name }}</div>\`
})
export class UserComponent { }
\`\`\`

## Benefits

- Reduced boilerplate code
- Simplified dependency management
- Better tree shaking
- Easier testing and development

## Migration Strategy

1. Start with new components as standalone
2. Gradually migrate existing components
3. Update routing configuration
4. Remove unnecessary NgModules

## Bootstrap Application

\`\`\`typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
\`\`\`

Standalone components offer a more intuitive and maintainable approach to Angular development.`
      },
      {
        title: "State Management in Angular: NgRx vs. Akita vs. NGXS",
        category: "Angular",
        author: "Carlos Silva",
        date: "Dec 3, 2024",
        readTime: "14 min read",
        excerpt: "Compare popular Angular state management solutions. Understand the trade-offs, performance implications, and choose the right tool for your project size and complexity.",
        content: `Choosing the right state management solution is crucial for Angular applications. Let's compare the most popular options.

## NgRx

Redux-inspired pattern with strong typing:

\`\`\`typescript
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ users }))
        )
      )
    )
  );
}
\`\`\`

**Pros**: Mature, predictable, great DevTools
**Cons**: Boilerplate heavy, steep learning curve

## Akita

Entity-based state management:

\`\`\`typescript
@Injectable()
export class UsersStore extends EntityStore<User> {
  constructor() {
    super();
  }
}
\`\`\`

**Pros**: Less boilerplate, intuitive API
**Cons**: Smaller community, less documentation

## NGXS

Action-based with decorators:

\`\`\`typescript
@State<User[]>({
  name: 'users',
  defaults: []
})
export class UsersState {
  @Action(LoadUsers)
  loadUsers(ctx: StateContext<User[]>) {
    return this.userService.getUsers();
  }
}
\`\`\`

Choose based on team size, complexity, and familiarity with patterns.`
      },
      {
        title: "Angular Performance Optimization Techniques",
        category: "Angular",
        author: "Lisa Zhang",
        date: "Nov 30, 2024",
        readTime: "11 min read",
        excerpt: "Master performance optimization in Angular applications. Learn about OnPush change detection, lazy loading, tree shaking, and modern bundling strategies for faster apps.",
        content: `Performance is crucial for user experience. Angular provides many tools and techniques for optimization.

## Change Detection Strategy

Use OnPush for better performance:

\`\`\`typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() data: Data;
}
\`\`\`

## Bundle Optimization

- Implement lazy loading
- Use tree shaking
- Optimize imports
- Enable production mode

## Memory Management

\`\`\`typescript
export class ComponentWithSubscription implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
\`\`\`

## Profiling Tools

- Angular DevTools
- Chrome DevTools
- Webpack Bundle Analyzer
- Lighthouse audits

Regular performance monitoring ensures optimal user experience.`
      },
      {
        title: "Angular Forms: Reactive vs Template-Driven Deep Dive",
        category: "Angular",
        author: "Robert Johnson",
        date: "Nov 28, 2024",
        readTime: "13 min read",
        excerpt: "Master both Angular form approaches. Learn when to use reactive forms vs template-driven forms, custom validators, and advanced form patterns for complex UIs.",
        content: `Angular offers two powerful approaches to form handling, each with distinct advantages and use cases.

## Reactive Forms

Programmatic approach with strong typing:

\`\`\`typescript
export class UserFormComponent {
  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}
}
\`\`\`

**Benefits**: Type safety, easier testing, complex validation

## Template-Driven Forms

Declarative approach in templates:

\`\`\`html
<form #userForm="ngForm">
  <input 
    name="name" 
    ngModel 
    required 
    minlength="2"
    #name="ngModel">
</form>
\`\`\`

**Benefits**: Simpler syntax, faster development for simple forms

## Custom Validators

\`\`\`typescript
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (!email || email.includes('@')) {
    return null;
  }
  return { invalidEmail: true };
}
\`\`\`

## Best Practices

- Use reactive forms for complex scenarios
- Template-driven for simple forms
- Implement proper error handling
- Consider async validators for server validation

Choose the approach that best fits your application's complexity and team preferences.`
      },
      {
        title: "Building Micro Frontends with Angular Elements",
        category: "Angular",
        author: "Jennifer Wu",
        date: "Nov 25, 2024",
        readTime: "16 min read",
        excerpt: "Learn how to create reusable Angular components as custom elements. Build micro frontends, share components across frameworks, and integrate with legacy systems.",
        content: `Angular Elements enables you to package Angular components as custom elements that can be used in any web application.

## Creating Custom Elements

\`\`\`typescript
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [UserWidgetComponent],
  imports: [BrowserModule],
  entryComponents: [UserWidgetComponent]
})
export class UserWidgetModule {
  constructor(private injector: Injector) {
    const element = createCustomElement(UserWidgetComponent, { injector });
    customElements.define('user-widget', element);
  }
}
\`\`\`

## Micro Frontend Architecture

Benefits of micro frontends:
- Independent deployment
- Technology diversity
- Team autonomy
- Scalable development

## Integration Patterns

\`\`\`html
<!-- Use in any framework or vanilla HTML -->
<user-widget 
  user-id="123" 
  theme="dark">
</user-widget>
\`\`\`

## Build Optimization

- Single bundle creation
- Minimize dependencies
- Optimize for size
- Consider polyfills

Angular Elements bridge the gap between Angular and the broader web ecosystem.`
      },
      {
        title: "Angular Animation API: Creating Smooth UI Transitions",
        category: "Angular",
        author: "Marcus Brown",
        date: "Nov 22, 2024",
        readTime: "7 min read",
        excerpt: "Master Angular's powerful animation system. Create smooth transitions, complex keyframe animations, and improve user experience with thoughtful motion design.",
        content: `Angular's animation API provides powerful tools for creating engaging user interfaces with smooth transitions and animations.

## Basic Animations

\`\`\`typescript
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class AnimatedComponent { }
\`\`\`

## Complex Keyframes

\`\`\`typescript
trigger('bounce', [
  transition('* => *', [
    animate('1s', keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale(1.2)', offset: 0.5 }),
      style({ transform: 'scale(1)', offset: 1 })
    ]))
  ])
])
\`\`\`

## Animation States

- Define multiple states
- Smooth transitions between states
- Conditional animations
- Performance considerations

## Best Practices

- Use transform over position changes
- Prefer opacity over visibility
- Consider reduced motion preferences
- Test on various devices

Well-designed animations enhance user experience and provide visual feedback for interactions.`
      },
      // React Posts
      {
        title: "React Server Components: The Future of React Architecture",
        category: "React",
        author: "Alex Turner",
        date: "Dec 14, 2024",
        readTime: "12 min read",
        excerpt: "Explore the revolutionary React Server Components. Learn how they improve performance, reduce bundle sizes, and enable new patterns for modern web applications.",
        content: `React Server Components represent a paradigm shift in how we build React applications, enabling server-side rendering with client-side interactivity.

## What are Server Components?

Server Components run on the server and return JSX that's serialized to the client:

\`\`\`jsx
// This runs on the server
async function BlogPost({ id }) {
  const post = await fetchPost(id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

## Key Benefits

- Zero JavaScript bundle impact
- Direct database access
- Improved Core Web Vitals
- Simplified data fetching

## Client vs Server Components

Use Server Components for:
- Data fetching
- Static content
- SEO-critical content

Use Client Components for:
- Interactivity
- Browser APIs
- State management

## Implementation Patterns

\`\`\`jsx
// Server Component
async function ProductList() {
  const products = await getProducts();
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Client Component
'use client';
function AddToCartButton({ productId }) {
  return (
    <button onClick={() => addToCart(productId)}>
      Add to Cart
    </button>
  );
}
\`\`\`

Server Components enable a new era of performance-optimized React applications.`
      },
      {
        title: "Advanced React Hooks: useCallback, useMemo, and Custom Hooks",
        category: "React",
        author: "Maya Patel",
        date: "Dec 11, 2024",
        readTime: "10 min read",
        excerpt: "Master performance optimization hooks and learn to build powerful custom hooks. Understand when and how to use memoization effectively in React applications.",
        content: `Advanced React hooks enable performance optimization and code reusability. Learn when and how to use them effectively.

## useCallback

Memoize functions to prevent unnecessary re-renders:

\`\`\`jsx
const ExpensiveComponent = ({ onUpdate }) => {
  const handleSubmit = useCallback((data) => {
    onUpdate(data);
  }, [onUpdate]);

  return <Form onSubmit={handleSubmit} />;
};
\`\`\`

## useMemo

Memoize expensive calculations:

\`\`\`jsx
const Dashboard = ({ data }) => {
  const expensiveValue = useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data]);

  return <div>Total: {expensiveValue}</div>;
};
\`\`\`

## Custom Hooks

Extract reusable logic:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
}
\`\`\`

## Best Practices

- Don't overuse memoization
- Profile before optimizing
- Consider dependency arrays carefully
- Extract reusable logic into custom hooks

Proper use of advanced hooks leads to more performant and maintainable React applications.`
      },
      {
        title: "State Management in React: Redux Toolkit vs. Zustand vs. Jotai",
        category: "React",
        author: "James Wilson",
        date: "Dec 7, 2024",
        readTime: "14 min read",
        excerpt: "Compare modern React state management solutions. Learn the pros and cons of each approach and choose the right tool for your application's complexity and scale.",
        content: `Choosing the right state management solution depends on your application's complexity and team preferences.

## Redux Toolkit

Modern Redux with less boilerplate:

\`\`\`jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  }
});
\`\`\`

**Pros**: Mature ecosystem, DevTools, predictable
**Cons**: Still requires boilerplate, learning curve

## Zustand

Minimal and flexible:

\`\`\`jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
\`\`\`

**Pros**: Simple API, small bundle, TypeScript-friendly
**Cons**: Less mature ecosystem

## Jotai

Atomic state management:

\`\`\`jsx
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

**Pros**: Bottom-up approach, no providers needed
**Cons**: Different mental model, newer library

Choose based on complexity, team experience, and specific needs.`
      },
      {
        title: "Testing React Applications with React Testing Library",
        category: "React",
        author: "Sofia Martinez",
        date: "Dec 4, 2024",
        readTime: "9 min read",
        excerpt: "Learn modern testing practices for React apps. Write maintainable tests that focus on user behavior rather than implementation details using React Testing Library.",
        content: `React Testing Library encourages better testing practices by focusing on how users interact with your components.

## Core Principles

- Test behavior, not implementation
- Query by accessibility labels
- Avoid testing internal state
- Simulate user interactions

## Basic Example

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('allows users to add items to list', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  const input = screen.getByLabelText(/add todo/i);
  const button = screen.getByRole('button', { name: /add/i });

  await user.type(input, 'Learn testing');
  await user.click(button);

  expect(screen.getByText('Learn testing')).toBeInTheDocument();
});
\`\`\`

## Best Practices

- Use getByRole for semantic queries
- Prefer user-event over fireEvent
- Test error states and edge cases
- Mock external dependencies appropriately

## Custom Render Function

\`\`\`jsx
function renderWithProviders(ui, options) {
  const Wrapper = ({ children }) => (
    <ThemeProvider>
      <Router>
        {children}
      </Router>
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}
\`\`\`

Focus on testing the user experience rather than implementation details.`
      },
      {
        title: "React Performance Optimization: Profiling and Best Practices",
        category: "React",
        author: "Tom Anderson",
        date: "Dec 1, 2024",
        readTime: "11 min read",
        excerpt: "Master React performance optimization techniques. Use React DevTools profiler, implement code splitting, and optimize rendering for large-scale applications.",
        content: `React performance optimization requires understanding when and why components re-render, and how to prevent unnecessary work.

## React DevTools Profiler

Use the profiler to identify performance bottlenecks:

1. Install React DevTools
2. Open the Profiler tab
3. Record interactions
4. Analyze component render times

## Optimization Techniques

### Code Splitting

\`\`\`jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### Memoization

\`\`\`jsx
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }));
  }, [data]);

  const handleClick = useCallback(() => {
    onUpdate(processedData);
  }, [onUpdate, processedData]);

  return <div onClick={handleClick}>{/* content */}</div>;
});
\`\`\`

## Performance Monitoring

- Use React DevTools
- Implement performance metrics
- Monitor Core Web Vitals
- Regular performance audits

## Best Practices

- Avoid premature optimization
- Profile before optimizing
- Consider bundle size impact
- Test on various devices

Systematic performance optimization ensures smooth user experiences across all devices.`
      }
    ];

    posts.forEach(post => {
      this.createBlogPost(post);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.blogPosts.values())
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentPostId++;
    const post: BlogPost = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }
}

export const storage = new MemStorage();
