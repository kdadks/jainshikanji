import { Link } from 'react-router-dom';
import { StarIcon, TruckIcon, ShieldCheckIcon, HeartIcon, SparklesIcon, UsersIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const values = [
    {
      icon: HeartIcon,
      title: 'Quality First',
      description: 'We use only the finest ingredients and traditional recipes to ensure authentic taste in every product.',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'from-rose-50 to-pink-50',
      shadowColor: 'shadow-rose-100'
    },
    {
      icon: UsersIcon,
      title: 'Customer Love',
      description: 'Our customers are family. Their satisfaction and happiness drive everything we do.',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      shadowColor: 'shadow-blue-100'
    },
    {
      icon: SparklesIcon,
      title: 'Authenticity',
      description: 'Preserving traditional Indian flavors and recipes passed down through generations.',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
      shadowColor: 'shadow-purple-100'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Purity',
      description: '100% vegetarian, FSSAI certified, and committed to pure, hygienic food preparation.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      shadowColor: 'shadow-emerald-100'
    }
  ];

  const team = [
    {
      name: 'Late Shri Parmatma Sharan Ji',
      role: 'Founder (1957)',
      description: 'Visionary who started the journey with a bicycle pan shop, serving free lemon water to children suffering from summer heat.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Shri Satish Jain Ji',
      role: 'Chairman & Managing Director',
      description: 'Built upon his father\'s legacy in 1994, transforming Jain Shikanji into a beloved brand across multiple states.',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Next Generation Leadership',
      role: 'Innovation & Expansion',
      description: 'Bringing modern innovation while preserving traditional values, expanding the brand to new territories.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const milestones = [
    { 
      year: '1957', 
      title: 'A Humble Beginning',
      event: 'In 1957, Late Shri Parmatma Sharan Ji began his journey with a small pan shop on a bicycle in Modinagar. During the hot summer months, he noticed that children visiting with their parents often suffered from the harsh heat. Out of his humble and caring nature, he started offering them free lemon water mixed with masala, believing it would protect them from heat strokes. That simple act of kindness marked the beginning of what the world now knows as "Shikanji."', 
      icon: '🚲', 
      color: 'from-amber-400 to-orange-500' 
    },
    { 
      year: '1994', 
      title: 'The Legacy Takes Shape',
      event: 'In 1994, Shri Satish Jain Ji, son of Late Shri Parmatma Sharan Ji, officially founded the brand "Jain Shikanji" in Kadrabad, Modinagar, Uttar Pradesh. Building on his father\'s legacy, he nurtured the brand with passion and vision, expanding the menu from Shikanji to a variety of snacks like Paneer Pakoda and more. What was once a summer refreshment soon turned into a year-round favorite, loved by families across the region.', 
      icon: '🏪', 
      color: 'from-green-400 to-emerald-500' 
    },
    { 
      year: '2000s', 
      title: 'Expansion and Recognition',
      event: 'With growing love and demand, Jain Shikanji opened Modinagar\'s first air-conditioned restaurant, setting a new benchmark for quality and comfort. From one small shop, the brand has grown to 21 outlets (as of 2024) across Uttar Pradesh, Uttarakhand, Haryana, and Delhi, serving happiness, authenticity, and tradition in every sip and bite.', 
      icon: '❄️', 
      color: 'from-blue-400 to-cyan-500' 
    },
    { year: '2015', event: 'Expanded to multiple states', icon: '🌟', color: 'from-purple-400 to-violet-500' },
    { 
      year: '2021', 
      title: 'Bringing Tradition Home',
      event: 'In 2021, Jain Shikanji took another proud step by launching its packaged bottled drinks — Shikanji and Jeera, allowing customers to enjoy their favorite Indian beverage anytime, anywhere. This was the first Indian soft drink infused with authentic desi spices, giving consumers a true Indian alternative in the beverage market. Today, Jain Shikanji is available in 6 Indian states and over 100+ cities, carrying forward a legacy of purity, flavor, and trust.', 
      icon: '🥤', 
      color: 'from-rose-400 to-pink-500' 
    },
    { year: '2024', event: '21 outlets across 4 states, serving 100+ cities', icon: '🎉', color: 'from-indigo-400 to-purple-500' }
  ];

  const stats = [
    { number: '67', label: 'Years of Legacy', suffix: '+', color: 'from-amber-500 to-orange-600' },
    { number: '21+', label: 'Outlets', suffix: '', color: 'from-emerald-500 to-teal-600' },
    { number: '6', label: 'States', suffix: '', color: 'from-blue-500 to-cyan-600' },
    { number: '100', label: 'Cities', suffix: '+', color: 'from-purple-500 to-violet-600' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-orange-50 min-h-screen overflow-x-hidden">
      <Helmet>
        <title>About Us - Jain Shikanji | Our Journey from 1957 to Today</title>
        <meta name="description" content="Discover the inspiring journey of Jain Shikanji from a humble bicycle pan shop in 1957 to a beloved Indian beverage brand. Learn about our founders, values, and commitment to authentic flavors." />
        <meta name="keywords" content="Jain Shikanji history, about Jain Shikanji, Indian beverage brand, traditional shikanji, founder story, authentic Indian drinks" />
        <link rel="canonical" href="https://jainshikanji.com/about" />
      </Helmet>

      <Header />

      {/* Modern Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-50"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-xl text-orange-700 px-6 py-3 rounded-full text-sm font-semibold shadow-lg border border-white/20"
            >
              <SparklesIcon className="w-4 h-4" />
              <span>Our Inspiring Story</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent">
                From Bicycle{' '}
              </span>
              <span className="bg-gradient-to-r from-slate-800 via-gray-700 to-slate-900 bg-clip-text text-transparent">
                to Beloved Brand
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              A 67-year journey of kindness, dedication, and authentic flavors that started with
              a simple act of compassion in 1957
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link
                to="/menu"
                className="group relative bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Explore Our Menu</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/products"
                className="group bg-white/80 backdrop-blur-xl text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
              >
                Shop Our Products
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-16 h-16 bg-blue-200/30 rounded-full blur-xl"
        ></motion.div>
      </section>

      {/* Stats Section */}
      <section className="pt-20 pb-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent text-5xl lg:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Key Milestones
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Celebrating moments that shaped our extraordinary journey
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-200 via-amber-200 to-orange-300 rounded-full hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100"
                    >
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                        <div className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <span className="text-xl">{milestone.icon}</span>
                        </div>
                        <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                          <div className={`text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                            {milestone.year}
                          </div>
                          {milestone.title && (
                            <h4 className="text-lg font-semibold text-slate-900">{milestone.title}</h4>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-base text-justify">{milestone.event}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 hidden lg:block">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-6 h-6 bg-gradient-to-r ${milestone.color} rounded-full shadow-lg border-4 border-white`}
                    ></motion.div>
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do, every day
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative h-full"
              >
                <div className={`h-full bg-gradient-to-br ${value.bgColor} p-8 rounded-3xl shadow-xl ${value.shadowColor} hover:shadow-2xl transition-all duration-500 border border-white/50 backdrop-blur-sm flex flex-col`}>
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-center flex-1">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              The Leaders Behind Our Legacy
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Generations of dedication, passion, and vision
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -15 }}
                className="group relative h-full"
              >
                <div className="h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col">
                  <div className="relative overflow-hidden flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
                    <div className={`text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4`}>
                      {member.role}
                    </div>
                    <p className="text-slate-600 leading-relaxed flex-1">{member.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Serving India with Love and Authenticity
            </h2>
            <p className="text-xl lg:text-2xl text-orange-50 max-w-4xl mx-auto leading-relaxed mb-12">
              With love and humility, Jain Shikanji continues to serve Bharat with pure, authentic Indian spiced
              soft drinks and delicious food products — a tradition that began with kindness and lives on with pride.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/menu"
                className="group relative bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Explore Our Menu</span>
                <ArrowRightIcon className="w-6 h-6 ml-3 inline-block group-hover:translate-x-2 transition-transform duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/products"
                className="group bg-white/10 backdrop-blur-xl text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                Shop Our Products
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8 pt-12 text-orange-100"
            >
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl">
                <ShieldCheckIcon className="w-6 h-6" />
                <span className="text-lg font-semibold">FSSAI Certified</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl">
                <StarIcon className="w-6 h-6 text-yellow-300" />
                <span className="text-lg font-semibold">4.8★ Customer Rated</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl">
                <TruckIcon className="w-6 h-6" />
                <span className="text-lg font-semibold">Fast & Reliable Delivery</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
