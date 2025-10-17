# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
│  (React SPA - Your Jain Shikanji E-commerce Frontend)      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ HTTP Requests
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Workers                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Hono Framework (Web Server)                         │  │
│  │  - Routes: /api/*                                    │  │
│  │  - Static Assets: /*.html, /*.js, /*.css            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Endpoints                                       │  │
│  │  • GET  /api/products                                │  │
│  │  • POST /api/orders                                  │  │
│  │  • POST /api/payment/initiate                        │  │
│  │  • GET  /api/analytics/dashboard                     │  │
│  │  • ... (all your e-commerce APIs)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────┬──────────────┬──────────────┬──────────────────┘
            │              │              │
            ▼              ▼              ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │    KV    │   │    D1    │   │    R2    │
    │ Key-Value│   │   SQL    │   │  Files   │
    │ Storage  │   │ Database │   │ Storage  │
    └──────────┘   └──────────┘   └──────────┘
       Sessions       Products       Images
       Cache          Orders
       Tokens         Customers
```

## Request Flow

### 1. Static Assets (HTML, JS, CSS)
```
Browser → Cloudflare CDN → Worker → Serve from dist/
```

### 2. API Requests
```
Browser → /api/products → Worker → KV/D1 → Response
Browser → /api/orders → Worker → D1 + Payment Gateway → Response
Browser → /api/payment → Worker → Stripe/Razorpay → Response
```

## File Structure

```
jainshikanji/
├── src/                          # React Frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── api.ts               # ⭐ API service layer
│   └── ...
├── functions/
│   └── _worker.ts               # ⭐ Cloudflare Worker entry
├── dist/                         # Built React app (after npm run build)
│   ├── index.html
│   ├── assets/
│   └── .vite/manifest.json
├── wrangler.toml                # ⭐ Worker configuration
├── package.json                 # ⭐ Updated with deploy scripts
├── CLOUDFLARE_SETUP.md          # Quick start guide
└── DEPLOYMENT.md                # Complete deployment guide
```

## Data Storage Strategy

### KV Storage (Fast Key-Value)
- **Use for**: Sessions, cache, simple lookups
- **Example**: Product catalog, user sessions
- **Access**: `await env.PRODUCTS.get('product-123')`

### D1 Database (SQL)
- **Use for**: Complex queries, relationships
- **Example**: Orders, inventory, customers
- **Access**: `await env.DB.prepare('SELECT * FROM orders').all()`

### R2 Storage (Object Storage)
- **Use for**: Images, documents, media
- **Example**: Product images, invoices
- **Access**: `await env.IMAGES.get('product-image.jpg')`

## Deployment Pipeline

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  npm build   │  →   │   wrangler   │  →   │  Cloudflare  │
│              │      │    deploy    │      │   Workers    │
│ Build React  │      │ Upload dist/ │      │              │
│   to dist/   │      │ & _worker.ts │      │  🌍 LIVE     │
└──────────────┘      └──────────────┘      └──────────────┘
```

## Environment Variables

```
┌─────────────────────┐     ┌─────────────────────┐
│  Local (.dev.vars)  │     │  Production (CLI)   │
├─────────────────────┤     ├─────────────────────┤
│ ENVIRONMENT=dev     │     │ wrangler secret put │
│ STRIPE_KEY=test_... │     │ STRIPE_KEY          │
│ JWT_SECRET=local... │     │ JWT_SECRET          │
└─────────────────────┘     └─────────────────────┘
```

## Scaling Benefits

### ⚡ Performance
- **Global Edge Network**: Deploy to 300+ cities
- **Zero Cold Starts**: Always warm
- **Automatic Scaling**: Handle traffic spikes

### 💰 Cost Effective
- **Free Tier**: 100,000 requests/day
- **Pay per Use**: No idle costs
- **Included CDN**: Free bandwidth

### 🔒 Security
- **DDoS Protection**: Built-in
- **SSL/TLS**: Automatic
- **Rate Limiting**: Easy to implement

## API Integration Examples

### In Your React Components

```typescript
// Before (mock data)
const products = mockProducts;

// After (real API)
import { apiService } from './services/api';
const response = await apiService.getProducts();
const products = response.data;
```

### Adding New Endpoints

1. **Update Worker** (`functions/_worker.ts`):
```typescript
app.post('/api/customers', async (c) => {
  const customer = await c.req.json();
  // Save to D1 or KV
  return c.json({ success: true, customer });
});
```

2. **Update API Service** (`src/services/api.ts`):
```typescript
async createCustomer(customer: any) {
  return this.request('/customers', {
    method: 'POST',
    body: JSON.stringify(customer),
  });
}
```

3. **Use in React**:
```typescript
const result = await apiService.createCustomer(newCustomer);
```

## Monitoring & Analytics

```
Cloudflare Dashboard
├── Analytics
│   ├── Request count
│   ├── Response time
│   └── Error rate
├── Logs (Live Tail)
│   └── Console.log outputs
└── Metrics
    ├── CPU usage
    └── Memory usage
```

## Production Checklist

- [ ] Domain configured
- [ ] Environment variables set
- [ ] Database schema created
- [ ] Payment gateway integrated
- [ ] Error tracking setup (Sentry)
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Authentication implemented
- [ ] Admin routes protected
- [ ] Monitoring alerts configured

---

**Ready to Deploy?** Run: `npx wrangler login && npm run deploy`
