import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Filter,
  BarChart3,
  PieChart,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const salesData = [
  { date: '2024-01-01', sales: 12450, orders: 42, customers: 38 },
  { date: '2024-01-02', sales: 15680, orders: 56, customers: 52 },
  { date: '2024-01-03', sales: 11230, orders: 38, customers: 35 },
  { date: '2024-01-04', sales: 18920, orders: 67, customers: 61 },
  { date: '2024-01-05', sales: 16540, orders: 59, customers: 54 },
  { date: '2024-01-06', sales: 14320, orders: 48, customers: 44 },
  { date: '2024-01-07', sales: 19850, orders: 71, customers: 65 },
];

const monthlyData = [
  { month: 'Jan', sales: 450000, profit: 67500, orders: 1200 },
  { month: 'Feb', sales: 520000, profit: 78000, orders: 1450 },
  { month: 'Mar', sales: 480000, profit: 72000, orders: 1320 },
  { month: 'Apr', sales: 610000, profit: 91500, orders: 1680 },
  { month: 'May', sales: 550000, profit: 82500, orders: 1550 },
  { month: 'Jun', sales: 670000, profit: 100500, orders: 1890 },
];

const categoryData = [
  { name: 'Raw Millets', value: 35, sales: 234500, color: '#f59e0b' },
  { name: 'Processed Products', value: 25, sales: 167500, color: '#10b981' },
  { name: 'Sweets & Desserts', value: 20, sales: 134000, color: '#3b82f6' },
  { name: 'Breakfast Items', value: 15, sales: 100500, color: '#ef4444' },
  { name: 'Snacks & Crackers', value: 5, sales: 33500, color: '#8b5cf6' },
];

const topProducts = [
  { name: 'Foxtail Millet', sales: 45600, quantity: 380, growth: 12.5 },
  { name: 'Ragi Laddu', sales: 38400, quantity: 120, growth: 8.3 },
  { name: 'Millet Flour Mix', sales: 32100, quantity: 178, growth: -2.1 },
  { name: 'Pearl Millet (Bajra)', sales: 28900, quantity: 361, growth: 15.7 },
  { name: 'Millet Cookies', sales: 24600, quantity: 205, growth: 6.2 },
];

const paymentMethodData = [
  { method: 'UPI', value: 45, color: '#10b981' },
  { method: 'Cash', value: 30, color: '#f59e0b' },
  { method: 'Card', value: 20, color: '#3b82f6' },
  { method: 'Split', value: 5, color: '#8b5cf6' },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState('7days');
  const [reportType, setReportType] = useState('overview');

  const StatCard = ({ title, value, change, icon: Icon, color, prefix = '' }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{prefix}{value}</p>
          <div className="flex items-center mt-1">
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}% from last period
            </p>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 3 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'sales', label: 'Sales Analysis', icon: TrendingUp },
            { id: 'products', label: 'Product Performance', icon: Package },
            { id: 'customers', label: 'Customer Insights', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  reportType === tab.id
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Report */}
      {reportType === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value="₹1,08,450"
              change={12.5}
              icon={DollarSign}
              color="bg-green-500"
            />
            <StatCard
              title="Total Orders"
              value="331"
              change={8.3}
              icon={ShoppingCart}
              color="bg-blue-500"
            />
            <StatCard
              title="Average Order Value"
              value="₹327"
              change={-2.1}
              icon={TrendingUp}
              color="bg-purple-500"
            />
            <StatCard
              title="New Customers"
              value="89"
              change={15.7}
              icon={Users}
              color="bg-amber-500"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Sales Trend */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Sales Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'sales' ? `₹${value.toLocaleString()}` : value,
                      name === 'sales' ? 'Sales' : 'Orders'
                    ]}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ method, percent }) => `${method} ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Sales Analysis */}
      {reportType === 'sales' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue & Profit</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="sales" fill="#f59e0b" name="Sales" />
                  <Bar dataKey="profit" fill="#10b981" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Details Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Category Performance Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categoryData.map((category, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: category.color }}></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{category.sales.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{category.value}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-green-600">+{(Math.random() * 20).toFixed(1)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Product Performance */}
      {reportType === 'products' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Top Performing Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topProducts.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-amber-600 font-bold text-sm">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">₹{product.sales.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`flex items-center ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {product.growth >= 0 ? '+' : ''}{product.growth}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-20 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <BarChart3 className="h-4 w-4 text-gray-400" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Customer Insights */}
      {reportType === 'customers' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Customers"
              value="1,247"
              change={5.7}
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              title="New Customers"
              value="89"
              change={15.7}
              icon={Users}
              color="bg-green-500"
            />
            <StatCard
              title="Customer Retention"
              value="78%"
              change={3.2}
              icon={TrendingUp}
              color="bg-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Acquisition */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Acquisition</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [value, 'New Customers']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Customer Segments */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Segments</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-yellow-800">Gold Members</p>
                    <p className="text-sm text-yellow-600">₹20,000+ purchases</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-800">23</p>
                    <p className="text-sm text-yellow-600">1.8% of customers</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-800">Silver Members</p>
                    <p className="text-sm text-gray-600">₹10,000-₹19,999 purchases</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">87</p>
                    <p className="text-sm text-gray-600">7.0% of customers</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium text-orange-800">Bronze Members</p>
                    <p className="text-sm text-orange-600">₹5,000-₹9,999 purchases</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-800">156</p>
                    <p className="text-sm text-orange-600">12.5% of customers</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-blue-800">Regular Customers</p>
                    <p className="text-sm text-blue-600">Under ₹5,000 purchases</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-800">981</p>
                    <p className="text-sm text-blue-600">78.7% of customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}