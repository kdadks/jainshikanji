# 🥤 Jain Shikanji - Premium Indian Food Restaurant Platform

A modern, full-featured restaurant management and food ordering platform built with React, TypeScript, and Tailwind CSS. Features customer ordering, loyalty programs, admin dashboard, and AI chat assistant.

![Jain Shikanji](https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🌟 Features

### **Customer Features**
- 🍽️ **Modern Menu Browsing** - Interactive menu with advanced filtering and search
- 🛒 **Smart Shopping Cart** - Real-time cart management with quantity controls
- 🏆 **Loyalty Program** - 4-tier system (Bronze → Silver → Gold → Platinum)
- 📱 **Order Tracking** - Real-time order status with timeline visualization
- 👤 **Customer Dashboard** - Order history, favorites, addresses, and profile management
- 🤖 **AI Chat Assistant** - Intelligent product recommendations and cart management
- 💳 **Multiple Payment Options** - UPI, Cards, Net Banking, Cash on Delivery
- 📍 **Address Management** - Save multiple delivery addresses
- ⭐ **Reviews & Ratings** - Rate orders and provide feedback

### **Admin Features**
- 📊 **Comprehensive Dashboard** - Real-time analytics and KPIs
- 📦 **Order Management** - Track and update order statuses
- 🍕 **Product Management** - Add, edit, and manage menu items
- 👥 **Customer Management** - Customer insights and segmentation
- 📈 **Analytics & Reports** - Sales, customer, and operational reports
- 📦 **Inventory Management** - Stock tracking with alerts
- 👨‍💼 **Staff Management** - Employee management with role-based permissions
- 📢 **Marketing Campaigns** - Create and manage promotional campaigns
- ⚙️ **Settings** - Configure store operations, payments, and notifications

### **Technical Features**
- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 📱 **Mobile-First** - Optimized for all device sizes
- 🔐 **Authentication** - Secure login system with demo accounts
- 🎯 **SEO Optimized** - Comprehensive meta tags and structured data
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 🚀 **Performance** - Optimized loading and smooth interactions

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Helmet Async** - SEO meta tag management
- **React Hot Toast** - Beautiful notifications
- **Heroicons** - Beautiful SVG icons
- **Lucide React** - Additional icon library

### **Development Tools**
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/your-username/jain-shikanji.git
cd jain-shikanji
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing (if added)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── ProductCard.tsx # Product display card
│   ├── CategoryTabs.tsx# Menu category navigation
│   ├── LoginModal.tsx  # Authentication modal
│   ├── AIChat.tsx      # AI assistant chat
│   └── SEOBlogContent.tsx # SEO optimization
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── MenuPage.tsx    # Menu browsing
│   ├── CartPage.tsx    # Shopping cart
│   ├── CheckoutPage.tsx# Order checkout
│   ├── LoyaltyProgram.tsx # Loyalty program
│   ├── CustomerDashboard.tsx # Customer portal
│   ├── OrderTrackingPage.tsx # Order tracking
│   ├── AdminDashboard.tsx # Admin overview
│   ├── ProductManagement.tsx # Admin products
│   ├── OrderManagement.tsx # Admin orders
│   ├── CustomerManagement.tsx # Admin customers
│   ├── StaffManagement.tsx # Admin staff
│   ├── InventoryManagement.tsx # Admin inventory
│   ├── MarketingCampaigns.tsx # Admin marketing
│   ├── ReportsAnalytics.tsx # Admin reports
│   ├── Settings.tsx    # Admin settings
│   ├── PrivacyPolicy.tsx # Legal page
│   ├── TermsConditions.tsx # Legal page
│   ├── ShippingPolicy.tsx # Legal page
│   └── ReturnPolicy.tsx # Legal page
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   ├── CartContext.tsx # Shopping cart state
│   ├── OrderContext.tsx# Order management
│   └── LocationContext.tsx # Store locations
├── data/               # Static data and configurations
│   └── knowledgeBase.ts # AI chat knowledge base
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
└── main.tsx           # Application entry point
```

## 🎯 Demo Accounts

### **Customer Account**
- **Email**: `customer@demo.com`
- **Password**: `demo123`
- **Features**: Full customer experience with cart, orders, loyalty

### **Admin Account**
- **Email**: `admin@jainshikanji.com`
- **Password**: `admin123`
- **Features**: Complete admin dashboard with all management tools

## 🌐 Production Deployment

### **Option 1: Netlify (Recommended)**

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

3. **Configure redirects**
Create `public/_redirects`:
```
/*    /index.html   200
```

### **Option 2: Vercel**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Configure vercel.json**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### **Option 3: AWS S3 + CloudFront**

1. **Build project**
```bash
npm run build
```

2. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure CloudFront**
- Set default root object to `index.html`
- Configure error pages to redirect to `index.html`

### **Option 4: Docker Deployment**

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf**
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

3. **Build and run**
```bash
docker build -t jain-shikanji .
docker run -p 80:80 jain-shikanji
```

## 🗄️ Database Setup (Future Enhancement)

### **Recommended: Supabase**

1. **Create Supabase Project**
```bash
# Visit https://supabase.com
# Create new project
# Get your project URL and anon key
```

2. **Environment Variables**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Database Schema**
```sql
-- Users table (extends Supabase auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  loyalty_points INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'Bronze',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_veg BOOLEAN DEFAULT true,
  is_jain BOOLEAN DEFAULT true,
  spice_level TEXT DEFAULT 'Mild',
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  delivery_address TEXT NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estimated_delivery TIMESTAMP WITH TIME ZONE
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  customizations JSONB DEFAULT '{}'
);
```

4. **Row Level Security**
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
```

### **Alternative: Firebase**

1. **Setup Firebase**
```bash
npm install firebase
```

2. **Configuration**
```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your config
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

## 🔐 Environment Variables

Create `.env` file:
```env
# Database (if using Supabase)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment Gateway (if integrating)
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Analytics (optional)
VITE_GA_TRACKING_ID=your_google_analytics_id

# API URLs
VITE_API_BASE_URL=https://api.jainshikanji.com
```

## 📊 Performance Optimization

### **Build Optimization**
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Optimize images
# Use WebP format for better compression
# Implement lazy loading for images
```

### **SEO Optimization**
- ✅ **Meta Tags**: Comprehensive SEO meta tags
- ✅ **Structured Data**: JSON-LD for rich snippets
- ✅ **Sitemap**: XML sitemap for search engines
- ✅ **Robots.txt**: Proper crawler instructions
- ✅ **Open Graph**: Social media sharing optimization
- ✅ **Performance**: Fast loading and Core Web Vitals

### **Security Checklist**
- ✅ **Input Validation**: All forms validated
- ✅ **XSS Protection**: Sanitized user inputs
- ✅ **HTTPS**: SSL certificate required
- ✅ **Environment Variables**: Sensitive data in env files
- ✅ **CORS**: Proper cross-origin configuration

## 🔧 Configuration

### **Tailwind CSS**
The project uses a custom Tailwind configuration with:
- Extended color palette (25+ shades per color)
- Custom animations and keyframes
- Modern spacing system (8px grid)
- Responsive breakpoints
- Custom component classes

### **TypeScript**
Strict TypeScript configuration with:
- Type safety for all components
- Interface definitions for data structures
- Proper error handling
- IDE support with IntelliSense

## 🚀 Production Checklist

### **Before Deployment**
- [ ] Update all placeholder content
- [ ] Configure real payment gateways
- [ ] Set up database with real data
- [ ] Configure email services
- [ ] Set up monitoring and analytics
- [ ] Test all user flows
- [ ] Optimize images and assets
- [ ] Configure CDN for static assets

### **Post-Deployment**
- [ ] Set up SSL certificate
- [ ] Configure custom domain
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure backup systems
- [ ] Set up CI/CD pipeline
- [ ] Monitor Core Web Vitals
- [ ] Set up error tracking

## 📱 Mobile App (Future Enhancement)

The codebase is structured to easily support:
- **React Native** conversion
- **Progressive Web App (PWA)** features
- **Mobile-specific optimizations**
- **Push notifications**
- **Offline functionality**

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### **Documentation**
- [API Documentation](docs/api.md)
- [Component Library](docs/components.md)
- [Deployment Guide](docs/deployment.md)

### **Contact**
- **Email**: support@jainshikanji.com
- **Phone**: +91 9876543210
- **Website**: https://jainshikanji.com

### **Demo Accounts**
- **Customer**: customer@demo.com / demo123
- **Admin**: admin@jainshikanji.com / admin123

---

**Built with ❤️ by the Jain Shikanji Team**

*Serving authentic Indian food and North Indian cuisine since 1995*