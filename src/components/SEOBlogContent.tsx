import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOBlogContent = () => {
  return (
    <div className="hidden">
      <Helmet>
        {/* Blog-style content for SEO */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "The Ultimate Guide to Premium Indian Food, North Indian Cuisine, and Modern Restaurant Experience",
          "description": "Discover the rich heritage of Indian food and North Indian cuisine at Jain Shikanji. Learn about traditional vegetarian dishes, authentic recipes, loyalty programs, and modern dining technology.",
          "author": {
            "@type": "Organization",
            "name": "Jain Shikanji"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Jain Shikanji",
            "logo": {
              "@type": "ImageObject",
              "url": "https://jainshikanji.com/logo.png"
            }
          },
          "datePublished": "2024-01-15",
          "dateModified": "2025-01-15",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://jainshikanji.com/"
          },
          "articleBody": "Indian food represents one of the world's most diverse and flavorful cuisines. North Indian cuisine, in particular, offers a rich tapestry of flavors, spices, and cooking techniques that have been perfected over centuries. At Jain Shikanji, we specialize in premium Indian food that celebrates traditional recipes and pure vegetarian principles, enhanced with modern technology and customer experience. Our comprehensive platform features authentic North Indian cuisine, advanced loyalty programs, real-time order tracking, AI-powered customer service, and a complete restaurant management system. From traditional Indian beverages like shikanji and lassi to modern features like customer dashboards and analytics, we bridge the gap between authentic cuisine and contemporary dining experience. Our loyalty program rewards customers across four tiers, while our admin platform provides comprehensive business management tools. The integration of traditional Indian cooking with modern restaurant technology creates an unparalleled dining experience that honors our 25+ year heritage while embracing innovation."
        })}
        </script>
      </Helmet>
      
      {/* Hidden SEO content for crawlers */}
      <div style={{ display: 'none' }}>
        <h1>Best Indian Food and North Indian Cuisine in Bangalore</h1>
        <h2>Authentic Vegetarian Food and Traditional Indian Dishes</h2>
        <p>
          Experience the finest Indian food and North Indian cuisine at Jain Shikanji, Bangalore's premier 
          destination for authentic vegetarian dining. Our extensive menu features traditional Indian dishes, 
          pure veg food options, and classic North Indian cuisine prepared with time-honored recipes.
        </p>
        
        <h3>Why Choose Jain Shikanji for Indian Food?</h3>
        <ul>
          <li>100% Pure Vegetarian and Jain-friendly Indian food</li>
          <li>Authentic North Indian cuisine with traditional recipes</li>
          <li>Fresh ingredients sourced daily for the best veg food experience</li>
          <li>Expert chefs specializing in Indian cuisine</li>
          <li>Fast delivery across Bangalore</li>
          <li>25+ years of culinary excellence in Indian food</li>
        </ul>
        
        <h3>Our Specialty Indian Food Menu</h3>
        <p>
          Our menu showcases the diversity of Indian cuisine, with special emphasis on North Indian dishes. 
          From creamy dal makhani to aromatic biryanis, every dish represents the authentic flavors of 
          traditional Indian food. Our veg food selection includes regional specialties from across India.
        </p>
        
        <h3>Traditional Indian Beverages</h3>
        <p>
          Complement your Indian food experience with our traditional beverages including fresh shikanji, 
          creamy lassi, and refreshing chaas. These authentic Indian drinks are prepared using traditional 
          methods and natural ingredients.
        </p>
        
        <h3>North Indian Cuisine Specialties</h3>
        <p>
          Our North Indian cuisine menu features classics like butter chicken (prepared vegetarian-style), 
          paneer dishes, fresh naan, and aromatic rice preparations. Each dish in our North Indian cuisine 
          collection is crafted to deliver authentic flavors.
        </p>
        
        <h3>Order Indian Food Online</h3>
        <p>
          Enjoy the convenience of ordering authentic Indian food online. Our veg food delivery service 
          ensures your favorite North Indian cuisine dishes reach you fresh and hot. Experience the best 
          of Indian cuisine from the comfort of your home.
        </p>
        
        <h3>Veg Food Excellence</h3>
        <p>
          As specialists in vegetarian cuisine, we take pride in our veg food offerings. Our Indian food 
          menu is completely vegetarian, featuring innovative preparations that showcase the versatility 
          of plant-based Indian cuisine.
        </p>
        
        <h3>Indian Cuisine Heritage</h3>
        <p>
          Indian cuisine has a rich history spanning thousands of years. Our commitment to authentic 
          Indian food means preserving these traditional cooking methods while adapting to modern tastes. 
          Every dish in our North Indian cuisine collection tells a story of culinary heritage.
        </p>
        
        <h3>Health Benefits of Indian Food</h3>
        <p>
          Indian cuisine is renowned for its health benefits, thanks to the extensive use of spices with 
          medicinal properties. Our veg food menu emphasizes nutritious ingredients that support overall 
          wellness while delivering exceptional taste.
        </p>
        
        <h3>Catering Services for Indian Food</h3>
        <p>
          Planning an event? Our Indian food catering services bring authentic North Indian cuisine to 
          your celebrations. From intimate gatherings to large events, we provide comprehensive veg food 
          catering solutions.
        </p>
        
        <h3>Visit Our Indian Food Restaurant</h3>
        <p>
          Located in the heart of Bangalore, our restaurant offers an immersive Indian food dining 
          experience. Enjoy our North Indian cuisine in a warm, welcoming atmosphere that celebrates 
          the rich traditions of Indian culture.
        </p>
      </div>
    </div>
  );
};

export default SEOBlogContent;