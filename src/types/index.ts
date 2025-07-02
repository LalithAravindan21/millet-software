export interface Product {
  id: string;
  name: string;
  category: 'raw-millets' | 'processed' | 'sweets' | 'breakfast' | 'snacks';
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  barcode?: string;
  unit: 'kg' | 'g' | 'piece' | 'packet';
  description?: string;
  supplier?: string;
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  lastVisit: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount?: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'upi' | 'split';
  date: Date;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'walk-in' | 'online' | 'phone';
  date: Date;
  expectedDelivery?: Date;
  notes?: string;
}

export interface InventoryAlert {
  id: string;
  productId: string;
  type: 'low-stock' | 'out-of-stock' | 'expired';
  message: string;
  date: Date;
}