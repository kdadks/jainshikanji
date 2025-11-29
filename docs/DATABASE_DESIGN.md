# 🗄️ Database Design & Microservice Architecture
# Jain Shikanji - Food Ordering Platform

**Version:** 1.0  
**Created:** November 29, 2025  
**Author:** Database Architecture Team  
**Status:** Recommended Architecture

---

## 📋 Executive Summary

Based on the PRD and Architecture documents, this document outlines the **recommended database design and microservice architecture** for the Jain Shikanji platform. The design follows domain-driven design (DDD) principles with clear service boundaries.

### Key Recommendations
1. **Microservices Architecture**: 4 core microservices + 5 supporting services
2. **Database Strategy**: PostgreSQL (primary) + Redis (cache) + MongoDB (logs)
3. **Deployment Platform**: Cloudflare Workers + D1 Database + KV Storage
4. **API Gateway**: Hono framework on Cloudflare Workers
5. **Data Consistency**: Event-driven architecture with eventual consistency

---

## 🎯 Microservice Boundaries

### Core Domain Services (High Priority)

#### 1. **Store Management Service**
**Responsibility**: Restaurant/store operations, locations, staff, and settings

**Domain Entities**:
- Stores/Locations
- Operating Hours
- Store Settings
- Staff Management
- Delivery Zones

**Database**: `store_management_db`

**API Endpoints**:
```
GET    /api/stores
GET    /api/stores/:id
POST   /api/stores
PUT    /api/stores/:id
GET    /api/stores/:id/staff
POST   /api/stores/:id/staff
GET    /api/stores/:id/delivery-zones
GET    /api/stores/:id/operating-hours
```

---

#### 2. **Inventory Management Service**
**Responsibility**: Product catalog, stock tracking, and supplier management

**Domain Entities**:
- Products
- Categories
- Stock/Inventory
- Suppliers
- Purchase Orders
- Stock Adjustments

**Database**: `inventory_db`

**API Endpoints**:
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/inventory/:productId
PUT    /api/inventory/:productId/stock
POST   /api/inventory/purchase-orders
GET    /api/suppliers
POST   /api/suppliers
```

---

#### 3. **Order Management Service**
**Responsibility**: Order lifecycle, order processing, and fulfillment

**Domain Entities**:
- Orders
- Order Items
- Order Timeline/History
- Order Status Tracking
- Delivery Tracking

**Database**: `order_db`

**API Endpoints**:
```
POST   /api/orders
GET    /api/orders/:id
GET    /api/orders
PUT    /api/orders/:id/status
POST   /api/orders/:id/cancel
GET    /api/orders/customer/:customerId
GET    /api/orders/store/:storeId
POST   /api/orders/:id/timeline
```

---

#### 4. **General Items Service** (Customer & User Management)
**Responsibility**: Customer data, authentication, profiles, and preferences

**Domain Entities**:
- Customers/Users
- User Profiles
- Addresses
- User Preferences
- Authentication Tokens
- Sessions

**Database**: `customer_db`

**API Endpoints**:
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/customers/:id
PUT    /api/customers/:id
GET    /api/customers/:id/addresses
POST   /api/customers/:id/addresses
PUT    /api/customers/:id/preferences
```

---

### Supporting Services (Medium Priority)

#### 5. **Payment Service**
**Responsibility**: Payment processing, transactions, refunds

**Domain Entities**:
- Payments
- Transactions
- Refunds
- Payment Methods
- Invoices

**Database**: `payment_db`

**API Endpoints**:
```
POST   /api/payments/initiate
POST   /api/payments/verify
POST   /api/payments/:id/refund
GET    /api/payments/:id
GET    /api/payments/order/:orderId
POST   /api/payments/webhook
```

---

#### 6. **Loyalty & Rewards Service**
**Responsibility**: Loyalty points, tiers, rewards, and campaigns

**Domain Entities**:
- Loyalty Points
- Tiers (Bronze, Silver, Gold, Platinum)
- Rewards Catalog
- Point Transactions
- Campaigns/Promotions
- Coupons

**Database**: `loyalty_db`

**API Endpoints**:
```
GET    /api/loyalty/customer/:customerId
POST   /api/loyalty/earn
POST   /api/loyalty/redeem
GET    /api/loyalty/rewards
GET    /api/loyalty/campaigns
POST   /api/loyalty/campaigns
GET    /api/loyalty/coupons/:code
```

---

#### 7. **Notification Service**
**Responsibility**: Multi-channel notifications (Email, SMS, Push)

**Domain Entities**:
- Notifications
- Notification Templates
- Notification Logs
- User Notification Preferences

**Database**: `notification_db` (MongoDB for logs)

**API Endpoints**:
```
POST   /api/notifications/send
GET    /api/notifications/user/:userId
PUT    /api/notifications/:id/read
GET    /api/notifications/preferences/:userId
PUT    /api/notifications/preferences/:userId
```

---

#### 8. **Analytics & Reporting Service**
**Responsibility**: Business intelligence, reports, and dashboards

**Domain Entities**:
- Analytics Events
- Metrics
- Reports
- KPIs

**Database**: `analytics_db` (TimescaleDB or MongoDB)

**API Endpoints**:
```
GET    /api/analytics/dashboard
GET    /api/analytics/sales
GET    /api/analytics/customers
GET    /api/analytics/products
POST   /api/analytics/event
GET    /api/analytics/reports/:reportId
```

---

#### 9. **Review & Rating Service**
**Responsibility**: Product reviews, ratings, and feedback

**Domain Entities**:
- Reviews
- Ratings
- Review Responses

**Database**: `review_db`

**API Endpoints**:
```
POST   /api/reviews
GET    /api/reviews/product/:productId
GET    /api/reviews/customer/:customerId
GET    /api/reviews/:id
PUT    /api/reviews/:id/response
```

---

## 🗄️ Detailed Database Schema

### 1. Store Management Database (`store_management_db`)

#### Tables

##### `stores`
```sql
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- Address
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    
    -- Location
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    delivery_radius_km DECIMAL(5, 2) DEFAULT 10.00,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_accepting_orders BOOLEAN DEFAULT true,
    
    -- Settings
    min_order_value DECIMAL(10, 2) DEFAULT 0,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    free_delivery_above DECIMAL(10, 2),
    estimated_prep_time_minutes INT DEFAULT 30,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT stores_name_not_empty CHECK (name != '')
);

CREATE INDEX idx_stores_slug ON stores(slug);
CREATE INDEX idx_stores_city ON stores(city);
CREATE INDEX idx_stores_active ON stores(is_active, is_accepting_orders);
CREATE INDEX idx_stores_location ON stores(latitude, longitude);
```

##### `store_operating_hours`
```sql
CREATE TABLE store_operating_hours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    is_open BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(store_id, day_of_week)
);

CREATE INDEX idx_operating_hours_store ON store_operating_hours(store_id);
```

##### `staff`
```sql
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    
    -- Personal Info
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    
    -- Employment
    role VARCHAR(50) NOT NULL, -- manager, chef, cashier, delivery, support
    is_active BOOLEAN DEFAULT true,
    hire_date DATE,
    termination_date DATE,
    
    -- Access
    permissions JSONB DEFAULT '[]',
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (role IN ('manager', 'chef', 'cashier', 'delivery', 'support'))
);

CREATE INDEX idx_staff_store ON staff(store_id);
CREATE INDEX idx_staff_email ON staff(email);
CREATE INDEX idx_staff_active ON staff(is_active);
```

##### `delivery_zones`
```sql
CREATE TABLE delivery_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    postal_codes TEXT[], -- Array of postal codes
    delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
    estimated_time_minutes INT NOT NULL DEFAULT 30,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_delivery_zones_store ON delivery_zones(store_id);
CREATE INDEX idx_delivery_zones_postal_codes ON delivery_zones USING GIN(postal_codes);
```

---

### 2. Inventory Management Database (`inventory_db`)

#### Tables

##### `products`
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100) UNIQUE,
    
    -- Pricing
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    
    -- Categorization
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    tags TEXT[], -- Array of tags
    
    -- Dietary Info
    is_veg BOOLEAN DEFAULT true,
    is_vegan BOOLEAN DEFAULT false,
    is_jain BOOLEAN DEFAULT true,
    is_gluten_free BOOLEAN DEFAULT false,
    is_nut_free BOOLEAN DEFAULT false,
    spice_level VARCHAR(20) DEFAULT 'Mild', -- Mild, Medium, Hot, Sweet
    
    -- Product Details
    prep_time_minutes INT DEFAULT 15,
    servings INT DEFAULT 1,
    weight VARCHAR(50),
    unit VARCHAR(20), -- ml, grams, pieces, etc
    shelf_life_days INT,
    storage_instructions TEXT,
    
    -- Nutritional Info (per serving)
    calories INT,
    protein_g DECIMAL(5, 2),
    carbs_g DECIMAL(5, 2),
    fat_g DECIMAL(5, 2),
    fiber_g DECIMAL(5, 2),
    sodium_mg INT,
    
    -- Media
    images JSONB DEFAULT '[]', -- Array of image URLs
    video_url VARCHAR(500),
    
    -- Availability
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    scheduled_availability JSONB, -- {startDate, endDate}
    
    -- Ratings
    rating DECIMAL(3, 2) DEFAULT 0.00 CHECK (rating BETWEEN 0 AND 5),
    review_count INT DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    
    CHECK (spice_level IN ('Mild', 'Medium', 'Hot', 'Sweet'))
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_available ON products(is_available);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_products_dietary ON products(is_veg, is_vegan, is_jain);
```

##### `product_customizations`
```sql
CREATE TABLE product_customizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., "Sugar Level", "Ice", "Size"
    type VARCHAR(20) NOT NULL, -- radio, checkbox, select
    is_required BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (type IN ('radio', 'checkbox', 'select'))
);

CREATE INDEX idx_customizations_product ON product_customizations(product_id);
```

##### `customization_options`
```sql
CREATE TABLE customization_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customization_id UUID NOT NULL REFERENCES product_customizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., "No Sugar", "Less Sugar", "Regular"
    price_modifier DECIMAL(10, 2) DEFAULT 0.00, -- Additional price
    is_default BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_options_customization ON customization_options(customization_id);
```

##### `inventory`
```sql
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    store_id UUID NOT NULL, -- Foreign key to stores (different DB)
    
    -- Stock Levels
    current_stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 10,
    max_stock INT NOT NULL DEFAULT 1000,
    reorder_point INT NOT NULL DEFAULT 20,
    
    -- Cost
    cost_per_unit DECIMAL(10, 2),
    unit VARCHAR(20) NOT NULL DEFAULT 'pieces',
    
    -- Tracking
    last_restocked_at TIMESTAMP WITH TIME ZONE,
    last_stock_count_at TIMESTAMP WITH TIME ZONE,
    expiry_date DATE,
    batch_number VARCHAR(100),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(product_id, store_id)
);

CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_store ON inventory(store_id);
CREATE INDEX idx_inventory_low_stock ON inventory(current_stock, min_stock) WHERE current_stock <= min_stock;
```

##### `suppliers`
```sql
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    contact_person VARCHAR(255),
    payment_terms VARCHAR(100),
    tax_id VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_suppliers_active ON suppliers(is_active);
```

##### `purchase_orders`
```sql
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_number VARCHAR(50) UNIQUE NOT NULL,
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    store_id UUID NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, received, cancelled
    
    -- Amounts
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    shipping DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    
    -- Dates
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_delivery_date DATE,
    received_date DATE,
    
    -- Notes
    notes TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    
    CHECK (status IN ('pending', 'confirmed', 'received', 'cancelled'))
);

CREATE INDEX idx_po_supplier ON purchase_orders(supplier_id);
CREATE INDEX idx_po_store ON purchase_orders(store_id);
CREATE INDEX idx_po_status ON purchase_orders(status);
```

##### `purchase_order_items`
```sql
CREATE TABLE purchase_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_poi_po ON purchase_order_items(purchase_order_id);
CREATE INDEX idx_poi_product ON purchase_order_items(product_id);
```

---

### 3. Order Management Database (`order_db`)

#### Tables

##### `orders`
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., ORD20251129001
    
    -- Customer Info (denormalized for performance)
    customer_id UUID NOT NULL, -- Foreign key to customers (different DB)
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    
    -- Store Info
    store_id UUID NOT NULL, -- Foreign key to stores (different DB)
    
    -- Order Details
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50),
    
    -- Amounts
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    discount DECIMAL(10, 2) DEFAULT 0,
    loyalty_discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    
    -- Delivery
    delivery_address JSONB NOT NULL, -- Full address object
    delivery_type VARCHAR(20) DEFAULT 'delivery', -- delivery, pickup, dine-in
    delivery_instructions TEXT,
    delivery_latitude DECIMAL(10, 8),
    delivery_longitude DECIMAL(11, 8),
    
    -- Timing
    estimated_delivery_time TIMESTAMP WITH TIME ZONE,
    scheduled_delivery_time TIMESTAMP WITH TIME ZONE,
    accepted_at TIMESTAMP WITH TIME ZONE,
    preparing_at TIMESTAMP WITH TIME ZONE,
    ready_at TIMESTAMP WITH TIME ZONE,
    dispatched_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    -- Assignment
    assigned_staff_id UUID, -- Chef/Preparer
    delivery_person_id UUID, -- Delivery partner
    
    -- Additional Info
    special_instructions TEXT,
    cancellation_reason TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_comment TEXT,
    
    -- Loyalty & Rewards
    loyalty_points_earned INT DEFAULT 0,
    loyalty_points_redeemed INT DEFAULT 0,
    coupon_code VARCHAR(50),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled', 'refunded')),
    CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    CHECK (delivery_type IN ('delivery', 'pickup', 'dine-in'))
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_store ON orders(store_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_delivery_person ON orders(delivery_person_id) WHERE delivery_person_id IS NOT NULL;
```

##### `order_items`
```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Product Info (denormalized)
    product_id UUID NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    
    -- Pricing
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(10, 2) NOT NULL,
    
    -- Customizations
    customizations JSONB DEFAULT '[]', -- Array of selected customizations
    special_instructions TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
```

##### `order_timeline`
```sql
CREATE TABLE order_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    
    status VARCHAR(50) NOT NULL,
    note TEXT,
    
    -- Tracking
    updated_by UUID, -- Staff member who updated
    updated_by_name VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_timeline_order ON order_timeline(order_id);
CREATE INDEX idx_timeline_created ON order_timeline(created_at DESC);
```

##### `order_tracking`
```sql
CREATE TABLE order_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    
    -- Location tracking
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Status
    status VARCHAR(50),
    message TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tracking_order ON order_tracking(order_id);
CREATE INDEX idx_tracking_created ON order_tracking(created_at DESC);
```

---

### 4. Customer Database (`customer_db`) - General Items Service

#### Tables

##### `customers`
```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    phone VARCHAR(20) UNIQUE,
    
    -- Personal Info
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(20),
    
    -- Account Status
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    
    -- OAuth
    google_id VARCHAR(255),
    facebook_id VARCHAR(255),
    
    -- Loyalty
    loyalty_points INT DEFAULT 0,
    loyalty_tier VARCHAR(20) DEFAULT 'Bronze',
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    
    -- Metadata
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (loyalty_tier IN ('Bronze', 'Silver', 'Gold', 'Platinum'))
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_tier ON customers(loyalty_tier);
CREATE INDEX idx_customers_active ON customers(is_active);
```

##### `customer_addresses`
```sql
CREATE TABLE customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Address Type
    type VARCHAR(20) NOT NULL DEFAULT 'home', -- home, work, other
    label VARCHAR(100), -- Custom label
    
    -- Address Details
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    landmark VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    
    -- Location
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Flags
    is_default BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (type IN ('home', 'work', 'other'))
);

CREATE INDEX idx_addresses_customer ON customer_addresses(customer_id);
CREATE INDEX idx_addresses_default ON customer_addresses(customer_id, is_default);
```

##### `customer_preferences`
```sql
CREATE TABLE customer_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Food Preferences
    preferred_spice_level VARCHAR(20) DEFAULT 'Mild',
    dietary_restrictions TEXT[], -- Array: vegan, jain, gluten-free, nut-free
    favorite_categories TEXT[],
    
    -- Communication
    email_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT true,
    
    -- Other Preferences
    preferred_payment_method VARCHAR(50),
    preferred_delivery_time VARCHAR(50), -- morning, afternoon, evening
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(customer_id)
);

CREATE INDEX idx_preferences_customer ON customer_preferences(customer_id);
```

##### `customer_favorites`
```sql
CREATE TABLE customer_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(customer_id, product_id)
);

CREATE INDEX idx_favorites_customer ON customer_favorites(customer_id);
CREATE INDEX idx_favorites_product ON customer_favorites(product_id);
```

##### `sessions`
```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Token
    refresh_token VARCHAR(500) UNIQUE NOT NULL,
    access_token_hash VARCHAR(255),
    
    -- Device Info
    device_type VARCHAR(50),
    device_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    
    -- Validity
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sessions_customer ON sessions(customer_id);
CREATE INDEX idx_sessions_token ON sessions(refresh_token);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
```

---

### 5. Payment Database (`payment_db`)

#### Tables

##### `payments`
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id VARCHAR(100) UNIQUE NOT NULL, -- External payment gateway ID
    
    -- References
    order_id UUID NOT NULL,
    customer_id UUID NOT NULL,
    
    -- Payment Details
    payment_method VARCHAR(50) NOT NULL, -- upi, card, netbanking, cod, wallet
    provider VARCHAR(50), -- razorpay, stripe, paytm
    
    -- Amount
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending',
    failure_reason TEXT,
    
    -- Gateway Response
    gateway_response JSONB,
    transaction_id VARCHAR(255),
    
    -- Timestamps
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    failed_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled')),
    CHECK (payment_method IN ('upi', 'card', 'netbanking', 'cod', 'wallet', 'emi'))
);

CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created ON payments(created_at DESC);
```

##### `refunds`
```sql
CREATE TABLE refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    refund_id VARCHAR(100) UNIQUE NOT NULL,
    
    payment_id UUID NOT NULL REFERENCES payments(id),
    order_id UUID NOT NULL,
    
    -- Amount
    amount DECIMAL(10, 2) NOT NULL,
    reason TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending',
    
    -- Gateway
    gateway_refund_id VARCHAR(255),
    gateway_response JSONB,
    
    -- Timestamps
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

CREATE INDEX idx_refunds_payment ON refunds(payment_id);
CREATE INDEX idx_refunds_order ON refunds(order_id);
```

---

### 6. Loyalty Database (`loyalty_db`)

#### Tables

##### `loyalty_transactions`
```sql
CREATE TABLE loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,
    
    -- Transaction Details
    type VARCHAR(50) NOT NULL, -- earn, redeem, expire, bonus, adjustment
    points INT NOT NULL,
    description TEXT,
    
    -- References
    order_id UUID,
    campaign_id UUID,
    
    -- Balance
    balance_after INT NOT NULL,
    
    -- Expiry
    expires_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (type IN ('earn', 'redeem', 'expire', 'bonus', 'adjustment'))
);

CREATE INDEX idx_loyalty_customer ON loyalty_transactions(customer_id);
CREATE INDEX idx_loyalty_order ON loyalty_transactions(order_id);
CREATE INDEX idx_loyalty_created ON loyalty_transactions(created_at DESC);
```

##### `campaigns`
```sql
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    
    -- Discount
    discount_type VARCHAR(20), -- percentage, fixed, free_delivery, free_item
    discount_value DECIMAL(10, 2),
    
    -- Constraints
    min_order_value DECIMAL(10, 2),
    max_discount DECIMAL(10, 2),
    applicable_products UUID[],
    applicable_categories VARCHAR(100)[],
    customer_segments VARCHAR(50)[],
    
    -- Usage
    usage_limit INT,
    usage_per_customer INT DEFAULT 1,
    current_usage INT DEFAULT 0,
    
    -- Validity
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CHECK (type IN ('discount', 'bogo', 'free_delivery', 'loyalty_bonus', 'referral')),
    CHECK (discount_type IN ('percentage', 'fixed', 'free_delivery', 'free_item'))
);

CREATE INDEX idx_campaigns_code ON campaigns(code);
CREATE INDEX idx_campaigns_active ON campaigns(is_active, start_date, end_date);
```

##### `campaign_usage`
```sql
CREATE TABLE campaign_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id),
    customer_id UUID NOT NULL,
    order_id UUID NOT NULL,
    
    discount_applied DECIMAL(10, 2) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_campaign_usage_campaign ON campaign_usage(campaign_id);
CREATE INDEX idx_campaign_usage_customer ON campaign_usage(customer_id);
```

---

## 🔄 Cross-Service Data Flow

### Example: Place Order Flow

```
1. Customer Service → Validate customer & address
   ↓
2. Inventory Service → Check product availability & reduce stock
   ↓
3. Order Service → Create order record
   ↓
4. Payment Service → Process payment
   ↓
5. Loyalty Service → Calculate & award points
   ↓
6. Notification Service → Send confirmation email/SMS
   ↓
7. Analytics Service → Log order event
```

### Event-Driven Communication

```yaml
Events Published:
  Order Service:
    - OrderCreated
    - OrderConfirmed
    - OrderCancelled
    - OrderDelivered
  
  Payment Service:
    - PaymentCompleted
    - PaymentFailed
    - RefundProcessed
  
  Inventory Service:
    - StockLow
    - ProductOutOfStock
    - StockRestocked
  
  Customer Service:
    - CustomerRegistered
    - CustomerVerified
```

---

## 🚀 Technology Recommendations

### Primary Stack (Cloudflare-based)

```yaml
Platform: Cloudflare Workers
API Framework: Hono
Databases:
  - Cloudflare D1 (SQLite-based, primary)
  - Cloudflare KV (Key-Value cache)
  - Cloudflare R2 (Object storage for images)

Advantages:
  - Global edge network (low latency)
  - Auto-scaling
  - Cost-effective
  - Zero cold starts
  - Built-in DDoS protection
```

### Alternative Stack (Traditional)

```yaml
Platform: AWS/GCP/Azure
API Framework: Node.js + Express/NestJS
Databases:
  - PostgreSQL 15+ (Primary - Amazon RDS)
  - Redis 7+ (Cache - ElastiCache)
  - MongoDB (Logs - DocumentDB)
  - Elasticsearch (Search)

Advantages:
  - More mature ecosystem
  - Complex query support
  - Better for large datasets
  - More third-party integrations
```

---

## 📊 Data Migration Strategy

### Phase 1: Setup Infrastructure (Week 1-2)
```bash
# Cloudflare D1 Setup
npx wrangler d1 create jainshikanji-db

# Create all tables
npx wrangler d1 execute jainshikanji-db --file=./schema/01-store-management.sql
npx wrangler d1 execute jainshikanji-db --file=./schema/02-inventory.sql
npx wrangler d1 execute jainshikanji-db --file=./schema/03-orders.sql
npx wrangler d1 execute jainshikanji-db --file=./schema/04-customers.sql
npx wrangler d1 execute jainshikanji-db --file=./schema/05-payments.sql
npx wrangler d1 execute jainshikanji-db --file=./schema/06-loyalty.sql
```

### Phase 2: Migrate Mock Data (Week 3)
- Convert existing React context data to database
- Seed initial products
- Migrate sample orders
- Setup test customers

### Phase 3: API Development (Week 4-8)
- Implement REST APIs for each service
- Add authentication middleware
- Implement rate limiting
- Add logging and monitoring

### Phase 4: Frontend Integration (Week 9-10)
- Replace Context API with API calls
- Add error handling
- Implement loading states
- Add retry logic

---

## 🔐 Security Considerations

### 1. Authentication & Authorization
```typescript
// JWT-based authentication
// Stored in httpOnly cookies
// 15-minute access tokens
// 30-day refresh tokens
// Role-based access control (RBAC)
```

### 2. Data Encryption
```sql
-- Sensitive data encryption
-- PII fields: email, phone, address
-- Payment info: NEVER store card details
-- Use payment gateway tokenization
```

### 3. API Security
```yaml
Rate Limiting:
  - Public: 100 req/min per IP
  - Authenticated: 1000 req/min
  - Admin: 5000 req/min

Input Validation:
  - Sanitize all inputs
  - Parameterized queries
  - XSS prevention
  - CSRF tokens
```

---

## 📈 Scalability Plan

### Horizontal Scaling
```
Cloudflare Workers: Auto-scales globally
D1 Database: Replicated across regions
KV Storage: Eventually consistent, globally distributed
R2 Storage: Global CDN for images
```

### Caching Strategy
```
Layer 1: Browser Cache (static assets)
Layer 2: CDN Cache (Cloudflare)
Layer 3: KV Cache (product data, sessions)
Layer 4: Database Query Cache
```

### Database Optimization
```sql
-- Partitioning for orders (by month)
-- Indexes on foreign keys
-- Materialized views for analytics
-- Read replicas for reporting
```

---

## 💰 Cost Estimation

### Cloudflare Workers Stack (Small Scale)
```
Free Tier:
  - 100,000 requests/day
  - 10 GB D1 storage
  - 1 GB KV storage
  - 10 GB R2 storage

Paid (10K-100K users):
  - Workers: $5/month
  - D1: $5/month
  - KV: $5/month
  - R2: $10/month
  Total: ~$25/month
```

### Traditional Stack (Medium Scale)
```
AWS Costs (10K-100K users):
  - RDS PostgreSQL: $85/month
  - ElastiCache Redis: $15/month
  - EC2 Instances: $150/month
  - Load Balancer: $20/month
  - S3 + CloudFront: $50/month
  Total: ~$320/month
```

---

## 🎯 Next Steps

### Immediate Actions (Week 1)
1. ✅ Review and approve this architecture
2. ⏳ Set up Cloudflare Workers environment
3. ⏳ Create D1 databases
4. ⏳ Implement authentication service
5. ⏳ Set up development environment

### Short Term (Month 1)
1. Implement core microservices
2. Migrate existing frontend to use APIs
3. Set up CI/CD pipeline
4. Implement logging and monitoring
5. Security audit

### Medium Term (Month 2-3)
1. Add advanced features (AI, real-time tracking)
2. Performance optimization
3. Load testing
4. User acceptance testing
5. Production deployment

---

## 📚 Additional Resources

### Documentation to Create
1. API Documentation (OpenAPI/Swagger)
2. Database Migration Scripts
3. Service Communication Diagrams
4. Deployment Guides
5. Runbooks for Operations

### Tools Needed
1. Wrangler CLI (Cloudflare)
2. Postman/Insomnia (API Testing)
3. DataGrip/DBeaver (Database Management)
4. Git & GitHub
5. Monitoring Tools (Sentry, LogRocket)

---

**Ready to implement? Let's start with setting up the infrastructure!** 🚀
