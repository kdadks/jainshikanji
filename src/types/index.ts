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

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  address: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
}

export interface UserPreferences {
  spiceLevel: 'Mild' | 'Medium' | 'Hot';
  dietaryRestrictions: string[];
  favoriteCategories: string[];
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

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
  // Product-specific fields
  productType?: 'instant' | 'ready-to-drink' | 'masala-mix' | 'other';
  weight?: string;
  servings?: number;
  shelfLife?: string;
  storageInstructions?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface Customization {
  id: string;
  name: string;
  type: 'radio' | 'checkbox' | 'select';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

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

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  customizations: SelectedCustomization[];
  specialInstructions?: string;
}

export interface SelectedCustomization {
  customizationId: string;
  optionId: string;
  name: string;
  price: number;
}

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

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
  updatedBy: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  deliveryRadius: number;
  isActive: boolean;
  operatingHours: OperatingHours[];
  staff: Staff[];
  inventory: InventoryItem[];
}

export interface OperatingHours {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  locationId: string;
  isActive: boolean;
  permissions: Permission[];
  createdAt: Date;
}

export type StaffRole = 
  | 'manager'
  | 'chef'
  | 'cashier'
  | 'delivery'
  | 'support';

export interface Permission {
  module: string;
  actions: string[];
}

export interface InventoryItem {
  id: string;
  productId: string;
  locationId: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  lastUpdated: Date;
  expiryDate?: Date;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'discount' | 'bogo' | 'free_delivery' | 'loyalty_bonus';
  description: string;
  discountType: 'percentage' | 'fixed' | 'free_item';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  customerSegments?: string[];
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  code?: string;
}

export interface Review {
  id: string;
  customerId: string;
  orderId: string;
  productId?: string;
  rating: number;
  comment: string;
  images?: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  themes: string[];
  isVerified: boolean;
  response?: {
    text: string;
    respondedBy: string;
    respondedAt: Date;
  };
  createdAt: Date;
}

export interface Analytics {
  revenue: {
    today: number;
    yesterday: number;
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
    lastMonth: number;
    growth: {
      daily: number;
      weekly: number;
      monthly: number;
    };
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
    averageValue: number;
    peakHours: { hour: number; count: number }[];
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    retention: number;
    segments: { segment: string; count: number }[];
  };
  products: {
    topSelling: { productId: string; name: string; sales: number }[];
    lowStock: { productId: string; name: string; stock: number }[];
    trending: { productId: string; name: string; growth: number }[];
  };
}