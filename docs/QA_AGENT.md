# 🧪 QA Agent - JainShikanji Platform

**Role:** Ensure correctness, reliability, and quality of project outputs through comprehensive testing.

---

## Project Context

**Codebase:** ~11,700 lines across 41 TypeScript/TSX files
**Tech Stack:** React 18.3.1, TypeScript 5.6.3, Tailwind CSS, Context API
**Current Test Coverage:** 0% (No tests implemented)
**Target Coverage:** 80%+ for critical paths
**Testing Stack (Recommended):** Jest + React Testing Library + Playwright

---

## Responsibilities

### 1. Quality Assurance
- Review code, documents, and designs for accuracy and adherence to standards
- Validate implementation against requirements
- Ensure consistency with existing patterns
- Check TypeScript type safety
- Verify accessibility compliance (WCAG 2.1 AA)

### 2. Test Strategy & Planning
- Design comprehensive test strategies
- Identify critical user flows and edge cases
- Define test coverage requirements
- Plan unit, integration, and E2E test suites
- Create test data and mock fixtures

### 3. Testing Execution
- **Unit Testing:** Test individual functions, components, and utilities
- **Functional Testing:** Test features and business logic
- **Integration Testing:** Test component interactions and context providers
- **End-to-End (E2E) Testing:** Test complete user journeys
- **UX Testing:** Validate responsive design, animations, and accessibility
- **Performance Testing:** Validate load times and responsiveness

### 4. Mock Data Creation
- Generate realistic test fixtures
- Create edge case test data
- Mock API responses
- Simulate error conditions
- Generate large datasets for performance testing

### 5. Defect Reporting
- Report defects in **structured, machine-readable format**
- Provide clear reproduction steps
- Include environment details
- Categorize by severity (Critical, High, Medium, Low)
- Link to affected files and components

### 6. Test Validation
- Validate test results against acceptance criteria
- Ensure tests are reliable and non-flaky
- Verify test coverage metrics
- Review regression test results
- Sign off on releases

---

## Current Codebase Analysis

### Existing Test Infrastructure: NONE

**What's Missing:**
- ❌ No test files (*.test.ts, *.spec.ts)
- ❌ No test configuration (jest.config.js, vitest.config.ts)
- ❌ No test utilities or helpers
- ❌ No mock data fixtures
- ❌ No CI/CD test integration
- ❌ No coverage reports
- ❌ No E2E tests

**What Exists (Useful for Testing):**
- ✅ TypeScript interfaces in `/src/types/index.ts` (298 lines) - Use for type-safe mocks
- ✅ Mock data in `/src/data/knowledgeBase.ts` (306 lines) - Use as test fixtures
- ✅ Context providers (4 files) - Need integration testing
- ✅ Well-structured components - Easier to test in isolation

---

## Testing Strategy

### Test Pyramid

```
           /\
          /  \         E2E Tests (10%)
         /____\        - Critical user flows
        /      \       - Happy path scenarios
       /        \      Integration Tests (20%)
      /__________\     - Context interactions
     /            \    - Component communication
    /              \   Unit Tests (70%)
   /________________\  - Functions, utilities
                       - Component rendering
                       - State management
```

### Coverage Targets

**Overall Target:** 80%+

**By Component Type:**
- Utilities/Helpers: 95%+
- Business Logic: 90%+
- Context Providers: 85%+
- UI Components: 70%+
- Pages: 60%+ (focus on critical paths)

**Critical Paths (100% Coverage Required):**
- Authentication flow
- Cart operations (add, update, remove, clear)
- Order placement
- Payment processing (when implemented)
- Admin CRUD operations

---

## Test Setup Recommendation

### Recommended Testing Stack

**Unit & Integration Tests:**
```bash
npm install --save-dev vitest @vitest/ui
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev jsdom
```

**E2E Tests:**
```bash
npm install --save-dev @playwright/test
```

**Configuration Files:**

**1. `vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/',
      ],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**2. `src/test/setup.ts`:**
```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
```

**3. `playwright.config.ts`:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Mock Data & Test Fixtures

### Create Test Utilities

**Location:** `/src/test/utils/`

**1. Mock Data Factory (`/src/test/utils/mockData.ts`):**

```typescript
import { User, Product, Order, Location, Staff } from '../../types';

export const mockUser = (overrides?: Partial<User>): User => ({
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  phone: '9876543210',
  loyaltyPoints: 100,
  tier: 'Silver',
  addresses: [mockAddress()],
  preferences: mockUserPreferences(),
  orderHistory: [],
  createdAt: new Date('2024-01-01'),
  lastLogin: new Date(),
  ...overrides,
});

export const mockAddress = (overrides?: any) => ({
  id: 'addr-1',
  type: 'home' as const,
  address: '123 Test St, Bangalore',
  landmark: 'Near Test Park',
  coordinates: { lat: 12.9716, lng: 77.5946 },
  isDefault: true,
  ...overrides,
});

export const mockUserPreferences = (overrides?: any) => ({
  spiceLevel: 'Medium' as const,
  dietaryRestrictions: ['Vegetarian'],
  favoriteCategories: ['beverages'],
  communicationPreferences: {
    email: true,
    sms: true,
    push: false,
  },
  ...overrides,
});

export const mockProduct = (overrides?: Partial<Product>): Product => ({
  id: 'prod-1',
  name: 'Test Shikanji',
  description: 'Test product description',
  price: 99,
  originalPrice: 149,
  images: ['https://example.com/image.jpg'],
  category: 'beverages',
  subcategory: 'cold-drinks',
  rating: 4.5,
  reviewCount: 100,
  spiceLevel: 'Mild',
  isVeg: true,
  isVegan: true,
  isJain: true,
  isGlutenFree: true,
  isNutFree: true,
  prepTime: '5 mins',
  tags: ['Popular', 'Refreshing'],
  ingredients: ['Lemon', 'Water', 'Sugar'],
  nutritionalInfo: mockNutritionalInfo(),
  customizations: [],
  isAvailable: true,
  stock: 50,
  locationAvailability: ['loc-1'],
  scheduledAvailability: undefined,
  productType: 'instant',
  weight: '250g',
  servings: 25,
  shelfLife: '12 months',
  storageInstructions: 'Store in cool, dry place',
  ...overrides,
});

export const mockNutritionalInfo = (overrides?: any) => ({
  calories: 45,
  protein: 0.5,
  carbs: 11,
  fat: 0.1,
  fiber: 0.3,
  sodium: 180,
  ...overrides,
});

export const mockOrder = (overrides?: Partial<Order>): Order => ({
  id: 'order-1',
  customerId: 'user-1',
  items: [
    {
      id: 'item-1',
      productId: 'prod-1',
      name: 'Test Product',
      price: 99,
      quantity: 2,
      customizations: [],
    },
  ],
  subtotal: 198,
  tax: 9.9,
  deliveryFee: 30,
  discount: 0,
  total: 237.9,
  status: 'pending',
  paymentStatus: 'pending',
  paymentMethod: 'card',
  deliveryAddress: mockAddress(),
  estimatedDelivery: new Date(Date.now() + 3600000),
  locationId: 'loc-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  timeline: [
    {
      status: 'pending',
      timestamp: new Date(),
      note: 'Order placed',
      updatedBy: 'system',
    },
  ],
  ...overrides,
});

export const mockLocation = (overrides?: Partial<Location>): Location => ({
  id: 'loc-1',
  name: 'Test Location',
  address: '456 Test Ave, Bangalore',
  phone: '080-12345678',
  email: 'test@jainshikanji.com',
  coordinates: { lat: 12.9716, lng: 77.5946 },
  deliveryRadius: 5,
  isActive: true,
  operatingHours: [
    {
      dayOfWeek: 1,
      openTime: '09:00',
      closeTime: '22:00',
      isOpen: true,
    },
  ],
  staff: [],
  inventory: [],
  ...overrides,
});

export const mockStaff = (overrides?: Partial<Staff>): Staff => ({
  id: 'staff-1',
  name: 'Test Staff',
  email: 'staff@jainshikanji.com',
  phone: '9876543210',
  role: 'manager',
  locationId: 'loc-1',
  isActive: true,
  permissions: [
    {
      module: 'orders',
      actions: ['read', 'update'],
    },
  ],
  createdAt: new Date(),
  ...overrides,
});

// Edge case data
export const mockDatasets = {
  // Empty/null cases
  emptyUser: mockUser({ addresses: [], orderHistory: [] }),
  emptyCart: { items: [], total: 0, isOpen: false },

  // Large datasets
  manyProducts: Array.from({ length: 100 }, (_, i) =>
    mockProduct({ id: `prod-${i}`, name: `Product ${i}` })
  ),

  // Edge case values
  maxLoyaltyUser: mockUser({ loyaltyPoints: 999999, tier: 'Platinum' }),
  outOfStockProduct: mockProduct({ stock: 0, isAvailable: false }),
  expensiveProduct: mockProduct({ price: 9999, originalPrice: 14999 }),

  // Error scenarios
  invalidEmail: 'not-an-email',
  invalidPhone: '123',
  pastDate: new Date('2000-01-01'),
};
```

**2. Test Helpers (`/src/test/utils/testHelpers.tsx`):**

```typescript
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { CartProvider } from '../../context/CartContext';
import { OrderProvider } from '../../context/OrderContext';
import { LocationProvider } from '../../context/LocationContext';
import { ReactElement, ReactNode } from 'react';

// Wrapper with all providers
interface AllProvidersProps {
  children: ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => (
  <BrowserRouter>
    <AuthProvider>
      <OrderProvider>
        <LocationProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LocationProvider>
      </OrderProvider>
    </AuthProvider>
  </BrowserRouter>
);

// Custom render with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Wait utilities
export const waitForLoadingToFinish = async () => {
  const { waitFor } = await import('@testing-library/react');
  await waitFor(() => {
    expect(document.querySelector('[role="progressbar"]')).not.toBeInTheDocument();
  });
};

// Mock localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key]);
    },
  };
};
```

---

## Test Scenarios & Examples

### Unit Tests

**1. Component Rendering Test:**

**File:** `/src/components/__tests__/ProductCard.test.tsx`

```typescript
import { render, screen } from '@/test/utils/testHelpers';
import ProductCard from '../ProductCard';
import { mockProduct } from '@/test/utils/mockData';
import { vi } from 'vitest';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const product = mockProduct();
    render(<ProductCard product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`₹${product.price}`)).toBeInTheDocument();
  });

  it('displays rating with stars', () => {
    const product = mockProduct({ rating: 4.5, reviewCount: 100 });
    render(<ProductCard product={product} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
  });

  it('calls onAddToCart when add button is clicked', async () => {
    const handleAddToCart = vi.fn();
    const product = mockProduct();
    const { user } = render(
      <ProductCard product={product} onAddToCart={handleAddToCart} />
    );

    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    expect(handleAddToCart).toHaveBeenCalledWith(product);
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

  it('shows out of stock message when stock is 0', () => {
    const product = mockProduct({ stock: 0, isAvailable: false });
    render(<ProductCard product={product} />);

    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
  });

  it('displays dietary indicators correctly', () => {
    const product = mockProduct({
      isVeg: true,
      isJain: true,
      isGlutenFree: true,
    });
    render(<ProductCard product={product} />);

    expect(screen.getByLabelText(/vegetarian/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/jain/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gluten free/i)).toBeInTheDocument();
  });
});
```

**2. Context Provider Test:**

**File:** `/src/context/__tests__/CartContext.test.tsx`

```typescript
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { mockProduct } from '@/test/utils/mockData';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.total).toBe(0);
    expect(result.current.state.isOpen).toBe(false);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = mockProduct({ id: 'test-1', price: 100 });

    act(() => {
      result.current.dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          customizations: [],
          image: product.images[0],
        },
      });
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.total).toBe(100);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = mockProduct({ id: 'test-1', price: 100 });

    // Add item
    act(() => {
      result.current.dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          customizations: [],
          image: product.images[0],
        },
      });
    });

    // Update quantity
    act(() => {
      result.current.dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: product.id, quantity: 3 },
      });
    });

    expect(result.current.state.items[0].quantity).toBe(3);
    expect(result.current.state.total).toBe(300);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = mockProduct({ id: 'test-1', price: 100 });

    // Add item
    act(() => {
      result.current.dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          customizations: [],
          image: product.images[0],
        },
      });
    });

    // Remove item
    act(() => {
      result.current.dispatch({
        type: 'REMOVE_ITEM',
        payload: product.id,
      });
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.total).toBe(0);
  });

  it('clears entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product1 = mockProduct({ id: 'test-1', price: 100 });
    const product2 = mockProduct({ id: 'test-2', price: 200 });

    // Add multiple items
    act(() => {
      result.current.dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product1.id,
          productId: product1.id,
          name: product1.name,
          price: product1.price,
          quantity: 1,
          customizations: [],
          image: product1.images[0],
        },
      });
      result.current.dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product2.id,
          productId: product2.id,
          name: product2.name,
          price: product2.price,
          quantity: 1,
          customizations: [],
          image: product2.images[0],
        },
      });
    });

    expect(result.current.state.items).toHaveLength(2);

    // Clear cart
    act(() => {
      result.current.dispatch({ type: 'CLEAR_CART' });
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.total).toBe(0);
  });
});
```

### Integration Tests

**3. User Flow Test:**

**File:** `/src/test/integration/ProductPurchaseFlow.test.tsx`

```typescript
import { render, screen, waitFor } from '@/test/utils/testHelpers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from '@/pages/MenuPage';
import CartPage from '@/pages/CartPage';
import { vi } from 'vitest';

describe('Product Purchase Flow', () => {
  it('completes full purchase flow: browse → add to cart → checkout', async () => {
    const { user } = render(
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    );

    // Step 1: Browse products
    await waitFor(() => {
      expect(screen.getByText(/Traditional Shikanji/i)).toBeInTheDocument();
    });

    // Step 2: Add product to cart
    const addButtons = screen.getAllByRole('button', { name: /add/i });
    await user.click(addButtons[0]);

    // Verify toast notification
    await waitFor(() => {
      expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
    });

    // Step 3: Navigate to cart
    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    // Verify cart page shows product
    await waitFor(() => {
      expect(screen.getByText(/Traditional Shikanji/i)).toBeInTheDocument();
    });

    // Verify cart total
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/₹/)).toBeInTheDocument();

    // Step 4: Proceed to checkout
    const checkoutButton = screen.getByRole('button', { name: /checkout/i });
    expect(checkoutButton).toBeEnabled();
  });
});
```

### E2E Tests

**4. End-to-End Test:**

**File:** `/e2e/orderPlacement.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Order Placement Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user can place an order successfully', async ({ page }) => {
    // Step 1: Navigate to menu
    await page.click('text=Menu');
    await expect(page).toHaveURL('/menu');

    // Step 2: Add product to cart
    await page.click('button:has-text("Add"):first');
    await expect(page.locator('text=added to cart')).toBeVisible();

    // Step 3: View cart
    await page.click('[data-cart-button]');
    await expect(page.locator('text=Traditional Shikanji')).toBeVisible();

    // Step 4: Proceed to checkout
    await page.click('text=Proceed to Checkout');
    await expect(page).toHaveURL('/checkout');

    // Step 5: Fill checkout form
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="phone"]', '9876543210');
    await page.fill('[name="address"]', '123 Test Street');

    // Step 6: Select payment method
    await page.click('text=Card');

    // Step 7: Place order
    await page.click('button:has-text("Place Order")');

    // Step 8: Verify order confirmation
    await expect(page.locator('text=Order Placed Successfully')).toBeVisible();
    await expect(page).toHaveURL(/\/order-tracking\/.+/);
  });

  test('cart persists across page refreshes', async ({ page }) => {
    // Add product to cart
    await page.click('text=Menu');
    await page.click('button:has-text("Add"):first');

    // Refresh page
    await page.reload();

    // Verify cart still has items
    const cartBadge = page.locator('[data-cart-button] span');
    await expect(cartBadge).toHaveText('1');
  });

  test('displays error for invalid email', async ({ page }) => {
    // Add product and go to checkout
    await page.click('text=Menu');
    await page.click('button:has-text("Add"):first');
    await page.click('[data-cart-button]');
    await page.click('text=Proceed to Checkout');

    // Fill form with invalid email
    await page.fill('[name="email"]', 'invalid-email');
    await page.click('button:has-text("Place Order")');

    // Verify error message
    await expect(page.locator('text=Invalid email format')).toBeVisible();
  });
});
```

### Accessibility Tests

**5. Accessibility Test:**

**File:** `/src/components/__tests__/Header.a11y.test.tsx`

```typescript
import { render } from '@/test/utils/testHelpers';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '../Header';

expect.extend(toHaveNoViolations);

describe('Header Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', async () => {
    const { user } = render(<Header />);

    // Tab through navigation items
    await user.tab();
    await user.tab();
    // Add assertions for focus management
  });

  it('has proper ARIA labels', () => {
    render(<Header />);

    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label');
    expect(screen.getByRole('button', { name: /cart/i })).toHaveAttribute('aria-label');
  });
});
```

---

## Defect Report Format

### Machine-Readable Defect Report

When reporting defects, use this structured format:

```json
{
  "defectId": "DEF-001",
  "title": "Cart total calculation incorrect with discounts",
  "severity": "High",
  "priority": "P1",
  "category": "Functional",
  "type": "Bug",
  "status": "Open",
  "environment": {
    "browser": "Chrome 120.0",
    "os": "macOS 14.0",
    "viewport": "1920x1080",
    "buildVersion": "1.0.0",
    "testDate": "2025-01-12"
  },
  "affectedComponents": [
    {
      "file": "/src/context/CartContext.tsx",
      "lineNumber": 45,
      "function": "cartReducer"
    }
  ],
  "reproductionSteps": [
    "1. Add product with price ₹100 to cart",
    "2. Apply discount code '10OFF' (10% discount)",
    "3. Observe cart total"
  ],
  "expectedBehavior": "Cart total should be ₹90 (₹100 - 10%)",
  "actualBehavior": "Cart total shows ₹100 (discount not applied)",
  "testData": {
    "product": {
      "id": "prod-1",
      "price": 100
    },
    "discountCode": "10OFF",
    "discountPercentage": 10
  },
  "screenshots": [
    "/screenshots/cart-discount-bug.png"
  ],
  "consoleErrors": [
    "TypeError: Cannot read property 'discount' of undefined at CartContext.tsx:45"
  ],
  "relatedDefects": [],
  "suggestedFix": "Add discount calculation logic in cartReducer ADD_ITEM case",
  "tags": ["cart", "discount", "calculation"]
}
```

### Human-Readable Format (for documentation)

```markdown
## DEF-001: Cart Total Calculation Incorrect with Discounts

**Severity:** High | **Priority:** P1 | **Status:** Open
**Category:** Functional | **Type:** Bug

### Environment
- Browser: Chrome 120.0
- OS: macOS 14.0
- Viewport: 1920x1080
- Build: 1.0.0
- Test Date: 2025-01-12

### Affected Components
- `/src/context/CartContext.tsx:45` (cartReducer function)

### Reproduction Steps
1. Add product with price ₹100 to cart
2. Apply discount code '10OFF' (10% discount)
3. Observe cart total

### Expected vs Actual Behavior
**Expected:** Cart total should be ₹90 (₹100 - 10%)
**Actual:** Cart total shows ₹100 (discount not applied)

### Test Data
```json
{
  "product": { "id": "prod-1", "price": 100 },
  "discountCode": "10OFF",
  "discountPercentage": 10
}
```

### Console Errors
```
TypeError: Cannot read property 'discount' of undefined at CartContext.tsx:45
```

### Screenshots
![Cart Discount Bug](/screenshots/cart-discount-bug.png)

### Suggested Fix
Add discount calculation logic in cartReducer ADD_ITEM case

### Tags
`cart` `discount` `calculation`
```

---

## Test Coverage Requirements

### Critical Paths (100% Coverage)

**1. Authentication Flow:**
- ✅ User login with valid credentials
- ✅ User login with invalid credentials
- ✅ Admin login
- ✅ Logout functionality
- ✅ Session persistence
- ✅ Protected route access

**2. Cart Operations:**
- ✅ Add item to cart
- ✅ Update item quantity
- ✅ Remove item from cart
- ✅ Clear cart
- ✅ Calculate subtotal correctly
- ✅ Calculate tax correctly
- ✅ Cart persistence across page refreshes

**3. Order Placement:**
- ✅ Complete checkout form
- ✅ Form validation (all fields)
- ✅ Order submission
- ✅ Order confirmation display
- ✅ Order tracking navigation

### Edge Cases & Error Scenarios

**Test These Edge Cases:**

1. **Empty States:**
   - Empty cart
   - No search results
   - No order history
   - Out of stock products

2. **Boundary Values:**
   - Maximum cart quantity (999)
   - Minimum order value
   - Maximum discount (100%)
   - Zero stock

3. **Invalid Inputs:**
   - Invalid email formats
   - Invalid phone numbers
   - Special characters in names
   - SQL injection attempts
   - XSS attempts

4. **Network Errors:**
   - API timeouts
   - 404 errors
   - 500 server errors
   - Network disconnection

5. **Concurrent Operations:**
   - Multiple cart updates simultaneously
   - Race conditions in stock updates
   - Simultaneous order placements

6. **Browser Compatibility:**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)
   - Different viewport sizes

---

## Performance Testing

### Metrics to Validate

**Page Load Times (Target: <2s):**
- Homepage: <1.5s
- Menu Page: <2s
- Product Page: <1.5s
- Cart Page: <1s
- Checkout Page: <2s

**Interaction Response Times:**
- Button clicks: <100ms
- Form submissions: <500ms
- API calls (future): <200ms
- Search: <300ms

**Bundle Size:**
- Main bundle: <500KB (gzipped)
- Vendor bundle: <200KB
- CSS: <50KB

### Performance Test Example

```typescript
// src/test/performance/pageLoad.test.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('homepage loads within 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000);
  });

  test('product search responds within 300ms', async ({ page }) => {
    await page.goto('/menu');

    const startTime = Date.now();
    await page.fill('[placeholder*="Search"]', 'shikanji');
    await page.waitForTimeout(300);
    const responseTime = Date.now() - startTime;

    expect(responseTime).toBeLessThan(300);
  });
});
```

---

## Continuous Integration

### GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

      - name: Generate coverage report
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload E2E test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## QA Checklist (Pre-Release)

### Before Each Release, Verify:

**Functional Testing:**
- [ ] ✅ All critical user flows working
- [ ] ✅ All forms validate correctly
- [ ] ✅ Error messages display properly
- [ ] ✅ Loading states work correctly
- [ ] ✅ Toast notifications appear

**UI/UX Testing:**
- [ ] ✅ Responsive on mobile, tablet, desktop
- [ ] ✅ Animations smooth and performant
- [ ] ✅ Colors match design system
- [ ] ✅ Typography consistent
- [ ] ✅ Icons load correctly

**Browser Compatibility:**
- [ ] ✅ Chrome (latest)
- [ ] ✅ Firefox (latest)
- [ ] ✅ Safari (latest)
- [ ] ✅ Edge (latest)
- [ ] ✅ Mobile browsers

**Accessibility:**
- [ ] ✅ Keyboard navigation works
- [ ] ✅ Screen reader compatible
- [ ] ✅ ARIA labels present
- [ ] ✅ Color contrast meets WCAG AA
- [ ] ✅ Focus indicators visible

**Performance:**
- [ ] ✅ Page load times <2s
- [ ] ✅ No console errors
- [ ] ✅ No console warnings
- [ ] ✅ Bundle size acceptable
- [ ] ✅ Images optimized

**Security:**
- [ ] ✅ Input validation working
- [ ] ✅ XSS prevention active
- [ ] ✅ No sensitive data in console
- [ ] ✅ HTTPS enforced (production)
- [ ] ✅ CSP headers set (production)

**SEO:**
- [ ] ✅ Meta tags present on all pages
- [ ] ✅ Sitemap generated
- [ ] ✅ Robots.txt configured
- [ ] ✅ Structured data valid
- [ ] ✅ Canonical URLs set

**Test Coverage:**
- [ ] ✅ Unit tests passing (>70%)
- [ ] ✅ Integration tests passing (>80%)
- [ ] ✅ E2E tests passing (100% critical paths)
- [ ] ✅ No flaky tests
- [ ] ✅ Coverage report generated

---

## Success Metrics

### Quality Metrics to Track

**Test Coverage:**
- Unit test coverage: >70%
- Integration test coverage: >60%
- E2E test coverage: 100% of critical paths

**Defect Metrics:**
- Defect detection rate: >90%
- Critical defects: 0 in production
- Defect resolution time: <48 hours (critical), <1 week (high)

**Performance Metrics:**
- Page load time: <2s (95th percentile)
- Time to interactive: <3s
- First contentful paint: <1.5s

**Reliability Metrics:**
- Test pass rate: >98%
- Flaky test rate: <2%
- Test execution time: <10 minutes (full suite)

---

## Key Files Reference

- **Mock Data:** `/src/data/knowledgeBase.ts` (306 lines) - Use for test fixtures
- **Types:** `/src/types/index.ts` (298 lines) - Use for type-safe mocks
- **Contexts:** `/src/context/` (4 files) - Integration test targets
- **Components:** `/src/components/` (9 files) - Unit test targets
- **Pages:** `/src/pages/` (23 files) - E2E test targets

---

**Last Updated:** 2025-01-12
**Version:** 1.0.0
**Maintainer:** QA Agent
