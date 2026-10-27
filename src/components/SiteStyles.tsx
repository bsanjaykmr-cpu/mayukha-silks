import React from "react";

export const SiteStyles: React.FC = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        :root {
          --color-ivory: #FCF9F5;
          --color-ivory-light: #FFFDF9;
          --color-ivory-warm: #F4EFE6;
          --color-wine: #6B1D27;
          --color-wine-dark: #4A121A;
          --color-wine-light: #8E2B38;
          --color-gold: #C5A059;
          --color-gold-light: #E0C287;
          --color-gold-dark: #9A7730;
          --color-gold-bg: rgba(197, 160, 89, 0.12);
          --color-green: #2E7D32;
          --color-green-light: #E8F5E9;
          --color-text-primary: #211D1D;
          --color-text-secondary: #5D5451;
          --color-text-muted: #8E837E;
          --color-border: #E8DFD3;
          --color-border-gold: rgba(197, 160, 89, 0.4);
          --color-white: #FFFFFF;

          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

          --shadow-sm: 0 2px 8px rgba(107, 29, 39, 0.04);
          --shadow-md: 0 8px 24px rgba(107, 29, 39, 0.08);
          --shadow-lg: 0 16px 40px rgba(107, 29, 39, 0.12);
          --shadow-gold: 0 8px 30px rgba(197, 160, 89, 0.25);

          --radius-sm: 6px;
          --radius-md: 12px;
          --radius-lg: 20px;
          --radius-arch: 140px 140px 16px 16px;
          --radius-full: 9999px;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body, div, span, h1, h2, h3, h4, h5, p, a, button {
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
        }

        .container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .font-serif { font-family: var(--font-serif); }
        .font-sans { font-family: var(--font-sans); }

        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-gold-dark);
          margin-bottom: 12px;
        }

        .section-tag::before,
        .section-tag::after {
          content: "";
          display: inline-block;
          width: 28px;
          height: 1px;
          background-color: var(--color-gold);
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          font-weight: 600;
          color: var(--color-wine);
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .section-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.05rem;
          max-width: 680px;
          margin: 0 auto;
        }

        .text-center { text-align: center; }

        /* Announcement Bar */
        .announcement-bar {
          background-color: var(--color-wine-dark);
          color: var(--color-ivory);
          padding: 10px 0;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 1.2px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.3);
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          white-space: nowrap;
          gap: 60px;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .marquee-dot {
          width: 6px;
          height: 6px;
          background-color: var(--color-gold);
          border-radius: 50%;
        }

        /* Dealer Status Bar */
        .dealer-status-bar {
          background: linear-gradient(90deg, #1B5E20, #2E7D32, #1B5E20);
          color: #FFFFFF;
          padding: 12px 32px;
          font-size: 0.9rem;
          border-bottom: 2px solid var(--color-gold);
          box-shadow: 0 4px 16px rgba(46, 125, 50, 0.3);
          position: relative;
          z-index: 101;
        }

        .dealer-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dealer-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .dealer-pulse {
          width: 8px;
          height: 8px;
          background: #A5D6A7;
          border-radius: 50%;
          box-shadow: 0 0 10px #A5D6A7;
        }

        /* Header */
        .site-header {
          position: sticky;
          top: 0;
          background: rgba(252, 249, 245, 0.98);
          border-bottom: 1px solid var(--color-border);
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 90px;
          gap: 32px;
        }

        .header-search {
          position: relative;
          width: 340px;
        }

        .header-search input {
          width: 100%;
          padding: 11px 18px 11px 44px;
          background: var(--color-ivory-warm);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          color: var(--color-text-primary);
          outline: none;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
        }

        .brand-identity {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          text-decoration: none;
        }

        .brand-monogram {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-gold);
          letter-spacing: 5px;
          line-height: 1;
        }

        .brand-title {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          font-weight: 700;
          color: var(--color-wine);
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1;
          margin-top: 3px;
        }

        .brand-subtitle {
          font-size: 0.72rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-gold-dark);
          font-weight: 600;
          margin-top: 4px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .dealer-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--color-wine);
          color: var(--color-ivory);
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 700;
          border: 1px solid var(--color-wine);
          box-shadow: var(--shadow-sm);
        }

        .dealer-btn.is-active {
          background: var(--color-green);
          border-color: var(--color-green);
        }

        .action-icon-btn {
          position: relative;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--color-wine);
          background: var(--color-ivory-warm);
          border: 1px solid var(--color-border);
        }

        .action-counter {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--color-wine);
          color: var(--color-white);
          font-size: 0.75rem;
          font-weight: 800;
          min-width: 22px;
          height: 22px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--color-ivory);
        }

        .header-subnav {
          border-top: 1px solid var(--color-border);
          background: var(--color-ivory);
          padding: 12px 0;
        }

        .subnav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          list-style: none;
        }

        .subnav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .subnav-link.active {
          color: var(--color-wine);
          font-weight: 700;
        }

        /* Hero */
        .hero-section {
          position: relative;
          min-height: 780px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(135deg, #1C0508 0%, #360B12 50%, #20060A 100%);
          color: #FFFFFF;
        }

        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 75% 40%, rgba(197, 160, 89, 0.22) 0%, transparent 60%),
            linear-gradient(to right, rgba(28, 5, 8, 0.95) 32%, rgba(28, 5, 8, 0.45) 100%);
          z-index: 1;
        }

        .hero-media-wrap {
          position: absolute;
          right: 0;
          top: 0;
          width: 58%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .hero-media-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          padding: 80px 0;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(197, 160, 89, 0.2);
          border: 1px solid rgba(197, 160, 89, 0.5);
          color: var(--color-gold-light);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero-headline {
          font-family: var(--font-serif);
          font-size: 3.8rem;
          font-weight: 500;
          line-height: 1.12;
          color: #FFFFFF;
          margin-bottom: 20px;
        }

        .hero-headline span {
          font-style: italic;
          color: var(--color-gold-light);
        }

        .hero-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #E0D3C9;
          margin-bottom: 36px;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1rem;
          padding: 16px 36px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-gold-light);
          box-shadow: var(--shadow-gold);
        }

        .btn-outline-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1rem;
          padding: 16px 32px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .hero-stats {
          display: flex;
          gap: 44px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .stat-item h4 {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--color-gold-light);
          line-height: 1;
        }

        .stat-item p {
          font-size: 0.85rem;
          color: #C0B3A9;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        /* Trust Strip */
        .trust-strip {
          background: var(--color-ivory-warm);
          border-bottom: 1px solid var(--color-border);
          padding: 40px 0;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .trust-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-white);
          border: 1px solid var(--color-border-gold);
          color: var(--color-wine);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--shadow-sm);
        }

        .trust-text h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-wine);
          line-height: 1.3;
        }

        .trust-text p {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          margin-top: 3px;
        }

        /* Bento Grid */
        .occasion-section {
          padding: 100px 0;
          background-color: var(--color-ivory);
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(2, 300px);
          gap: 28px;
          margin-top: 50px;
        }

        .bento-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px;
          color: #FFFFFF;
        }

        .bento-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .bento-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(20, 5, 8, 0.88) 100%);
          z-index: 1;
        }

        .bento-content {
          position: relative;
          z-index: 2;
        }

        .bento-tag {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--color-gold-light);
          margin-bottom: 6px;
        }

        .bento-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .bento-count {
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .bento-card.wedding { grid-column: span 7; }
        .bento-card.reception { grid-column: span 5; }
        .bento-card.haldi { grid-column: span 5; }
        .bento-card.festive { grid-column: span 7; }

        /* Arches */
        .arches-section {
          padding: 90px 0 100px;
          background: linear-gradient(180deg, var(--color-ivory-warm) 0%, var(--color-ivory) 100%);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .arches-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-top: 54px;
        }

        .arch-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .arch-window {
          width: 100%;
          aspect-ratio: 3 / 4.2;
          border-radius: var(--radius-arch);
          overflow: hidden;
          position: relative;
          border: 2px solid var(--color-border-gold);
          box-shadow: var(--shadow-md);
          background: var(--color-wine-dark);
        }

        .arch-window img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .arch-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(30, 8, 12, 0.82) 100%);
        }

        .arch-origin {
          position: absolute;
          bottom: 18px;
          left: 0;
          right: 0;
          color: var(--color-gold-light);
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .arch-name {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-wine);
          margin-top: 18px;
        }

        .arch-sub {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }

        /* Catalog Section */
        .catalog-section {
          padding: 100px 0;
        }

        .catalog-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 44px;
        }

        .filter-pills {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-pill {
          padding: 10px 24px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text-secondary);
          background: var(--color-ivory-warm);
          border: 1px solid var(--color-border);
        }

        .filter-pill.active {
          background: var(--color-wine);
          color: var(--color-ivory);
          border-color: var(--color-wine);
          box-shadow: var(--shadow-sm);
        }

        .catalog-count-badge {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 36px 28px;
        }

        .product-card {
          background: var(--color-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          position: relative;
        }

        .product-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background-color: var(--color-ivory-warm);
        }

        .product-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease, opacity 0.5s ease;
        }

        .card-badges {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 3;
        }

        .badge-silkmark {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #111111;
          color: #D4AF37;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(212, 175, 55, 0.6);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .badge-tag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.95);
          color: var(--color-wine);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .card-wishlist-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          color: var(--color-wine);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .card-quick-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          background: linear-gradient(180deg, transparent 0%, rgba(20, 5, 8, 0.85) 100%);
          display: flex;
          justify-content: center;
          z-index: 3;
          transition: all 0.3s ease;
        }

        .btn-quick-view {
          background: var(--color-white);
          color: var(--color-wine);
          font-size: 0.82rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 22px;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }

        .product-info {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-weave-sub {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-gold-dark);
          font-weight: 700;
          margin-bottom: 6px;
        }

        .product-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--color-wine);
          line-height: 1.3;
          margin-bottom: 8px;
          height: 3.5em;
          overflow: hidden;
        }

        .product-fabric-meta {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-price-box {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--color-border);
        }

        .retail-price-display {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .current-price {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--color-wine);
        }

        .tax-tag {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .dealer-price-display {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dealer-main-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .struck-retail-price {
          font-size: 1rem;
          text-decoration: line-through;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .dealer-price-highlight {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-green);
        }

        .dealer-margin-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          background: var(--color-green-light);
          color: var(--color-green);
          font-size: 0.78rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(46, 125, 50, 0.25);
        }

        .product-card-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }

        .btn-add-cart {
          flex: 1;
          background: var(--color-ivory-warm);
          color: var(--color-wine);
          border: 1px solid var(--color-border);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-quick-wa {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-sm);
          background: #25D366;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Reviews */
        .reviews-section {
          padding: 100px 0;
          background: var(--color-ivory-warm);
          border-top: 1px solid var(--color-border);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 50px;
        }

        .review-card {
          background: var(--color-white);
          border-radius: var(--radius-md);
          padding: 36px;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
        }

        .review-stars {
          display: flex;
          gap: 4px;
          color: var(--color-gold);
          margin-bottom: 16px;
          font-size: 1.2rem;
        }

        .review-text {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.65;
          font-style: italic;
          margin-bottom: 24px;
          flex: 1;
        }

        .reviewer-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 18px;
          border-top: 1px solid var(--color-border);
        }

        .reviewer-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--color-gold);
        }

        .reviewer-info h5 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-wine);
        }

        .reviewer-info p {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        /* Footer */
        .site-footer {
          background: #160406;
          color: #C0B3A9;
          padding: 90px 0 40px;
          border-top: 2px solid var(--color-gold);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
          margin-bottom: 60px;
        }

        .footer-col h4 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--color-gold-light);
          margin-bottom: 20px;
        }

        .footer-brand h3 {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: #FFFFFF;
          margin-bottom: 10px;
        }

        .footer-brand p {
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 380px;
        }

        .concierge-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.4);
          color: #A5D6A7;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .live-indicator {
          width: 10px;
          height: 10px;
          background: #25D366;
          border-radius: 50%;
          box-shadow: 0 0 10px #25D366;
        }

        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
        }
      `}</style>
    </>
  );
};
