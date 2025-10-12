import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../components/Header';

interface ProductFormData {
  id?: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  image: string;
  isVeg: boolean;
  spiceLevel: string;
  stock: string;
  productType: string;
  weight: string;
  servings: string;
  shelfLife: string;
  storageInstructions: string;
  tags: string;
  ingredients: string;
  features: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 'masala-shikanji',
      name: 'Masala Shikanji',
      description: 'Traditional lemon-based drink mix with authentic spices',
      price: 299,
      originalPrice: 399,
      category: 'instant-mix',
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
      stock: 150,
      rating: 4.8,
      isVeg: true,
      productType: 'instant',
      weight: '250g',
      servings: 25,
      shelfLife: '12 months'
    },
    {
      id: 'chai-masala',
      name: 'Premium Chai Masala',
      description: 'Aromatic blend of cardamom, ginger, and spices',
      price: 249,
      originalPrice: 349,
      category: 'spice-mix',
      image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
      stock: 200,
      rating: 4.9,
      isVeg: true,
      productType: 'masala-mix',
      weight: '200g',
      servings: 50,
      shelfLife: '18 months'
    },
    {
      id: 'instant-shikanji',
      name: 'Instant Shikanji Powder',
      description: 'Ready-to-mix shikanji powder for quick refreshment',
      price: 199,
      originalPrice: 249,
      category: 'instant-mix',
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
      isAvailable: true,
      stock: 180,
      rating: 4.7,
      isVeg: true,
      productType: 'instant',
      weight: '200g',
      servings: 20,
      shelfLife: '12 months'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'instant-mix',
    image: '',
    isVeg: true,
    spiceLevel: 'Mild',
    stock: '',
    productType: 'instant',
    weight: '',
    servings: '',
    shelfLife: '',
    storageInstructions: '',
    tags: '',
    ingredients: '',
    features: ''
  });

  const categories = [
    { value: 'instant-mix', label: 'Instant Mix' },
    { value: 'spice-mix', label: 'Spice Mix' },
    { value: 'concentrate', label: 'Concentrate' },
    { value: 'ready-to-drink', label: 'Ready to Drink' }
  ];

  const productTypes = [
    { value: 'instant', label: 'Instant' },
    { value: 'ready-to-drink', label: 'Ready to Drink' },
    { value: 'masala-mix', label: 'Masala Mix' },
    { value: 'other', label: 'Other' }
  ];

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product.id);
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        category: product.category,
        image: product.image,
        isVeg: product.isVeg,
        spiceLevel: product.spiceLevel || 'Mild',
        stock: product.stock.toString(),
        productType: product.productType || 'instant',
        weight: product.weight || '',
        servings: product.servings?.toString() || '',
        shelfLife: product.shelfLife || '',
        storageInstructions: product.storageInstructions || '',
        tags: '',
        ingredients: '',
        features: ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'instant-mix',
        image: '',
        isVeg: true,
        spiceLevel: 'Mild',
        stock: '',
        productType: 'instant',
        weight: '',
        servings: '',
        shelfLife: '',
        storageInstructions: '',
        tags: '',
        ingredients: '',
        features: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p =>
        p.id === editingProduct
          ? {
              ...p,
              name: formData.name,
              description: formData.description,
              price: Number(formData.price),
              originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
              category: formData.category,
              image: formData.image || p.image,
              isVeg: formData.isVeg,
              stock: Number(formData.stock),
              productType: formData.productType,
              weight: formData.weight,
              servings: formData.servings ? Number(formData.servings) : undefined,
              shelfLife: formData.shelfLife,
            }
          : p
      ));
      toast.success('Product updated successfully!');
    } else {
      // Add new product
      const product = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        image: formData.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
        isAvailable: true,
        stock: Number(formData.stock),
        rating: 0,
        isVeg: formData.isVeg,
        productType: formData.productType,
        weight: formData.weight,
        servings: formData.servings ? Number(formData.servings) : undefined,
        shelfLife: formData.shelfLife
      };

      setProducts(prev => [...prev, product]);
      toast.success('Product added successfully!');
    }

    setShowModal(false);
    setEditingProduct(null);
  };

  const toggleAvailability = (productId: string) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, isAvailable: !product.isAvailable }
        : product
    ));
    toast.success('Product status updated!');
  };

  const deleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
      toast.success('Product deleted successfully!');
    }
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, stock: newStock }
        : product
    ));
    toast.success('Stock updated!');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-2">Manage your products and inventory</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">In Stock</h3>
            <p className="text-3xl font-bold text-green-600">
              {products.filter(p => p.stock > 10).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Low Stock</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {products.filter(p => p.stock > 0 && p.stock <= 10).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Out of Stock</h3>
            <p className="text-3xl font-bold text-red-600">
              {products.filter(p => p.stock === 0).length}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs text-gray-500">{product.weight}</span>
                            {product.servings && (
                              <span className="text-xs text-gray-500">• {product.servings} servings</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="capitalize text-gray-700 block">
                          {product.category.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {product.productType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-semibold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="block text-sm text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) => updateStock(product.id, Number(e.target.value))}
                          className={`w-20 px-2 py-1 border rounded text-sm ${
                            product.stock === 0
                              ? 'border-red-300 text-red-600'
                              : product.stock <= 10
                              ? 'border-yellow-300 text-yellow-600'
                              : 'border-gray-300 text-gray-900'
                          }`}
                        />
                        <span className="text-sm text-gray-500">units</span>
                      </div>
                      {product.stock <= 10 && product.stock > 0 && (
                        <span className="text-xs text-yellow-600">Low stock</span>
                      )}
                      {product.stock === 0 && (
                        <span className="text-xs text-red-600">Out of stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleAvailability(product.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.isAvailable
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } transition-colors duration-200`}
                      >
                        {product.isAvailable ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                          title="Edit Product"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete Product"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>

        {/* Add/Edit Product Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Type
                      </label>
                      <select
                        value={formData.productType}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {productTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="e.g., 250g, 500ml"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Servings
                      </label>
                      <input
                        type="number"
                        value={formData.servings}
                        onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Inventory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shelf Life
                      </label>
                      <input
                        type="text"
                        value={formData.shelfLife}
                        onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                        placeholder="e.g., 12 months"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.storageInstructions}
                      onChange={(e) => setFormData({ ...formData, storageInstructions: e.target.value })}
                      placeholder="e.g., Store in a cool, dry place"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isVeg"
                      checked={formData.isVeg}
                      onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="isVeg" className="text-sm text-gray-700">Vegetarian</label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                      }}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProducts;
