# 🚀 Cloudflare Workers Deployment Guide

This guide will help you deploy the Jain Shikanji e-commerce application to Cloudflare Workers.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://dash.cloudflare.com/sign-up)
2. **Node.js**: Version 18 or higher
3. **Wrangler CLI**: Already installed via npm

## 📋 Step-by-Step Deployment

### Step 1: Authenticate with Cloudflare

```bash
npx wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

### Step 2: Build Your Application

```bash
npm run build
```

This builds your React application into the `dist/` folder.

### Step 3: Deploy to Cloudflare Workers

```bash
npm run deploy
```

Or manually:

```bash
npx wrangler deploy
```

### Step 4: Your App is Live! 🎉

After deployment, you'll get a URL like:
- `https://jainshikanji.<your-subdomain>.workers.dev`

## 🔧 Configuration

### Environment Variables

1. **Local Development** (.dev.vars):
   - Already created for you
   - Add your API keys, secrets, database URLs here
   - NOT committed to git

2. **Production** (Cloudflare Dashboard):
   ```bash
   # Set via CLI
   npx wrangler secret put STRIPE_SECRET_KEY
   npx wrangler secret put JWT_SECRET
   
   # Or via dashboard
   # Go to: Workers & Pages > Your Worker > Settings > Variables
   ```

### Database Setup

#### Option 1: KV (Key-Value Storage) - Simple & Fast
Best for: Product catalogs, sessions, caching

```bash
# Create KV namespaces
npx wrangler kv:namespace create "PRODUCTS"
npx wrangler kv:namespace create "ORDERS"
npx wrangler kv:namespace create "SESSIONS"
```

Update `wrangler.toml` with the returned IDs:
```toml
[[kv_namespaces]]
binding = "PRODUCTS"
id = "your-kv-namespace-id"
```

#### Option 2: D1 (SQL Database) - Structured Data
Best for: Complex queries, relationships, transactions

```bash
# Create D1 database
npx wrangler d1 create jainshikanji-db

# Create tables
npx wrangler d1 execute jainshikanji-db --file=./schema.sql
```

#### Option 3: R2 (Object Storage) - File Storage
Best for: Product images, documents, media

```bash
# Create R2 bucket
npx wrangler r2 bucket create jainshikanji-images
```

### Custom Domain

1. Go to Cloudflare Dashboard
2. Navigate to: Workers & Pages > Your Worker > Settings > Domains & Routes
3. Click "Add Custom Domain"
4. Enter your domain: `shop.yourdomain.com`

## 🔄 Development Workflow

### Local Development (Vite)
```bash
npm run dev
```
Runs React app at `http://localhost:5173`

### Local Development (Workers)
```bash
npm run preview:worker
```
Tests the worker locally with your built app

### Production Deployment
```bash
npm run deploy
```

### Environment-specific Deployments
```bash
# Deploy to dev environment
npm run deploy:dev

# Deploy to production
npm run deploy
```

## 📝 API Endpoints Structure

Your worker now serves these APIs:

### Health Check
- `GET /api/health` - API status check

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

### Cart
- `POST /api/cart` - Update cart
- `GET /api/cart/:userId` - Get user cart

### Payments
- `POST /api/payment/initiate` - Start payment
- `POST /api/payment/verify` - Verify payment

### Customers
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats

## 🎯 Next Steps

1. **Implement Real Data Storage**: 
   - Set up D1 or KV namespaces
   - Create database schema
   - Update API routes to use real storage

2. **Add Authentication**:
   - Implement JWT tokens
   - Add user registration/login
   - Protect admin routes

3. **Payment Integration**:
   - Integrate Stripe/Razorpay
   - Add webhook handlers
   - Implement order confirmation emails

4. **Update React App**:
   - Change API calls to use `/api/*` endpoints
   - Add error handling
   - Implement loading states

## 🔍 Monitoring & Logs

### View Logs
```bash
npx wrangler tail
```

### Analytics
Go to: Cloudflare Dashboard > Workers & Pages > Your Worker > Analytics

## 🚨 Troubleshooting

### Build Errors
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Deployment Issues
```bash
# Check wrangler config
npx wrangler whoami

# Re-login
npx wrangler logout
npx wrangler login
```

### API Not Working
- Check CORS configuration in `_worker.ts`
- Verify routes are defined correctly
- Check browser console for errors

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Hono Framework](https://hono.dev/)
- [D1 Database](https://developers.cloudflare.com/d1/)
- [KV Storage](https://developers.cloudflare.com/kv/)
- [R2 Storage](https://developers.cloudflare.com/r2/)

## 💰 Pricing

- **Free Tier**: 100,000 requests/day
- **Paid**: $5/month for 10M requests
- **D1**: Free tier available
- **KV/R2**: Pay as you go

## ✅ Checklist Before Going Live

- [ ] Test all API endpoints
- [ ] Set up production environment variables
- [ ] Configure custom domain
- [ ] Set up database (D1/KV)
- [ ] Implement authentication
- [ ] Add payment gateway
- [ ] Test checkout flow end-to-end
- [ ] Set up monitoring and alerts
- [ ] Add error tracking (Sentry, etc.)
- [ ] Enable rate limiting
- [ ] Review security settings
- [ ] Create backup strategy
- [ ] Document API for frontend team

---

**Need Help?** Check the `/functions/_worker.ts` file for all available routes and implementations.
