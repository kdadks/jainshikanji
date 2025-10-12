# Implementation Roadmap
# Jain Shikanji - Enterprise Transformation

**Version:** 1.0  
**Last Updated:** October 12, 2025  
**Status:** Planning Phase

---

## 🎯 Executive Summary

This document outlines the step-by-step implementation plan to transform Jain Shikanji from a frontend prototype into a production-ready, enterprise-scale platform.

---

## 📊 Current Status Assessment

### ✅ Completed
- [x] Modern React frontend with TypeScript
- [x] Responsive design (mobile-first)
- [x] Component-based architecture
- [x] UI/UX design and prototyping
- [x] Basic routing and navigation
- [x] Mock data and state management
- [x] SEO optimization structure

### ⚠️ In Progress / To Be Improved
- [ ] Remove all Bolt references (watermarks removed)
- [ ] Backend API development
- [ ] Database integration
- [ ] Authentication system
- [ ] Payment processing
- [ ] Real-time features
- [ ] Production deployment
- [ ] Testing infrastructure

---

## 🚀 Quick Start Implementation Guide

### Phase 0: Immediate Actions (Week 1)

#### Day 1-2: Environment Setup
```bash
# 1. Set up version control (DONE ✅)
git status

# 2. Create development branch
git checkout -b develop

# 3. Set up environment files
cp .env.example .env.local
cp .env.example .env.production

# 4. Update package.json
npm install --save-dev @types/node
```

#### Day 3-5: Backend Foundation
```bash
# 1. Create backend directory structure
mkdir -p server/{src,tests,config}
mkdir -p server/src/{controllers,services,models,routes,middleware,utils}

# 2. Initialize backend project
cd server
npm init -y
npm install express cors helmet dotenv bcrypt jsonwebtoken
npm install -D typescript @types/express @types/node ts-node-dev nodemon

# 3. Create basic server structure
# See detailed setup in ARCHITECTURE.md
```

#### Day 6-7: Database Setup
```bash
# Option 1: Local PostgreSQL
brew install postgresql@15  # macOS
sudo systemctl start postgresql  # Linux

# Option 2: Supabase (Recommended for rapid development)
# Sign up at https://supabase.com
# Create new project
# Get connection string

# 3. Install database dependencies
npm install pg @prisma/client
npm install -D prisma
npx prisma init
```

---

## 📋 Phase 1: Backend Foundation (Weeks 1-8)

### Sprint 1: Project Setup & Basic API (Week 1-2)

#### Tasks:
1. **Backend Project Initialization**
   ```bash
   # Create server directory
   mkdir server && cd server
   npm init -y
   
   # Install dependencies
   npm install express cors helmet dotenv
   npm install typescript @types/express @types/node ts-node-dev -D
   
   # Initialize TypeScript
   npx tsc --init
   ```

2. **Express Server Setup**
   ```typescript
   // server/src/index.ts
   import express from 'express';
   import cors from 'cors';
   import helmet from 'helmet';
   
   const app = express();
   const PORT = process.env.PORT || 5000;
   
   app.use(helmet());
   app.use(cors());
   app.use(express.json());
   
   app.get('/health', (req, res) => {
     res.json({ status: 'healthy' });
   });
   
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

3. **Database Setup with Prisma**
   ```bash
   npm install @prisma/client
   npm install -D prisma
   npx prisma init
   ```
   
   ```prisma
   // prisma/schema.prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   
   generator client {
     provider = "prisma-client-js"
   }
   
   model User {
     id            String   @id @default(uuid())
     email         String   @unique
     password      String
     name          String
     phone         String?
     role          String   @default("customer")
     loyaltyPoints Int      @default(0)
     tier          String   @default("Bronze")
     createdAt     DateTime @default(now())
     updatedAt     DateTime @updatedAt
     orders        Order[]
     addresses     Address[]
   }
   
   model Product {
     id          String   @id @default(uuid())
     name        String
     description String?
     price       Decimal
     category    String
     isVeg       Boolean  @default(true)
     isJain      Boolean  @default(true)
     rating      Decimal  @default(0)
     reviewCount Int      @default(0)
     isAvailable Boolean  @default(true)
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
   }
   
   model Order {
     id                String   @id @default(uuid())
     userId            String
     user              User     @relation(fields: [userId], references: [id])
     status            String   @default("pending")
     total             Decimal
     paymentStatus     String   @default("pending")
     deliveryAddress   String
     createdAt         DateTime @default(now())
     updatedAt         DateTime @updatedAt
   }
   
   model Address {
     id        String   @id @default(uuid())
     userId    String
     user      User     @relation(fields: [userId], references: [id])
     type      String   @default("home")
     address   String
     landmark  String?
     city      String
     state     String
     pincode   String
     isDefault Boolean  @default(false)
     createdAt DateTime @default(now())
   }
   ```

4. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

#### Deliverables:
- ✅ Express server running on port 5000
- ✅ PostgreSQL database connected
- ✅ Prisma ORM configured
- ✅ Basic health check endpoint
- ✅ TypeScript configuration

---

### Sprint 2: Authentication System (Week 3-4)

#### Tasks:
1. **Install Auth Dependencies**
   ```bash
   npm install jsonwebtoken bcrypt
   npm install @types/jsonwebtoken @types/bcrypt -D
   ```

2. **Create Auth Service**
   ```typescript
   // server/src/services/auth.service.ts
   import bcrypt from 'bcrypt';
   import jwt from 'jsonwebtoken';
   import { PrismaClient } from '@prisma/client';
   
   const prisma = new PrismaClient();
   const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
   
   export class AuthService {
     async register(email: string, password: string, name: string) {
       const hashedPassword = await bcrypt.hash(password, 12);
       
       const user = await prisma.user.create({
         data: {
           email,
           password: hashedPassword,
           name
         }
       });
       
       const token = this.generateToken(user.id);
       return { user, token };
     }
     
     async login(email: string, password: string) {
       const user = await prisma.user.findUnique({
         where: { email }
       });
       
       if (!user) {
         throw new Error('User not found');
       }
       
       const isValid = await bcrypt.compare(password, user.password);
       if (!isValid) {
         throw new Error('Invalid password');
       }
       
       const token = this.generateToken(user.id);
       return { user, token };
     }
     
     generateToken(userId: string) {
       return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
     }
     
     verifyToken(token: string) {
       return jwt.verify(token, JWT_SECRET);
     }
   }
   ```

3. **Create Auth Middleware**
   ```typescript
   // server/src/middleware/auth.middleware.ts
   import { Request, Response, NextFunction } from 'express';
   import jwt from 'jsonwebtoken';
   
   const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
   
   export const authMiddleware = (
     req: Request,
     res: Response,
     next: NextFunction
   ) => {
     try {
       const token = req.headers.authorization?.split(' ')[1];
       
       if (!token) {
         return res.status(401).json({ error: 'No token provided' });
       }
       
       const decoded = jwt.verify(token, JWT_SECRET);
       req.user = decoded;
       next();
     } catch (error) {
       return res.status(401).json({ error: 'Invalid token' });
     }
   };
   ```

4. **Create Auth Routes**
   ```typescript
   // server/src/routes/auth.routes.ts
   import { Router } from 'express';
   import { AuthService } from '../services/auth.service';
   
   const router = Router();
   const authService = new AuthService();
   
   router.post('/register', async (req, res) => {
     try {
       const { email, password, name } = req.body;
       const result = await authService.register(email, password, name);
       res.json(result);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   
   router.post('/login', async (req, res) => {
     try {
       const { email, password } = req.body;
       const result = await authService.login(email, password);
       res.json(result);
     } catch (error) {
       res.status(401).json({ error: error.message });
     }
   });
   
   export default router;
   ```

#### Deliverables:
- ✅ User registration endpoint
- ✅ User login endpoint
- ✅ JWT token generation
- ✅ Auth middleware
- ✅ Password hashing with bcrypt

---

### Sprint 3: Product & Order APIs (Week 5-6)

#### Tasks:
1. **Product Service**
   ```typescript
   // server/src/services/product.service.ts
   import { PrismaClient } from '@prisma/client';
   
   const prisma = new PrismaClient();
   
   export class ProductService {
     async getAll(filters?: any) {
       return await prisma.product.findMany({
         where: {
           isAvailable: true,
           ...filters
         },
         orderBy: { rating: 'desc' }
       });
     }
     
     async getById(id: string) {
       return await prisma.product.findUnique({
         where: { id }
       });
     }
     
     async create(data: any) {
       return await prisma.product.create({ data });
     }
     
     async update(id: string, data: any) {
       return await prisma.product.update({
         where: { id },
         data
       });
     }
     
     async delete(id: string) {
       return await prisma.product.delete({
         where: { id }
       });
     }
   }
   ```

2. **Order Service**
   ```typescript
   // server/src/services/order.service.ts
   import { PrismaClient } from '@prisma/client';
   
   const prisma = new PrismaClient();
   
   export class OrderService {
     async create(userId: string, orderData: any) {
       return await prisma.order.create({
         data: {
           userId,
           ...orderData
         }
       });
     }
     
     async getByUser(userId: string) {
       return await prisma.order.findMany({
         where: { userId },
         orderBy: { createdAt: 'desc' }
       });
     }
     
     async updateStatus(id: string, status: string) {
       return await prisma.order.update({
         where: { id },
         data: { status }
       });
     }
   }
   ```

#### Deliverables:
- ✅ Product CRUD endpoints
- ✅ Order creation and retrieval
- ✅ Order status management
- ✅ Data validation

---

### Sprint 4: Payment Integration (Week 7-8)

#### Tasks:
1. **Install Razorpay SDK**
   ```bash
   npm install razorpay
   ```

2. **Payment Service**
   ```typescript
   // server/src/services/payment.service.ts
   import Razorpay from 'razorpay';
   
   const razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID!,
     key_secret: process.env.RAZORPAY_KEY_SECRET!
   });
   
   export class PaymentService {
     async createOrder(amount: number, orderId: string) {
       const options = {
         amount: amount * 100, // Convert to paise
         currency: 'INR',
         receipt: orderId
       };
       
       return await razorpay.orders.create(options);
     }
     
     async verifyPayment(
       razorpayOrderId: string,
       razorpayPaymentId: string,
       razorpaySignature: string
     ) {
       // Verification logic
       const crypto = require('crypto');
       const text = razorpayOrderId + '|' + razorpayPaymentId;
       const generated_signature = crypto
         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
         .update(text)
         .digest('hex');
       
       return generated_signature === razorpaySignature;
     }
   }
   ```

#### Deliverables:
- ✅ Payment order creation
- ✅ Payment verification
- ✅ Razorpay integration
- ✅ Secure payment flow

---

## 📋 Phase 2: Frontend Integration (Weeks 9-12)

### Sprint 5: API Integration (Week 9-10)

#### Tasks:
1. **Create API Client**
   ```typescript
   // src/lib/api.ts
   import axios from 'axios';
   
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
   
   const api = axios.create({
     baseURL: API_BASE_URL,
     headers: {
       'Content-Type': 'application/json'
     }
   });
   
   // Add token to requests
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   export default api;
   ```

2. **Update Context to Use Real API**
   ```typescript
   // src/context/AuthContext.tsx - Update to use real API
   import api from '../lib/api';
   
   const login = async (email: string, password: string) => {
     const response = await api.post('/auth/login', { email, password });
     const { user, token } = response.data;
     
     localStorage.setItem('token', token);
     setUser(user);
     setIsAuthenticated(true);
   };
   ```

3. **Install React Query**
   ```bash
   npm install @tanstack/react-query
   ```

4. **Set up React Query**
   ```typescript
   // src/lib/queryClient.ts
   import { QueryClient } from '@tanstack/react-query';
   
   export const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         refetchOnWindowFocus: false,
         retry: 1,
         staleTime: 5 * 60 * 1000 // 5 minutes
       }
     }
   });
   ```

#### Deliverables:
- ✅ API client setup
- ✅ React Query integration
- ✅ Auth context updated with real API
- ✅ Error handling

---

### Sprint 6: Real Data Integration (Week 11-12)

#### Tasks:
1. Replace mock data with API calls in all components
2. Add loading states
3. Add error handling
4. Implement caching strategies
5. Add optimistic updates

#### Deliverables:
- ✅ All components using real data
- ✅ Loading states implemented
- ✅ Error boundaries added
- ✅ Smooth user experience

---

## 📋 Phase 3: Advanced Features (Weeks 13-20)

### Sprint 7-8: Real-time Features (Week 13-16)
- WebSocket implementation
- Real-time order tracking
- Live notifications
- Admin dashboard live updates

### Sprint 9-10: PWA & Mobile (Week 17-20)
- Service worker implementation
- Offline support
- Push notifications
- Mobile app (React Native)

---

## 🎯 Immediate Action Items

### This Week:
1. **Backend Setup** (Priority: CRITICAL)
   - [ ] Create `server` directory
   - [ ] Initialize Node.js project
   - [ ] Set up PostgreSQL database
   - [ ] Install Prisma ORM
   - [ ] Create basic Express server
   - [ ] Test database connection

2. **Environment Configuration**
   - [ ] Create `.env.local` for development
   - [ ] Set up environment variables
   - [ ] Configure database connection
   - [ ] Set JWT secret

3. **Database Schema**
   - [ ] Design database schema
   - [ ] Create Prisma schema
   - [ ] Run initial migration
   - [ ] Seed database with test data

### Next Week:
1. **Authentication**
   - [ ] Implement user registration
   - [ ] Implement user login
   - [ ] Create auth middleware
   - [ ] Test auth flow

2. **API Development**
   - [ ] Create product endpoints
   - [ ] Create order endpoints
   - [ ] Add input validation
   - [ ] Write API documentation

---

## 📚 Resources & References

### Documentation:
- [Prisma ORM Docs](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [React Query Docs](https://tanstack.com/query/latest)

### Tools:
- [Postman](https://www.postman.com/) - API testing
- [DBeaver](https://dbeaver.io/) - Database management
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - Containerization
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace):
  - Prisma
  - ESLint
  - Prettier
  - GitLens
  - Thunder Client (API testing)

---

## ✅ Success Criteria

### Phase 1 Success:
- [ ] Backend server running and stable
- [ ] Database connected and migrations complete
- [ ] Authentication working end-to-end
- [ ] Core APIs (products, orders) functional
- [ ] Payment integration complete
- [ ] Frontend consuming real APIs

### Phase 2 Success:
- [ ] All mock data replaced with real data
- [ ] User can register, login, and order
- [ ] Payments processing successfully
- [ ] Admin can manage products and orders
- [ ] Real-time order tracking working

### Phase 3 Success:
- [ ] PWA capabilities implemented
- [ ] Push notifications working
- [ ] Offline mode functional
- [ ] Performance optimized
- [ ] Production deployment complete

---

## 🚨 Blockers & Risks

### Potential Blockers:
1. **Database hosting decision** - Need to choose between self-hosted vs managed
2. **Payment gateway approval** - Razorpay business verification
3. **Domain and SSL** - Need to purchase and configure
4. **DevOps expertise** - May need to hire DevOps engineer

### Risk Mitigation:
- Start with managed services (Supabase, Railway, etc.)
- Use Razorpay test mode during development
- Use Vercel/Netlify for initial deployment
- Document everything for future team members

---

## 📞 Support & Contact

**Technical Lead**: [Your Name]  
**Email**: tech@jainshikanji.com  
**Slack**: #jainshikanji-dev  
**GitHub**: https://github.com/kdadks/jainshikanji

---

**Last Updated**: October 12, 2025  
**Next Review**: October 19, 2025  
**Status**: ✅ Ready to Begin Phase 1
