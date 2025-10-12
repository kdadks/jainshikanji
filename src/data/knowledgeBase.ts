// Knowledge base for AI chat agent
export interface ProductInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  keywords: string[];
  isVeg: boolean;
  isVegan: boolean;
  isJain: boolean;
  isGlutenFree: boolean;
  spiceLevel: string;
  preparationTime: string;
  servingSize: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  hours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  services: string[];
  facilities: string[];
  deliveryRadius: number;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  founded: string;
  heritage: string;
  mission: string;
  values: string[];
  certifications: string[];
  awards: string[];
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

// Enhanced product database with detailed information
export const productDatabase: ProductInfo[] = [
  {
    id: '1',
    name: 'Traditional Shikanji',
    category: 'beverages',
    description: 'Refreshing lemon-based drink with mint, cumin, and traditional spices. A perfect thirst quencher with authentic North Indian flavors.',
    price: 80,
    ingredients: ['Fresh lemon juice', 'Mint leaves', 'Cumin powder', 'Black salt', 'Sugar', 'Water', 'Ice'],
    allergens: [],
    nutritionalInfo: { calories: 120, protein: 1, carbs: 30, fat: 0 },
    keywords: ['shikanji', 'lemon', 'drink', 'beverage', 'traditional', 'refreshing', 'indian food', 'north indian cuisine', 'summer drink'],
    isVeg: true,
    isVegan: true,
    isJain: true,
    isGlutenFree: true,
    spiceLevel: 'Mild',
    preparationTime: '5 minutes',
    servingSize: '300ml'
  },
  {
    id: '2',
    name: 'Masala Chaas',
    category: 'beverages',
    description: 'Spiced buttermilk with roasted cumin, mint, and traditional Indian spices. A cooling and digestive drink.',
    price: 60,
    ingredients: ['Fresh yogurt', 'Water', 'Roasted cumin powder', 'Mint leaves', 'Black salt', 'Ginger', 'Green chilies'],
    allergens: ['Dairy'],
    nutritionalInfo: { calories: 80, protein: 4, carbs: 8, fat: 3 },
    keywords: ['chaas', 'buttermilk', 'masala', 'spiced', 'drink', 'traditional', 'yogurt', 'indian cuisine', 'digestive'],
    isVeg: true,
    isVegan: false,
    isJain: true,
    isGlutenFree: true,
    spiceLevel: 'Medium',
    preparationTime: '7 minutes',
    servingSize: '250ml'
  },
  {
    id: '3',
    name: 'Sweet Lassi',
    category: 'beverages',
    description: 'Creamy yogurt-based sweet drink with cardamom and rose water. A classic North Indian beverage.',
    price: 90,
    ingredients: ['Fresh yogurt', 'Sugar', 'Cardamom powder', 'Rose water', 'Crushed ice', 'Pistachios'],
    allergens: ['Dairy', 'Nuts'],
    nutritionalInfo: { calories: 150, protein: 6, carbs: 25, fat: 4 },
    keywords: ['lassi', 'sweet', 'yogurt', 'creamy', 'drink', 'dessert', 'north indian cuisine', 'cardamom'],
    isVeg: true,
    isVegan: false,
    isJain: true,
    isGlutenFree: true,
    spiceLevel: 'Sweet',
    preparationTime: '5 minutes',
    servingSize: '300ml'
  },
  {
    id: '4',
    name: 'Mango Lassi',
    category: 'beverages',
    description: 'Rich and creamy mango yogurt drink made with fresh mango pulp and aromatic spices.',
    price: 110,
    ingredients: ['Fresh mango pulp', 'Yogurt', 'Sugar', 'Cardamom', 'Ice', 'Mint garnish'],
    allergens: ['Dairy'],
    nutritionalInfo: { calories: 180, protein: 5, carbs: 35, fat: 4 },
    keywords: ['mango lassi', 'mango', 'fruit', 'creamy', 'seasonal', 'indian food', 'summer special'],
    isVeg: true,
    isVegan: false,
    isJain: true,
    isGlutenFree: true,
    spiceLevel: 'Sweet',
    preparationTime: '6 minutes',
    servingSize: '300ml'
  },
  {
    id: '5',
    name: 'Samosa (2 pieces)',
    category: 'snacks',
    description: 'Crispy fried pastries filled with spiced potatoes, green peas, and aromatic herbs.',
    price: 40,
    ingredients: ['Wheat flour', 'Potatoes', 'Green peas', 'Cumin seeds', 'Coriander seeds', 'Green chilies', 'Oil'],
    allergens: ['Gluten'],
    nutritionalInfo: { calories: 220, protein: 5, carbs: 30, fat: 10 },
    keywords: ['samosa', 'snack', 'fried', 'potato', 'crispy', 'indian food', 'street food', 'veg food'],
    isVeg: true,
    isVegan: true,
    isJain: true,
    isGlutenFree: false,
    spiceLevel: 'Medium',
    preparationTime: '15 minutes',
    servingSize: '2 pieces'
  },
  {
    id: '6',
    name: 'Dhokla (4 pieces)',
    category: 'snacks',
    description: 'Steamed gram flour cake, light and fluffy, garnished with mustard seeds and curry leaves.',
    price: 70,
    ingredients: ['Gram flour', 'Yogurt', 'Ginger-green chili paste', 'Turmeric', 'Mustard seeds', 'Curry leaves'],
    allergens: ['Dairy'],
    nutritionalInfo: { calories: 160, protein: 8, carbs: 25, fat: 4 },
    keywords: ['dhokla', 'steamed', 'gram flour', 'gujarati', 'snack', 'veg food', 'healthy', 'light'],
    isVeg: true,
    isVegan: false,
    isJain: true,
    isGlutenFree: true,
    spiceLevel: 'Mild',
    preparationTime: '20 minutes',
    servingSize: '4 pieces'
  },
  {
    id: '7',
    name: 'Kachori (2 pieces)',
    category: 'snacks',
    description: 'Deep-fried bread stuffed with spiced lentil filling, served with tangy tamarind chutney.',
    price: 50,
    ingredients: ['Wheat flour', 'Moong dal', 'Spices', 'Oil', 'Tamarind chutney'],
    allergens: ['Gluten'],
    nutritionalInfo: { calories: 250, protein: 7, carbs: 32, fat: 12 },
    keywords: ['kachori', 'fried', 'lentil', 'stuffed', 'indian food', 'rajasthani', 'spicy'],
    isVeg: true,
    isVegan: true,
    isJain: true,
    isGlutenFree: false,
    spiceLevel: 'Medium',
    preparationTime: '18 minutes',
    servingSize: '2 pieces'
  },
  {
    id: '8',
    name: 'Masala Chai',
    category: 'beverages',
    description: 'Traditional Indian spiced tea with cardamom, ginger, and aromatic spices.',
    price: 30,
    ingredients: ['Tea leaves', 'Milk', 'Sugar', 'Cardamom', 'Ginger', 'Cinnamon', 'Cloves'],
    allergens: ['Dairy'],
    nutritionalInfo: { calories: 100, protein: 3, carbs: 15, fat: 3 },
    keywords: ['chai', 'tea', 'masala', 'spiced', 'traditional', 'indian food', 'hot beverage'],
    isVeg: true,
    isVegan: false,
    isJain: true,
    isGlutenFree: true,
    spiceLevel: 'Mild',
    preparationTime: '8 minutes',
    servingSize: '200ml'
  }
];

// Location database
export const locationDatabase: LocationInfo[] = [
  {
    id: '1',
    name: 'Jain Shikanji - MG Road',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    phone: '+91 9876543210',
    email: 'mgroad@jainshikanji.com',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    hours: {
      monday: { open: '11:00', close: '23:00', isOpen: true },
      tuesday: { open: '11:00', close: '23:00', isOpen: true },
      wednesday: { open: '11:00', close: '23:00', isOpen: true },
      thursday: { open: '11:00', close: '23:00', isOpen: true },
      friday: { open: '11:00', close: '23:00', isOpen: true },
      saturday: { open: '11:00', close: '23:30', isOpen: true },
      sunday: { open: '11:00', close: '23:30', isOpen: true }
    },
    services: ['Dine-in', 'Takeaway', 'Home Delivery', 'Catering'],
    facilities: ['Air Conditioning', 'WiFi', 'Parking', 'Card Payment', 'UPI'],
    deliveryRadius: 10
  },
  {
    id: '2',
    name: 'Jain Shikanji - Koramangala',
    address: '456 Koramangala, Bangalore, Karnataka 560034',
    phone: '+91 9876543211',
    email: 'koramangala@jainshikanji.com',
    coordinates: { lat: 12.9279, lng: 77.6271 },
    hours: {
      monday: { open: '11:00', close: '23:00', isOpen: true },
      tuesday: { open: '11:00', close: '23:00', isOpen: true },
      wednesday: { open: '11:00', close: '23:00', isOpen: true },
      thursday: { open: '11:00', close: '23:00', isOpen: true },
      friday: { open: '11:00', close: '23:00', isOpen: true },
      saturday: { open: '11:00', close: '23:30', isOpen: true },
      sunday: { open: '11:00', close: '23:30', isOpen: true }
    },
    services: ['Dine-in', 'Takeaway', 'Home Delivery', 'Catering'],
    facilities: ['Air Conditioning', 'WiFi', 'Parking', 'Card Payment', 'UPI'],
    deliveryRadius: 8
  }
];

// Company information
export const companyDatabase: CompanyInfo = {
  name: 'Jain Shikanji',
  tagline: 'Authentic Indian Beverages & Snacks',
  founded: '1995',
  heritage: '25+ years of traditional beverage crafting and authentic Indian food preparation',
  mission: 'To bring authentic Indian food and North Indian cuisine to beverage and snack lovers while maintaining 100% vegetarian and Jain-friendly principles',
  values: [
    'Authenticity in every recipe',
    '100% vegetarian and Jain-compliant',
    'Fresh ingredients sourced daily',
    'Traditional preparation methods',
    'Customer satisfaction first',
    'Sustainable business practices'
  ],
  certifications: [
    'FSSAI Licensed',
    'ISO 22000 Food Safety',
    'Jain Food Certified',
    'Vegetarian Certified',
    'Halal Certified'
  ],
  awards: [
    'Best Traditional Beverages 2023',
    'Customer Choice Award 2022',
    'Authentic Indian Food Excellence 2021',
    'Bangalore Food Festival Winner 2020'
  ],
  socialMedia: {
    facebook: 'https://facebook.com/jainshikanji',
    instagram: 'https://instagram.com/jainshikanji',
    twitter: 'https://twitter.com/jainshikanji'
  }
};

// FAQ database for quick responses
export const faqDatabase = [
  {
    question: 'What makes your Indian food authentic?',
    answer: 'Our recipes have been passed down through generations since 1995. We use traditional preparation methods, authentic spices sourced directly from their regions of origin, and maintain the original North Indian cuisine techniques.',
    keywords: ['authentic', 'traditional', 'recipes', 'indian food', 'north indian cuisine']
  },
  {
    question: 'Are all items vegetarian and Jain-friendly?',
    answer: 'Yes! All our items are 100% vegetarian and Jain-friendly. We use no onion, garlic, or root vegetables in any of our preparations. Every item is clearly marked for dietary preferences.',
    keywords: ['vegetarian', 'jain', 'veg food', 'dietary', 'restrictions']
  },
  {
    question: 'What are your delivery timings and charges?',
    answer: 'We deliver from 11:00 AM to 11:00 PM daily. Delivery is FREE for orders above ₹299, otherwise ₹40. Average delivery time is 30-45 minutes within our 10km radius.',
    keywords: ['delivery', 'timing', 'charges', 'free delivery', 'time']
  },
  {
    question: 'Do you cater to events and parties?',
    answer: 'Yes! We provide catering services for events, parties, and corporate functions. Our catering menu includes beverage stations, bulk orders, and customized packages. Contact us for quotes.',
    keywords: ['catering', 'events', 'parties', 'corporate', 'bulk orders']
  }
];