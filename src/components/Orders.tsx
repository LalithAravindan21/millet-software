import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  Phone,
  Globe,
  User
} from 'lucide-react';
import { Order, Customer } from '../types';
import { sampleCustomers } from '../data/sampleData';

const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerId: '1',
    items: [
      { product: { id: '1', name: 'Foxtail Millet', category: 'raw-millets', price: 120, cost: 90, stock: 50, minStock: 10, unit: 'kg' }, quantity: 2 },
      { product: { id: '11', name: 'Ragi Laddu', category: 'sweets', price: 320, cost: 240, stock: 15, minStock: 5, unit: 'kg' }, quantity: 1 }
    ],
    subtotal: 560,
    discount: 0,
    tax: 28,
    total: 588,
    status: 'confirmed',
    orderType: 'online',
    date: new Date('2024-01-15T10:30:00'),
    expectedDelivery: new Date('2024-01-16T15:00:00'),
    notes: 'Please pack carefully'
  },
  {
    id: 'ORD-2024-002',
    customerId: '2',
    items: [
      { product: { id: '6', name: 'Millet Flour Mix', category: 'processed', price: 180, cost: 140, stock: 30, minStock: 8, unit: 'kg' }, quantity: 3 },
      { product: { id: '9', name: 'Millet Cookies', category: 'snacks', price: 120, cost: 90, stock: 35, minStock: 10, unit: 'packet' }, quantity: 2 }
    ],
    subtotal: 780,
    discount: 39,
    tax: 37.05,
    total: 778.05,
    status: 'processing',
    orderType: 'phone',
    date: new Date('2024-01-15T14:20:00'),
    expectedDelivery: new Date('2024-01-17T11:00:00')
  },
  {
    id: 'ORD-2024-003',
    customerId: '3',
    items: [
      { product: { id: '14', name: 'Millet Dosa Mix', category: 'breakfast', price: 150, cost: 115, stock: 28, minStock: 8, unit: 'kg' }, quantity: 2 },
      { product: { id: '15', name: 'Pesarattu Mix', category: 'breakfast', price: 140, cost: 105, stock: 32, minStock: 10, unit: 'kg' }, quantity: 1 }
    ],
    subtotal: 440,
    discount: 0,
    tax: 22,
    total: 462,
    status: 'ready',
    orderType: 'walk-in',
    date: new Date('2024-01-15T16:45:00')
  },
  {
    id: 'ORD-2024-004',
    customerId: '4',
    items: [
      { product: { id: '2', name: 'Pearl Millet (Bajra)', category: 'raw-millets', price: 80, cost: 60, stock: 75, minStock: 15, unit: 'kg' }, quantity: 5 }
    ],
    subtotal: 400,
    discount: 20,
    tax: 19,
    total: 399,
    status: 'delivered',
    orderType: 'online',
    date: new Date('2024-01-14T09:15:00'),
    expectedDelivery: new Date('2024-01-15T14:00:00')
  }
];

const statusConfig = {
  pending: { color: 'yellow', icon: Clock, label: 'Pending' },
  confirmed: { color: 'blue', icon: CheckCircle, label: 'Confirmed' },
  processing: { color: 'purple', icon: Package, label: 'Processing' },
  ready: { color: 'green', icon: CheckCircle, label: 'Ready' },
  delivered: { color: 'green', icon: Truck, label: 'Delivered' },
  cancelled: { color: 'red', icon: XCircle, label: 'Cancelled' }
};

const orderTypeConfig = {
  'walk-in': { icon: User, label: 'Walk-in', color: 'blue' },
  'online': { icon: Globe, label: 'Online', color: 'green' },
  'phone': { icon: Phone, label: 'Phone', color: 'purple' }
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    const customer = sampleCustomers.find(c => c.id === order.customerId);
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer?.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.orderType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getCustomer = (customerId: string): Customer | undefined => {
    return sampleCustomers.find(c => c.id === customerId);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        config.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
        config.color === 'blue' ? 'bg-blue-100 text-blue-800' :
        config.color === 'purple' ? 'bg-purple-100 text-purple-800' :
        config.color === 'green' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const OrderTypeIcon = ({ type }: { type: Order['orderType'] }) => {
    const config = orderTypeConfig[type];
    const Icon = config.icon;
    return (
      <div className={`p-2 rounded-lg ${
        config.color === 'blue' ? 'bg-blue-100 text-blue-600' :
        config.color === 'green' ? 'bg-green-100 text-green-600' :
        'bg-purple-100 text-purple-600'
      }`}>
        <Icon className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          <Plus className="h-4 w-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-3xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Pickup</p>
              <p className="text-3xl font-bold text-green-600">
                {orders.filter(o => o.status === 'ready').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-3xl font-bold text-purple-600">
                ₹{orders.filter(o => 
                  o.date.toDateString() === new Date().toDateString()
                ).reduce((sum, o) => sum + o.total, 0).toFixed(0)}
              </p>
            </div>
            <Truck className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="walk-in">Walk-in</option>
            <option value="online">Online</option>
            <option value="phone">Phone</option>
          </select>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => {
 const customer = getCustomer(order.customerId);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {order.date.toLocaleDateString()} {order.date.toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item(s)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer?.name || 'Walk-in Customer'}
                        </div>
                        <div className="text-sm text-gray-500">{customer?.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <OrderTypeIcon type={order.orderType} />
                        <span className="text-sm text-gray-900 capitalize">
                          {orderTypeConfig[order.orderType].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{order.total.toFixed(2)}</div>
                      {order.discount > 0 && (
                        <div className="text-sm text-green-600">-₹{order.discount.toFixed(2)} discount</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
 <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Order Details - {selectedOrder.id}</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{getCustomer(selectedOrder.customerId)?.name || 'Walk-in Customer'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{getCustomer(selectedOrder.customerId)?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">₹{item.product.price} × {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{selectedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="font-medium mb-3">Update Status</h4>
                <div className="flex space-x-2">
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, status as Order['status']);
                        setShowOrderModal(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        selectedOrder.status === status
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}