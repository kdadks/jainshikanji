import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon, PlusIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  links?: Array<{ text: string; action: () => void }>;
  suggestedQuestions?: string[];
  products?: ProductDisplay[];
}

interface ProductDisplay {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  spiceLevel: string;
  isVeg: boolean;
}

interface UserIntent {
  type: 'product_inquiry' | 'order_status' | 'location_info' | 'contact_info' | 'company_info' | 'menu_browse' | 'delivery_info' | 'loyalty_info' | 'general';
  confidence: number;
  entities: string[];
}

const AIChat = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Jain AI, your intelligent assistant for Jain Shikanji. I can help you with menu items, add products to cart, check orders, locations, and more. How can I assist you today? 🥤',
      isBot: true,
      timestamp: new Date(),
      suggestedQuestions: [
        'What Indian food items do you have?',
        'Show me your North Indian cuisine menu',
        'Add Traditional Shikanji to cart',
        'What are your store locations?',
        'Show me popular beverages with images'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { authState } = useAuth();
  const { state: cartState, dispatch: cartDispatch } = useCart();

  // Mock product data for semantic search
  const productData: ProductDisplay[] = [
    {
      id: '1',
      name: 'Traditional Shikanji',
      description: 'Refreshing lemon-based drink with mint and spices',
      price: 80,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      spiceLevel: 'Mild',
      isVeg: true
    },
    {
      id: '2',
      name: 'Masala Chaas',
      description: 'Spiced buttermilk with cumin and mint',
      price: 60,
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7,
      spiceLevel: 'Mild',
      isVeg: true
    },
    {
      id: '3',
      name: 'Sweet Lassi',
      description: 'Creamy yogurt-based sweet drink',
      price: 90,
      image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9,
      spiceLevel: 'Sweet',
      isVeg: true
    },
    {
      id: '4',
      name: 'Mango Lassi',
      description: 'Rich and creamy mango yogurt drink',
      price: 110,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6,
      spiceLevel: 'Sweet',
      isVeg: true
    },
    {
      id: '5',
      name: 'Samosa (2 pcs)',
      description: 'Crispy fried pastries with spiced potato filling',
      price: 80,
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.5,
      spiceLevel: 'Medium',
      isVeg: true
    },
    {
      id: '6',
      name: 'Dhokla (4 pcs)',
      description: 'Steamed gram flour cake, light and fluffy',
      price: 70,
      image: 'https://images.pexels.com/photos/5560525/pexels-photo-5560525.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6,
      spiceLevel: 'Mild',
      isVeg: true
    },
    {
      id: '7',
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea with cardamom and ginger',
      price: 30,
      image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      spiceLevel: 'Mild',
      isVeg: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced intent recognition with semantic understanding
  const analyzeIntent = (userInput: string): UserIntent => {
    const input = userInput.toLowerCase();
    
    // Add to cart patterns
    if (input.match(/(add.*cart|buy|order|purchase|get)/)) {
      const entities = extractProductEntities(input);
      return { type: 'product_inquiry', confidence: 0.95, entities };
    }
    
    // Product inquiry patterns
    if (input.match(/(menu|food|drink|beverage|item|product|what.*have|show.*menu|indian food|north indian|veg food|cuisine)/)) {
      const entities = extractProductEntities(input);
      return { type: 'product_inquiry', confidence: 0.9, entities };
    }
    
    // Order status patterns
    if (input.match(/(order|status|track|delivery|when.*arrive|where.*order)/)) {
      return { type: 'order_status', confidence: 0.85, entities: [] };
    }
    
    // Location patterns
    if (input.match(/(location|address|where|branch|store|visit|directions|near)/)) {
      return { type: 'location_info', confidence: 0.9, entities: [] };
    }
    
    // Contact patterns
    if (input.match(/(contact|phone|email|call|reach|support|help.*contact)/)) {
      return { type: 'contact_info', confidence: 0.9, entities: [] };
    }
    
    // Company info patterns
    if (input.match(/(about|company|history|story|founded|heritage|jain shikanji)/)) {
      return { type: 'company_info', confidence: 0.9, entities: [] };
    }
    
    // Delivery info patterns
    if (input.match(/(delivery|deliver|time|fast|free|charge|area)/)) {
      return { type: 'delivery_info', confidence: 0.8, entities: [] };
    }
    
    // Loyalty program patterns
    if (input.match(/(loyalty|points|reward|member|tier|benefit)/)) {
      return { type: 'loyalty_info', confidence: 0.8, entities: [] };
    }
    
    return { type: 'general', confidence: 0.5, entities: [] };
  };

  // Extract product-related entities from user input
  const extractProductEntities = (input: string): string[] => {
    const entities: string[] = [];
    
    productData.forEach(product => {
      if (input.toLowerCase().includes(product.name.toLowerCase())) {
        entities.push(product.name);
      }
    });
    
    return [...new Set(entities)]; // Remove duplicates
  };

  // Semantic search for products
  const searchProducts = (query: string, entities: string[]): ProductDisplay[] => {
    const queryWords = query.toLowerCase().split(' ');
    
    return productData.filter(product => {
      // Direct entity match
      if (entities.includes(product.name)) return true;
      
      // Name matching
      const nameMatch = queryWords.some(word => 
        product.name.toLowerCase().includes(word)
      );
      
      // Description matching
      const descMatch = queryWords.some(word => 
        product.description.toLowerCase().includes(word)
      );
      
      return nameMatch || descMatch;
    });
  };

  // Add to cart function
  const handleAddToCart = (product: ProductDisplay) => {
    if (!authState.isAuthenticated) {
      const loginMessage: Message = {
        id: Date.now().toString(),
        text: '🔐 **Login Required**\n\nTo add items to your cart, please login first using the login button in the header. Once logged in, you can easily add any of our delicious Indian food items to your cart!\n\n✨ **Benefits of logging in:**\n• Add items to cart\n• Track your orders\n• Earn loyalty points\n• Save favorite items\n• Get personalized recommendations',
        isBot: true,
        timestamp: new Date(),
        suggestedQuestions: [
          'Tell me about your loyalty program',
          'What are your store locations?',
          'Show me more Indian food options',
          'What makes your food authentic?'
        ]
      };
      setMessages(prev => [...prev, loginMessage]);
      return;
    }

    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        spiceLevel: product.spiceLevel,
        customizations: [],
        image: product.image
      }
    });

    toast.success(`${product.name} added to cart!`);
    
    // Add a bot message confirming the addition
    const confirmMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `🎉 **Added to Cart Successfully!**\n\n✅ ${product.name} has been added to your cart\n💰 Price: ₹${product.price}\n🛒 Cart Total: ${cartState.items.length + 1} item${cartState.items.length + 1 > 1 ? 's' : ''}\n\n${cartState.items.length === 0 ? '🎊 This is your first item! Great choice!' : `You now have ${cartState.items.length + 1} items in your cart.`}\n\nWhat would you like to do next?`,
      isBot: true,
      timestamp: new Date(),
      links: [{ text: '🛒 View Cart & Checkout', action: () => navigate('/cart') }],
      suggestedQuestions: [
        'Show me more Indian beverages',
        'Add Sweet Lassi to cart',
        'What veg food snacks do you have?',
        'Tell me about delivery options'
      ]
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  const generateResponse = (intent: UserIntent, userInput: string): Message => {
    const isLoggedIn = authState.isAuthenticated;
    const userName = authState.user?.name || 'there';
    const cartItems = cartState.items.length;
    
    let responseText = '';
    let links: Array<{ text: string; action: () => void }> = [];
    let suggestedQuestions: string[] = [];
    let products: ProductDisplay[] = [];

    switch (intent.type) {
      case 'product_inquiry':
        const matchedProducts = searchProducts(userInput, intent.entities);
        const isAddToCartRequest = userInput.toLowerCase().includes('add') && userInput.toLowerCase().includes('cart');
        
        if (matchedProducts.length > 0) {
          if (isAddToCartRequest && !isLoggedIn) {
            responseText = `🔐 **Login Required to Add Items**\n\nI found the perfect items for you! However, you need to login first to add items to your cart.\n\n👆 **Please click the login button in the header above** to sign in, then you can add any of these delicious items:`;
            products = matchedProducts.slice(0, 3);
            
            suggestedQuestions = [
              'Tell me about your loyalty program',
              'What are your store locations?',
              'Show me more Indian food options',
              'What makes your beverages authentic?'
            ];
          } else if (isAddToCartRequest && isLoggedIn) {
            responseText = `🛒 **Ready to Add to Cart!**\n\nPerfect, ${userName}! Here are the items you can add to your cart. Just click the "Add" button on any item:`;
            products = matchedProducts.slice(0, 4);
            
            links = [
              { text: '🛒 View Current Cart', action: () => navigate('/cart') },
              { text: '🍽️ Browse Full Menu', action: () => navigate('/menu') }
            ];
            
            suggestedQuestions = [
              'Add Sweet Lassi to cart',
              'Show me North Indian cuisine items',
              'What veg food snacks do you have?',
              'Tell me about delivery options'
            ];
          } else {
            responseText = `🍽️ **Perfect Match Found!**\n\nGreat choice${isLoggedIn ? `, ${userName}` : ''}! Here are our ${matchedProducts.length > 1 ? 'top matches' : 'perfect match'} for your Indian food query:`;
            products = matchedProducts.slice(0, 4);
            
            responseText += `\n\n✅ All our items are 100% vegetarian and Jain-friendly\n🌿 Made with fresh, authentic ingredients\n⚡ ${isLoggedIn ? 'Click "Add" to order instantly!' : 'Login to add items to your cart'}`;
            
            links = [
              { text: '🍽️ View Full Menu', action: () => navigate('/menu') }
            ];
            
            suggestedQuestions = isLoggedIn ? [
              'Add Traditional Shikanji to cart',
              'Show me North Indian cuisine options',
              'What are your most popular veg food items?',
              'Tell me about your delivery areas'
            ] : [
              'What makes your Indian food special?',
              'Show me your store locations',
              'What are your operating hours?',
              'Tell me about Sweet Lassi'
            ];
          }
        } else {
          responseText = `🔍 **Let me help you find something delicious!**\n\nI'd love to help you discover the perfect Indian food or beverage! While I couldn't find exact matches for "${userInput}", we have an amazing selection of authentic North Indian cuisine and traditional beverages.\n\nHere are some popular items you might enjoy:`;
          
          products = productData.slice(0, 4);
          
          responseText += `\n\nAll our items are 100% vegetarian and Jain-friendly. ${isLoggedIn ? 'Click "Add to Cart" to order!' : 'Please login to add items to your cart.'}`;
          
          links = [
            { text: '🍽️ Explore Our Menu', action: () => navigate('/menu') }
          ];
          
          suggestedQuestions = [
            isLoggedIn ? 'Add Sweet Lassi to cart' : 'Tell me about Sweet Lassi',
            'Show me your North Indian cuisine',
            'What veg food options do you have?'
          ];
        }
        break;

      case 'order_status':
        if (isLoggedIn) {
          responseText = `Hi ${userName}! I can help you track your order. ${cartItems > 0 ? `I see you have ${cartItems} items in your cart. ` : ''}For real-time order tracking, please visit your order history or use your order ID.`;
          
          links = [
            { text: 'Track Your Order', action: () => navigate('/order-tracking/ORD001') },
            { text: 'Order History', action: () => navigate('/dashboard') }
          ];
        } else {
          responseText = 'To check your order status, please log in to your account. Once logged in, you can track all your orders in real-time!';
        }
        
        suggestedQuestions = [
          'How long does delivery usually take?',
          'What are your delivery areas?',
          'Can I modify my order after placing it?'
        ];
        break;

      case 'location_info':
        responseText = `📍 **Our Locations**\n\nWe have 2 convenient locations serving authentic Indian food and beverages:\n\n🏪 **MG Road Branch**\n123 MG Road, Bangalore\nPhone: +91 9876543210\n\n🏪 **Koramangala Branch**\n456 Koramangala, Bangalore\nPhone: +91 9876543211\n\n🕒 **Hours**: 11:00 AM - 11:00 PM (Daily)\n🚚 **Services**: Dine-in, Takeaway, Delivery`;
        
        suggestedQuestions = [
          'What are your operating hours?',
          'Do you offer home delivery?',
          'Which location is closer to Indiranagar?'
        ];
        break;

      case 'contact_info':
        responseText = `📞 **Contact Information**\n\nHere's how you can reach us:\n\n📞 **Phone**: +91 9876543210\n📧 **Email**: contact@jainshikanji.com\n🕒 **Hours**: 11:00 AM - 11:00 PM (Daily)\n\nFor immediate assistance with orders or Indian food queries, I'm here to help! You can also visit our stores for the full authentic experience.`;
        
        suggestedQuestions = [
          'Do you take catering orders?',
          'Can I make reservations?',
          'What payment methods do you accept?'
        ];
        break;

      case 'company_info':
        responseText = `🏛️ **About Jain Shikanji**\n\nWelcome to our story!\n\n**Founded**: 1995 (25+ years of excellence)\n**Specialty**: 100% vegetarian and Jain-friendly Indian beverages & snacks\n**Heritage**: Traditional recipes passed down through generations\n**Mission**: Bringing authentic Indian food and North Indian cuisine to beverage lovers\n\nWe started as a small family business with a passion for traditional Indian beverages. Today, we're proud to serve thousands of customers with the same authentic flavors and commitment to quality!`;
        
        suggestedQuestions = [
          'What makes your beverages special?',
          'Do you use traditional recipes?',
          'Are all items Jain-friendly?'
        ];
        break;

      case 'delivery_info':
        responseText = `🚚 **Delivery Information**\n\n✅ **Free Delivery**: On orders above ₹299\n⏰ **Delivery Time**: 30-45 minutes\n📍 **Coverage**: 10km radius from our stores\n💳 **Payment**: Cash, Cards, UPI accepted\n\n${isLoggedIn ? `${userName}, ` : ''}we ensure your Indian food and beverages reach you fresh and hot! Our delivery partners are trained to handle our traditional beverages with care.`;
        
        links = [{ text: 'Order Now', action: () => navigate('/menu') }];
        
        suggestedQuestions = [
          'What are the delivery charges?',
          'Can I schedule delivery for later?',
          'Do you deliver to my area?'
        ];
        break;

      case 'loyalty_info':
        responseText = `🏆 **Jain Shikanji Loyalty Program**\n\n${isLoggedIn ? `Hi ${userName}! Your current tier: ${authState.user?.tier || 'Bronze'}` : 'Join our loyalty program to earn rewards!'}\n\n**Tiers**: Bronze → Silver → Gold → Platinum\n**Benefits**: Cashback, free delivery, exclusive items\n**Earn Points**: On every order of Indian food and beverages\n\nThe more you enjoy our authentic North Indian cuisine, the more you save!`;
        
        links = [{ text: 'View Loyalty Program', action: () => navigate('/loyalty') }];
        
        suggestedQuestions = [
          'How do I earn loyalty points?',
          'What are the tier benefits?',
          'Can I redeem points for free food?'
        ];
        break;

      default:
        responseText = `🤖 **I'm here to help!**\n\nI can assist you with anything related to Jain Shikanji:\n\n🥤 **Menu & Indian Food**: Browse our authentic beverages and North Indian cuisine\n📦 **Orders**: Track status and delivery information\n📍 **Locations**: Find our stores and get directions\n🏢 **Company**: Learn about our heritage and values\n\nWhat would you like to know more about?`;
        
        links = [{ text: 'Explore Menu', action: () => navigate('/menu') }];
        
        suggestedQuestions = [
          'What Indian beverages do you recommend?',
          'Tell me about your North Indian cuisine',
          'Where are your store locations?',
          'What makes your veg food special?'
        ];
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      isBot: true,
      timestamp: new Date(),
      links,
      suggestedQuestions,
      products
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Analyze user intent and generate contextual response
    const intent = analyzeIntent(inputValue);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const botResponse = generateResponse(intent, inputValue);
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Process the question immediately
    setTimeout(async () => {
      const intent = analyzeIntent(question);
      const botResponse = generateResponse(intent, question);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 ${isOpen ? 'hidden' : 'block'}`}
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">जै</span>
                </div>
                <div>
                  <h3 className="font-semibold">Jain AI Assistant</h3>
                  <p className="text-xs text-orange-100">Intelligent Indian Food Helper</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-orange-200 transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    
                    {/* Product Cards */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {message.products.map((product) => (
                          <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex items-start space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                      <span className="text-lg font-bold text-orange-600">₹{product.price}</span>
                                      <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400">⭐</span>
                                        <span className="text-xs text-gray-600">{product.rating}</span>
                                      </div>
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        product.spiceLevel === 'Mild' ? 'bg-green-100 text-green-800' :
                                        product.spiceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        product.spiceLevel === 'Sweet' ? 'bg-pink-100 text-pink-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {product.spiceLevel}
                                      </span>
                                      {product.isVeg && (
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">VEG</span>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!authState.isAuthenticated}
                                    className={`ml-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                                      authState.isAuthenticated
                                        ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 shadow-md'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                                    }`}
                                    title={authState.isAuthenticated ? 'Add to Cart' : 'Login to add to cart'}
                                  >
                                    <PlusIcon className="w-3 h-3" />
                                    <span className="font-semibold">Add</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Links */}
                    {message.links && message.links.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.links.map((link, index) => (
                          <button
                            key={index}
                            onClick={link.action}
                            className="block w-full text-left text-xs bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                          >
                            {link.text} →
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Suggested Questions */}
                    {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-600 mb-2">Suggested questions:</p>
                        <div className="space-y-1">
                          {message.suggestedQuestions.map((question, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestedQuestion(question)}
                              className="block w-full text-left text-xs bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              {cartState.items.length > 0 && (
                <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingCartIcon className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-800">
                        {cartState.items.length} item{cartState.items.length > 1 ? 's' : ''} in cart
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/cart')}
                      className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition-colors duration-200"
                    >
                      View Cart
                    </button>
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about menu, add items to cart, orders..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;