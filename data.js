/**
 * Mayukha Silks & Couture - Catalog & Brand Configuration
 * Real Inventory Extracted from WhatsApp Boutique Chat & Master Loom Lineage
 */

const BRAND_CONFIG = {
  brandName: "Mayukha Silks & Couture",
  tagline: "Royal Heritage Looms & Handcrafted Silks",
  whatsappNumber: "919014129045",
  currency: "₹",
  defaultDealerPin: "2026",
  freeShippingThreshold: 5000,
  supportEmail: "concierge@mayukhasilks.com",
  establishedYear: "1994",
  loomLocations: "Kanchipuram • Varanasi • Paithan • Pochampally • Jamnagar"
};

const CATALOG_DATA = [
  {
    id: "MYK-MS-01",
    name: "Soft Lightweight Mashru Crepe lines Saree",
    category: "festive",
    categoryLabel: "Festive Weave",
    weave: "Mashru Crepe",
    fabric: "Soft light weight mashru crepe silk",
    retailPrice: 3299,
    dealerPrice: 2699,
    resellerQuotePrice: 2899,
    colors: ["Wine Red", "Emerald Green", "Royal Blue", "Mustard Yellow"],
    images: {
      primary: "assets/MYK-MS-01.jpg",
      secondary: "assets/MYK-MS-01-pallu.jpg"
    },
    description: "Soft light weight mashru crepe sarees with intricate weaving lines designs. Borders with designer peacock weaves, contrast piping borders, contrast buti weaving blouse, and rich weaving pallu with designer tassels.",
    highlights: [
      "Intricate weaving lines",
      "Designer peacock weaves border",
      "Rich weaving pallu with tassels",
      "Contrast buti weaving blouse"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-KP-02",
    name: "Soft Pure Munga Kalamkari Pattu",
    category: "wedding",
    categoryLabel: "Bridal Pattu",
    weave: "Kalamkari",
    fabric: "Soft lightweight munga silk",
    retailPrice: 4799,
    dealerPrice: 3999,
    resellerQuotePrice: 4299,
    colors: ["Turmeric Yellow", "Mehendi Green", "Rust Orange", "Off-White"],
    images: {
      primary: "assets/MYK-KP-02.jpg",
      secondary: "assets/MYK-KP-02-pallu.jpg"
    },
    description: "Soft lightweight munga Kalamkari Pattu sarees with contrast gap borders and rich penkalamkari prints. Allover story theme designs with beautiful colour combinations, rich tissue pallu with tassels, and contrast floral printed blouse.",
    highlights: [
      "Authentic story theme penkalamkari",
      "Rich tissue pallu with tassels",
      "Contrast gap border",
      "Floral printed blouse"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-BC-03",
    name: "Binny Chiffon Heavy Zari Pita Scallop (Mayukha Monopoly)",
    category: "festive",
    categoryLabel: "Monopoly Signature",
    weave: "Binny Chiffon",
    fabric: "Super soft lightweight binny chiffon",
    retailPrice: 2499,
    dealerPrice: 1999,
    resellerQuotePrice: 2199,
    colors: ["Rani Pink", "Sunset Peach", "Sky Blue", "Lavender"],
    images: {
      primary: "assets/MYK-BC-03.jpg",
      secondary: "assets/MYK-BC-03-pallu.jpg"
    },
    description: "Mayukha Monopoly Signature Edition. Super soft lightweight binny chiffon sarees with heavy zari pita scallop work, allover leheriya prints, and rich designer embroidery work blouse.",
    highlights: [
      "Mayukha Monopoly Collection",
      "Heavy zari pita scallop borders",
      "Allover leheriya prints",
      "Rich work blouse"
    ],
    silkMark: false,
    inStock: true
  },
  {
    id: "MYK-BM-04",
    name: "Pure Benarasi Mashru Pattu Jaal Weave",
    category: "wedding",
    categoryLabel: "Sacred Vivah",
    weave: "Benarasi",
    fabric: "Pure Mashru Pattu Silk",
    retailPrice: 5499,
    dealerPrice: 4650,
    resellerQuotePrice: 4999,
    colors: ["Deep Maroon", "Teal Blue", "Plum Purple", "Gold Wine"],
    images: {
      primary: "assets/MYK-BM-04.jpg",
      secondary: "assets/MYK-BM-04-pallu.jpg"
    },
    description: "Pure mashru pattu sarees with rich allover jaal weaving designs, rich weaving borders, and rich weaving pallu. Attached lace border and contrast blouse highlighted with lace border.",
    highlights: [
      "Allover jaal weaving designs",
      "Pure mashru pattu base",
      "Attached lace border",
      "Contrast rich blouse"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-RC-05",
    name: "Russian Crepe Floral Embroidery & Checks",
    category: "reception",
    categoryLabel: "Royal Reception",
    weave: "Russian Crepe",
    fabric: "Designer falling Russian crepe",
    retailPrice: 4199,
    dealerPrice: 3450,
    resellerQuotePrice: 3750,
    colors: ["Navy Blue", "Bottle Green", "Crimson Red", "Burgundy"],
    images: {
      primary: "assets/MYK-RC-05.jpg",
      secondary: "assets/MYK-RC-05-pallu.jpg"
    },
    description: "Designer falling Russian crepe sarees with rich weaving checks borders highlighted with floral embroidery work, allover designer lotus weaving butis, rich weaving pallu with tassels, and plain blouse with butis and border lines.",
    highlights: [
      "Checks border with floral embroidery",
      "Lotus weaving butis allover",
      "Rich weaving pallu with tassels",
      "Soft flowy falling drape"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-BS-06",
    name: "Benarasi Satin Mashru Animal & Floral Weaves",
    category: "wedding",
    categoryLabel: "Heirloom Bridal",
    weave: "Benarasi",
    fabric: "Soft lightweight Benarasi satin mashru silk",
    retailPrice: 5899,
    dealerPrice: 4999,
    resellerQuotePrice: 5399,
    colors: ["Maroon Gold", "Royal Violet", "Forest Green", "Antique Bronze"],
    images: {
      primary: "assets/MYK-BS-06.jpg",
      secondary: "assets/MYK-BS-06-pallu.jpg"
    },
    description: "Soft lightweight Benarasi satin mashru silk sarees with rich weaving borders, rich weaving pallu, allover animals and floral weaving designs. Unique concept saree with running plain blouse with border.",
    highlights: [
      "Animal and floral heritage weaving",
      "Satin mashru silk touch",
      "Rich weaving pallu",
      "Unique concept weave"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-PT-07",
    name: "Falling Tissue Parsi & Queresia Work",
    category: "reception",
    categoryLabel: "Cocktail Evening",
    weave: "Tissue",
    fabric: "Lightweight zari lines pure falling tissue",
    retailPrice: 4199,
    dealerPrice: 3399,
    resellerQuotePrice: 3699,
    colors: ["Champagne Gold", "Rose Gold", "Silver Mist", "Soft Lilac"],
    images: {
      primary: "assets/MYK-PT-07.jpg",
      secondary: "assets/MYK-PT-07-pallu.jpg"
    },
    description: "Exclusive fancy saree edition. Beautiful lightweight zari lines pure falling tissue sarees with attached Parsi work tissue embroidered border, highlighted with queresia work on the border. Running blouse with Parsi work border and butis.",
    highlights: [
      "Pure falling tissue with zari lines",
      "Attached Parsi embroidery border",
      "Highlighted queresia work",
      "Running blouse with butis"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-MC-08",
    name: "Mysore Crepe Silk Skirt Gap Borders",
    category: "haldi",
    categoryLabel: "Auspicious Haldi",
    weave: "Mysore Silk",
    fabric: "Trending Mysore crepe silk",
    retailPrice: 2999,
    dealerPrice: 2550,
    resellerQuotePrice: 2750,
    colors: ["Bright Turmeric", "Rani & Violet", "Parrot Green", "Rama Blue"],
    images: {
      primary: "assets/MYK-MC-08.jpg",
      secondary: "assets/MYK-MC-08-pallu.jpg"
    },
    description: "Most trending Mysore crepe silk sarees with rich both side skirt-type gap weaving borders, contrast blouse with border. Very soft and lightweight body hugging sarees.",
    highlights: [
      "Both sides gap weaving border",
      "Contrast border & blouse",
      "Lightweight soft body hugging crepe",
      "Vibrant festive combinations"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-CH-09",
    name: "Handloom Chinnon Pearl & Zardosi Scallop",
    category: "wedding",
    categoryLabel: "Royal Muhurtham",
    weave: "Chinnon",
    fabric: "Pure handloom chinnon silk",
    retailPrice: 6699,
    dealerPrice: 5899,
    resellerQuotePrice: 6200,
    colors: ["Wine Red", "Sage Green", "Dusty Mauve", "Pastel Peach"],
    images: {
      primary: "assets/MYK-CH-09.jpg",
      secondary: "assets/MYK-CH-09-pallu.jpg"
    },
    description: "Pure handloom chinnon silk sarees with rich hand work scallop borders adorned with real pearls and zardosi. Heavy premium quality party wear with plain blouse with matching handwork.",
    highlights: [
      "Handcrafted pearl & zardosi scallop border",
      "Pure handloom heavy chinnon",
      "Designer plain blouse with handwork",
      "Premium couture edition"
    ],
    silkMark: true,
    inStock: true
  },
  {
    id: "MYK-KD-10",
    name: "Benarasi Mashru Silk Kashmiri Darbaar Weave",
    category: "wedding",
    categoryLabel: "Imperial Heirloom",
    weave: "Benarasi",
    fabric: "Soft lightweight Benarasi mashru silk",
    retailPrice: 5850,
    dealerPrice: 4950,
    resellerQuotePrice: 5350,
    colors: ["Midnight Blue", "Deep Crimson", "Bottle Green", "Royal Plum"],
    images: {
      primary: "assets/MYK-KD-10.jpg",
      secondary: "assets/MYK-KD-10-pallu.jpg"
    },
    description: "Soft lightweight Benarasi mashru silk sarees with rich Kashmiri Darbaar detailing weaving allover. Rich multi-weaving pallu and plain blouse with border. Sold above 6.5K in luxury retail outlets.",
    highlights: [
      "Kashmiri Darbaar allover weaving",
      "Multi-weaving grand pallu",
      "Pure soft mashru silk texture",
      "Luxury retail equivalent 6,500+"
    ],
    silkMark: true,
    inStock: true
  }
];

// Helper functions for easy data access
function getProductById(id) {
  return CATALOG_DATA.find(p => p.id === id);
}

function getProductsByCategory(category) {
  if (!category || category === "all") return CATALOG_DATA;
  return CATALOG_DATA.filter(p => p.category === category);
}

// Export for module systems or global window access
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BRAND_CONFIG, CATALOG_DATA, getProductById, getProductsByCategory };
}
