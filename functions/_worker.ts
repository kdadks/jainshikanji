import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import manifest from '__STATIC_CONTENT_MANIFEST';

// Define the environment type
type Bindings = {
  __STATIC_CONTENT: any;
  PRODUCTS?: KVNamespace;
  ORDERS?: KVNamespace;
  DB?: D1Database;
  IMAGES?: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for API calls
app.use('/api/*', cors());

// API Routes - Add your e-commerce API endpoints here
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Products API
app.get('/api/products', async (c) => {
  // Example: Fetch from KV or D1 Database
  // const products = await c.env.PRODUCTS?.get('all-products');
  
  return c.json({
    success: true,
    products: [
      { id: 1, name: 'Sample Product', price: 99.99 }
    ]
  });
});

app.get('/api/products/:id', async (c) => {
  const id = c.req.param('id');
  // Fetch specific product
  return c.json({
    success: true,
    product: { id, name: 'Product ' + id, price: 99.99 }
  });
});

// Orders API
app.post('/api/orders', async (c) => {
  const body = await c.req.json();
  // Process order and store in KV or D1
  return c.json({
    success: true,
    orderId: Date.now().toString(),
    message: 'Order placed successfully'
  });
});

app.get('/api/orders/:id', async (c) => {
  const id = c.req.param('id');
  // Fetch order details
  return c.json({
    success: true,
    order: { id, status: 'processing' }
  });
});

// Cart API
app.post('/api/cart', async (c) => {
  const body = await c.req.json();
  return c.json({
    success: true,
    message: 'Cart updated'
  });
});

// Payment API (integrate with payment gateway)
app.post('/api/payment/initiate', async (c) => {
  const body = await c.req.json();
  // Integrate with Stripe, Razorpay, or other payment gateway
  return c.json({
    success: true,
    paymentId: 'pay_' + Date.now(),
    clientSecret: 'secret_key'
  });
});

// Customer API
app.get('/api/customers/:id', async (c) => {
  const id = c.req.param('id');
  return c.json({
    success: true,
    customer: { id, name: 'Customer ' + id }
  });
});

// Analytics API
app.get('/api/analytics/dashboard', async (c) => {
  return c.json({
    success: true,
    data: {
      totalOrders: 150,
      totalRevenue: 45000,
      activeCustomers: 89
    }
  });
});

// Serve static assets (React build)
app.get('*', serveStatic({ root: './', manifest }));

// Fallback to index.html for client-side routing
app.get('*', serveStatic({ path: './index.html', manifest }));

export default app;
