import React, { useState } from 'react';
import { 
  UserGroupIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const StaffManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [staff, setStaff] = useState([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@jainshikanji.com',
      phone: '+91 9876543210',
      role: 'manager',
      location: 'MG Road',
      isActive: true,
      joinDate: '2023-06-15',
      permissions: ['orders', 'inventory', 'staff', 'reports'],
      lastLogin: '2024-01-15T10:30:00Z',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@jainshikanji.com',
      phone: '+91 9876543211',
      role: 'chef',
      location: 'MG Road',
      isActive: true,
      joinDate: '2023-08-20',
      permissions: ['orders', 'inventory'],
      lastLogin: '2024-01-15T09:15:00Z',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Amit Singh',
      email: 'amit.singh@jainshikanji.com',
      phone: '+91 9876543212',
      role: 'cashier',
      location: 'Koramangala',
      isActive: true,
      joinDate: '2023-09-10',
      permissions: ['orders'],
      lastLogin: '2024-01-14T18:45:00Z',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '4',
      name: 'Deepak Yadav',
      email: 'deepak.yadav@jainshikanji.com',
      phone: '+91 9876543213',
      role: 'delivery',
      location: 'MG Road',
      isActive: false,
      joinDate: '2023-07-05',
      permissions: ['orders'],
      lastLogin: '2024-01-10T14:20:00Z',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'cashier',
    location: 'MG Road',
    permissions: []
  });

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'manager', label: 'Manager' },
    { value: 'chef', label: 'Chef' },
    { value: 'cashier', label: 'Cashier' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'support', label: 'Support' }
  ];

  const locations = ['all', 'MG Road', 'Koramangala'];

  const permissions = [
    { id: 'orders', name: 'Order Management' },
    { id: 'inventory', name: 'Inventory Management' },
    { id: 'staff', name: 'Staff Management' },
    { id: 'reports', name: 'Reports & Analytics' },
    { id: 'customers', name: 'Customer Management' },
    { id: 'marketing', name: 'Marketing Tools' }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager': return 'bg-purple-100 text-purple-800';
      case 'chef': return 'bg-orange-100 text-orange-800';
      case 'cashier': return 'bg-blue-100 text-blue-800';
      case 'delivery': return 'bg-green-100 text-green-800';
      case 'support': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || member.location === selectedLocation;
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    
    return matchesSearch && matchesLocation && matchesRole;
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newStaff.name || !newStaff.email || !newStaff.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const staffMember = {
      id: Date.now().toString(),
      ...newStaff,
      isActive: true,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString(),
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    };

    setStaff(prev => [...prev, staffMember]);
    setNewStaff({ name: '', email: '', phone: '', role: 'cashier', location: 'MG Road', permissions: [] });
    setShowAddModal(false);
    toast.success('Staff member added successfully!');
  };

  const toggleStaffStatus = (id: string) => {
    setStaff(prev => prev.map(member =>
      member.id === id ? { ...member, isActive: !member.isActive } : member
    ));
    toast.success('Staff status updated!');
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(member => member.id !== id));
    toast.success('Staff member removed!');
  };

  const getStaffStats = () => {
    const total = staff.length;
    const active = staff.filter(member => member.isActive).length;
    const inactive = total - active;
    const managers = staff.filter(member => member.role === 'manager').length;
    const chefs = staff.filter(member => member.role === 'chef').length;

    return { total, active, inactive, managers, chefs };
  };

  const stats = getStaffStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600 mt-2">Manage your team members and their permissions</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Staff</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                <p className="text-sm text-gray-600">Total Staff</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.inactive}</h3>
                <p className="text-sm text-gray-600">Inactive</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.managers}</h3>
                <p className="text-sm text-gray-600">Managers</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.chefs}</h3>
                <p className="text-sm text-gray-600">Chefs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <p className="text-sm text-gray-600">{member.phone}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${member.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-gray-600">{member.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-sm font-medium text-gray-900">{member.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Join Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(member.lastLogin).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-600 block mb-2">Permissions</span>
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.slice(0, 3).map(permission => (
                      <span key={permission} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {permission}
                      </span>
                    ))}
                    {member.permissions.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{member.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => toggleStaffStatus(member.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    member.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {member.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteStaff(member.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Staff Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Staff Member</h2>
              
              <form onSubmit={handleAddStaff} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      {roles.slice(1).map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={newStaff.location}
                    onChange={(e) => setNewStaff({ ...newStaff, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    {locations.slice(1).map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {permissions.map(permission => (
                      <label key={permission.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newStaff.permissions.includes(permission.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewStaff({
                                ...newStaff,
                                permissions: [...newStaff.permissions, permission.id]
                              });
                            } else {
                              setNewStaff({
                                ...newStaff,
                                permissions: newStaff.permissions.filter(p => p !== permission.id)
                              });
                            }
                          }}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{permission.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    Add Staff Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;