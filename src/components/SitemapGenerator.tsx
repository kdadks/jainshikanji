import React from 'react';

const SitemapGenerator = () => {
  // This component generates sitemap data for SEO
  const sitemapUrls = [
    {
      url: 'https://jainshikanji.com/',
      lastmod: '2025-01-15',
      changefreq: 'daily',
      priority: '1.0',
      title: 'Jain Shikanji - Premium Indian Food & North Indian Cuisine Restaurant'
    },
    {
      url: 'https://jainshikanji.com/menu',
      lastmod: '2025-01-15',
      changefreq: 'weekly',
      priority: '0.9',
      title: 'Menu - Premium Indian Food & North Indian Cuisine with Online Ordering'
    },
    {
      url: 'https://jainshikanji.com/loyalty',
      lastmod: '2025-01-15',
      changefreq: 'weekly',
      priority: '0.8',
      title: 'Loyalty Program - Earn Rewards on Indian Food Orders'
    },
    {
      url: 'https://jainshikanji.com/dashboard',
      lastmod: '2025-01-15',
      changefreq: 'weekly',
      priority: '0.8',
      title: 'Customer Dashboard - Manage Orders and Account'
    },
    {
      url: 'https://jainshikanji.com/cart',
      lastmod: '2025-01-15',
      changefreq: 'weekly',
      priority: '0.7',
      title: 'Shopping Cart - Indian Food Online Ordering'
    },
    {
      url: 'https://jainshikanji.com/checkout',
      lastmod: '2025-01-15',
      changefreq: 'daily',
      priority: '0.7',
      title: 'Checkout - Complete Your Indian Food Order'
    },
    {
      url: 'https://jainshikanji.com/privacy-policy',
      lastmod: '2025-01-15',
      changefreq: 'monthly',
      priority: '0.6',
      title: 'Privacy Policy - Jain Shikanji Restaurant'
    },
    {
      url: 'https://jainshikanji.com/terms-conditions',
      lastmod: '2025-01-15',
      changefreq: 'monthly',
      priority: '0.6',
      title: 'Terms & Conditions - Indian Food Delivery Service'
    },
    {
      url: 'https://jainshikanji.com/shipping-policy',
      lastmod: '2025-01-15',
      changefreq: 'monthly',
      priority: '0.6',
      title: 'Shipping Policy - Food Delivery Terms'
    },
    {
      url: 'https://jainshikanji.com/return-policy',
      lastmod: '2025-01-15',
      changefreq: 'monthly',
      priority: '0.6',
      title: 'Return Policy - Food Quality Guarantee'
    }
  ];

  return (
    <div className="hidden">
      {/* Generate XML sitemap structure for SEO */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": "Jain Shikanji Navigation",
        "url": "https://jainshikanji.com",
        "hasPart": sitemapUrls.map(item => ({
          "@type": "WebPage",
          "name": item.title,
          "url": item.url,
          "lastReviewed": item.lastmod
        }))
      })}
      </script>
      
      {/* Breadcrumb structure for better SEO */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jainshikanji.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Indian Food Menu",
            "item": "https://jainshikanji.com/menu"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "North Indian Cuisine",
            "item": "https://jainshikanji.com/menu/north-indian"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Veg Food Options",
            "item": "https://jainshikanji.com/menu/vegetarian"
          }
        ]
      })}
      </script>
    </div>
  );
};

export default SitemapGenerator;