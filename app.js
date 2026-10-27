/**
 * Mayukha Silks & Couture - Main Application Engine
 * Handles Authentic Real Catalog, Role-based Wholesale Pricing & Reseller Margin Formulas,
 * Cart Drawer, PIN Security Modal, Quick View, and WhatsApp Concierge Checkout.
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // APP STATE
  // =========================================================================
  const state = {
    isDealerLoggedIn: localStorage.getItem("mayukha_dealer_auth") === "true",
    activeCategory: "all",
    searchQuery: "",
    cart: JSON.parse(localStorage.getItem("mayukha_cart") || "[]"),
    wishlist: JSON.parse(localStorage.getItem("mayukha_wishlist") || "[]"),
    activeQuickViewId: null
  };

  // =========================================================================
  // DOM ELEMENT REFERENCES
  // =========================================================================
  const productContainer = document.getElementById("productContainer");
  const catalogCount = document.getElementById("catalogCount");
  const filterPillsContainer = document.getElementById("filterPillsContainer");
  const searchInput = document.getElementById("searchInput");

  // Dealer Lounge Elements
  const dealerStatusBar = document.getElementById("dealerStatusBar");
  const dealerTriggerBtn = document.getElementById("dealerTriggerBtn");
  const dealerBtnLabel = document.getElementById("dealerBtnLabel");
  const heroDealerBtn = document.getElementById("heroDealerBtn");
  const subnavDealerLink = document.getElementById("subnavDealerLink");
  const footerDealerLink = document.getElementById("footerDealerLink");
  const dealerLogoutBtn = document.getElementById("dealerLogoutBtn");
  const dealerModal = document.getElementById("dealerModal");
  const dealerModalClose = document.getElementById("dealerModalClose");
  const dealerPinForm = document.getElementById("dealerPinForm");
  const pinInputs = document.querySelectorAll(".pin-input");
  const pinErrorMsg = document.getElementById("pinErrorMsg");

  // Cart Drawer Elements
  const cartTriggerBtn = document.getElementById("cartTriggerBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const cartDrawerClose = document.getElementById("cartDrawerClose");
  const cartCounter = document.getElementById("cartCounter");
  const cartDrawerCount = document.getElementById("cartDrawerCount");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartGrandTotal = document.getElementById("cartGrandTotal");
  const shippingMsgText = document.getElementById("shippingMsgText");
  const shippingProgressFill = document.getElementById("shippingProgressFill");
  const btnWhatsAppCheckout = document.getElementById("btnWhatsAppCheckout");

  // Wishlist Elements
  const wishlistCounter = document.getElementById("wishlistCounter");
  const wishlistTriggerBtn = document.getElementById("wishlistTriggerBtn");

  // Quick View Modal Elements
  const quickViewModal = document.getElementById("quickViewModal");
  const quickViewClose = document.getElementById("quickViewClose");
  const qvMainImg = document.getElementById("qvMainImg");
  const qvThumbsRow = document.getElementById("qvThumbsRow");
  const qvWeaveTag = document.getElementById("qvWeaveTag");
  const qvTitle = document.getElementById("qvTitle");
  const qvDesc = document.getElementById("qvDesc");
  const qvSpecWeave = document.getElementById("qvSpecWeave");
  const qvSpecFabric = document.getElementById("qvSpecFabric");
  const qvSpecSilkMark = document.getElementById("qvSpecSilkMark");
  const qvHighlightsList = document.getElementById("qvHighlightsList");
  const qvPriceBox = document.getElementById("qvPriceBox");
  const qvAddToCartBtn = document.getElementById("qvAddToCartBtn");
  const qvWhatsAppBtn = document.getElementById("qvWhatsAppBtn");

  // Toast Container
  const toastContainer = document.getElementById("toastContainer");

  // Header Scroll Effect
  const siteHeader = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  });

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = "normal") {
    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "success" : ""}`;
    toast.innerHTML = `
      <span style="color: var(--color-gold);">✦</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = "toastOut 0.35s ease forwards";
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  // =========================================================================
  // CURRENCY FORMATTER
  // =========================================================================
  function formatINR(amount) {
    return BRAND_CONFIG.currency + Number(amount).toLocaleString("en-IN");
  }

  // =========================================================================
  // DEALER WHOLESALE STATUS MANAGEMENT
  // =========================================================================
  function updateDealerUI() {
    if (state.isDealerLoggedIn) {
      dealerStatusBar.classList.add("active");
      dealerTriggerBtn.classList.add("is-active");
      dealerBtnLabel.textContent = "Dealer Active";
    } else {
      dealerStatusBar.classList.remove("active");
      dealerTriggerBtn.classList.remove("is-active");
      dealerBtnLabel.textContent = "Dealer Lounge";
    }
    renderCatalog();
    renderCart();
    if (state.activeQuickViewId) {
      renderQuickViewPrice(getProductById(state.activeQuickViewId));
    }
  }

  function openDealerModal() {
    if (state.isDealerLoggedIn) {
      showToast("Wholesale Lounge is active with Ur trade rates & Reseller quotes.", "success");
      return;
    }
    dealerModal.classList.add("active");
    dealerModal.setAttribute("aria-hidden", "false");
    pinErrorMsg.style.display = "none";
    pinInputs.forEach(input => (input.value = ""));
    pinInputs[0].focus();
  }

  function closeDealerModal() {
    dealerModal.classList.remove("active");
    dealerModal.setAttribute("aria-hidden", "true");
  }

  function handleDealerLogout() {
    state.isDealerLoggedIn = false;
    localStorage.setItem("mayukha_dealer_auth", "false");
    updateDealerUI();
    showToast("Wholesale lounge locked. Returned to standard retail customer pricing.");
  }

  // PIN Input auto-advance & backspace navigation
  pinInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const val = e.target.value.replace(/\D/g, "");
      e.target.value = val;
      if (val && index < pinInputs.length - 1) {
        pinInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        pinInputs[index - 1].focus();
      }
    });
  });

  dealerPinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const enteredPin = Array.from(pinInputs).map(inp => inp.value).join("");
    
    if (enteredPin === BRAND_CONFIG.defaultDealerPin) {
      state.isDealerLoggedIn = true;
      localStorage.setItem("mayukha_dealer_auth", "true");
      closeDealerModal();
      updateDealerUI();
      showToast("👑 Wholesale Trade Tariffs Unlocked! Ur Rates & Reseller Quotes Active.", "success");
    } else {
      pinErrorMsg.style.display = "block";
      dealerPinForm.classList.add("shake-error");
      setTimeout(() => dealerPinForm.classList.remove("shake-error"), 500);
      pinInputs.forEach(inp => (inp.value = ""));
      pinInputs[0].focus();
    }
  });

  // Modal Triggers
  dealerTriggerBtn.addEventListener("click", () => {
    if (state.isDealerLoggedIn) {
      handleDealerLogout();
    } else {
      openDealerModal();
    }
  });

  if (heroDealerBtn) heroDealerBtn.addEventListener("click", openDealerModal);
  if (subnavDealerLink) subnavDealerLink.addEventListener("click", openDealerModal);
  if (footerDealerLink) footerDealerLink.addEventListener("click", openDealerModal);
  if (dealerLogoutBtn) dealerLogoutBtn.addEventListener("click", handleDealerLogout);
  if (dealerModalClose) dealerModalClose.addEventListener("click", closeDealerModal);

  dealerModal.addEventListener("click", (e) => {
    if (e.target === dealerModal) closeDealerModal();
  });

  // =========================================================================
  // CATALOG RENDERING (WITH STRICT ROLE-BASED PRICING PRIVACY)
  // =========================================================================
  function renderCatalog() {
    let filtered = CATALOG_DATA.filter(item => {
      const matchCat = state.activeCategory === "all" || item.category === state.activeCategory;
      const matchQuery = state.searchQuery === "" || 
        item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.weave.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });

    catalogCount.textContent = `Showing ${filtered.length} Authentic Loom Heirloom${filtered.length === 1 ? "" : "s"}`;

    if (filtered.length === 0) {
      productContainer.innerHTML = `
        <div class="catalog-empty">
          <h3>No Heirlooms Found</h3>
          <p>We could not find any sarees matching "${state.searchQuery}". Try searching for 'Mashru', 'Chinnon', 'Kalamkari', or 'Tissue'.</p>
          <button class="btn-primary" style="margin-top: 18px;" onclick="document.getElementById('searchInput').value=''; window.dispatchEvent(new Event('resetSearch'));">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    productContainer.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      const totalMargin = product.retailPrice - product.dealerPrice;
      const resellerMargin = product.resellerQuotePrice - product.dealerPrice;

      // Pricing Display Logic:
      // Retail: Standard customer benchmark price ONLY
      // Dealer: Struck-through Retail + Wholesale (Ur Price) + Reseller Quote + Margin
      let priceHTML = "";
      if (state.isDealerLoggedIn) {
        priceHTML = `
          <div class="dealer-price-display">
            <div class="dealer-main-row">
              <span class="struck-retail-price" title="Retail Market Benchmark">${formatINR(product.retailPrice)}</span>
              <span class="dealer-price-highlight" title="Your Loom Wholesale Price">${formatINR(product.dealerPrice)}</span>
              <span class="tax-tag" style="color: var(--color-green); font-weight: 700;">Ur Price</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 2px;">
              Reseller Quote: <strong style="color: var(--color-wine);">${formatINR(product.resellerQuotePrice)}</strong>
            </div>
            <div class="dealer-margin-pill" style="margin-top: 6px;">
              <span>✦</span> Profit Margin: ${formatINR(totalMargin)} / Saree
            </div>
          </div>
        `;
      } else {
        priceHTML = `
          <div class="retail-price-display">
            <span class="current-price">${formatINR(product.retailPrice)}</span>
            <span class="tax-tag">Inclusive of all taxes</span>
          </div>
        `;
      }

      // Color swatches preview
      const colorDots = (product.colors || []).slice(0, 4).map(c => `
        <span style="font-size: 0.7rem; color: var(--color-text-muted); background: var(--color-ivory-warm); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--color-border);">${c}</span>
      `).join(" ");

      return `
        <article class="product-card" data-id="${product.id}">
          <!-- Dual-Image Hover Crossfade -->
          <div class="product-image-wrap" onclick="window.appOpenQuickView('${product.id}')">
            <img class="product-img primary" src="${product.images.primary}" alt="${product.name} drape" loading="lazy" onerror="this.src='${product.images.secondary}'">
            <img class="product-img secondary" src="${product.images.secondary}" alt="${product.name} pallu detail" loading="lazy" onerror="this.src='${product.images.primary}'">
            
            <div class="card-badges">
              ${product.silkMark ? `
                <span class="badge-silkmark">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  Silk Mark
                </span>
              ` : `
                <span class="badge-tag" style="background: rgba(40,40,40,0.85); color: #FFF;">Handloom Special</span>
              `}
              <span class="badge-tag">${product.categoryLabel || product.category}</span>
            </div>

            <button class="card-wishlist-btn ${isWishlisted ? "active" : ""}" 
                    title="${isWishlisted ? "Remove from wishlist" : "Add to wishlist"}"
                    onclick="event.stopPropagation(); window.appToggleWishlist('${product.id}')"
                    aria-label="Wishlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <div class="card-quick-overlay">
              <button class="btn-quick-view">Quick View Details</button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="product-info">
            <div class="product-weave-sub">${product.weave} • ${product.id}</div>
            <h3 class="product-title" title="${product.name}">${product.name}</h3>
            
            <div class="product-fabric-meta" title="${product.fabric}">
              <span>🧵 ${product.fabric}</span>
            </div>

            <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px;">
              ${colorDots}
            </div>

            <!-- Price Container -->
            <div class="product-price-box">
              ${priceHTML}
            </div>

            <!-- Card Action Buttons -->
            <div class="product-card-actions">
              <button class="btn-add-cart" onclick="window.appAddToCart('${product.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                </svg>
                <span>Add to Bag</span>
              </button>
              
              <button class="btn-quick-wa" title="Inquire on WhatsApp" onclick="window.appDirectWhatsAppProduct('${product.id}')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // =========================================================================
  // SEARCH & FILTER LISTENERS
  // =========================================================================
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    renderCatalog();
  });

  window.addEventListener("resetSearch", () => {
    state.searchQuery = "";
    state.activeCategory = "all";
    filterPillsContainer.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.category === "all");
    });
    renderCatalog();
  });

  filterPillsContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    filterPillsContainer.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    state.activeCategory = pill.dataset.category;
    renderCatalog();
  });

  // Bento Grid Occasion Click Handlers
  document.querySelectorAll(".bento-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.category;
      if (!cat) return;
      state.activeCategory = cat;
      filterPillsContainer.querySelectorAll(".filter-pill").forEach(p => {
        p.classList.toggle("active", p.dataset.category === cat);
      });
      renderCatalog();
      document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
    });
  });

  // =========================================================================
  // CART DRAWER ENGINE
  // =========================================================================
  function getEffectivePrice(product) {
    return state.isDealerLoggedIn ? product.dealerPrice : product.retailPrice;
  }

  function saveCart() {
    localStorage.setItem("mayukha_cart", JSON.stringify(state.cart));
  }

  function updateCounters() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCounter.textContent = totalQty;
    cartDrawerCount.textContent = totalQty;
    wishlistCounter.textContent = state.wishlist.length;
  }

  function openCartDrawer() {
    cartDrawer.classList.add("active");
    drawerBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    drawerBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  window.openCartDrawer = openCartDrawer;
  cartTriggerBtn.addEventListener("click", openCartDrawer);
  cartDrawerClose.addEventListener("click", closeCartDrawer);
  drawerBackdrop.addEventListener("click", closeCartDrawer);

  window.appAddToCart = function(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ id: productId, qty: 1 });
    }

    saveCart();
    updateCounters();
    renderCart();
    openCartDrawer();
    showToast(`Added "${product.name}" to your bridal bag.`, "success");
  };

  window.appUpdateCartQty = function(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      state.cart = state.cart.filter(i => i.id !== productId);
    }
    saveCart();
    updateCounters();
    renderCart();
  };

  window.appRemoveCartItem = function(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    saveCart();
    updateCounters();
    renderCart();
    showToast("Removed heirloom from bag.");
  };

  function renderCart() {
    updateCounters();

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4>Your Bag is Empty</h4>
          <p>Discover our royal heritage collection and add pure silk treasures.</p>
        </div>
      `;
      cartSubtotal.textContent = formatINR(0);
      cartGrandTotal.textContent = formatINR(0);
      shippingProgressFill.style.width = "0%";
      shippingMsgText.textContent = `Add ${formatINR(BRAND_CONFIG.freeShippingThreshold)} for Complimentary Heritage Dispatch`;
      btnWhatsAppCheckout.disabled = true;
      btnWhatsAppCheckout.style.opacity = "0.5";
      btnWhatsAppCheckout.style.cursor = "not-allowed";
      return;
    }

    btnWhatsAppCheckout.disabled = false;
    btnWhatsAppCheckout.style.opacity = "1";
    btnWhatsAppCheckout.style.cursor = "pointer";

    let subtotal = 0;

    cartItemsContainer.innerHTML = state.cart.map(cartItem => {
      const product = getProductById(cartItem.id);
      if (!product) return "";

      const unitPrice = getEffectivePrice(product);
      const rowTotal = unitPrice * cartItem.qty;
      subtotal += rowTotal;

      return `
        <div class="cart-item-row">
          <img class="cart-item-thumb" src="${product.images.primary}" alt="${product.name}" onerror="this.src='${product.images.secondary}'">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${product.name}</h4>
            <div class="cart-item-meta">${product.id} • ${product.weave}</div>
            
            <div class="cart-item-pricing">
              <span class="${state.isDealerLoggedIn ? "cart-unit-dealer" : "cart-unit-price"}">
                ${formatINR(unitPrice)}
              </span>
              ${state.isDealerLoggedIn ? `
                <span style="font-size: 0.72rem; color: var(--color-green); font-weight: 700;">(Ur Wholesale Rate)</span>
              ` : ""}
            </div>

            <div class="cart-item-bottom">
              <div class="qty-control">
                <button class="qty-btn" onclick="window.appUpdateCartQty('${product.id}', -1)">−</button>
                <span class="qty-val">${cartItem.qty}</span>
                <button class="qty-btn" onclick="window.appUpdateCartQty('${product.id}', 1)">+</button>
              </div>

              <button class="btn-item-remove" onclick="window.appRemoveCartItem('${product.id}')">
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    cartSubtotal.textContent = formatINR(subtotal);
    cartGrandTotal.textContent = formatINR(subtotal);
    if (state.isDealerLoggedIn) {
      cartGrandTotal.classList.add("dealer-total");
    } else {
      cartGrandTotal.classList.remove("dealer-total");
    }

    // Free shipping progress calculation against ₹5,000 threshold
    const threshold = BRAND_CONFIG.freeShippingThreshold;
    const progressPct = Math.min(100, Math.round((subtotal / threshold) * 100));
    shippingProgressFill.style.width = `${progressPct}%`;

    if (subtotal >= threshold) {
      shippingMsgText.innerHTML = `🎉 <strong>Complimentary Heritage Dispatch Unlocked!</strong>`;
    } else {
      const remaining = threshold - subtotal;
      shippingMsgText.innerHTML = `Add <strong>${formatINR(remaining)}</strong> for Complimentary Heritage Dispatch`;
    }
  }

  // =========================================================================
  // WISHLIST TOGGLE
  // =========================================================================
  window.appToggleWishlist = function(productId) {
    const product = getProductById(productId);
    if (!product) return;

    if (state.wishlist.includes(productId)) {
      state.wishlist = state.wishlist.filter(id => id !== productId);
      showToast(`Removed "${product.name}" from saved heirlooms.`);
    } else {
      state.wishlist.push(productId);
      showToast(`Saved "${product.name}" to your wishlist.`, "success");
    }

    localStorage.setItem("mayukha_wishlist", JSON.stringify(state.wishlist));
    updateCounters();
    renderCatalog();
  };

  wishlistTriggerBtn.addEventListener("click", () => {
    if (state.wishlist.length === 0) {
      showToast("Your wishlist is currently empty. Click the heart on any saree to save it!");
      return;
    }
    state.activeCategory = "all";
    state.searchQuery = "";
    filterPillsContainer.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    
    const wishlistedItems = CATALOG_DATA.filter(p => state.wishlist.includes(p.id));
    catalogCount.textContent = `Showing ${wishlistedItems.length} Saved Heirloom${wishlistedItems.length === 1 ? "" : "s"}`;
    
    productContainer.innerHTML = wishlistedItems.map(product => {
      const totalMargin = product.retailPrice - product.dealerPrice;
      let priceHTML = state.isDealerLoggedIn ? `
        <div class="dealer-price-display">
          <div class="dealer-main-row">
            <span class="struck-retail-price">${formatINR(product.retailPrice)}</span>
            <span class="dealer-price-highlight">${formatINR(product.dealerPrice)}</span>
          </div>
          <div style="font-size: 0.75rem;">Reseller Quote: <strong>${formatINR(product.resellerQuotePrice)}</strong></div>
          <div class="dealer-margin-pill">✦ Margin: ${formatINR(totalMargin)}</div>
        </div>
      ` : `
        <div class="retail-price-display">
          <span class="current-price">${formatINR(product.retailPrice)}</span>
        </div>
      `;

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-image-wrap" onclick="window.appOpenQuickView('${product.id}')">
            <img class="product-img primary" src="${product.images.primary}" alt="${product.name}" loading="lazy" onerror="this.src='${product.images.secondary}'">
            <img class="product-img secondary" src="${product.images.secondary}" alt="${product.name}" loading="lazy" onerror="this.src='${product.images.primary}'">
            <div class="card-badges">
              <span class="badge-tag">Wishlisted</span>
            </div>
            <button class="card-wishlist-btn active" onclick="event.stopPropagation(); window.appToggleWishlist('${product.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div class="card-quick-overlay">
              <button class="btn-quick-view">Quick View Details</button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-weave-sub">${product.weave} • ${product.id}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-fabric-meta">${product.fabric}</div>
            <div class="product-price-box">${priceHTML}</div>
            <div class="product-card-actions">
              <button class="btn-add-cart" onclick="window.appAddToCart('${product.id}')">Add to Bag</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
  });

  // =========================================================================
  // QUICK VIEW MODAL ENGINE
  // =========================================================================
  function renderQuickViewPrice(product) {
    if (state.isDealerLoggedIn) {
      const margin = product.retailPrice - product.dealerPrice;
      qvPriceBox.innerHTML = `
        <div class="dealer-price-display">
          <div class="dealer-main-row">
            <span class="struck-retail-price" style="font-size: 1.15rem;">${formatINR(product.retailPrice)}</span>
            <span class="dealer-price-highlight" style="font-size: 1.85rem;">${formatINR(product.dealerPrice)}</span>
            <span class="tax-tag" style="color: var(--color-green); font-weight: 700;">Wholesale (Ur Rate)</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--color-wine); margin-top: 4px; font-weight: 600;">
            Suggested Reseller Listing Quote: <strong>${formatINR(product.resellerQuotePrice)}</strong>
          </div>
          <div class="dealer-margin-pill" style="font-size: 0.8rem; margin-top: 8px;">
            <span>✦</span> Direct Reseller Margin: ${formatINR(margin)} / Saree
          </div>
        </div>
      `;
    } else {
      qvPriceBox.innerHTML = `
        <div class="retail-price-display">
          <span class="current-price" style="font-size: 1.85rem;">${formatINR(product.retailPrice)}</span>
          <span class="tax-tag">Inclusive of all taxes & Loom Heritage Guarantee</span>
        </div>
      `;
    }
  }

  window.appOpenQuickView = function(productId) {
    const product = getProductById(productId);
    if (!product) return;

    state.activeQuickViewId = productId;
    qvMainImg.src = product.images.primary;
    qvMainImg.onerror = () => { qvMainImg.src = product.images.secondary; };
    qvWeaveTag.textContent = `${product.category.toUpperCase()} • ${product.weave}`;
    qvTitle.textContent = product.name;
    qvDesc.textContent = product.description;
    qvSpecWeave.textContent = product.weave;
    qvSpecFabric.textContent = product.fabric;
    qvSpecSilkMark.textContent = product.silkMark ? "Verified 100% Pure Natural Silk Mark" : "Authentic Handloom Monopoly Fabric";

    // Highlights list
    qvHighlightsList.innerHTML = product.highlights.map(h => `<li>${h}</li>`).join("");

    // Thumbnails
    qvThumbsRow.innerHTML = `
      <div class="qv-thumb active" onclick="document.getElementById('qvMainImg').src='${product.images.primary}'; document.querySelectorAll('.qv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
        <img src="${product.images.primary}" alt="Primary drape view" onerror="this.src='${product.images.secondary}'">
      </div>
      <div class="qv-thumb" onclick="document.getElementById('qvMainImg').src='${product.images.secondary}'; document.querySelectorAll('.qv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
        <img src="${product.images.secondary}" alt="Pallu and zari detail view" onerror="this.src='${product.images.primary}'">
      </div>
    `;

    renderQuickViewPrice(product);

    // Button actions
    qvAddToCartBtn.onclick = () => {
      window.appAddToCart(product.id);
      closeQuickView();
    };

    qvWhatsAppBtn.onclick = () => {
      window.appDirectWhatsAppProduct(product.id);
    };

    quickViewModal.classList.add("active");
    quickViewModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  function closeQuickView() {
    quickViewModal.classList.remove("active");
    quickViewModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    state.activeQuickViewId = null;
  }

  quickViewClose.addEventListener("click", closeQuickView);
  quickViewModal.addEventListener("click", (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });

  // =========================================================================
  // 1-CLICK DIRECT WHATSAPP CHECKOUT ENGINE
  // =========================================================================
  window.appDirectWhatsAppProduct = function(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const unitPrice = getEffectivePrice(product);
    const roleType = state.isDealerLoggedIn ? "Wholesale Partner (Ur Rate)" : "Retail Patron";

    const msgLines = [
      `👑 *Mayukha Silks & Couture - Saree Inquiry*`,
      `-------------------------------------------`,
      `*Account Type:* ${roleType}`,
      `*Product Code:* ${product.id}`,
      `*Heirloom:* ${product.name}`,
      `*Weave:* ${product.weave}`,
      `*Fabric:* ${product.fabric}`,
      `*Price:* ${formatINR(unitPrice)}`
    ];

    if (state.isDealerLoggedIn) {
      msgLines.push(`*Reseller Quote Rate:* ${formatINR(product.resellerQuotePrice)}`);
      msgLines.push(`*Your Margin:* ${formatINR(product.retailPrice - product.dealerPrice)}`);
    }

    msgLines.push(`*Silk Mark:* ${product.silkMark ? "Yes (Certified)" : "Handloom Special"}`);
    msgLines.push(`-------------------------------------------`);
    msgLines.push(`Hello Mayukha Concierge, please share real loom dispatch video and confirm availability.`);

    const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(msgLines.join("\n"))}`;
    window.open(url, "_blank");
  };

  btnWhatsAppCheckout.addEventListener("click", () => {
    if (state.cart.length === 0) return;

    const roleType = state.isDealerLoggedIn ? "Verified Wholesale Reseller Partner (Ur Rate)" : "Retail Customer";
    let subtotal = 0;

    const itemsSummary = state.cart.map((cartItem, idx) => {
      const product = getProductById(cartItem.id);
      if (!product) return "";
      const unitPrice = getEffectivePrice(product);
      const rowTotal = unitPrice * cartItem.qty;
      subtotal += rowTotal;

      let line = `${idx + 1}. *${product.name}*\n   • Code: ${product.id}\n   • Fabric: ${product.fabric}\n   • Qty: ${cartItem.qty}\n   • Rate: ${formatINR(unitPrice)} (Total: ${formatINR(rowTotal)})`;
      if (state.isDealerLoggedIn) {
        line += `\n   • Recommended Quote: ${formatINR(product.resellerQuotePrice)}`;
      }
      return line;
    }).filter(Boolean).join("\n\n");

    const shippingStatus = subtotal >= BRAND_CONFIG.freeShippingThreshold ? "Complimentary Heritage Dispatch (FREE)" : "Standard Insured Courier (₹250)";
    const totalAmount = subtotal >= BRAND_CONFIG.freeShippingThreshold ? subtotal : subtotal + 250;

    const fullMessage = [
      `👑 *MAYUKHA SILKS & COUTURE - DISPATCH ORDER*`,
      `===========================================`,
      `*Client Status:* ${roleType}`,
      `*Date:* ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`,
      `===========================================`,
      `*SELECTED REAL CATALOG ITEMS:*`,
      itemsSummary,
      `===========================================`,
      `*Subtotal:* ${formatINR(subtotal)}`,
      `*Heritage Shipping:* ${shippingStatus}`,
      `*Total Payable:* ${formatINR(totalAmount)}`,
      `===========================================`,
      `Kindly verify pit-loom stock, share the UPI payment details, and confirm tracking courier.`,
      `Thank you!`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, "_blank");
    showToast("Opening WhatsApp Concierge with your finalized order summary...", "success");
  });

  // =========================================================================
  // KEYBOARD ACCESSIBILITY (ESC TO CLOSE MODALS)
  // =========================================================================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDealerModal();
      closeQuickView();
      closeCartDrawer();
    }
  });

  // =========================================================================
  // INITIALIZE ENGINE
  // =========================================================================
  updateDealerUI();
  updateCounters();
  renderCatalog();
  renderCart();
});
