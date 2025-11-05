import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, TruckIcon, ClockIcon, ShieldCheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { PlayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  const featuredDishes = [
    {
      id: '1',
      name: 'Traditional Shikanji',
      description: 'Refreshing lemon-based drink with mint, cumin, and traditional spices',
      price: 80,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      spiceLevel: 'Mild',
      badge: 'Most Popular'
    },
    {
      id: '2',
      name: 'Masala Chaas',
      description: 'Spiced buttermilk with roasted cumin, mint, and traditional Indian spices',
      price: 60,
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      spiceLevel: 'Mild',
      badge: 'Chef\'s Choice'
    },
    {
      id: '3',
      name: 'Sweet Lassi',
      description: 'Creamy yogurt-based sweet drink with cardamom and rose water',
      price: 90,
      image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      spiceLevel: 'Sweet',
      badge: 'Customer Favorite'
    }
  ];

  const features = [
    { 
      icon: TruckIcon, 
      title: 'Free Delivery', 
      description: 'On orders above ₹299',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: ClockIcon, 
      title: '30 Min Delivery', 
      description: 'Hot & fresh guaranteed',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      icon: ShieldCheckIcon, 
      title: 'Quality Assured', 
      description: 'Premium ingredients only',
      color: 'from-purple-500 to-violet-600'
    },
    { 
      icon: StarIcon, 
      title: '4.8★ Rating', 
      description: '10k+ happy customers',
      color: 'from-yellow-500 to-amber-600'
    }
  ];

  const stats = [
    { number: '60', label: 'Years of Excellence', suffix: '+' },
    { number: '10', label: 'Happy Customers', suffix: 'M+' },
    { number: '4.8', label: 'Average Rating', suffix: '★' },
    { number: '100', label: 'Vegetarian', suffix: '%' }
  ];

  return (
    <div className="bg-gray-25 min-h-screen">
      <Helmet>
        <title>Jain Shikanji - Best Indian Food & North Indian Cuisine | Veg Food Delivery Bangalore</title>
        <meta name="description" content="Order authentic Indian food and North Indian cuisine from Jain Shikanji. 100% vegetarian food delivery in Bangalore. Traditional recipes, pure veg dishes, and Indian beverages. Fast delivery, exceptional quality." />
        <meta name="keywords" content="Indian food Bangalore, North Indian cuisine, veg food delivery, vegetarian restaurant, Jain food, authentic Indian dishes, Indian beverages, shikanji, traditional food, pure veg restaurant, online food ordering" />
        <link rel="canonical" href="https://jainshikanji.com/" />
      </Helmet>
      
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-brand-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto container-padding section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  <span>60+ Years of Authentic Flavors</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                  Authentic
                  <span className="block gradient-text-brand">Indian Food & Soft Drinks</span>
                  <span className="block">Delivered Fresh</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Experience authentic Indian food and North Indian cuisine with our traditional vegetarian dishes, 
                  handcrafted beverages, and pure veg food made from premium ingredients.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="btn btn-primary btn-xl group"
                >
                  <span>Order Now</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <button className="btn btn-secondary btn-xl group">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  <span>Watch Story</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {stat.number}<span className="text-orange-500">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <motion.img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Delicious Indian Food"
                  className="rounded-3xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Rating Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-strong border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5" />
                      ))}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">4.8</div>
                      <div className="text-sm text-gray-600">2,500+ reviews</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Order Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-strong border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <TruckIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Free Delivery</div>
                      <div className="text-xs text-gray-600">Orders above ₹299</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/30 to-brand-200/30 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-orange-100/40 to-brand-100/40 rounded-3xl transform -rotate-2 scale-110 -z-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text-brand">Jain Shikanji</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of tradition and convenience with our premium Indian food delivery service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card p-8 text-center hover-lift group-hover:border-orange-200">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Today's Specials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked Indian food and North Indian cuisine specialties loved by our customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card-elevated overflow-hidden hover-lift">
                  <div className="relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {dish.badge}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-900">{dish.rating}</span>
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                          {dish.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`badge text-xs font-semibold ${
                            dish.spiceLevel === 'Mild' ? 'bg-green-100 text-green-800' :
                            dish.spiceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            dish.spiceLevel === 'Sweet' ? 'bg-pink-100 text-pink-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {dish.spiceLevel}
                          </span>
                          <span className="badge-success">100% Veg</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">₹{dish.price}</div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    <button className="btn btn-primary btn-md w-full group">
                      <span>Add to Cart</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/menu"
              className="btn btn-secondary btn-lg group"
            >
              <span>View Full Menu</span>
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section - Teaser */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-brand-100 text-brand-800 px-4 py-2 rounded-full text-sm font-medium">
                  <span>🌿</span>
                  <span>Our Heritage</span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  From a <span className="gradient-text-brand">Bicycle</span> to a
                  <span className="block">Beloved Brand</span>
                </h2>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    In 1957, Late Shri Parmatma Sharan Ji began with a humble bicycle pan shop,
                    offering free lemon water to children suffering from summer heat. That simple
                    act of kindness became the foundation of Jain Shikanji.
                  </p>
                  <p>
                    In 1994, his son Shri Satish Jain Ji officially founded the brand, nurturing it
                    with passion and vision. Today, we serve across 21 outlets in 4 states, carrying
                    forward a legacy of purity, flavor, and trust.
                  </p>
                </div>

                <Link
                  to="/about"
                  className="btn btn-primary btn-lg group inline-flex items-center"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-orange-50 rounded-2xl">
                  <div className="text-3xl font-bold text-orange-600 mb-2">67+</div>
                  <div className="text-sm font-medium text-gray-700">Years of Excellence</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">21</div>
                  <div className="text-sm font-medium text-gray-700">Outlets Across India</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Restaurant Heritage"
                  className="rounded-3xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover"
                />

                {/* Floating Achievement Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-strong border border-white/20"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <StarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">First Indian</div>
                    <div className="text-sm text-gray-600">Spiced Soft Drink (2021)</div>
                  </div>
                </motion.div>
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-200/30 to-orange-200/30 rounded-3xl transform rotate-2 scale-105 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the best Indian food and North Indian cuisine. Visit us or get in touch for any inquiries!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: '📍',
                  title: 'Visit Us',
                  details: ['Jain Shikanji, Kadrabad, Vikash Nagar Colony, Delhi Merrut Road Modinagar, Ghaziabad – 201201'],
                  color: 'from-blue-500 to-cyan-600'
                },
                {
                  icon: '📞',
                  title: 'Call Us',
                  details: ['+91-9219448748', 'Daily: 11 AM - 11 PM'],
                  color: 'from-green-500 to-emerald-600'
                },
                {
                  icon: '✉️',
                  title: 'Email Us',
                  details: ['info@jainshikanji.com', 'We reply within 24 hours'],
                  color: 'from-purple-500 to-violet-600'
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 hover-lift"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center text-xl shadow-lg`}>
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{contact.title}</h3>
                      {contact.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="card-elevated p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="input"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="input"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <select className="input">
                      <option>General Inquiry</option>
                      <option>Catering Services</option>
                      <option>Private Events</option>
                      <option>Feedback</option>
                      <option>Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="input resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full group"
                  >
                    <span>Send Message</span>
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Experience Authentic Indian Flavors?
            </h2>
            <p className="text-lg lg:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of food lovers who trust us for authentic Indian food and North Indian cuisine 
              delivered with care and tradition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/menu"
                className="btn bg-white text-orange-600 hover:bg-gray-50 btn-xl group shadow-xl"
              >
                <span>Start Your Culinary Journey</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/loyalty"
                className="btn border-2 border-white text-white hover:bg-white hover:text-orange-600 btn-xl"
              >
                Join Loyalty Program
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-orange-100">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="text-sm font-medium">FSSAI Licensed</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium">4.8★ Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;