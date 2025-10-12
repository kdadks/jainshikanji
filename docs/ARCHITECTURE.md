# Enterprise Architecture Plan
# Jain Shikanji Platform

**Version:** 2.0  
**Last Updated:** October 12, 2025  
**Document Owner:** Engineering Team  
**Status:** In Progress

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current Architecture Assessment](#current-architecture-assessment)
3. [Target Enterprise Architecture](#target-enterprise-architecture)
4. [System Architecture](#system-architecture)
5. [Database Architecture](#database-architecture)
6. [Security Architecture](#security-architecture)
7. [Infrastructure & DevOps](#infrastructure--devops)
8. [Scalability Strategy](#scalability-strategy)
9. [Migration Plan](#migration-plan)
10. [Technology Stack](#technology-stack)
11. [Cost Estimation](#cost-estimation)

---

## 1. Executive Summary

### 1.1 Current State
The Jain Shikanji platform is currently a **monolithic single-page application (SPA)** built with React, TypeScript, and Tailwind CSS. It uses:
- ❌ No real backend (mock data)
- ❌ No database (client-side state only)
- ❌ No authentication system
- ❌ No payment processing
- ❌ No API layer
- ❌ Limited scalability

### 1.2 Target State
Transform into a **modern, enterprise-grade, cloud-native platform** with:
- ✅ Microservices architecture
- ✅ Multi-tenant database design
- ✅ Real-time data synchronization
- ✅ Horizontal scalability
- ✅ 99.9% uptime SLA
- ✅ Support for 1M+ users
- ✅ Global CDN distribution
- ✅ Advanced security measures

### 1.3 Key Benefits
- **Scalability**: Handle 100x current traffic
- **Reliability**: 99.9% uptime with auto-failover
- **Performance**: Sub-200ms API response times
- **Security**: Enterprise-grade security compliance
- **Maintainability**: Modular, testable codebase
- **Cost Efficiency**: Pay-as-you-grow cloud infrastructure

---

## 2. Current Architecture Assessment

### 2.1 Current Tech Stack
```
Frontend Layer:
├── React 18.3.1 (SPA)
├── TypeScript 5.5.3
├── Tailwind CSS 3.4.1
├── React Router DOM 7.8.2
├── Context API (State Management)
└── Vite 5.4.2 (Build Tool)

Mock Data Layer:
├── Hardcoded JSON data
├── LocalStorage for cart persistence
└── No real API calls

Hosting:
└── Static hosting (Netlify/Vercel potential)
```

### 2.2 Current Strengths
- ✅ **Modern Frontend**: React with TypeScript
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Code Quality**: ESLint, type safety
- ✅ **Performance**: Fast Vite builds
- ✅ **UI/UX**: Polished, professional design
- ✅ **Component Architecture**: Reusable components

### 2.3 Current Limitations
- ❌ **No Backend**: All logic in frontend
- ❌ **No Data Persistence**: Mock data only
- ❌ **Security**: No authentication/authorization
- ❌ **Scalability**: Not designed for growth
- ❌ **Real-time**: No WebSocket/live updates
- ❌ **Analytics**: No usage tracking
- ❌ **Multi-tenant**: Single instance only
- ❌ **API**: No external integrations

### 2.4 Technical Debt
| Issue | Impact | Effort to Fix |
|-------|--------|---------------|
| No backend API | CRITICAL | 8-10 weeks |
| Mock data everywhere | HIGH | 6-8 weeks |
| No authentication | HIGH | 3-4 weeks |
| LocalStorage only | MEDIUM | 2 weeks |
| No error tracking | MEDIUM | 1 week |
| No testing infrastructure | MEDIUM | 3-4 weeks |
| No CI/CD pipeline | MEDIUM | 2 weeks |

---

## 3. Target Enterprise Architecture

### 3.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Web App (React)  │  Mobile App (React Native)  │  Admin Portal │
│                   │                             │               │
└────────┬──────────┴─────────────┬───────────────┴───────┬───────┘
         │                        │                       │
         │                        │                       │
┌────────▼────────────────────────▼───────────────────────▼────────┐
│                        API GATEWAY LAYER                          │
│              (Kong / AWS API Gateway / Nginx)                     │
│  • Authentication  • Rate Limiting  • Load Balancing              │
│  • Request Routing • SSL Termination • API Versioning            │
└────────┬──────────────────────────────────────────────────┬──────┘
         │                                                   │
         │                                                   │
┌────────▼───────────────────────────────────────────────────▼─────┐
│                      MICROSERVICES LAYER                          │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Auth      │  │   User      │  │   Product   │             │
│  │  Service    │  │  Service    │  │   Service   │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │   Order     │  │   Payment   │  │  Inventory  │             │
│  │  Service    │  │  Service    │  │   Service   │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐             │
│  │ Notification│  │  Analytics  │  │   Loyalty   │             │
│  │  Service    │  │  Service    │  │   Service   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
└────────┬──────────────────────────────────────────────────┬──────┘
         │                                                   │
         │                                                   │
┌────────▼───────────────────────────────────────────────────▼─────┐
│                      MESSAGE QUEUE LAYER                          │
│            (RabbitMQ / Apache Kafka / AWS SQS)                    │
│  • Async Processing  • Event Streaming  • Decoupling             │
└───────────────────────────────────────────────────────────────────┘
         │                                                   │
         │                                                   │
┌────────▼───────────────────────────────────────────────────▼─────┐
│                       DATA LAYER                                  │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ PostgreSQL  │  │   MongoDB   │  │    Redis    │             │
│  │ (Primary DB)│  │  (Logs/Docs)│  │   (Cache)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │Elasticsearch│  │   S3/CDN    │  │  TimescaleDB│             │
│  │  (Search)   │  │  (Assets)   │  │ (Analytics) │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
         │                                                   │
         │                                                   │
┌────────▼───────────────────────────────────────────────────▼─────┐
│                    EXTERNAL SERVICES                              │
├───────────────────────────────────────────────────────────────────┤
│  Payment Gateway  │  SMS Gateway  │  Email Service               │
│  (Razorpay/Stripe)│  (Twilio/SNS) │  (SendGrid/SES)             │
│                                                                   │
│  Push Notifications│  Analytics   │  Error Tracking              │
│  (FCM)            │  (Mixpanel)  │  (Sentry)                    │
└───────────────────────────────────────────────────────────────────┘
```

### 3.2 Architecture Principles

#### 3.2.1 Design Principles
1. **Separation of Concerns**: Each service has a single responsibility
2. **Loose Coupling**: Services communicate via well-defined APIs
3. **High Cohesion**: Related functionality grouped together
4. **Stateless Services**: Services don't maintain session state
5. **API-First**: Design APIs before implementation
6. **Security by Design**: Security built-in, not bolted-on
7. **Fail Fast**: Validate early and provide clear errors
8. **Idempotency**: Operations can be safely retried

#### 3.2.2 Architectural Patterns
- **Microservices**: Domain-driven service boundaries
- **Event-Driven**: Async communication via message queues
- **CQRS**: Separate read and write operations
- **API Gateway**: Single entry point for clients
- **Circuit Breaker**: Prevent cascading failures
- **Saga Pattern**: Distributed transactions
- **Database per Service**: Each service owns its data
- **Strangler Fig**: Gradual migration from monolith

---

## 4. System Architecture

### 4.1 Microservices Breakdown

#### 4.1.1 Authentication Service
**Purpose**: User authentication and authorization  
**Technology**: Node.js + Express + Passport.js  
**Database**: PostgreSQL (users table) + Redis (sessions)  
**Key Features**:
- JWT token generation and validation
- OAuth integration (Google, Facebook)
- OTP-based phone authentication
- Role-based access control (RBAC)
- Session management
- Password reset flow
- Multi-factor authentication (MFA)

**API Endpoints**:
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/verify-otp
GET    /api/v1/auth/me
```

#### 4.1.2 User Service
**Purpose**: User profile and preferences management  
**Technology**: Node.js + Express  
**Database**: PostgreSQL  
**Key Features**:
- Profile CRUD operations
- Address management
- Preference settings
- Favorite items
- User search and filtering

**API Endpoints**:
```
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
GET    /api/v1/users/:id/addresses
POST   /api/v1/users/:id/addresses
PUT    /api/v1/users/:id/addresses/:addressId
DELETE /api/v1/users/:id/addresses/:addressId
GET    /api/v1/users/:id/favorites
POST   /api/v1/users/:id/favorites
```

#### 4.1.3 Product Service
**Purpose**: Product catalog management  
**Technology**: Node.js + Express  
**Database**: PostgreSQL + Elasticsearch  
**Key Features**:
- Product CRUD
- Category management
- Search and filtering
- Recommendations
- Reviews and ratings
- Inventory sync

**API Endpoints**:
```
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
GET    /api/v1/products/search?q=:query
GET    /api/v1/products/categories
GET    /api/v1/products/:id/reviews
POST   /api/v1/products/:id/reviews
```

#### 4.1.4 Order Service
**Purpose**: Order lifecycle management  
**Technology**: Node.js + Express  
**Database**: PostgreSQL  
**Key Features**:
- Order creation and tracking
- Order status management
- Order history
- Order modifications
- Cancellation and refunds
- Delivery scheduling

**API Endpoints**:
```
POST   /api/v1/orders
GET    /api/v1/orders
GET    /api/v1/orders/:id
PUT    /api/v1/orders/:id
DELETE /api/v1/orders/:id
GET    /api/v1/orders/:id/status
PUT    /api/v1/orders/:id/status
GET    /api/v1/orders/user/:userId
POST   /api/v1/orders/:id/cancel
```

#### 4.1.5 Payment Service
**Purpose**: Payment processing and reconciliation  
**Technology**: Node.js + Express  
**Database**: PostgreSQL  
**Key Features**:
- Payment gateway integration
- Payment processing
- Refund handling
- Payment history
- Invoice generation
- Payment reconciliation

**API Endpoints**:
```
POST   /api/v1/payments/initiate
POST   /api/v1/payments/verify
POST   /api/v1/payments/:id/refund
GET    /api/v1/payments/:id
GET    /api/v1/payments/user/:userId
GET    /api/v1/payments/:id/invoice
```

#### 4.1.6 Inventory Service
**Purpose**: Stock and inventory management  
**Technology**: Node.js + Express  
**Database**: PostgreSQL  
**Key Features**:
- Stock tracking
- Low stock alerts
- Supplier management
- Purchase orders
- Stock adjustments
- Inventory reports

**API Endpoints**:
```
GET    /api/v1/inventory
GET    /api/v1/inventory/:productId
PUT    /api/v1/inventory/:productId
POST   /api/v1/inventory/purchase-orders
GET    /api/v1/inventory/low-stock
POST   /api/v1/inventory/adjustments
```

#### 4.1.7 Notification Service
**Purpose**: Multi-channel notifications  
**Technology**: Node.js + Express + Bull (Queue)  
**Database**: MongoDB (logs)  
**Key Features**:
- Email notifications
- SMS notifications
- Push notifications
- In-app notifications
- Notification templates
- Delivery tracking

**API Endpoints**:
```
POST   /api/v1/notifications/send
GET    /api/v1/notifications/user/:userId
PUT    /api/v1/notifications/:id/read
GET    /api/v1/notifications/preferences
PUT    /api/v1/notifications/preferences
```

#### 4.1.8 Analytics Service
**Purpose**: Business intelligence and reporting  
**Technology**: Node.js + Express  
**Database**: TimescaleDB (time-series)  
**Key Features**:
- Real-time dashboards
- Sales reports
- Customer analytics
- Product performance
- Custom reports
- Data export

**API Endpoints**:
```
GET    /api/v1/analytics/dashboard
GET    /api/v1/analytics/sales
GET    /api/v1/analytics/customers
GET    /api/v1/analytics/products
GET    /api/v1/analytics/reports/:reportId
POST   /api/v1/analytics/custom-report
```

#### 4.1.9 Loyalty Service
**Purpose**: Loyalty program and rewards  
**Technology**: Node.js + Express  
**Database**: PostgreSQL  
**Key Features**:
- Points calculation
- Tier management
- Rewards catalog
- Points redemption
- Campaign management
- Birthday rewards

**API Endpoints**:
```
GET    /api/v1/loyalty/user/:userId
POST   /api/v1/loyalty/earn
POST   /api/v1/loyalty/redeem
GET    /api/v1/loyalty/rewards
GET    /api/v1/loyalty/tiers
GET    /api/v1/loyalty/history/:userId
```

### 4.2 API Gateway Configuration

#### 4.2.1 Gateway Responsibilities
- **Authentication**: Verify JWT tokens
- **Authorization**: Check user permissions
- **Rate Limiting**: Prevent API abuse
- **Request Routing**: Direct to appropriate service
- **Load Balancing**: Distribute traffic
- **SSL Termination**: Handle HTTPS
- **Request/Response Transformation**: Data formatting
- **Caching**: Cache frequent requests
- **Logging**: Centralized logging
- **Metrics**: Performance monitoring

#### 4.2.2 Rate Limiting Strategy
```yaml
Rate Limits:
  Public APIs:
    - 100 requests per minute per IP
    - 1000 requests per hour per IP
  
  Authenticated Users:
    - 1000 requests per minute
    - 50,000 requests per hour
  
  Admin Users:
    - 5000 requests per minute
    - No hourly limit
  
  API Keys (Partners):
    - Custom limits per contract
```

#### 4.2.3 API Versioning
- **Strategy**: URL-based versioning (e.g., `/api/v1/`, `/api/v2/`)
- **Deprecation Policy**: Maintain previous version for 12 months
- **Version Discovery**: `GET /api/versions`
- **Breaking Changes**: New major version required

---

## 5. Database Architecture

### 5.1 Database Selection Strategy

#### 5.1.1 PostgreSQL (Primary Database)
**Use Cases**:
- User accounts and profiles
- Orders and transactions
- Products and inventory
- Relationships and joins
- ACID compliance required

**Schema Design**:
```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    is_verified BOOLEAN DEFAULT false,
    loyalty_points INTEGER DEFAULT 0,
    tier VARCHAR(50) DEFAULT 'Bronze',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    is_veg BOOLEAN DEFAULT true,
    is_jain BOOLEAN DEFAULT true,
    spice_level VARCHAR(20),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) DEFAULT 0,
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    special_instructions TEXT,
    estimated_delivery TIMESTAMP,
    delivered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    customizations JSONB DEFAULT '{}'
);

-- Addresses Table
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) DEFAULT 'home',
    address TEXT NOT NULL,
    landmark VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    order_id UUID REFERENCES orders(id),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    images TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);

-- Inventory Table
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    unit VARCHAR(50),
    supplier_id UUID,
    last_restocked TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Loyalty Transactions Table
CREATE TABLE loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    points INTEGER NOT NULL,
    type VARCHAR(50), -- earn, redeem, expire
    description TEXT,
    order_id UUID REFERENCES orders(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Coupons Table
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20), -- percentage, fixed
    discount_value DECIMAL(10,2),
    min_order_value DECIMAL(10,2),
    max_discount DECIMAL(10,2),
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_loyalty_user_id ON loyalty_transactions(user_id);
```

#### 5.1.2 Redis (Caching Layer)
**Use Cases**:
- Session storage
- API response caching
- Rate limiting counters
- Real-time leaderboards
- Pub/sub for real-time features
- Shopping cart data

**Data Structures**:
```
# Session Storage
KEY: session:{sessionId}
TYPE: Hash
TTL: 24 hours

# Cart Storage
KEY: cart:{userId}
TYPE: Hash
TTL: 7 days

# Product Cache
KEY: product:{productId}
TYPE: String (JSON)
TTL: 1 hour

# Category Products Cache
KEY: products:category:{category}
TYPE: List
TTL: 30 minutes

# Rate Limiting
KEY: rate_limit:{userId}:{endpoint}
TYPE: String (counter)
TTL: 1 minute
```

#### 5.1.3 MongoDB (Document Store)
**Use Cases**:
- Application logs
- Notification history
- Analytics events
- Audit trails
- Configuration documents

#### 5.1.4 Elasticsearch (Search Engine)
**Use Cases**:
- Product search
- Autocomplete
- Faceted search
- Full-text search
- Analytics queries

**Index Structure**:
```json
{
  "products": {
    "mappings": {
      "properties": {
        "id": { "type": "keyword" },
        "name": { 
          "type": "text",
          "fields": {
            "keyword": { "type": "keyword" }
          }
        },
        "description": { "type": "text" },
        "category": { "type": "keyword" },
        "price": { "type": "float" },
        "rating": { "type": "float" },
        "tags": { "type": "keyword" },
        "is_available": { "type": "boolean" }
      }
    }
  }
}
```

#### 5.1.5 TimescaleDB (Time-Series)
**Use Cases**:
- Real-time analytics
- Performance metrics
- Order trends
- User behavior tracking

### 5.2 Data Replication & Backup

#### 5.2.1 Replication Strategy
```
Master-Slave Replication:
├── Primary (Write)
│   └── Region: Mumbai (Primary DC)
│
└── Replicas (Read)
    ├── Replica 1: Mumbai (Same DC)
    ├── Replica 2: Bangalore (DR)
    └── Replica 3: Delhi (Geo-distributed)

Read Distribution:
- Customer queries → Nearest read replica
- Admin queries → Primary (always fresh)
- Analytics → Dedicated replica
```

#### 5.2.2 Backup Strategy
```yaml
Backup Schedule:
  Full Backup:
    Frequency: Daily at 2 AM IST
    Retention: 30 days
    Storage: AWS S3 (Cross-region replication)
  
  Incremental Backup:
    Frequency: Every 6 hours
    Retention: 7 days
  
  Point-in-Time Recovery:
    Enabled: Yes
    Retention: 7 days
  
  Disaster Recovery:
    RPO: 1 hour (Recovery Point Objective)
    RTO: 4 hours (Recovery Time Objective)
```

### 5.3 Database Optimization

#### 5.3.1 Query Optimization
- Use connection pooling (max 100 connections)
- Implement query caching
- Add appropriate indexes
- Use EXPLAIN ANALYZE for slow queries
- Implement query timeout (5 seconds)
- Use prepared statements

#### 5.3.2 Partitioning Strategy
```sql
-- Partition orders table by created_at (monthly)
CREATE TABLE orders_2026_01 PARTITION OF orders
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE orders_2026_02 PARTITION OF orders
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

---

## 6. Security Architecture

### 6.1 Authentication & Authorization

#### 6.1.1 JWT Token Structure
```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-uuid",
    "email": "user@example.com",
    "role": "customer",
    "iat": 1634567890,
    "exp": 1634654290
  }
}
```

**Token Strategy**:
- Access Token: 15 minutes expiry
- Refresh Token: 30 days expiry
- Stored in httpOnly cookies
- Rotate refresh tokens on use

#### 6.1.2 Role-Based Access Control (RBAC)
```yaml
Roles:
  super_admin:
    - Full system access
    - User management
    - Settings configuration
  
  admin:
    - Order management
    - Product management
    - Customer management
    - Reports access
  
  staff:
    - Order viewing
    - Order status updates
    - Inventory management
  
  customer:
    - Place orders
    - View own orders
    - Manage profile
    
  guest:
    - Browse products
    - View menu
```

### 6.2 Data Security

#### 6.2.1 Encryption
- **At Rest**: AES-256 encryption for databases
- **In Transit**: TLS 1.3 for all communications
- **Sensitive Data**: Separate encryption for PII
- **Passwords**: Bcrypt with salt (cost factor 12)
- **API Keys**: Hashed before storage

#### 6.2.2 PII Protection
```typescript
// Sensitive fields to encrypt
const sensitiveFields = [
  'email',
  'phone',
  'address',
  'payment_info',
  'aadhaar',
  'pan'
];

// Data masking for logs
const maskEmail = (email: string) => {
  const [name, domain] = email.split('@');
  return `${name[0]}***@${domain}`;
};
```

### 6.3 Security Best Practices

#### 6.3.1 Input Validation
- Sanitize all user inputs
- Validate against schema
- Use parameterized queries
- Implement CSRF tokens
- Rate limit form submissions

#### 6.3.2 API Security
```typescript
// Security headers
app.use(helmet({
  contentSecurityPolicy: true,
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'same-origin' }
}));

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true,
  maxAge: 86400
}));
```

#### 6.3.3 Compliance
- **GDPR**: Data privacy and right to deletion
- **PCI-DSS**: Payment security standards
- **FSSAI**: Food safety compliance
- **ISO 27001**: Information security
- **SOC 2 Type II**: Security controls

### 6.4 Monitoring & Incident Response

#### 6.4.1 Security Monitoring
- Real-time intrusion detection
- Failed login attempt tracking
- Unusual activity alerts
- Automated security scanning
- Penetration testing (quarterly)

#### 6.4.2 Incident Response Plan
```
1. Detection: Automated alerts + monitoring
2. Containment: Isolate affected systems
3. Eradication: Remove threat
4. Recovery: Restore services
5. Lessons Learned: Post-mortem analysis
```

---

## 7. Infrastructure & DevOps

### 7.1 Cloud Infrastructure

#### 7.1.1 AWS Architecture (Recommended)
```
Production Environment:
├── VPC (Virtual Private Cloud)
│   ├── Public Subnets (Load Balancers, NAT Gateways)
│   ├── Private Subnets (Application Servers)
│   └── Database Subnets (RDS, ElastiCache)
│
├── Compute
│   ├── ECS/EKS (Container Orchestration)
│   ├── EC2 Auto Scaling Groups
│   └── Lambda (Serverless functions)
│
├── Database
│   ├── RDS PostgreSQL (Multi-AZ)
│   ├── ElastiCache Redis (Cluster mode)
│   └── DocumentDB (MongoDB compatible)
│
├── Storage
│   ├── S3 (Object storage)
│   ├── CloudFront (CDN)
│   └── EBS (Block storage)
│
├── Networking
│   ├── ALB (Application Load Balancer)
│   ├── Route 53 (DNS)
│   ├── API Gateway
│   └── CloudFront
│
└── Monitoring
    ├── CloudWatch (Metrics & Logs)
    ├── X-Ray (Distributed tracing)
    └── GuardDuty (Threat detection)
```

#### 7.1.2 Multi-Region Setup
```
Primary Region: Mumbai (ap-south-1)
├── Full production stack
├── Read-write database
└── Active traffic serving

Secondary Region: Singapore (ap-southeast-1)
├── Disaster recovery
├── Read replicas
└── Failover ready

Global Services:
├── CloudFront: Global CDN
├── Route 53: DNS with health checks
└── S3: Cross-region replication
```

### 7.2 Containerization

#### 7.2.1 Docker Strategy
```dockerfile
# Multi-stage build example
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

#### 7.2.2 Kubernetes Architecture
```yaml
Cluster Configuration:
  Node Pools:
    - System Pool: 2 nodes (t3.medium)
    - Application Pool: 5-20 nodes (t3.large) [Auto-scaling]
    - Database Pool: 3 nodes (r5.xlarge)
  
  Namespaces:
    - production
    - staging
    - monitoring
  
  Deployments:
    - API Gateway: 3 replicas
    - Auth Service: 3 replicas
    - Order Service: 5 replicas
    - Payment Service: 3 replicas
    - Other Services: 2 replicas each
```

### 7.3 CI/CD Pipeline

#### 7.3.1 Pipeline Stages
```yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install dependencies
      - Run linting (ESLint)
      - Run unit tests (Jest)
      - Run integration tests
      - Code coverage report
      - Security scanning (Snyk)
  
  build:
    needs: test
    steps:
      - Build Docker images
      - Tag with version and commit SHA
      - Push to ECR/Docker Hub
      - Scan images for vulnerabilities
  
  deploy-staging:
    needs: build
    if: branch == 'develop'
    steps:
      - Deploy to staging environment
      - Run smoke tests
      - Run E2E tests (Playwright)
  
  deploy-production:
    needs: build
    if: branch == 'main'
    steps:
      - Deploy to production (Blue-Green)
      - Health checks
      - Automated rollback on failure
      - Notify team (Slack)
```

#### 7.3.2 Deployment Strategy
- **Blue-Green Deployment**: Zero-downtime deployments
- **Canary Releases**: Gradual rollout (10% → 50% → 100%)
- **Feature Flags**: Toggle features without deployment
- **Automated Rollback**: Rollback on error threshold

### 7.4 Monitoring & Observability

#### 7.4.1 Monitoring Stack
```
Application Monitoring:
├── Datadog / New Relic
│   ├── APM (Application Performance)
│   ├── Infrastructure monitoring
│   ├── Log aggregation
│   └── Custom dashboards
│
├── Prometheus + Grafana
│   ├── Metrics collection
│   ├── Time-series data
│   └── Alerting rules
│
└── Sentry
    ├── Error tracking
    ├── Performance monitoring
    └── Release tracking
```

#### 7.4.2 Key Metrics to Monitor
```yaml
System Metrics:
  - CPU utilization: < 70%
  - Memory usage: < 80%
  - Disk I/O: Monitor IOPS
  - Network throughput

Application Metrics:
  - Request rate: Requests/second
  - Error rate: < 0.1%
  - Response time: p50, p95, p99
  - Throughput: Transactions/second

Business Metrics:
  - Orders per minute
  - Revenue per hour
  - Conversion rate
  - Cart abandonment rate
```

#### 7.4.3 Alerting Strategy
```yaml
Critical Alerts (PagerDuty):
  - Service down: > 1 minute
  - Error rate: > 1%
  - Response time: p99 > 2 seconds
  - Database connection failures

Warning Alerts (Slack):
  - High CPU: > 70% for 5 minutes
  - High memory: > 80% for 5 minutes
  - Slow queries: > 1 second
  - Disk space: < 20%

Info Alerts (Email):
  - Deployment notifications
  - Daily summary reports
  - Capacity planning alerts
```

### 7.5 Logging Strategy

#### 7.5.1 Log Levels
```typescript
// Structured logging
logger.info('Order created', { 
  orderId, 
  userId, 
  amount,
  timestamp 
});

logger.error('Payment failed', { 
  orderId, 
  error: error.message,
  stack: error.stack 
});
```

#### 7.5.2 Log Aggregation
- **CloudWatch Logs**: AWS native logging
- **ELK Stack**: Elasticsearch, Logstash, Kibana
- **Centralized**: All services log to central system
- **Retention**: 30 days hot, 1 year archive

---

## 8. Scalability Strategy

### 8.1 Horizontal Scaling

#### 8.1.1 Auto-Scaling Rules
```yaml
Application Servers:
  Min Instances: 3
  Max Instances: 50
  Scale Up:
    - CPU > 70% for 2 minutes
    - Request count > 1000/min per instance
  Scale Down:
    - CPU < 30% for 5 minutes
    - Request count < 200/min per instance

Database:
  Read Replicas: 3-10 (auto-scale)
  Scale Up:
    - Read connections > 80% capacity
  Scale Down:
    - Read connections < 30% capacity
```

### 8.2 Caching Strategy

#### 8.2.1 Multi-Layer Caching
```
Layer 1: Browser Cache
├── Static assets: 1 year
├── API responses: 5 minutes
└── CDN cache: Images, CSS, JS

Layer 2: CDN (CloudFront)
├── Static content: 1 day
├── API responses: 1 minute
└── Geo-distributed

Layer 3: Application Cache (Redis)
├── Session data: 24 hours
├── Product data: 1 hour
├── Category data: 30 minutes
└── User preferences: 1 hour

Layer 4: Database Cache
├── Query cache: Enabled
└── Connection pooling
```

### 8.3 Database Scaling

#### 8.3.1 Read/Write Splitting
```typescript
// Write to master
const createOrder = async (orderData) => {
  return await masterDB.query(
    'INSERT INTO orders ...',
    orderData
  );
};

// Read from replica
const getOrders = async (userId) => {
  return await replicaDB.query(
    'SELECT * FROM orders WHERE user_id = $1',
    [userId]
  );
};
```

#### 8.3.2 Sharding Strategy
```
User Sharding (by user_id):
├── Shard 1: user_id % 4 == 0
├── Shard 2: user_id % 4 == 1
├── Shard 3: user_id % 4 == 2
└── Shard 4: user_id % 4 == 3

Order Sharding (by date):
├── Shard 2025_Q4
├── Shard 2026_Q1
├── Shard 2026_Q2
└── Shard 2026_Q3
```

### 8.4 Performance Optimization

#### 8.4.1 Frontend Optimization
- Code splitting and lazy loading
- Image optimization (WebP, lazy load)
- Service worker for offline support
- Prefetching and preloading
- Bundle size < 200KB initial load
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s

#### 8.4.2 Backend Optimization
- Connection pooling
- Query optimization
- Batch operations
- Async processing
- Response compression (gzip/brotli)
- Database indexing
- CDN for static assets

---

## 9. Migration Plan

### 9.1 Phase 1: Foundation (Weeks 1-8)

#### Sprint 1-2: Backend Setup
- [ ] Set up development environment
- [ ] Initialize Node.js microservices
- [ ] Configure PostgreSQL database
- [ ] Set up Redis for caching
- [ ] Implement API Gateway
- [ ] Basic authentication service

#### Sprint 3-4: Core Services
- [ ] User service implementation
- [ ] Product service implementation
- [ ] Order service implementation
- [ ] Database migration scripts
- [ ] Unit test coverage

#### Sprint 5-6: Integration
- [ ] Payment gateway integration (Razorpay)
- [ ] Notification service (SMS/Email)
- [ ] Frontend API integration
- [ ] Error handling and logging

#### Sprint 7-8: Testing & Deployment
- [ ] Integration testing
- [ ] Performance testing
- [ ] Security audit
- [ ] Staging deployment
- [ ] Production deployment

### 9.2 Phase 2: Enhancement (Weeks 9-16)

#### Sprint 9-10: Real-time Features
- [ ] WebSocket implementation
- [ ] Real-time order tracking
- [ ] Live notifications
- [ ] Dashboard real-time updates

#### Sprint 11-12: Advanced Features
- [ ] AI recommendation engine
- [ ] Advanced search (Elasticsearch)
- [ ] Analytics service
- [ ] Loyalty service

#### Sprint 13-14: Mobile & PWA
- [ ] Progressive Web App
- [ ] Push notifications
- [ ] Offline support
- [ ] Mobile app (React Native)

#### Sprint 15-16: Admin Enhancements
- [ ] Advanced reporting
- [ ] Inventory management
- [ ] Staff management
- [ ] Marketing campaigns

### 9.3 Phase 3: Scale (Weeks 17-24)

#### Sprint 17-18: Multi-tenant
- [ ] Multi-restaurant support
- [ ] White-label solution
- [ ] Partner onboarding portal

#### Sprint 19-20: Enterprise Features
- [ ] B2B portal
- [ ] Subscription management
- [ ] Franchise system
- [ ] Kitchen Display System

#### Sprint 21-22: Optimization
- [ ] Performance tuning
- [ ] Database optimization
- [ ] CDN optimization
- [ ] Load testing

#### Sprint 23-24: Global Expansion
- [ ] Multi-region deployment
- [ ] Multi-language support
- [ ] Currency support
- [ ] International payments

### 9.4 Migration Checklist

#### Pre-Migration
- [ ] Backup current system
- [ ] Document all features
- [ ] Set up monitoring
- [ ] Prepare rollback plan
- [ ] Communication plan

#### During Migration
- [ ] Deploy backend services
- [ ] Migrate database
- [ ] Update frontend
- [ ] Test all flows
- [ ] Monitor errors

#### Post-Migration
- [ ] Verify data integrity
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Fix critical issues
- [ ] Document lessons learned

---

## 10. Technology Stack

### 10.1 Frontend

```yaml
Core:
  Framework: React 18.3+
  Language: TypeScript 5.5+
  Build Tool: Vite 5.4+
  Routing: React Router DOM 7+

UI/Styling:
  CSS Framework: Tailwind CSS 3.4+
  Component Library: Headless UI
  Icons: Heroicons, Lucide React
  Animations: Framer Motion

State Management:
  Global State: Redux Toolkit / Zustand
  Server State: React Query / SWR
  Form State: React Hook Form

Development:
  Linting: ESLint 9+
  Formatting: Prettier
  Testing: Jest, React Testing Library
  E2E Testing: Playwright / Cypress
```

### 10.2 Backend

```yaml
Core:
  Runtime: Node.js 20 LTS
  Framework: Express.js / NestJS
  Language: TypeScript

API:
  REST: Express.js
  GraphQL: Apollo Server
  WebSocket: Socket.io
  Documentation: Swagger/OpenAPI

Authentication:
  Strategy: JWT + OAuth 2.0
  Library: Passport.js
  Session: Redis

Validation:
  Schema: Joi / Zod
  Sanitization: express-validator

ORM:
  PostgreSQL: Prisma / TypeORM
  MongoDB: Mongoose

Task Queue:
  Library: Bull
  Message Broker: Redis / RabbitMQ
```

### 10.3 Database

```yaml
Primary Database:
  System: PostgreSQL 15+
  Hosting: AWS RDS / Supabase

Cache:
  System: Redis 7+
  Hosting: AWS ElastiCache / Redis Cloud

Document Store:
  System: MongoDB 7+
  Hosting: MongoDB Atlas / AWS DocumentDB

Search:
  System: Elasticsearch 8+
  Hosting: Elastic Cloud / AWS OpenSearch

Time-Series:
  System: TimescaleDB
  Hosting: Self-hosted / Timescale Cloud
```

### 10.4 DevOps & Infrastructure

```yaml
Cloud Platform:
  Primary: AWS
  Alternative: Google Cloud / Azure

Container:
  Runtime: Docker
  Orchestration: Kubernetes (EKS)
  Registry: Amazon ECR

CI/CD:
  Platform: GitHub Actions
  Alternative: GitLab CI, Jenkins

Monitoring:
  APM: Datadog / New Relic
  Logging: ELK Stack / CloudWatch
  Error Tracking: Sentry
  Uptime: Pingdom / StatusCake

Infrastructure as Code:
  Tool: Terraform
  Alternative: AWS CloudFormation
```

### 10.5 Third-Party Services

```yaml
Payment:
  Gateway: Razorpay, Stripe
  Alternative: PayU, Paytm

Communication:
  SMS: Twilio, AWS SNS
  Email: SendGrid, AWS SES
  Push: Firebase Cloud Messaging

Analytics:
  Product: Mixpanel, Amplitude
  Web: Google Analytics 4
  Heatmaps: Hotjar

Storage:
  Object: AWS S3
  CDN: CloudFront, Cloudflare
  Images: Cloudinary, imgix

Security:
  SSL: Let's Encrypt, AWS Certificate Manager
  WAF: AWS WAF, Cloudflare
  Secrets: AWS Secrets Manager, HashiCorp Vault
```

---

## 11. Cost Estimation

### 11.1 Infrastructure Costs (Monthly)

#### 11.1.1 AWS Costs - Small Scale (0-10K users)
```
Compute:
  EC2 Instances (3x t3.medium): $75
  Load Balancer: $20
  Total: $95/month

Database:
  RDS PostgreSQL (db.t3.medium): $85
  ElastiCache Redis (cache.t3.micro): $15
  Total: $100/month

Storage:
  S3 (100GB): $3
  CloudFront (1TB transfer): $85
  Total: $88/month

Other Services:
  Route 53: $1
  CloudWatch: $10
  Total: $11/month

Monthly Total: ~$294
Annual Total: ~$3,528
```

#### 11.1.2 AWS Costs - Medium Scale (10K-100K users)
```
Compute:
  ECS/EKS Cluster: $150
  EC2 Instances (10x t3.large): $750
  Load Balancer: $30
  Total: $930/month

Database:
  RDS PostgreSQL Multi-AZ (db.r5.xlarge): $450
  Read Replicas (2x db.r5.large): $500
  ElastiCache Redis Cluster: $200
  Total: $1,150/month

Storage:
  S3 (1TB): $23
  CloudFront (10TB transfer): $850
  Total: $873/month

Other Services:
  Route 53: $2
  CloudWatch: $50
  Lambda: $20
  API Gateway: $50
  Total: $122/month

Monthly Total: ~$3,075
Annual Total: ~$36,900
```

#### 11.1.3 AWS Costs - Large Scale (100K-1M users)
```
Compute:
  EKS Cluster: $300
  EC2 Instances (50x c5.2xlarge): $8,500
  Load Balancer (Multi-AZ): $80
  Total: $8,880/month

Database:
  RDS PostgreSQL Multi-AZ (db.r5.4xlarge): $2,000
  Read Replicas (5x db.r5.2xlarge): $3,500
  ElastiCache Redis Cluster (3 nodes): $800
  Total: $6,300/month

Storage:
  S3 (10TB): $235
  CloudFront (100TB transfer): $8,500
  Total: $8,735/month

Other Services:
  Route 53: $5
  CloudWatch: $300
  Lambda: $100
  API Gateway: $200
  WAF: $100
  Total: $705/month

Monthly Total: ~$24,620
Annual Total: ~$295,440
```

### 11.2 Third-Party Service Costs

```yaml
Payment Gateway (Razorpay):
  Transaction Fee: 2% + ₹2 per transaction
  For 10,000 orders/month @ ₹500 avg:
    = 10,000 × (₹10 + ₹2) = ₹1,20,000/month

SMS (Twilio):
  Cost per SMS: ₹0.20
  5 SMS per order × 10,000 orders:
    = ₹10,000/month

Email (SendGrid):
  Cost: $15-$90/month (based on volume)
  For 50,000 emails/month: $15/month

Monitoring (Datadog):
  Cost: $15-$31 per host/month
  For 10 hosts: $310/month

Total Third-Party: ~₹1,35,000/month ($1,600)
```

### 11.3 Development Costs

```yaml
Team Composition (Initial 6 months):
  Full-stack Developers (3): $18,000/month
  Backend Developer (1): $7,000/month
  DevOps Engineer (1): $7,500/month
  QA Engineer (1): $4,500/month
  UI/UX Designer (1): $5,000/month
  Project Manager (1): $6,000/month
  
  Total: $48,000/month
  6 Months: $288,000

One-time Costs:
  Infrastructure Setup: $5,000
  Security Audit: $10,000
  Third-party Integrations: $5,000
  Testing & QA: $8,000
  Total: $28,000

Total Development Cost: $316,000
```

### 11.4 Total Cost Summary

```yaml
Year 1 Costs (Medium Scale):
  Infrastructure: $36,900
  Third-party Services: $192,000
  Development (6 months): $316,000
  Maintenance (6 months): $144,000
  Marketing: $100,000
  Contingency (20%): $157,780
  
  Total Year 1: $946,680

Year 2+ (Steady State):
  Infrastructure: $295,440 (scaled up)
  Third-party Services: $384,000
  Development & Maintenance: $576,000
  Marketing: $200,000
  Total: $1,455,440/year
```

---

## 12. Success Metrics & KPIs

### 12.1 Technical KPIs

```yaml
Performance:
  API Response Time: < 200ms (p95)
  Page Load Time: < 2 seconds
  Database Query Time: < 100ms
  Uptime: 99.9%

Scalability:
  Concurrent Users: 10,000+
  Requests per Second: 5,000+
  Database Connections: < 80% capacity

Reliability:
  Error Rate: < 0.1%
  Mean Time to Recovery: < 1 hour
  Deployment Frequency: Daily
  Failed Deployment Rate: < 5%
```

### 12.2 Business KPIs

```yaml
User Growth:
  Monthly Active Users: 50,000+
  Order Volume: 50,000/month
  Conversion Rate: 15%

Revenue:
  Average Order Value: ₹450+
  Monthly Revenue: ₹25,00,000+
  Customer Lifetime Value: ₹5,000+

Customer Satisfaction:
  NPS Score: 60+
  CSAT Score: 4.5+/5
  Repeat Customer Rate: 75%
  Churn Rate: < 5%
```

---

## 13. Risk Management

### 13.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database failure | HIGH | LOW | Multi-AZ deployment, automated backups |
| Service outage | HIGH | MEDIUM | Circuit breakers, graceful degradation |
| Security breach | CRITICAL | LOW | Regular audits, encryption, monitoring |
| Performance degradation | MEDIUM | MEDIUM | Auto-scaling, caching, monitoring |
| Third-party API failure | MEDIUM | MEDIUM | Retry logic, fallback options |

### 13.2 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Cost overrun | HIGH | MEDIUM | Regular budget reviews, cloud cost optimization |
| Timeline delays | MEDIUM | HIGH | Agile methodology, MVP approach |
| Scope creep | MEDIUM | HIGH | Strict PRD, change control process |
| Talent retention | MEDIUM | MEDIUM | Competitive comp, good culture |

---

## 14. Conclusion

This enterprise architecture plan transforms Jain Shikanji from a prototype into a production-ready, scalable platform capable of serving millions of users. The phased approach allows for incremental improvements while maintaining system stability.

### Next Steps:
1. ✅ Get stakeholder approval
2. ✅ Assemble development team
3. ✅ Set up development environment
4. ⏳ Begin Phase 1 implementation
5. ⏳ Regular architecture reviews

---

**Document Owner**: Engineering Team  
**Review Cycle**: Quarterly  
**Last Updated**: October 12, 2025  
**Next Review**: January 12, 2026
