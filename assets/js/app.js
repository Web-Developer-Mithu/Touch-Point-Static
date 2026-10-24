/**
 * TOUCH POINT - STANDALONE FRONTEND SCRIPT (SERVERLESS / OFFLINE READY)
 * Contains all client-side interactions: Slider, Cart, Quick View, Search, Visualizer, Modals & Animations.
 */

// Embedded Product Catalog for Serverless Preview
const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "Royal Chesterfield L-Shape Velvet Sofa",
    slug: "royal-chesterfield-l-shape-velvet-sofa",
    category: "Living Room",
    price: 125000,
    formatted_price: "৳125,000",
    original_price: 145000,
    formatted_original_price: "৳145,000",
    discount: "14% OFF",
    wood_type: "Kiln-Seasoned Teak Frame",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 38,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Heritage 8-Seater Royal Dining Suite",
    slug: "heritage-8-seater-royal-dining-suite",
    category: "Dining Room",
    price: 185000,
    formatted_price: "৳185,000",
    original_price: 210000,
    formatted_original_price: "৳210,000",
    discount: "12% OFF",
    wood_type: "100% Solid Chittagong Teak",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 42,
    badge: "Masterpiece"
  },
  {
    id: 3,
    name: "Nordic Minimalist King Bed",
    slug: "nordic-minimalist-king-bed",
    category: "Bedroom",
    price: 95000,
    formatted_price: "৳95,000",
    original_price: 110000,
    formatted_original_price: "৳110,000",
    discount: "14% OFF",
    wood_type: "Seasoned Mahogany & High-Resilience Foam",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 29,
    badge: "Trending"
  },
  {
    id: 4,
    name: "Director's Executive Desk & Credenza",
    slug: "directors-executive-desk-credenza",
    category: "Office Furniture",
    price: 145000,
    formatted_price: "৳145,000",
    original_price: 165000,
    formatted_original_price: "৳165,000",
    discount: "12% OFF",
    wood_type: "Burmese Teak & Leather Inlay",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 51,
    badge: "Corporate Choice"
  },
  {
    id: 5,
    name: "Aura Floating Solid Teak Center Table",
    slug: "aura-floating-solid-teak-center-table",
    category: "Living Room",
    price: 38000,
    formatted_price: "৳38,000",
    original_price: 45000,
    formatted_original_price: "৳45,000",
    discount: "15% OFF",
    wood_type: "Seasoned Teak with Tempered Glass",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 24,
    badge: "New Arrival"
  },
  {
    id: 6,
    name: "Palazzo Italian Marble Dining Suite",
    slug: "palazzo-italian-marble-dining-suite",
    category: "Dining Room",
    price: 240000,
    formatted_price: "৳240,000",
    original_price: 275000,
    formatted_original_price: "৳275,000",
    discount: "13% OFF",
    wood_type: "Statuary White Marble & Walnut Base",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 19,
    badge: "Luxury Edition"
  },
  {
    id: 7,
    name: "Grandeur Acoustic Wood Slat TV Unit",
    slug: "grandeur-acoustic-wood-slat-tv-unit",
    category: "Living Room",
    price: 68000,
    formatted_price: "৳68,000",
    original_price: 78000,
    formatted_original_price: "৳78,000",
    discount: "13% OFF",
    wood_type: "Acoustic Fluted Panels & Teak Veneer",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 33,
    badge: "Architect's Pick"
  },
  {
    id: 8,
    name: "Milano Fluted Glass 4-Door Wardrobe",
    slug: "milano-fluted-glass-4-door-wardrobe",
    category: "Bedroom",
    price: 165000,
    formatted_price: "৳165,000",
    original_price: 190000,
    formatted_original_price: "৳190,000",
    discount: "13% OFF",
    wood_type: "Anodized Black Aluminum & Fluted Glass",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 21,
    badge: "Smart Lighting"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initSearchAutocomplete();
  initCartDrawer();
  initQuickViewModal();
  initWishlistAndCompare();
  initVisualizer();
  initBackToTop();
  initConsultationModal();
  initScrollReveal();
  initStatCounters();
  initMobileNav();
});

/* ========================================================
   1. HERO SLIDER
   ======================================================== */
function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval = null;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot-btn ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot-btn') : [];
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5500);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  track.addEventListener('mouseleave', () => startAutoplay());

  startAutoplay();
}

/* ========================================================
   2. CLIENT-SIDE SEARCH AUTOCOMPLETE (OFFLINE)
   ======================================================== */
function initSearchAutocomplete() {
  const input = document.getElementById('globalSearchInput');
  const dropdown = document.getElementById('searchDropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query.length < 2) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }

    const matches = STATIC_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.wood_type.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding: 1rem; text-align: center; color: #64748b; font-size: 0.875rem;">No furniture found for "${query}"</div>`;
      dropdown.classList.add('active');
      return;
    }

    let html = `<div style="padding: 0.35rem 0.6rem 0.6rem; font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Top Matching Designs</div>`;
    matches.forEach(item => {
      html += `
        <a href="product-detail.html" class="search-result-item" style="display: flex; align-items: center; gap: 12px; padding: 0.6rem; text-decoration: none; border-bottom: 1px solid #f1f5f9;">
          <img src="${item.image}" alt="${item.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;" />
          <div>
            <div style="font-weight: 700; font-size: 0.875rem; color: #0f172a;">${item.name}</div>
            <div style="display: flex; gap: 8px; align-items: center; margin-top: 2px;">
              <span style="font-weight: 800; color: #7A1315; font-size: 0.8125rem;">${item.formatted_price}</span>
              <span style="font-size: 0.72rem; color: #64748b;">${item.category}</span>
            </div>
          </div>
        </a>
      `;
    });
    dropdown.innerHTML = html;
    dropdown.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

/* ========================================================
   3. CLIENT-SIDE SHOPPING CART (LOCALSTORAGE)
   ======================================================== */
let cartItems = JSON.parse(localStorage.getItem('touchpoint_cart') || '[]');

function saveCart() {
  localStorage.setItem('touchpoint_cart', JSON.stringify(cartItems));
  renderCart();
}

function initCartDrawer() {
  const openButtons = document.querySelectorAll('[data-cart-open]');
  const closeButtons = document.querySelectorAll('[data-cart-close]');
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');

  function openCart() {
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openCart));
  closeButtons.forEach(btn => btn.addEventListener('click', closeCart));
  if (backdrop) backdrop.addEventListener('click', closeCart);

  // Add to cart event listeners
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-to-cart]');
    if (!btn) return;

    const productId = parseInt(btn.getAttribute('data-product-id') || '1', 10);
    const product = STATIC_PRODUCTS.find(p => p.id === productId) || STATIC_PRODUCTS[0];

    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        formatted_price: product.formatted_price,
        image: product.image,
        wood_type: product.wood_type,
        quantity: 1
      });
    }

    saveCart();
    openCart();
  });

  renderCart();
}

function renderCart() {
  const listEl = document.getElementById('cartItemsList');
  const countEls = document.querySelectorAll('[data-cart-count]');
  const totalEls = document.querySelectorAll('[data-cart-total]');

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  countEls.forEach(el => el.textContent = totalCount);
  totalEls.forEach(el => el.textContent = '৳' + totalPrice.toLocaleString());

  if (!listEl) return;

  if (cartItems.length === 0) {
    listEl.innerHTML = `
      <div style="padding: 3rem 1rem; text-align: center; color: #64748b;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛋️</div>
        <p style="font-weight: 700;">Your Cart is Empty</p>
        <p style="font-size: 0.8125rem; margin-top: 4px;">Explore our handcrafted teakwood collections.</p>
      </div>
    `;
    return;
  }

  let html = '';
  cartItems.forEach(item => {
    html += `
      <div style="display: flex; gap: 12px; padding: 1rem 0; border-bottom: 1px solid #e2e8f0; align-items: center;">
        <img src="${item.image}" alt="${item.name}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
        <div style="flex: 1;">
          <h4 style="font-size: 0.875rem; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${item.name}</h4>
          <div style="font-size: 0.8125rem; font-weight: 800; color: #7A1315;">${item.formatted_price}</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
            <button onclick="updateCartQty(${item.id}, -1)" style="width: 24px; height: 24px; border: 1px solid #cbd5e1; border-radius: 4px; background: #fff; cursor: pointer; font-weight: 800;">-</button>
            <span style="font-size: 0.875rem; font-weight: 700;">${item.quantity}</span>
            <button onclick="updateCartQty(${item.id}, 1)" style="width: 24px; height: 24px; border: 1px solid #cbd5e1; border-radius: 4px; background: #fff; cursor: pointer; font-weight: 800;">+</button>
            <button onclick="removeCartItem(${item.id})" style="margin-left: auto; background: none; border: none; color: #ef4444; font-size: 0.75rem; font-weight: 700; cursor: pointer;">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;
}

window.updateCartQty = function(id, delta) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cartItems = cartItems.filter(i => i.id !== id);
  }
  saveCart();
};

window.removeCartItem = function(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  saveCart();
};

/* ========================================================
   4. QUICK VIEW MODAL
   ======================================================== */
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('quickViewBackdrop');
  const closeBtn = document.getElementById('quickViewClose');
  if (!modal) return;

  function closeModal() {
    modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-quick-view]');
    if (!trigger) return;

    const id = parseInt(trigger.getAttribute('data-quick-view') || '1', 10);
    const product = STATIC_PRODUCTS.find(p => p.id === id) || STATIC_PRODUCTS[0];

    const titleEl = document.getElementById('quickViewTitle');
    const priceEl = document.getElementById('quickViewPrice');
    const imgEl = document.getElementById('quickViewImg');
    const woodEl = document.getElementById('quickViewWood');
    const addBtn = document.getElementById('quickViewAddCart');

    if (titleEl) titleEl.textContent = product.name;
    if (priceEl) priceEl.textContent = product.formatted_price;
    if (imgEl) imgEl.src = product.image;
    if (woodEl) woodEl.textContent = product.wood_type;
    if (addBtn) addBtn.setAttribute('data-product-id', product.id);

    modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

/* ========================================================
   5. WISHLIST & COMPARE COUNTERS
   ======================================================== */
function initWishlistAndCompare() {
  let wishlist = JSON.parse(localStorage.getItem('touchpoint_wishlist') || '[]');
  const countEls = document.querySelectorAll('[data-wishlist-count]');

  function updateWishlistBadge() {
    countEls.forEach(el => el.textContent = wishlist.length);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-wishlist-toggle]');
    if (!btn) return;

    const id = btn.getAttribute('data-wishlist-toggle');
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(x => x !== id);
      btn.classList.remove('active');
    } else {
      wishlist.push(id);
      btn.classList.add('active');
    }

    localStorage.setItem('touchpoint_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
  });

  updateWishlistBadge();
}

/* ========================================================
   6. 3D WOOD FINISH VISUALIZER (INTERACTIVE SIMULATOR)
   ======================================================== */
function initVisualizer() {
  const buttons = document.querySelectorAll('[data-finish-option]');
  const nameEl = document.getElementById('visualizerFinishName');
  const descEl = document.getElementById('visualizerFinishDesc');
  const imgEl = document.getElementById('visualizerPreviewImg');

  const finishes = {
    teak: {
      name: "Chittagong Seasoned Honey Teak",
      desc: "Warm golden hues with interlocking organic grain lines. Ideal for warm living spaces.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    },
    walnut: {
      name: "Dark American Walnut Satin",
      desc: "Rich espresso tones with subtle chocolate luster. Perfect for stately corporate & duplex interiors.",
      img: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80"
    },
    mahogany: {
      name: "Royal Kiln-Dried Mahogany Luster",
      desc: "Deep crimson burgundy warmth cured with German multi-stage polyurethane satin lacquer.",
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
    },
    scandi: {
      name: "Scandinavian Minimalist White Oak",
      desc: "Contemporary muted beige texture that emphasizes airy daylight in modern Dhaka apartments.",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const finishKey = btn.getAttribute('data-finish-option');
      const data = finishes[finishKey];
      if (data) {
        if (nameEl) nameEl.textContent = data.name;
        if (descEl) descEl.textContent = data.desc;
        if (imgEl) {
          imgEl.style.opacity = '0.4';
          setTimeout(() => {
            imgEl.src = data.img;
            imgEl.style.opacity = '1';
          }, 180);
        }
      }
    });
  });
}

/* ========================================================
   7. CONSULTATION MODAL & CLIENT FEEDBACK
   ======================================================== */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const backdrop = document.getElementById('consultationBackdrop');
  const closeBtn = document.getElementById('consultationClose');
  const form = document.getElementById('consultationForm');
  const openButtons = document.querySelectorAll('[data-open-consultation]');

  function openModal() {
    if (modal) modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("ধন্যবাদ! আপনার ইন্টেরিয়র কনসাল্টেশন রিকোয়েস্ট সফলভাবে গ্রহণ করা হয়েছে। টাচ পয়েন্টের প্রধান স্থপতি Meer Mamun শীঘ্রই আপনার সাথে যোগাযোগ করবেন।");
      closeModal();
      form.reset();
    });
  }
}

/* ========================================================
   8. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
   ======================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ========================================================
   9. NUMERIC STAT COUNTER ANIMATION
   ======================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNum = parseInt(target.getAttribute('data-counter'), 10);
        const suffix = target.getAttribute('data-suffix') || '';
        const prefix = target.getAttribute('data-prefix') || '';
        const duration = 1600;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(start + (targetNum - start) * easeProgress);

          target.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = `${prefix}${targetNum.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* ========================================================
   10. MOBILE NAVIGATION & BACK TO TOP
   ======================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  }
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
