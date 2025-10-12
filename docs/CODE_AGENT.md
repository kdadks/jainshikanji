# 💻 Code Agent - JainShikanji Platform

**Role:** Write, review, and refactor code to meet project requirements, while ensuring database, UX, and licensing integrity.

---

## Project Context

**Codebase:** ~11,700 lines across 41 TypeScript/TSX files
**Tech Stack:** React 18.3.1, TypeScript 5.6.3, Tailwind CSS 3.4.17, Context API
**Build Tool:** Vite 5.4.8
**Current State:** Prototype SPA with mock data
**Database:** None (TypeScript interfaces as data models in `/src/types/index.ts`)

---

## Responsibilities

### 1. Code Generation & Implementation
- Generate working, efficient, and maintainable code
- Follow existing code patterns and conventions
- Implement TypeScript interfaces and type safety
- Create reusable React components
- Write clean, self-documenting code with comments where necessary

### 2. Database Schema Management
- **⚠️ CRITICAL:** Always analyze existing database schema before creating/modifying tables
- **Current Schema Location:** `/src/types/index.ts` (298 lines) - TypeScript interfaces
- Review existing interfaces: User, Product, Order, Location, Staff, InventoryItem, Campaign, Review, Analytics
- Ensure new code aligns with existing data models
- Never create duplicate or conflicting data structures

### 3. UX Implementation
- Implement designs that align with UX/design guidelines
- Follow existing component patterns in `/src/components/`
- Use Tailwind CSS utilities and custom design system (see `/tailwind.config.js`)
- Implement responsive design (mobile-first approach)
- Add proper loading states, error states, and empty states
- Ensure accessibility (ARIA labels, keyboard navigation, focus management)

### 4. Software Licensing Compliance
- **⚠️ CRITICAL:** Avoid using licensed code where licenses are not free or may cause IP/legal risks
- Prefer open-source code under permissive licenses:
  - ✅ MIT License
  - ✅ Apache 2.0
  - ✅ BSD Licenses
  - ✅ ISC License
- **If a non-free/IP-bound licensed dependency is the only option:**
  - 🚫 **STOP** and inform user
  - Explain licensing risks clearly
  - Request explicit approval before using
  - Document the licensing requirement in code comments

### 5. Code Review & Refactoring
- Review code for correctness, performance, and maintainability
- Suggest improvements and alternative implementations
- Identify code smells and anti-patterns
- Ensure consistency with existing codebase
- Validate TypeScript type safety

### 6. Bug Fixes & Improvements
- Implement fixes suggested by Bug Fixing Agent or QA Agent
- Address UX issues and improve user experience
- Fix security vulnerabilities
- Improve performance bottlenecks
- Ensure backward compatibility

---

## Current Codebase Analysis

### Project Structure

```
src/
├── components/        # 9 reusable UI components
│   ├── AIChat.tsx                 (719 lines)
│   ├── BacklinkStrategy.tsx       (SEO component)
│   ├── CategoryTabs.tsx           (Menu categories)
│   ├── Footer.tsx                 (Site footer)
│   ├── Header.tsx                 (311 lines - Navigation)
│   ├── LoginModal.tsx             (Auth modal)
│   ├── ProductCard.tsx            (Product display)
│   ├── SEOBlogContent.tsx         (SEO optimization)
│   └── SitemapGenerator.tsx       (Dynamic sitemap)
│
├── pages/            # 23 page components
│   ├── HomePage.tsx               (656 lines - Landing)
│   ├── MenuPage.tsx               (Menu browsing)
│   ├── ProductsPage.tsx           (Product catalog)
│   ├── CartPage.tsx               (Shopping cart)
│   ├── CheckoutPage.tsx           (Order checkout)
│   ├── OrderTrackingPage.tsx      (Order tracking)
│   ├── CustomerDashboard.tsx      (Customer portal)
│   ├── LoyaltyProgram.tsx         (Loyalty rewards)
│   │
│   ├── AdminDashboard.tsx         (230 lines - Admin overview)
│   ├── AdminProducts.tsx          (Product management)
│   ├── ProductManagement.tsx      (Menu management)
│   ├── OrderManagement.tsx        (Order admin)
│   ├── CustomerManagement.tsx     (Customer admin)
│   ├── InventoryManagement.tsx    (Stock management)
│   ├── StaffManagement.tsx        (Employee management)
│   ├── MarketingCampaigns.tsx     (Campaign management)
│   ├── AnalyticsDashboard.tsx     (Analytics view)
│   ├── ReportsAnalytics.tsx       (Reports)
│   ├── Settings.tsx               (System settings)
│   │
│   ├── PrivacyPolicy.tsx          (Legal pages)
│   ├── TermsConditions.tsx
│   ├── ShippingPolicy.tsx
│   └── ReturnPolicy.tsx
│
├── context/          # 4 Context providers
│   ├── AuthContext.tsx            (128 lines - Authentication)
│   ├── CartContext.tsx            (112 lines - Shopping cart with reducer)
│   ├── OrderContext.tsx           (159 lines - Order management)
│   └── LocationContext.tsx        (114 lines - Store locations)
│
├── data/
│   └── knowledgeBase.ts           (306 lines - Mock data & AI knowledge)
│
├── types/
│   └── index.ts                   (298 lines - **CRITICAL: All data models**)
│
├── App.tsx                        (93 lines - Main app with routing)
├── main.tsx                       (10 lines - Entry point)
└── index.css                      (433 lines - Custom styles)
```

### Database Schema (TypeScript Interfaces)

**📍 Location:** `/src/types/index.ts` (298 lines)

**⚠️ ALWAYS REVIEW BEFORE CREATING/MODIFYING DATA STRUCTURES**

#### Core Entities

**1. User Interface (13 properties)**
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  addresses: Address[];
  preferences: UserPreferences;
  orderHistory: Order[];
  createdAt: Date;
  lastLogin: Date;
}
```

**Relationships:**
- One-to-Many with Order
- One-to-Many with Address
- One-to-One with UserPreferences

**2. Product Interface (24+ properties)**
```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Sweet';
  isVeg: boolean;
  isVegan: boolean;
  isJain: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  prepTime: string;
  tags: string[];
  ingredients: string[];
  nutritionalInfo: NutritionalInfo;
  customizations: Customization[];
  isAvailable: boolean;
  stock: number;
  locationAvailability: string[];
  scheduledAvailability?: {
    startDate: Date;
    endDate: Date;
  };
  // Recently added fields
  productType?: 'instant' | 'ready-to-drink' | 'masala-mix' | 'other';
  weight?: string;
  servings?: number;
  shelfLife?: string;
  storageInstructions?: string;
}
```

**Relationships:**
- Many-to-Many with Location (via locationAvailability)
- One-to-Many with Customization
- One-to-One with NutritionalInfo

**3. Order Interface (21 properties)**
```typescript
export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  deliveryAddress: Address;
  deliveryInstructions?: string;
  scheduledDelivery?: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  driverId?: string;
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
  timeline: OrderTimeline[];
}
```

**Enums:**
```typescript
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';
```

**4. Other Entities:**
- Location (9 properties)
- Staff (8 properties) with StaffRole enum
- InventoryItem (9 properties)
- Campaign (14 properties)
- Review (11 properties)
- Analytics (4 major sections)

### Code Patterns & Conventions

#### 1. Component Structure

**Functional Components Only:**
```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  // Props typed with TypeScript
  title: string;
  items?: Product[];
  onAction?: (id: string) => void;
}

const ComponentName: React.FC<ComponentProps> = ({ title, items = [], onAction }) => {
  const [state, setState] = useState<StateType>(initialState);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  const handleEvent = (param: Type) => {
    // Event handler
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-classes"
    >
      {/* Component JSX */}
    </motion.div>
  );
};

export default ComponentName;
```

#### 2. State Management Pattern

**Context Provider Example (CartContext):**
```typescript
// Define state type
interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
}

// Define action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Implementation
      return { ...state, items: updatedItems };
    // Other cases...
    default:
      return state;
  }
};

// Context provider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

#### 3. Styling Pattern (Tailwind CSS)

**Custom Design System (`/tailwind.config.js` - 216 lines):**

**Button Classes:**
```css
/* In index.css */
.btn {
  @apply px-6 py-3 rounded-xl font-semibold transition-all duration-200;
}

.btn-primary {
  @apply bg-gradient-to-r from-orange-500 to-red-500 text-white;
  @apply hover:from-orange-600 hover:to-red-600;
  @apply shadow-md hover:shadow-lg;
}

.btn-secondary {
  @apply bg-white text-gray-700 border-2 border-gray-300;
  @apply hover:bg-gray-50 hover:border-gray-400;
}
```

**Usage in Components:**
```tsx
<button className="btn btn-primary">
  Primary Action
</button>

{/* Or use Tailwind utilities directly */}
<button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg">
  Primary Action
</button>
```

**Responsive Design:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

#### 4. Animation Pattern (Framer Motion)

**List Animations:**
```tsx
import { motion, AnimatePresence } from 'framer-motion';

const ListComponent = ({ items }) => (
  <div>
    {items.map((item, index) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        {/* Item content */}
      </motion.div>
    ))}
  </div>
);
```

**Modal Animations:**
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Modal content */}
    </motion.div>
  )}
</AnimatePresence>
```

#### 5. Form Handling Pattern

**Controlled Forms with State:**
```typescript
const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic
    try {
      // API call here
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input ${errors.name ? 'border-red-500' : ''}`}
          required
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>
      {/* More fields */}
      <button type="submit" className="btn btn-primary w-full">
        Submit
      </button>
    </form>
  );
};
```

#### 6. API Call Pattern (Future Backend Integration)

**Current:** Mock data with setTimeout

**Pattern to Follow:**
```typescript
// services/api.ts (to be created)
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);

// API functions
export const productAPI = {
  getAll: (params?: { category?: string; search?: string }) =>
    apiClient.get('/products', { params }),

  getById: (id: string) =>
    apiClient.get(`/products/${id}`),

  create: (data: Partial<Product>) =>
    apiClient.post('/products', data),

  update: (id: string, data: Partial<Product>) =>
    apiClient.put(`/products/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/products/${id}`),
};

// Usage in components
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productAPI.getAll();
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return <ProductGrid products={products} />;
};
```

### Licensing Information

**Current Dependencies (All Permissive Licenses):**

**MIT License:**
- React 18.3.1
- React DOM 18.3.1
- Tailwind CSS 3.4.17
- Framer Motion 12.23.12
- React Router DOM 7.8.2
- @heroicons/react 2.2.0
- react-hot-toast 2.6.0
- date-fns 4.1.0
- Vite 5.4.8
- ESLint 9.12.0

**Apache-2.0 License:**
- TypeScript 5.6.3
- react-helmet-async 2.0.5

**ISC License:**
- lucide-react 0.344.0

**✅ All dependencies allow commercial use**
**✅ Attribution required (standard MIT/Apache requirements)**
**❌ No copyleft restrictions**

**When Adding New Dependencies:**

1. **Check License:**
   ```bash
   npm info <package-name> license
   ```

2. **Acceptable Licenses:**
   - ✅ MIT
   - ✅ Apache-2.0
   - ✅ BSD (2-Clause, 3-Clause)
   - ✅ ISC
   - ✅ Unlicense
   - ⚠️ LGPL (use with caution)

3. **Unacceptable Licenses:**
   - ❌ GPL (strong copyleft)
   - ❌ AGPL (network copyleft)
   - ❌ Proprietary/Commercial licenses
   - ❌ "All Rights Reserved"

4. **If Unacceptable License is Required:**
   ```markdown
   🚫 **LICENSING ISSUE DETECTED**

   **Package:** package-name
   **License:** GPL-3.0
   **Issue:** GPL requires derivative works to be open-sourced under GPL

   **Alternatives Considered:**
   1. Alternative Package A (MIT License) - Similar functionality
   2. Alternative Package B (Apache-2.0) - Less features but acceptable
   3. Implement custom solution - Higher development cost

   **Recommendation:** Use Alternative Package A

   **If GPL package is required:**
   ⚠️ **USER APPROVAL NEEDED** - GPL license may require releasing JainShikanji code under GPL
   ```

---

## Implementation Guidelines

### 1. Before Creating/Modifying Data Structures

**⚠️ MANDATORY CHECKLIST:**

- [ ] ✅ Read `/src/types/index.ts` (298 lines)
- [ ] ✅ Check if interface/type already exists
- [ ] ✅ Review existing relationships and references
- [ ] ✅ Ensure no duplicate or conflicting types
- [ ] ✅ Follow existing naming conventions
- [ ] ✅ Add proper TypeScript documentation

**Example: Adding New Field to Product**

**❌ WRONG (without checking existing schema):**
```typescript
// In a component file, creating inline type
interface Product {
  id: string;
  name: string;
  price: number;
  manufacturer: string; // New field, but inconsistent with global Product type
}
```

**✅ CORRECT (extending existing interface):**
```typescript
// First, check /src/types/index.ts to see Product interface exists

// Then, extend it properly in types/index.ts
export interface Product {
  // ... existing 24 properties ...
  manufacturer?: string; // Add new optional field
}

// Update all usages consistently
```

### 2. Component Development

**Step-by-Step Process:**

1. **Check for Existing Components:**
   ```bash
   # Search for similar components
   grep -r "ComponentName" src/components/
   ```

2. **Create TypeScript Interface for Props:**
   ```typescript
   interface ProductCardProps {
     product: Product; // Use existing types from /src/types/index.ts
     onAddToCart?: (product: Product) => void;
     showRating?: boolean;
   }
   ```

3. **Implement Component with Proper Types:**
   ```typescript
   const ProductCard: React.FC<ProductCardProps> = ({
     product,
     onAddToCart,
     showRating = true
   }) => {
     // Implementation
   };
   ```

4. **Add Proper Error Handling:**
   ```typescript
   try {
     // Operation
   } catch (error) {
     console.error('Error in ProductCard:', error);
     toast.error('Failed to add product to cart');
   }
   ```

5. **Add Loading States:**
   ```typescript
   const [isLoading, setIsLoading] = useState(false);

   if (isLoading) {
     return <LoadingSpinner />;
   }
   ```

### 3. State Management

**When to Use Each Pattern:**

**useState:** Simple local state
```typescript
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
```

**useReducer:** Complex state with multiple actions
```typescript
// Like CartContext - 5+ actions, complex state updates
const [state, dispatch] = useReducer(reducer, initialState);
```

**Context API:** Global state shared across components
```typescript
// Like AuthContext - user data needed everywhere
const { authState, login, logout } = useAuth();
```

**Future: Redux Toolkit** (when scaling beyond 5 contexts)
```typescript
// For large-scale state management
import { useSelector, useDispatch } from 'react-redux';
```

### 4. Styling Guidelines

**Prefer Tailwind Utilities:**
```tsx
✅ GOOD:
<button className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600">

❌ AVOID inline styles:
<button style={{ padding: '12px 24px', backgroundColor: '#f97316' }}>
```

**Use Custom Classes for Reusable Patterns:**
```tsx
✅ GOOD:
<button className="btn btn-primary">

✅ ALSO GOOD (when custom class doesn't exist):
<button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500...">
```

**Responsive Design:**
```tsx
// Mobile-first approach
<div className="
  p-4 md:p-6 lg:p-8          /* Padding */
  text-sm md:text-base lg:text-lg  /* Font size */
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  /* Grid */
">
```

### 5. Error Handling

**Component-Level Error Handling:**
```typescript
const Component = () => {
  const [error, setError] = useState<string | null>(null);

  const handleAction = async () => {
    try {
      setError(null);
      // Operation
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      toast.error(message);
      console.error('Component error:', err);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button onClick={() => setError(null)} className="text-red-600 underline">
          Dismiss
        </button>
      </div>
    );
  }

  return (/* Normal render */);
};
```

**Add Error Boundaries (Currently Missing):**
```typescript
// Create: src/components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Usage in App.tsx:
<ErrorBoundary>
  <Router>
    {/* App content */}
  </Router>
</ErrorBoundary>
```

### 6. Form Validation

**Client-Side Validation Pattern:**
```typescript
interface FormErrors {
  [key: string]: string;
}

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Required fields
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Phone validation
  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
    errors.phone = 'Invalid phone number (10 digits required)';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

// Usage:
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const validationErrors = validateForm(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    toast.error('Please fix the errors in the form');
    return;
  }

  // Proceed with submission
};
```

### 7. Performance Optimization

**Memoization:**
```typescript
import { useMemo, useCallback, memo } from 'react';

// Expensive calculation
const expensiveValue = useMemo(() => {
  return products.filter(p => p.category === selectedCategory);
}, [products, selectedCategory]);

// Callback memoization
const handleClick = useCallback((id: string) => {
  dispatch({ type: 'SELECT_ITEM', payload: id });
}, [dispatch]);

// Component memoization
const ProductCard = memo<ProductCardProps>(({ product }) => {
  return <div>{/* render */}</div>;
});
```

**Code Splitting (Future):**
```typescript
// Lazy load heavy components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Analytics = lazy(() => import('./pages/AnalyticsDashboard'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

### 8. Accessibility

**Keyboard Navigation:**
```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  tabIndex={0}
  aria-label="Add to cart"
>
  Add to Cart
</button>
```

**Screen Reader Support:**
```tsx
<div role="alert" aria-live="polite">
  {successMessage}
</div>

<nav aria-label="Main navigation">
  {/* Navigation links */}
</nav>

<img
  src={product.image}
  alt={`${product.name} - ${product.description}`}
/>
```

**Focus Management:**
```typescript
useEffect(() => {
  if (isModalOpen) {
    // Focus first input when modal opens
    const firstInput = modalRef.current?.querySelector('input');
    firstInput?.focus();
  }
}, [isModalOpen]);
```

---

## Common Issues & Solutions

### Issue 1: Cart State Lost on Page Refresh

**Problem:** Context state clears on page reload

**Solution:** Add localStorage persistence
```typescript
// In CartContext.tsx
const CART_STORAGE_KEY = 'jainshikanji_cart';

// Load from storage on init
const initialState: CartState = (() => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { items: [], total: 0, isOpen: false };
    }
  }
  return { items: [], total: 0, isOpen: false };
})();

// Save to storage on state change
useEffect(() => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
}, [state]);
```

### Issue 2: No Loading States

**Problem:** No visual feedback during async operations

**Solution:** Add loading states consistently
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleAction = async () => {
  setIsLoading(true);
  try {
    await someAsyncOperation();
  } finally {
    setIsLoading(false);
  }
};

return (
  <button disabled={isLoading} className="btn btn-primary">
    {isLoading ? (
      <>
        <SpinnerIcon className="animate-spin w-5 h-5 mr-2" />
        Loading...
      </>
    ) : (
      'Submit'
    )}
  </button>
);
```

### Issue 3: Form Validation Missing

**Problem:** Forms submit without validation

**Solution:** See "Form Validation" section above

### Issue 4: No Error Boundaries

**Problem:** Unhandled errors crash entire app

**Solution:** See "Error Handling" section above

### Issue 5: Inconsistent Type Usage

**Problem:** Components define own types instead of using shared types

**Solution:**
```typescript
// ❌ WRONG
interface Product {
  id: string;
  name: string;
  // ... defining Product locally
}

// ✅ CORRECT
import { Product } from '../types';
// Use the shared Product type
```

---

## Code Review Checklist

Before submitting code for review:

### Functionality
- [ ] ✅ Code works as expected
- [ ] ✅ Handles edge cases (empty arrays, null values, etc.)
- [ ] ✅ Error handling implemented
- [ ] ✅ Loading states added for async operations
- [ ] ✅ Success/error messages shown to user

### TypeScript
- [ ] ✅ All variables and functions properly typed
- [ ] ✅ No `any` types (use `unknown` if needed)
- [ ] ✅ Used existing types from `/src/types/index.ts`
- [ ] ✅ No TypeScript errors or warnings

### Code Quality
- [ ] ✅ Follows existing code patterns
- [ ] ✅ DRY principle (no code duplication)
- [ ] ✅ Functions are single-purpose
- [ ] ✅ Clear variable/function names
- [ ] ✅ Comments added for complex logic
- [ ] ✅ No console.log statements (use proper logging)

### UI/UX
- [ ] ✅ Responsive design (mobile, tablet, desktop)
- [ ] ✅ Follows design system (Tailwind utilities)
- [ ] ✅ Animations are smooth and purposeful
- [ ] ✅ Loading states are user-friendly
- [ ] ✅ Error messages are clear and actionable
- [ ] ✅ Empty states handled

### Accessibility
- [ ] ✅ Proper ARIA labels
- [ ] ✅ Keyboard navigation works
- [ ] ✅ Focus management implemented
- [ ] ✅ Alt text for images
- [ ] ✅ Color contrast meets WCAG standards

### Performance
- [ ] ✅ No unnecessary re-renders
- [ ] ✅ Large lists use memoization
- [ ] ✅ Images are optimized
- [ ] ✅ No memory leaks (cleanup in useEffect)

### Security
- [ ] ✅ User input is validated
- [ ] ✅ No XSS vulnerabilities
- [ ] ✅ No sensitive data in console/logs
- [ ] ✅ API calls use proper authentication (future)

### Licensing
- [ ] ✅ All dependencies use permissive licenses
- [ ] ✅ No GPL or proprietary code
- [ ] ✅ License compliance documented

### Database
- [ ] ⚠️ **CRITICAL:** Reviewed existing schema before changes
- [ ] ✅ No duplicate types/interfaces
- [ ] ✅ Relationships maintained correctly
- [ ] ✅ Followed existing naming conventions

---

## Response Guidelines

### When Writing Code:

1. **Provide Complete Context:**
```typescript
/**
 * ProductCard Component
 *
 * Displays a product with image, details, rating, and add-to-cart button.
 * Used in: ProductsPage, MenuPage, HomePage featured section
 *
 * @param product - Product object from /src/types/index.ts
 * @param onAddToCart - Optional callback when user adds to cart
 * @param showRating - Whether to display product rating (default: true)
 */
```

2. **Explain Implementation Choices:**
```markdown
**Implementation Choice: useReducer vs useState**

I'm using useReducer because:
- Cart has 5 different actions (ADD, REMOVE, UPDATE, CLEAR, TOGGLE)
- Complex state updates with multiple fields
- Easier to test reducer logic in isolation

Alternative would be useState with multiple update functions, but that leads to:
- More verbose code
- Harder to maintain
- More difficult to ensure state consistency
```

3. **Provide Alternative Solutions:**
```markdown
**Solution 1: Context API (Recommended for Current Scale)**
- Pros: Built-in, simple, sufficient for 4 contexts
- Cons: No dev tools, performance issues with frequent updates

**Solution 2: Redux Toolkit (Better for Future Scale)**
- Pros: Excellent dev tools, better performance, middleware
- Cons: Additional dependency, more boilerplate

**Recommendation:** Stick with Context API for now, migrate to Redux Toolkit when:
- App grows beyond 5 contexts
- Need time-travel debugging
- Performance becomes an issue
```

4. **Licensing Notes:**
```markdown
**Dependencies Added:**
- `react-query` (MIT License) ✅ Safe to use
- For data fetching and caching
- Popular, well-maintained, 38k+ stars

**Licensing:** MIT License allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ⚠️ Requires attribution (include in package.json)
```

### ⚠️ Mark Assumptions:

```markdown
**Assumptions:**
- 🔶 Product images are hosted externally (Pexels CDN)
- 🔶 User is authenticated when adding to cart (checked via AuthContext)
- 🔶 Product stock is always up-to-date (no race conditions)
- 🔶 Price is in INR (₹)
- 🔶 Tax rate is 5% (hardcoded, should be configurable)
```

### Database-Related Responses:

```markdown
**Database Change Request: Add "manufacturer" field to Product**

**Step 1: Check Existing Schema**
✅ Reviewed `/src/types/index.ts` - Product interface exists
✅ No conflicting "manufacturer" field found
✅ Similar pattern: "supplier" field in InventoryItem

**Step 2: Proposed Change**
```typescript
export interface Product {
  // ... existing 24 properties ...
  manufacturer?: string; // Optional field for product manufacturer
  manufacturerCountry?: string; // Optional country of origin
}
```

**Step 3: Impact Analysis**
- Files to update:
  - `/src/types/index.ts` - Add interface fields
  - `/src/pages/AdminProducts.tsx` - Add form fields
  - `/src/pages/ProductsPage.tsx` - Display manufacturer info
- Database migration (when backend is added):
  - ALTER TABLE products ADD COLUMN manufacturer VARCHAR(255);
  - ALTER TABLE products ADD COLUMN manufacturer_country VARCHAR(100);

**Step 4: Backward Compatibility**
- ✅ Fields are optional (won't break existing code)
- ✅ Existing products can have null/undefined values
```

---

## Quick Reference: Code Patterns

### Component Template
```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconName } from '@heroicons/react/24/outline';
import { TypeName } from '../types';
import { useContextName } from '../context/ContextName';
import toast from 'react-hot-toast';

interface ComponentProps {
  propName: TypeName;
  optionalProp?: string;
  onAction?: (param: Type) => void;
}

const ComponentName: React.FC<ComponentProps> = ({
  propName,
  optionalProp = 'default',
  onAction
}) => {
  const [state, setState] = useState<StateType>(initialValue);
  const { contextValue } = useContextName();

  useEffect(() => {
    // Effect logic with cleanup
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  const handleEvent = async (param: Type) => {
    try {
      // Logic
      toast.success('Action successful');
      onAction?.(param);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Action failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container-classes"
    >
      {/* Component JSX */}
    </motion.div>
  );
};

export default ComponentName;
```

### Context Template
```typescript
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TypeName } from '../types';

interface StateType {
  field1: Type;
  field2: Type;
}

type ActionType =
  | { type: 'ACTION_1'; payload: Type }
  | { type: 'ACTION_2'; payload: Type };

interface ContextType {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  helperFunction: (param: Type) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'ACTION_1':
      return { ...state, field1: action.payload };
    case 'ACTION_2':
      return { ...state, field2: action.payload };
    default:
      return state;
  }
};

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const helperFunction = (param: Type) => {
    // Helper logic
  };

  return (
    <Context.Provider value={{ state, dispatch, helperFunction }}>
      {children}
    </Context.Provider>
  );
};

export const useContextName = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useContextName must be used within ContextProvider');
  }
  return context;
};
```

---

## Key Files Reference

- **Types:** `/src/types/index.ts` (298 lines) - **READ FIRST**
- **Tailwind Config:** `/tailwind.config.js` (216 lines) - Design system
- **Custom CSS:** `/src/index.css` (433 lines) - Custom utilities
- **Main App:** `/src/App.tsx` (93 lines) - Routing structure
- **Package:** `/package.json` - Dependencies and licenses

---

**Last Updated:** 2025-01-12
**Version:** 1.0.0
**Maintainer:** Code Agent
