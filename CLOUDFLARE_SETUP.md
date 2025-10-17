# 🚀 Cloudflare Workers API Setup - Quick Start

## ✅ What's Already Done

1. ✅ Wrangler CLI installed
2. ✅ Hono framework installed
3. ✅ Worker entry point created (`functions/_worker.ts`)
4. ✅ Wrangler configuration created (`wrangler.toml`)
5. ✅ Build scripts added to package.json
6. ✅ React app built successfully
7. ✅ API service layer created for frontend

## 🎯 Ready to Deploy!

### Quick Deployment (3 Steps)

```bash
# 1. Login to Cloudflare
npx wrangler login

# 2. Deploy
npm run deploy

# 3. Done! Your app is live 🎉
```

## 📝 Available NPM Scripts

```bash
# React Development (Current)
npm run dev              # Run React dev server (localhost:5173)

# Build
npm run build            # Build React app for production

# Worker Development & Deployment
npm run preview:worker   # Test worker locally with built app
npm run dev:worker       # Run worker in development mode
npm run deploy           # Build & deploy to production
npm run deploy:dev       # Build & deploy to dev environment
```

## 🔧 Configuration Files Created

- `wrangler.toml` - Cloudflare Workers configuration
- `functions/_worker.ts` - Worker entry point with Hono API
- `tsconfig.worker.json` - TypeScript config for workers
- `src/services/api.ts` - API service for React frontend
- `.dev.vars` - Local environment variables (not in git)
- `DEPLOYMENT.md` - Complete deployment guide

## 🌐 API Endpoints Available

Your worker now includes these API routes:

### Core APIs
- `GET /api/health` - Health check
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order
- `POST /api/cart` - Update cart
- `POST /api/payment/initiate` - Initiate payment
- `GET /api/customers/:id` - Get customer
- `GET /api/analytics/dashboard` - Analytics

See `functions/_worker.ts` for all available endpoints.

## 🔐 Environment Variables

### Local Development
Edit `.dev.vars` file:
```env
ENVIRONMENT=development
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your-secret-key
```

### Production
```bash
# Set secrets via CLI
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put JWT_SECRET

# Or via Cloudflare Dashboard:
# Workers & Pages > Your Worker > Settings > Variables
```

## 📊 Database Options

### Option 1: KV Storage (Key-Value)
```bash
npx wrangler kv:namespace create "PRODUCTS"
npx wrangler kv:namespace create "ORDERS"
```

### Option 2: D1 Database (SQL)
```bash
npx wrangler d1 create jainshikanji-db
```

### Option 3: R2 Storage (Files)
```bash
npx wrangler r2 bucket create jainshikanji-images
```

## 🔄 Update Your React App

Replace API calls in your React components with:

```typescript
import { apiService } from './services/api';

// Example usage in component
const products = await apiService.getProducts();
const order = await apiService.createOrder(orderData);
```

## 📚 Next Steps

1. **Deploy Now**: Run `npx wrangler login` then `npm run deploy`
2. **Set Up Database**: Choose KV, D1, or R2 based on your needs
3. **Update Worker**: Edit `functions/_worker.ts` to add your business logic
4. **Update React**: Use `src/services/api.ts` for API calls
5. **Add Authentication**: Implement JWT in worker
6. **Payment Integration**: Add Stripe/Razorpay in worker

## 📖 Full Documentation

See `DEPLOYMENT.md` for complete step-by-step guide with:
- Database setup instructions
- Custom domain configuration
- Payment gateway integration
- Security best practices
- Monitoring and logs
- Troubleshooting tips

## 🆘 Need Help?

1. **Authentication Issues**: Run `npx wrangler login`
2. **Build Errors**: Run `npm install && npm run build`
3. **View Logs**: Run `npx wrangler tail`
4. **Check Status**: Run `npx wrangler whoami`

## 💡 Tips

- Start with KV storage for simplicity
- Use D1 for complex queries
- Test locally with `npm run preview:worker`
- Monitor costs in Cloudflare Dashboard
- Free tier: 100,000 requests/day

---

**Ready to go live?** Just run: `npx wrangler login && npm run deploy` 🚀
