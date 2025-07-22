import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Package, Heart, Edit2, Save, X, Eye, ShoppingBag } from 'lucide-react';
import { useTheme } from './services/ThemeContext';

const UserProfile = ({ user, onUpdateUser, orderHistory = [] }) => {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    dateOfBirth: user.dateOfBirth || ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...editFormData
    };

    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const updatedUsers = mockUsers.map(u => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const ProfileInfo = () => (
    <div className={`rounded-lg shadow-md p-6 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Profile Information</h2>
        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              <span>Save</span>
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <User className={`w-4 h-4 inline mr-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} />
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          ) : (
            <p className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{user.name || 'Not provided'}</p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Mail className={`w-4 h-4 inline mr-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} />
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          ) : (
            <p className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{user.email}</p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Phone className={`w-4 h-4 inline mr-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} />
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={editFormData.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter phone number"
            />
          ) : (
            <p className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{user.phone || 'Not provided'}</p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Calendar className={`w-4 h-4 inline mr-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} />
            Date of Birth
          </label>
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={editFormData.dateOfBirth}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          ) : (
            <p className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{user.dateOfBirth || 'Not provided'}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <MapPin className={`w-4 h-4 inline mr-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} />
            Address
          </label>
          {isEditing ? (
            <textarea
              name="address"
              value={editFormData.address}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter your address"
            />
          ) : (
            <p className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{user.address || 'Not provided'}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleEditToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      )}
    </div>
  );

  const OrderHistory = () => (
    <div className={`rounded-lg shadow-md p-6 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Order History</h2>
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {orderHistory.length} {orderHistory.length === 1 ? 'order' : 'orders'}
        </div>
      </div>
      
      {orderHistory.length === 0 ? (
        <div className="text-center py-8">
          <Package className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <p className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>No orders yet</p>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-400'
          }`}>Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <div 
              key={order.id} 
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Order #{order.id}</p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Processing' 
                      ? isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                      : order.status === 'Shipped' 
                      ? isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                      : order.status === 'Delivered' 
                      ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                      : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className={`p-1 rounded-full transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Eye className={`w-4 h-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`} />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </div>
                <p className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>${order.total.toFixed(2)}</p>
              </div>
              
              {selectedOrder === order.id && (
                <div className={`mt-4 pt-4 border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Order Details:</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{item.title}</p>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>Qty: {item.quantity}</p>
                        </div>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`mt-4 pt-3 border-t space-y-1 ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-100'
                  }`}>
                    <div className="flex justify-between text-sm">
                      <span className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Subtotal:</span>
                      <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Shipping:</span>
                      <span className="font-medium">
                        {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className={`flex justify-between text-base font-semibold border-t pt-1 ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-100'
                    }`}>
                      <span className={`${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Total:</span>
                      <span className={`${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300`}>
      {/* Header */}
      <div className={`rounded-lg shadow-md p-6 mb-8 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
          }`}>
            <span className="text-white text-xl font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{user.name || 'User'}</h1>
            <p className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{user.email}</p>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-lg shadow-md p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Package className={`w-6 h-6 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Total Orders</p>
              <p className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{orderHistory.length}</p>
            </div>
          </div>
        </div>
        
        <div className={`rounded-lg shadow-md p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-green-900' : 'bg-green-100'
            }`}>
              <ShoppingBag className={`w-6 h-6 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Total Spent</p>
              <p className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                ${orderHistory.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`rounded-lg shadow-md p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
            }`}>
              <Heart className={`w-6 h-6 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Items Purchased</p>
              <p className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {orderHistory.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className={`border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'orders', label: 'Orders', icon: Package },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? isDarkMode 
                      ? 'border-blue-500 text-blue-400' 
                      : 'border-blue-500 text-blue-600'
                    : isDarkMode 
                      ? 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${
                  activeTab === id
                    ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div>
        {activeTab === 'profile' && <ProfileInfo />}
        {activeTab === 'orders' && <OrderHistory />}
      </div>
    </div>
  );
};

export default UserProfile;