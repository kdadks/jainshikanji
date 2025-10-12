import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-3 min-w-max">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{category.name}</span>
              <span className={`ml-2 text-xs px-2.5 py-1 rounded-full font-bold ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category.count}
              </span>
              
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-orange-500 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;