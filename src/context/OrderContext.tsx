import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  spiceLevel: string;
  customizations: string[];
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  estimatedDelivery: Date;
  createdAt: Date;
  specialInstructions?: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
}

const OrderContext = createContext<{
  orderState: OrderState;
  createOrder: (orderData: Partial<Order>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrder: (orderId: string) => Order | undefined;
  getUserOrders: (userEmail: string) => Order[];
} | null>(null);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderState, setOrderState] = useState<OrderState>({
    orders: [
      // Sample orders for demo
      {
        id: 'ORD001',
        items: [
          {
            id: '1',
            name: 'Traditional Shikanji',
            price: 80,
            quantity: 2,
            image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=300',
            spiceLevel: 'Mild',
            customizations: []
          }
        ],
        subtotal: 160,
        tax: 8,
        deliveryFee: 0,
        total: 168,
        status: 'delivered',
        paymentStatus: 'completed',
        paymentMethod: 'UPI',
        deliveryAddress: '123 MG Road, Bangalore, Karnataka 560001',
        customerName: 'Arjun Patel',
        customerPhone: '+91 9876543210',
        customerEmail: 'arjun.patel@email.com',
        estimatedDelivery: new Date(Date.now() - 86400000), // Yesterday
        createdAt: new Date(Date.now() - 86400000)
      }
    ],
    currentOrder: null,
    isLoading: false
  });

  const createOrder = async (orderData: Partial<Order>): Promise<string> => {
    setOrderState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      tax: orderData.tax || 0,
      deliveryFee: orderData.deliveryFee || 0,
      total: orderData.total || 0,
      status: 'confirmed',
      paymentStatus: 'completed',
      paymentMethod: orderData.paymentMethod || 'UPI',
      deliveryAddress: orderData.deliveryAddress || '',
      customerName: orderData.customerName || '',
      customerPhone: orderData.customerPhone || '',
      customerEmail: orderData.customerEmail || '',
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      createdAt: new Date(),
      specialInstructions: orderData.specialInstructions
    };

    setOrderState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      currentOrder: newOrder,
      isLoading: false
    }));

    // Simulate order status updates
    setTimeout(() => updateOrderStatus(orderId, 'preparing'), 5000);
    setTimeout(() => updateOrderStatus(orderId, 'ready'), 15000);
    setTimeout(() => updateOrderStatus(orderId, 'out_for_delivery'), 20000);

    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrderState(prev => ({
      ...prev,
      orders: prev.orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    }));
  };

  const getOrder = (orderId: string): Order | undefined => {
    return orderState.orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userEmail: string): Order[] => {
    return orderState.orders.filter(order => order.customerEmail === userEmail);
  };

  return (
    <OrderContext.Provider value={{
      orderState,
      createOrder,
      updateOrderStatus,
      getOrder,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};