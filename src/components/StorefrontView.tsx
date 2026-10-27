import React from "react";
import { staticFile } from "remotion";
import { CATALOG_DATA, BRAND_CONFIG, formatINR, ProductItem } from "../data";

interface StorefrontViewProps {
  translateY: number;
  marqueeOffset: number;
  activeHoverCardId?: string | null;
  quickViewOpen?: boolean;
  quickViewProductId?: string;
  quickViewSelectedImageIndex?: number;
  quickViewModalProgress?: number; // 0 to 1
  isDealerMode?: boolean;
  cartCounterValue?: number;
  onQuickViewAddToCartHover?: boolean;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  translateY,
  marqueeOffset,
  activeHoverCardId = null,
  quickViewOpen = false,
  quickViewProductId = "MYK-MS-01",
  quickViewSelectedImageIndex = 0,
  quickViewModalProgress = 0,
  isDealerMode = false,
  cartCounterValue = 0,
  onQuickViewAddToCartHover = false
}) => {
  const activeProduct: ProductItem =
    CATALOG_DATA.find((p) => p.id === quickViewProductId) || CATALOG_DATA[0];

  const qvMainImgSrc =
    quickViewSelectedImageIndex === 0
      ? staticFile(activeProduct.images.primary)
      : staticFile(activeProduct.images.secondary);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "var(--color-ivory)",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* =========================================================================
           TOP MARQUEE BANNER (Always on top)
           ========================================================================= */}
      <aside className="announcement-bar" style={{ position: "relative", zIndex: 120 }}>
        <div
          className="marquee-content"
          style={{
            transform: `translateX(-${marqueeOffset % 1200}px)`,
            transition: "none"
          }}
        >
          {[0, 1, 2, 3].map((loopIdx) => (
            <React.Fragment key={loopIdx}>
              <div className="marquee-item">
                <span>✦</span>
                <span>MAYUKHA MONOPOLY COLLECTION • DIRECT LOOM EXCLUSIVES</span>
              </div>
              <div className="marquee-item">
                <span className="marquee-dot"></span>
                <span>COMPLIMENTARY HERITAGE PACKAGING ON ORDERS OVER ₹5,000</span>
              </div>
              <div className="marquee-item">
                <span className="marquee-dot"></span>
                <span>GOVT. RECOGNIZED SILK MARK CERTIFIED PURITY GUARANTEE</span>
              </div>
              <div className="marquee-item">
                <span className="marquee-dot"></span>
                <span>WHOLESALE RESELLER PRIVILEGES & UR RATES AVAILABLE VIA PIN 2026</span>
              </div>
              <div className="marquee-item">
                <span className="marquee-dot"></span>
                <span>EXPRESS GLOBAL DISPATCH TO USA, UK, UAE & ACROSS INDIA</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </aside>

      {/* =========================================================================
           WHOLESALE STATUS BAR (Reveals when isDealerMode is active)
           ========================================================================= */}
      {isDealerMode && (
        <section
          className="dealer-status-bar"
          style={{
            position: "relative",
            zIndex: 115,
            animation: "slideDown 0.3s ease"
          }}
        >
          <div className="container">
            <div className="dealer-bar-inner">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="dealer-badge">
                  <span className="dealer-pulse"></span>
                  Verified Reseller Partner Active
                </span>
                <span style={{ fontSize: "0.95rem", color: "#E8F5E9" }}>
                  Loom-direct "Ur Wholesale Rates" & Recommended Reseller Quotes unlocked.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: "0.88rem", opacity: 0.9 }}>
                  Session: Reseller Access (PIN 2026)
                </span>
                <button
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    color: "#FFF",
                    border: "1px solid rgba(255,255,255,0.4)",
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: "0.82rem",
                    fontWeight: 700
                  }}
                >
                  Lock & Return to Retail
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
           STICKY HEADER (Remains fixed at top under marquee & dealer bar)
           ========================================================================= */}
      <header className="site-header" style={{ position: "relative", zIndex: 110 }}>
        <div className="container">
          <div className="header-inner">
            <div className="header-search">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search weaves, fabrics, zari, codes..." readOnly />
            </div>

            <div className="brand-identity">
              <span className="brand-monogram">MAYUKHA</span>
              <h1 className="brand-title">SILKS & COUTURE</h1>
              <span className="brand-subtitle">Royal Heritage Looms</span>
            </div>

            <div className="header-actions">
              <button className={`dealer-btn ${isDealerMode ? "is-active" : ""}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>{isDealerMode ? "Dealer Active" : "Dealer Lounge"}</span>
              </button>

              <button className="action-icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className="action-counter">0</span>
              </button>

              <button className="action-icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span className="action-counter">{cartCounterValue}</span>
              </button>
            </div>
          </div>
        </div>

        <nav className="header-subnav">
          <div className="container">
            <ul className="subnav-links">
              <li className="subnav-link">Sacred Occasions</li>
              <li className="subnav-link">Heritage Weaves</li>
              <li className="subnav-link active">Real Loom Archive</li>
              <li className="subnav-link">Client Diaries</li>
              <li className="subnav-link" style={{ color: isDealerMode ? "var(--color-green)" : undefined, fontWeight: isDealerMode ? 700 : 600 }}>
                B2B Wholesale Portal
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* =========================================================================
           VIRTUAL SCROLLING BODY CONTAINER (Controlled by translateY)
           ========================================================================= */}
      <div
        style={{
          transform: `translateY(-${translateY}px)`,
          transition: "none",
          width: 1920
        }}
      >
        {/* =========================================================================
             1. HERO SECTION
             ========================================================================= */}
        <section className="hero-section" id="hero">
          <div className="hero-bg-overlay"></div>
          <div className="hero-media-wrap">
            <img src={staticFile("assets/MYK-KD-10.jpg")} alt="Hero Saree" />
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-pill">
                <span>✦</span> Direct Handloom Pit-Looms • Mayukha Monopoly
              </div>
              <h2 className="hero-headline">
                Authentic Silks From <span>Sacred Pit-Looms</span>
              </h2>
              <p className="hero-desc">
                Directly from master weaving clusters to royal weddings and discerning boutiques worldwide. Discover pure Mashru Crepe, Munga Kalamkari, and Binny Chiffon Scallop designs.
              </p>
              <div className="hero-actions">
                <button className="btn-primary">
                  <span>Explore Authentic Catalog</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <button className="btn-outline-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Unlock Wholesale Tariffs (PIN 2026)</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <h4>100%</h4>
                  <p>Pure Silk Mark</p>
                </div>
                <div className="stat-item">
                  <h4>30+</h4>
                  <p>Years of Looms</p>
                </div>
                <div className="stat-item">
                  <h4>Direct</h4>
                  <p>Weaver Sourced</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
             2. TRUST STRIP
             ========================================================================= */}
        <section className="trust-strip">
          <div className="container">
            <div className="trust-grid">
              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Silk Mark Certified</h4>
                  <p>100% genuine natural silks authenticated by Silk Board</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Mayukha Monopoly</h4>
                  <p>Exclusive designs & direct loom pricing with zero middlemen</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Worldwide Air Courier</h4>
                  <p>Fast insured delivery to USA, UK, UAE & across India</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Reseller Partner Support</h4>
                  <p>Transparent Ur rates, recommended quotes & WhatsApp concierge</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
             3. SHOP BY SACRED OCCASION (BENTO GRID)
             ========================================================================= */}
        <section className="occasion-section">
          <div className="container">
            <div className="text-center">
              <div className="section-tag">Auspicious Celebrations</div>
              <h2 className="section-title">Shop by Sacred Occasion</h2>
              <p className="section-subtitle">
                Authentic weaves curated for grand wedding pheras, reception evenings, and festive rituals.
              </p>
            </div>

            <div className="bento-grid">
              <div className="bento-card wedding">
                <img src={staticFile("assets/MYK-KP-02.jpg")} alt="Wedding" />
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <span className="bento-tag">Sacred Vivah</span>
                  <h3 className="bento-title">Bridal & Muhurtham</h3>
                  <p className="bento-count">Munga Kalamkari, Pure Benarasi & Kashmiri Darbaar →</p>
                </div>
              </div>

              <div className="bento-card reception">
                <img src={staticFile("assets/MYK-RC-05.jpg")} alt="Reception" />
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <span className="bento-tag">Evening Splendor</span>
                  <h3 className="bento-title">Royal Reception</h3>
                  <p className="bento-count">Russian Crepe & Falling Tissue Parsi Work →</p>
                </div>
              </div>

              <div className="bento-card haldi">
                <img src={staticFile("assets/MYK-MC-08.jpg")} alt="Haldi" />
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <span className="bento-tag">Sunlit Hues</span>
                  <h3 className="bento-title">Auspicious Haldi</h3>
                  <p className="bento-count">Mysore Crepe Silk Skirt Gap Borders →</p>
                </div>
              </div>

              <div className="bento-card festive">
                <img src={staticFile("assets/MYK-MS-01.jpg")} alt="Festive" />
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <span className="bento-tag">Divine Festivities</span>
                  <h3 className="bento-title">Temple & Festivals</h3>
                  <p className="bento-count">Mashru Crepe Lines & Binny Chiffon Scallop →</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
             4. SIGNATURE HERITAGE WEAVE ARCHES
             ========================================================================= */}
        <section className="arches-section">
          <div className="container">
            <div className="text-center">
              <div className="section-tag">Living Traditions</div>
              <h2 className="section-title">Signature Heritage Weave Arches</h2>
              <p className="section-subtitle">
                Master handloom lineages directly documented from our boutique inventory and artisan clusters.
              </p>
            </div>

            <div className="arches-grid">
              <div className="arch-card">
                <div className="arch-window">
                  <img src={staticFile("assets/MYK-MS-01.jpg")} alt="Mashru Crepe" />
                  <div className="arch-overlay"></div>
                  <span className="arch-origin">Varanasi Looms</span>
                </div>
                <h3 className="arch-name">Mashru Crepe</h3>
                <p className="arch-sub">Weaving Lines & Peacock Borders</p>
              </div>

              <div className="arch-card">
                <div className="arch-window">
                  <img src={staticFile("assets/MYK-KP-02.jpg")} alt="Munga Kalamkari" />
                  <div className="arch-overlay"></div>
                  <span className="arch-origin">Andhra & Assam</span>
                </div>
                <h3 className="arch-name">Munga Kalamkari</h3>
                <p className="arch-sub">Story-Theme Penkalamkari Prints</p>
              </div>

              <div className="arch-card">
                <div className="arch-window">
                  <img src={staticFile("assets/MYK-BC-03.jpg")} alt="Binny Chiffon" />
                  <div className="arch-overlay"></div>
                  <span className="arch-origin">Mayukha Exclusive</span>
                </div>
                <h3 className="arch-name">Binny Chiffon</h3>
                <p className="arch-sub">Heavy Zari Pita Scallop Work</p>
              </div>

              <div className="arch-card">
                <div className="arch-window">
                  <img src={staticFile("assets/MYK-BM-04.jpg")} alt="Benarasi Mashru" />
                  <div className="arch-overlay"></div>
                  <span className="arch-origin">Varanasi Heritage</span>
                </div>
                <h3 className="arch-name">Benarasi Mashru</h3>
                <p className="arch-sub">Allover Jaal & Attached Lace</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
             5. LOOM MASTERPIECES CATALOG GRID
             ========================================================================= */}
        <section className="catalog-section" id="catalog">
          <div className="container">
            <div className="text-center" style={{ marginBottom: 36 }}>
              <div className="section-tag">Royal Loom Archive</div>
              <h2 className="section-title">Authentic Boutique Inventory</h2>
              <p className="section-subtitle">
                Hover over any saree to reveal the rich pallu and blouse craftsmanship. Resellers can unlock the trade lounge with PIN <strong>2026</strong>.
              </p>
            </div>

            <div className="catalog-header-bar">
              <div className="filter-pills">
                <button className="filter-pill active">All 10 Heirlooms</button>
                <button className="filter-pill">Wedding Looms</button>
                <button className="filter-pill">Royal Reception</button>
                <button className="filter-pill">Auspicious Haldi</button>
                <button className="filter-pill">Festive Celebrations</button>
              </div>
              <div className="catalog-count-badge">Showing 10 Authentic Loom Heirlooms</div>
            </div>

            <div className="product-grid" id="productContainer">
              {CATALOG_DATA.map((product) => {
                const isHovered = activeHoverCardId === product.id;
                const totalMargin = product.retailPrice - product.dealerPrice;

                return (
                  <article
                    key={product.id}
                    className="product-card"
                    style={{
                      transform: isHovered ? "translateY(-6px)" : "none",
                      boxShadow: isHovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
                      borderColor: isHovered ? "var(--color-border-gold)" : "var(--color-border)"
                    }}
                  >
                    <div className="product-image-wrap">
                      {/* Dual-image crossfade */}
                      <img
                        className="product-img"
                        src={staticFile(product.images.primary)}
                        alt={product.name}
                        style={{
                          opacity: isHovered ? 0 : 1,
                          transform: isHovered ? "scale(1.05)" : "scale(1)"
                        }}
                      />
                      <img
                        className="product-img"
                        src={staticFile(product.images.secondary)}
                        alt={product.name}
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "scale(1)" : "scale(1.04)"
                        }}
                      />

                      <div className="card-badges">
                        {product.silkMark ? (
                          <span className="badge-silkmark">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            Silk Mark
                          </span>
                        ) : (
                          <span className="badge-tag" style={{ background: "rgba(40,40,40,0.85)", color: "#FFF" }}>
                            Handloom Special
                          </span>
                        )}
                        <span className="badge-tag">{product.categoryLabel || product.category}</span>
                      </div>

                      <div className="card-wishlist-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </div>

                      {/* Quick view button overlay */}
                      <div
                        className="card-quick-overlay"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateY(0)" : "translateY(12px)"
                        }}
                      >
                        <button className="btn-quick-view">Quick View Details</button>
                      </div>
                    </div>

                    <div className="product-info">
                      <div className="product-weave-sub">{product.weave} • {product.id}</div>
                      <h3 className="product-title" title={product.name}>{product.name}</h3>
                      <div className="product-fabric-meta">🧵 {product.fabric}</div>

                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                        {product.colors.slice(0, 3).map((c, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--color-text-muted)",
                              background: "var(--color-ivory-warm)",
                              padding: "2px 8px",
                              borderRadius: 4,
                              border: "1px solid var(--color-border)"
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Frame-driven Pricing: Retail vs Dealer */}
                      <div className="product-price-box">
                        {isDealerMode ? (
                          <div className="dealer-price-display">
                            <div className="dealer-main-row">
                              <span className="struck-retail-price">{formatINR(product.retailPrice)}</span>
                              <span className="dealer-price-highlight">{formatINR(product.dealerPrice)}</span>
                              <span className="tax-tag" style={{ color: "var(--color-green)", fontWeight: 800 }}>Ur Price</span>
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 2 }}>
                              Reseller Quote: <strong style={{ color: "var(--color-wine)" }}>{formatINR(product.resellerQuotePrice)}</strong>
                            </div>
                            <div className="dealer-margin-pill" style={{ marginTop: 6 }}>
                              <span>✦</span> Profit Margin: {formatINR(totalMargin)} / Saree
                            </div>
                          </div>
                        ) : (
                          <div className="retail-price-display">
                            <span className="current-price">{formatINR(product.retailPrice)}</span>
                            <span className="tax-tag">Inclusive of all taxes</span>
                          </div>
                        )}
                      </div>

                      <div className="product-card-actions">
                        <button className="btn-add-cart">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                          </svg>
                          <span>Add to Bag</span>
                        </button>
                        <button className="btn-quick-wa">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
             6. CLIENT DIARIES
             ========================================================================= */}
        <section className="reviews-section">
          <div className="container">
            <div className="text-center">
              <div className="section-tag">Royal Patrons</div>
              <h2 className="section-title">Client Diaries & Reseller Testimonials</h2>
              <p className="section-subtitle">
                Cherished feedback from brides and verified wholesale boutique partners across India and overseas.
              </p>
            </div>

            <div className="reviews-grid">
              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">
                  "The Pure Benarasi Mashru Jaal Weave (MYK-BM-04) I ordered for my wedding reception was breathtaking. The rich pallu weaving and attached lace border felt extraordinarily royal."
                </p>
                <div className="reviewer-meta">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "var(--color-wine)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800
                    }}
                  >
                    AR
                  </div>
                  <div className="reviewer-info">
                    <h5>Dr. Ananya Rao</h5>
                    <p>Hyderabad • Verified Bride</p>
                  </div>
                </div>
              </div>

              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">
                  "As a boutique reseller in California, Mayukha's wholesale pricing formula makes stock management effortless. Ur price on Mashru Crepe at ₹2,699 with recommended quote ₹2,899 gives healthy margins."
                </p>
                <div className="reviewer-meta">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "var(--color-wine)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800
                    }}
                  >
                    KS
                  </div>
                  <div className="reviewer-info">
                    <h5>Kavita Sundaram</h5>
                    <p>California, USA • Verified Reseller</p>
                  </div>
                </div>
              </div>

              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">
                  "The Binny Chiffon Heavy Zari Pita Scallop is indeed a true monopoly design. Super lightweight, vibrant leheriya prints, and the embroidery blouse is ready-to-wear perfection."
                </p>
                <div className="reviewer-meta">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "var(--color-wine)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800
                    }}
                  >
                    MS
                  </div>
                  <div className="reviewer-info">
                    <h5>Meera Singhania</h5>
                    <p>Bengaluru • Verified Patron</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
             7. LUXURY DARK ROYAL FOOTER
             ========================================================================= */}
        <footer className="site-footer">
          <div className="container">
            <div className="footer-top-grid">
              <div className="footer-col footer-brand">
                <span style={{ color: "var(--color-gold)", fontSize: "0.85rem", letterSpacing: 2 }}>ESTD. 1994</span>
                <h3>MAYUKHA</h3>
                <p>
                  Celebrating the timeless majesty of Indian weaving traditions. Every saree carries the seal of artisan authenticity, pure silk certitude, and imperial heritage.
                </p>
                <div className="concierge-pill">
                  <span className="live-indicator"></span>
                  <span>WhatsApp Concierge: +91 90141 29045 (Online)</span>
                </div>
              </div>

              <div className="footer-col">
                <h4>Weave Lineages</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.95rem" }}>
                  <span>Soft Mashru Crepe</span>
                  <span>Munga Penkalamkari Pattu</span>
                  <span>Binny Chiffon Pita Scallop</span>
                  <span>Pure Benarasi Mashru Jaal</span>
                  <span>Falling Tissue Parsi Work</span>
                </div>
              </div>

              <div className="footer-col">
                <h4>Partner Services</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.95rem" }}>
                  <span style={{ color: "var(--color-gold-light)", fontWeight: 700 }}>Wholesale Reseller Login (PIN 2026)</span>
                  <span>Silk Mark Verification</span>
                  <span>Shopping Bag</span>
                  <span>Custom Bridal Trousseau</span>
                  <span>Worldwide Courier FAQ</span>
                </div>
              </div>

              <div className="footer-col">
                <h4>Royal Atelier</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Mayukha Atelier, Heritage Loom Arcade, Hyderabad & Varanasi<br />
                  WhatsApp / Phone: +91 90141 29045<br />
                  Mon - Sat: 10:00 AM – 8:30 PM IST
                </p>
              </div>
            </div>

            <div className="footer-bottom">
              <div>© 2026 Mayukha Silks & Couture. Handcrafted with reverence.</div>
              <div>Silk Mark License No: SMK/HYD/2026-9045 • All Rights Reserved</div>
            </div>
          </div>
        </footer>
      </div>

      {/* =========================================================================
           DETERMINISTIC FRAME-DRIVEN QUICK VIEW MODAL
           ========================================================================= */}
      {quickViewOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(16, 4, 6, 0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: quickViewModalProgress
          }}
        >
          <div
            style={{
              width: 960,
              maxHeight: "90vh",
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border-gold)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              overflow: "hidden",
              position: "relative",
              transform: `scale(${0.92 + 0.08 * quickViewModalProgress})`
            }}
          >
            {/* Modal Close Button */}
            <div
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--color-ivory-warm)",
                color: "var(--color-wine)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 16,
                zIndex: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
              }}
            >
              ✕
            </div>

            {/* Gallery Column */}
            <div style={{ padding: 28, background: "var(--color-ivory-warm)", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ width: "100%", aspectRatio: "3 / 4", borderRadius: 12, overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <img src={qvMainImgSrc} alt="Quick View" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: 14 }}>
                <div
                  style={{
                    width: 74,
                    height: 92,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `2px solid ${quickViewSelectedImageIndex === 0 ? "var(--color-wine)" : "transparent"}`,
                    boxShadow: quickViewSelectedImageIndex === 0 ? "0 4px 12px rgba(107,29,39,0.3)" : "none"
                  }}
                >
                  <img src={staticFile(activeProduct.images.primary)} alt="Thumb 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div
                  style={{
                    width: 74,
                    height: 92,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `2px solid ${quickViewSelectedImageIndex === 1 ? "var(--color-wine)" : "transparent"}`,
                    boxShadow: quickViewSelectedImageIndex === 1 ? "0 4px 12px rgba(107,29,39,0.3)" : "none"
                  }}
                >
                  <img src={staticFile(activeProduct.images.secondary)} alt="Thumb 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: 1.5, color: "var(--color-gold-dark)", fontWeight: 800, marginBottom: 8 }}>
                {activeProduct.category.toUpperCase()} • {activeProduct.weave}
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 600, color: "var(--color-wine)", lineHeight: 1.25, marginBottom: 12 }}>
                {activeProduct.name}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                {activeProduct.description}
              </p>

              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20, fontSize: "0.88rem" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 0", color: "var(--color-text-muted)", width: "35%", fontWeight: 600 }}>Weave Style</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: "var(--color-wine)" }}>{activeProduct.weave}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 0", color: "var(--color-text-muted)", fontWeight: 600 }}>Fabric</td>
                    <td style={{ padding: "8px 0", fontWeight: 600 }}>{activeProduct.fabric}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 0", color: "var(--color-text-muted)", fontWeight: 600 }}>Silk Mark</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: activeProduct.silkMark ? "var(--color-green)" : "var(--color-gold-dark)" }}>
                      {activeProduct.silkMark ? "✓ Certified 100% Pure Natural Silk" : "Handloom Monopoly Edition"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--color-border)" }}>
                <div style={{ marginBottom: 18 }}>
                  {isDealerMode ? (
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                        <span style={{ fontSize: "1.2rem", textDecoration: "line-through", color: "var(--color-text-muted)" }}>
                          {formatINR(activeProduct.retailPrice)}
                        </span>
                        <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-green)" }}>
                          {formatINR(activeProduct.dealerPrice)}
                        </span>
                        <span style={{ fontSize: "0.85rem", color: "var(--color-green)", fontWeight: 800 }}>
                          Wholesale (Ur Rate)
                        </span>
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "var(--color-wine)", marginTop: 4, fontWeight: 700 }}>
                        Suggested Reseller Quote: {formatINR(activeProduct.resellerQuotePrice)}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-wine)" }}>
                        {formatINR(activeProduct.retailPrice)}
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                        Inclusive of all taxes & certification
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 14 }}>
                  <button
                    className="btn-primary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      transform: onQuickViewAddToCartHover ? "scale(1.03)" : "none",
                      boxShadow: onQuickViewAddToCartHover
                        ? "0 12px 30px rgba(197, 160, 89, 0.55)"
                        : "var(--shadow-gold)"
                    }}
                  >
                    Add to Shopping Bag
                  </button>
                  <button className="btn-quick-wa" style={{ width: 52, height: 52 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
