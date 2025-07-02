import { Product, Customer, Sale, Order } from '../types';

export const sampleProducts: Product[] = [
  // Raw Millets
  {
    id: '1',
    name: 'Foxtail Millet',
    category: 'raw-millets',
    price: 120,
    cost: 90,
    stock: 50,
    minStock: 10,
    unit: 'kg',
    barcode: '8901234567890',
    supplier: 'Organic Farms Ltd',
    description: 'Premium quality foxtail millet'
  },
  {
    id: '2',
    name: 'Pearl Millet (Bajra)',
    category: 'raw-millets',
    price: 80,
    cost: 60,
    stock: 75,
    minStock: 15,
    unit: 'kg',
    barcode: '8901234567891',
    supplier: 'Organic Farms Ltd'
  },
  {
    id: '3',
    name: 'Finger Millet (Ragi)',
    category: 'raw-millets',
    price: 100,
    cost: 75,
    stock: 40,
    minStock: 10,
    unit: 'kg',
    barcode: '8901234567892'
  },
  {
    id: '4',
    name: 'Little Millet',
    category: 'raw-millets',
    price: 150,
    cost: 120,
    stock: 8,
    minStock: 10,
    unit: 'kg',
    barcode: '8901234567893'
  },
  {
    id: '5',
    name: 'Barnyard Millet',
    category: 'raw-millets',
    price: 140,
    cost: 110,
    stock: 25,
    minStock: 10,
    unit: 'kg',
    barcode: '8901234567894'
  },
  // Processed Products
  {
    id: '6',
    name: 'Millet Flour Mix',
    category: 'processed',
    price: 180,
    cost: 140,
    stock: 30,
    minStock: 8,
    unit: 'kg',
    barcode: '8901234567895'
  },
  {
    id: '7',
    name: 'Ragi Flour',
    category: 'processed',
    price: 160,
    cost: 120,
    stock: 45,
    minStock: 10,
    unit: 'kg',
    barcode: '8901234567896'
  },
  {
    id: '8',
    name: 'Millet Noodles',
    category: 'processed',
    price: 80,
    cost: 60,
    stock: 60,
    minStock: 15,
    unit: 'packet',
    barcode: '8901234567897'
  },
  {
    id: '9',
    name: 'Millet Cookies',
    category: 'snacks',
    price: 120,
    cost: 90,
    stock: 35,
    minStock: 10,
    unit: 'packet',
    barcode: '8901234567898'
  },
  {
    id: '10',
    name: 'Millet Crackers',
    category: 'snacks',
    price: 100,
    cost: 75,
    stock: 42,
    minStock: 12,
    unit: 'packet',
    barcode: '8901234567899'
  },
  // Sweets
  {
    id: '11',
    name: 'Ragi Laddu',
    category: 'sweets',
    price: 320,
    cost: 240,
    stock: 15,
    minStock: 5,
    unit: 'kg',
    barcode: '8901234567900'
  },
  {
    id: '12',
    name: 'Nuvvula Laddu',
    category: 'sweets',
    price: 380,
    cost: 280,
    stock: 12,
    minStock: 5,
    unit: 'kg',
    barcode: '8901234567901'
  },
  {
    id: '13',
    name: 'Millet Poli',
    category: 'sweets',
    price: 200,
    cost: 150,
    stock: 20,
    minStock: 8,
    unit: 'piece',
    barcode: '8901234567902'
  },
  // Breakfast Items
  {
    id: '14',
    name: 'Millet Dosa Mix',
    category: 'breakfast',
    price: 150,
    cost: 115,
    stock: 28,
    minStock: 8,
    unit: 'kg',
    barcode: '8901234567903'
  },
  {
    id: '15',
    name: 'Pesarattu Mix',
    category: 'breakfast',
    price: 140,
    cost: 105,
    stock: 32,
    minStock: 10,
    unit: 'kg',
    barcode: '8901234567904'
  },
  {
    id: '16',
    name: 'Millet Idly Mix',
    category: 'breakfast',
    price: 120,
    cost: 90,
    stock: 38,
    minStock: 10,
    unit: 'kg',
    barcode: '8901234567905'
  }
];

export const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh@email.com',
    address: '123 MG Road, Bangalore',
    totalPurchases: 15420,
    lastVisit: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 9876543211',
    email: 'priya@email.com',
    address: '456 Koramangala, Bangalore',
    totalPurchases: 8750,
    lastVisit: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Amit Patel',
    phone: '+91 9876543212',
    totalPurchases: 12300,
    lastVisit: new Date('2024-01-13')
  },
  {
    id: '4',
    name: 'Sunita Devi',
    phone: '+91 9876543213',
    email: 'sunita@email.com',
    totalPurchases: 5680,
    lastVisit: new Date('2024-01-12')
  }
];

export const categoryLabels = {
  'raw-millets': 'Raw Millets',
  'processed': 'Processed Products',
  'sweets': 'Sweets & Desserts',
  'breakfast': 'Breakfast Items',
  'snacks': 'Snacks & Crackers'
};

export const paymentMethods = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'split', label: 'Split Payment' }
];