/* ============================================================
   KICK VIBES — script.js
   Product data, cart (localStorage), filters/sort/search,
   product detail rendering, FAQ, mobile nav, WhatsApp checkout.

   >>> REPLACE_ME markers show exactly what to swap with your
       real data before going live. <<<
   ============================================================ */

/* ----------------------------------------------------------
   1. WHATSAPP NUMBER — REPLACE_ME
   Format: country code + number, no spaces, no plus sign.
   Example real value: "923001234567"
---------------------------------------------------------- */
const WHATSAPP_NUMBER = "923342667723";

/* ----------------------------------------------------------
   2. PRODUCT DATA — REPLACE_ME
   Swap "image" values with your real product photo URLs/paths.
   Prices are in PKR (Rs.) — edit as needed.
---------------------------------------------------------- */
const PRODUCTS = [
  { id:"kv-001", name:"Nova Runner Sneakers", category:"Sneakers", gender:"Men", sizes:[7,8,9,10,11], price:6500, oldPrice:8500, badge:"Sale", images:["kv-001.jpg","kv-001.jpg","kv-001.jpg"], desc:"A clean low-top runner built for daily wear — breathable mesh upper, cushioned sole, and a neutral colourway that pairs with everything." },
  { id:"kv-002", name:"Urban Street Hi-Tops", category:"Sneakers", gender:"Men", sizes:[8,9,10,11,12], price:7200, badge:"New", images:["kv-002.jpg","kv-002.jpg","kv-002.jpg"], desc:"High-top silhouette with reinforced ankle support and a chunky outsole for extra street presence." },
  { id:"kv-003", name:"Classic Canvas Slip-Ons", category:"Casual Shoes", gender:"Unisex", sizes:[6,7,8,9,10], price:3200, badge:"", images:["kv-003.jpg","kv-003.jpg","kv-003.jpg"], desc:"Lightweight canvas slip-ons for effortless everyday wear. Easy on, easy off, endlessly comfortable." },
  { id:"kv-004", name:"Aria Platform Sneakers", category:"Women's Shoes", gender:"Women", sizes:[5,6,7,8], price:5800, oldPrice:7000, badge:"Sale", images:["kv-004.jpg","kv-004.jpg","kv-004.jpg"], desc:"A platform sole gives everyday height without sacrificing comfort. Soft leather-look upper." },
  { id:"kv-005", name:"Thrift Find — Retro Runner", category:"Thrift Shoes", gender:"Men", sizes:[9,10], price:2800, badge:"Thrift · 1 left", images:["kv-005.jpg","kv-005.jpg","kv-005.jpg"], desc:"Pre-loved, carefully inspected retro runner in great condition. One-of-one — once it's gone, it's gone." },
  { id:"kv-006", name:"Everyday Loafers", category:"Casual Shoes", gender:"Men", sizes:[7,8,9,10,11], price:4500, badge:"", images:["kv-006.jpg","kv-006.jpg","kv-006.jpg"], desc:"Smart-casual loafers that move easily from desk to weekend. Cushioned footbed for all-day comfort." },
  { id:"kv-007", name:"Motion Knit Trainers", category:"Sneakers", gender:"Women", sizes:[5,6,7,8,9], price:6900, badge:"New", images:["kv-007.jpg","kv-007.jpg","kv-007.jpg"], desc:"Sock-fit knit upper that moves with your foot, paired with a responsive foam midsole." },
  { id:"kv-008", name:"Heritage Court Sneakers", category:"Sneakers", gender:"Men", sizes:[8,9,10,11], price:5400, badge:"", images:["kv-008.jpg","kv-008.jpg","kv-008.jpg"], desc:"A timeless court silhouette in crisp leather panels — a wardrobe staple that never goes out of style." },
  { id:"kv-009", name:"Thrift Find — Suede Boot", category:"Thrift Shoes", gender:"Women", sizes:[6,7], price:3400, badge:"Thrift · 1 left", images:["kv-009.jpg","kv-009.jpg","kv-009.jpg"], desc:"A gently worn suede ankle boot, hand-picked and cleaned. Limited to a single pair." },
  { id:"kv-010", name:"Blush Canvas Sneaker", category:"Women's Shoes", gender:"Women", sizes:[5,6,7,8], price:3600, badge:"", images:["kv-010.jpg","kv-010.jpg","kv-010.jpg"], desc:"A soft blush-pink canvas sneaker with a chunky white sole — light, breathable and easy to style." },
  { id:"kv-011", name:"Trailblazer Hiking Sneakers", category:"Men's Shoes", gender:"Men", sizes:[8,9,10,11,12], price:8200, oldPrice:9800, badge:"Sale", images:["kv-011.jpg","kv-011.jpg","kv-011.jpg"], desc:"Rugged outsole with extra grip, built for city trails and weekend adventures alike." },
  { id:"kv-012", name:"Pastel Low-Top Sneakers", category:"Women's Shoes", gender:"Women", sizes:[5,6,7,8,9], price:5200, badge:"New", images:["kv-012.jpg","kv-012.jpg","kv-012.jpg"], desc:"A soft pastel colourway on a classic low-top shape — light, comfortable, easy to style." },
  { id:"kv-013", name:"Classic Chelsea Boot", category:"Men's Shoes", gender:"Men", sizes:[8,9,10,11], price:6800, badge:"New", images:["kv-013.jpg","kv-013.jpg","kv-013.jpg"], desc:"A sleek black leather Chelsea boot with elastic side panels — smart enough for the office, tough enough for the street." },
  { id:"kv-014", name:"Mint Court Sneaker", category:"Sneakers", gender:"Unisex", sizes:[7,8,9,10,11], price:5600, badge:"New", images:["kv-014.jpg","kv-014.jpg","kv-014.jpg"], desc:"A clean court-style sneaker in white leather with a fresh mint green trim — minimal, versatile, everyday-ready." },
  { id:"kv-015", name:"Coastal Low-Top Sneaker", category:"Men's Shoes", gender:"Men", sizes:[7,8,9,10,11], price:6000, badge:"", images:["kv-015.jpg","kv-015.jpg","kv-015.jpg"], desc:"A crisp white leather low-top with a bold navy stripe — a clean everyday staple with a sharp finish." }
];

/* ----------------------------------------------------------
   CART — persisted in localStorage
---------------------------------------------------------- */
const Cart = {
  key: "kickvibes_cart",
  get(){ try{ return JSON.parse(localStorage.getItem(this.key)) || []; }catch(e){ return []; } },
  save(items){ localStorage.setItem(this.key, JSON.stringify(items)); renderCart(); },
  add(product, size, qty){
    const items = this.get();
    const existing = items.find(i => i.id === product.id && i.size === size);
    if(existing){ existing.qty += qty; }
    else{
      items.push({ id:product.id, name:product.name, price:product.price, image:product.images[0], size, qty });
    }
    this.save(items);
    showToast(`${product.name} added to cart`);
    openCart();
  },
  updateQty(id, size, delta){
    const items = this.get();
    const item = items.find(i => i.id === id && i.size === size);
    if(!item) return;
    item.qty += delta;
    const filtered = item.qty <= 0 ? items.filter(i => !(i.id===id && i.size===size)) : items;
    this.save(filtered);
  },
  remove(id, size){
    this.save(this.get().filter(i => !(i.id===id && i.size===size)));
  },
  count(){ return this.get().reduce((n,i)=>n+i.qty,0); },
  subtotal(){ return this.get().reduce((n,i)=>n+i.qty*i.price,0); }
};

const Wishlist = {
  key:"kickvibes_wishlist",
  get(){ try{ return JSON.parse(localStorage.getItem(this.key)) || []; }catch(e){ return []; } },
  toggle(id){
    let items = this.get();
    if(items.includes(id)) items = items.filter(i=>i!==id);
    else items.push(id);
    localStorage.setItem(this.key, JSON.stringify(items));
    return items.includes(id);
  },
  has(id){ return this.get().includes(id); }
};

function formatPrice(n){ return "Rs. " + n.toLocaleString("en-PK"); }

function showToast(msg){
  const t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove("show"), 2200);
}

/* ----------------------------------------------------------
   CART DRAWER RENDER
---------------------------------------------------------- */
function renderCart(){
  const countEls = document.querySelectorAll(".cart-count");
  countEls.forEach(el => el.textContent = Cart.count());

  const wrap = document.getElementById("cartItems");
  if(!wrap) return;
  const items = Cart.get();

  if(items.length === 0){
    wrap.innerHTML = `<div class="cart-empty">Your cart is empty.<br><br><a href="shop.html" class="btn btn-outline">Start Shopping</a></div>`;
  } else {
    wrap.innerHTML = items.map(i => `
      <div class="cart-item">
        <img src="${i.image}" alt="${i.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-meta">Size: ${i.size}</div>
          <div class="qty-control">
            <button onclick="Cart.updateQty('${i.id}',${i.size},-1)">−</button>
            <span>${i.qty}</span>
            <button onclick="Cart.updateQty('${i.id}',${i.size},1)">+</button>
          </div>
          <div class="cart-item-remove" onclick="Cart.remove('${i.id}',${i.size})">Remove</div>
        </div>
        <div class="cart-item-price">${formatPrice(i.price*i.qty)}</div>
      </div>
    `).join("");
  }

  const subtotalEl = document.getElementById("cartSubtotal");
  if(subtotalEl) subtotalEl.textContent = formatPrice(Cart.subtotal());

  const itemCountEl = document.getElementById("cartItemCount");
  if(itemCountEl) itemCountEl.textContent = Cart.count();

  const waBtn = document.getElementById("cartWhatsappBtn");
  if(waBtn) waBtn.href = buildWhatsappLink(items);
}

function buildWhatsappLink(items){
  if(!items || items.length===0) items = Cart.get();
  let msg = "Assalam-o-Alaikum! I'd like to order the following from Kick Vibes:%0A%0A";
  items.forEach(i=>{
    msg += `• ${i.name} (Size ${i.size}) x${i.qty} — ${formatPrice(i.price*i.qty)}%0A`;
  });
  msg += `%0ATotal: ${formatPrice(Cart.subtotal())}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function openCart(){
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
}
function closeCart(){
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

/* ----------------------------------------------------------
   PRODUCT CARD HTML
---------------------------------------------------------- */
function productCardHTML(p){
  const wished = Wishlist.has(p.id);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="pc-media">
      <a href="product.html?id=${p.id}">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
      </a>
      ${p.badge ? `<span class="pc-badge">${p.badge}</span>` : ""}
      <button class="pc-wishlist ${wished?'active':''}" onclick="handleWishlist(event,'${p.id}')" aria-label="Wishlist">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.1C.5 8.3 2.2 4.5 6 4.5c2 0 3.5 1.1 4.5 2.7C11.5 5.6 13 4.5 15 4.5c3.8 0 5.5 3.8 4 7.4C19.5 16.4 12 21 12 21z"/></svg>
      </button>
    </div>
    <div class="pc-body">
      <div class="pc-cat">${p.category}</div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-sizes">Sizes: ${p.sizes.join(", ")}</div>
      <div class="pc-price-row">
        <span class="pc-price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="pc-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <div class="pc-actions">
        <a href="product.html?id=${p.id}" class="btn btn-outline">View</a>
        <button class="btn btn-primary" onclick="quickAdd('${p.id}')">Add to Cart</button>
      </div>
    </div>
  </div>`;
}

function handleWishlist(e, id){
  e.preventDefault();
  const active = Wishlist.toggle(id);
  e.currentTarget.classList.toggle("active", active);
  showToast(active ? "Added to wishlist" : "Removed from wishlist");
}

function quickAdd(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  Cart.add(p, p.sizes[0], 1);
}

/* ----------------------------------------------------------
   HOME PAGE RENDER
---------------------------------------------------------- */
function renderHomeSections(){
  const newArrivalsEl = document.getElementById("newArrivalsGrid");
  if(newArrivalsEl){
    const items = PRODUCTS.filter(p=>p.badge==="New").slice(0,4);
    newArrivalsEl.innerHTML = items.map(productCardHTML).join("");
  }
  const featuredEl = document.getElementById("featuredGrid");
  if(featuredEl){
    featuredEl.innerHTML = PRODUCTS.slice(0,8).map(productCardHTML).join("");
  }
  const thriftEl = document.getElementById("thriftGrid");
  if(thriftEl){
    const items = PRODUCTS.filter(p=>p.category==="Thrift Shoes");
    thriftEl.innerHTML = items.map(productCardHTML).join("");
  }
}

/* ----------------------------------------------------------
   SHOP PAGE — filters, sort, search
---------------------------------------------------------- */
function initShopPage(){
  const grid = document.getElementById("shopGrid");
  if(!grid) return;

  const state = { category:"all", gender:"all", size:"all", maxPrice:15000, sort:"featured", search:"" };

  function apply(){
    let items = PRODUCTS.filter(p=>{
      if(state.category!=="all" && p.category!==state.category) return false;
      if(state.gender!=="all" && p.gender!==state.gender && p.gender!=="Unisex") return false;
      if(state.size!=="all" && !p.sizes.includes(Number(state.size))) return false;
      if(p.price > state.maxPrice) return false;
      if(state.search && !p.name.toLowerCase().includes(state.search.toLowerCase())) return false;
      return true;
    });

    if(state.sort==="newest") items = items.filter(p=>p.badge==="New").concat(items.filter(p=>p.badge!=="New"));
    if(state.sort==="price-low") items.sort((a,b)=>a.price-b.price);
    if(state.sort==="price-high") items.sort((a,b)=>b.price-a.price);

    grid.innerHTML = items.length ? items.map(productCardHTML).join("")
      : `<div class="empty-state">No products match these filters. Try adjusting them.</div>`;

    const countEl = document.getElementById("resultCount");
    if(countEl) countEl.textContent = `${items.length} products`;
  }

  document.querySelectorAll("[data-filter-category]").forEach(el=>{
    el.addEventListener("change", ()=>{
      const checked = document.querySelector("[data-filter-category]:checked");
      state.category = checked ? checked.value : "all";
      apply();
    });
  });
  document.querySelectorAll("[data-filter-gender]").forEach(el=>{
    el.addEventListener("change", ()=>{
      const checked = document.querySelector("[data-filter-gender]:checked");
      state.gender = checked ? checked.value : "all";
      apply();
    });
  });
  document.querySelectorAll("[data-filter-size]").forEach(el=>{
    el.addEventListener("change", ()=>{
      const checked = document.querySelector("[data-filter-size]:checked");
      state.size = checked ? checked.value : "all";
      apply();
    });
  });
  const priceEl = document.getElementById("priceRange");
  if(priceEl){
    priceEl.addEventListener("input", ()=>{
      state.maxPrice = Number(priceEl.value);
      document.getElementById("priceRangeVal").textContent = formatPrice(state.maxPrice);
      apply();
    });
  }
  const sortEl = document.getElementById("sortSelect");
  if(sortEl) sortEl.addEventListener("change", ()=>{ state.sort = sortEl.value; apply(); });

  const searchEl = document.getElementById("shopSearch");
  if(searchEl) searchEl.addEventListener("input", ()=>{ state.search = searchEl.value; apply(); });

  // read ?category= from URL (from homepage category cards)
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("category");
  if(catParam === "New Arrivals"){
    state.sort = "newest";
    const sortSelect = document.getElementById("sortSelect");
    if(sortSelect) sortSelect.value = "newest";
  } else if(catParam){
    const radio = document.querySelector(`[data-filter-category][value="${catParam}"]`);
    if(radio){ radio.checked = true; state.category = catParam; }
  }

  apply();
}

/* ----------------------------------------------------------
   PRODUCT DETAIL PAGE
---------------------------------------------------------- */
function initProductPage(){
  const container = document.getElementById("productDetail");
  if(!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || PRODUCTS[0].id;
  const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];

  document.title = `${p.name} — Kick Vibes`;

  let selectedSize = p.sizes[0];
  let qty = 1;

  container.innerHTML = `
    <div>
      <div class="pd-main-img"><img id="pdMainImg" src="${p.images[0]}" alt="${p.name}"></div>
      <div class="pd-thumbs">
        ${p.images.map((img,idx)=>`<img src="${img}" class="${idx===0?'active':''}" onclick="document.getElementById('pdMainImg').src=this.src; document.querySelectorAll('.pd-thumbs img').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join("")}
      </div>
    </div>
    <div>
      <div class="pd-cat">${p.category} · ${p.gender}</div>
      <h1 class="pd-name">${p.name}</h1>
      <div class="pd-price-row">
        <span class="pd-price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="pc-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <p class="pd-desc">${p.desc}</p>
      <div class="pd-size-label">Select a Size</div>
      <div class="size-options" id="sizeOptions">
        ${p.sizes.map((s,idx)=>`<div class="size-opt ${idx===0?'selected':''}" data-size="${s}" onclick="selectSize(this,${s})">${s}</div>`).join("")}
      </div>
      <div class="pd-qty-row">
        <span class="pd-size-label" style="margin-bottom:0">Quantity</span>
        <div class="qty-control">
          <button onclick="changeQty(-1)">−</button>
          <span id="qtyVal">1</span>
          <button onclick="changeQty(1)">+</button>
        </div>
      </div>
      <div class="pd-actions">
        <button class="btn btn-primary" onclick="addDetailToCart('${p.id}')">Add to Cart</button>
        <button class="btn btn-outline" onclick="handleWishlist(event,'${p.id}')">♥ Wishlist</button>
        <a id="pdWaBtn" href="#" target="_blank" class="btn pd-wa-btn">Order on WhatsApp</a>
      </div>
      <div class="pd-meta-list">
        <div>Category: ${p.category}</div>
        <div>Gender: ${p.gender}</div>
        <div>Available sizes: ${p.sizes.join(", ")}</div>
      </div>
    </div>
  `;

  window.selectSize = function(el, size){
    selectedSize = size;
    document.querySelectorAll(".size-opt").forEach(o=>o.classList.remove("selected"));
    el.classList.add("selected");
    updatePdWaLink();
  };
  window.changeQty = function(delta){
    qty = Math.max(1, qty+delta);
    document.getElementById("qtyVal").textContent = qty;
    updatePdWaLink();
  };
  window.addDetailToCart = function(id){
    Cart.add(p, selectedSize, qty);
  };

  function updatePdWaLink(){
    const msg = `Assalam-o-Alaikum! I'd like to order:%0A%0A• ${p.name} (Size ${selectedSize}) x${qty} — ${formatPrice(p.price*qty)}`;
    document.getElementById("pdWaBtn").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }
  updatePdWaLink();

  // related products
  const relatedEl = document.getElementById("relatedGrid");
  if(relatedEl){
    const related = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
    relatedEl.innerHTML = related.map(productCardHTML).join("");
  }
}

/* ----------------------------------------------------------
   FAQ ACCORDION
---------------------------------------------------------- */
function initFAQ(){
  document.querySelectorAll(".faq-item").forEach(item=>{
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", ()=>{
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i=>{ i.classList.remove("open"); i.querySelector(".faq-a").style.maxHeight = null; });
      if(!isOpen){ item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });
}

/* ----------------------------------------------------------
   HERO 3D TILT — mouse-move interactive shoe animation
---------------------------------------------------------- */
function initHero3D(){
  const stageWrap = document.getElementById("heroVisual");
  const stage = document.getElementById("hero3dStage");
  if(!stageWrap || !stage) return;

  const maxTilt = 16; // degrees

  stageWrap.addEventListener("mousemove", (e)=>{
    const rect = stageWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 to 1
    const y = (e.clientY - rect.top) / rect.height;   // 0 to 1
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;
    stage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    stageWrap.classList.add("tilting");
  });

  stageWrap.addEventListener("mouseleave", ()=>{
    stage.style.transform = "";
    stageWrap.classList.remove("tilting");
  });

  // touch devices: gentle tilt based on touch position
  stageWrap.addEventListener("touchmove", (e)=>{
    if(!e.touches[0]) return;
    const rect = stageWrap.getBoundingClientRect();
    const x = (e.touches[0].clientX - rect.left) / rect.width;
    const rotateY = (x - 0.5) * maxTilt;
    stage.style.transform = `rotateY(${rotateY}deg)`;
    stageWrap.classList.add("tilting");
  }, { passive:true });

  stageWrap.addEventListener("touchend", ()=>{
    stage.style.transform = "";
    stageWrap.classList.remove("tilting");
  });
}

/* ----------------------------------------------------------
   HEADER: mobile nav, search panel, cart drawer bindings
---------------------------------------------------------- */
function initHeader(){
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  hamburger?.addEventListener("click", ()=>{
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  const searchIcon = document.getElementById("searchIcon");
  const searchPanel = document.getElementById("searchPanel");
  searchIcon?.addEventListener("click", ()=>{
    searchPanel.classList.toggle("open");
    if(searchPanel.classList.contains("open")) searchPanel.querySelector("input").focus();
  });
  const headerSearchInput = document.getElementById("headerSearchInput");
  headerSearchInput?.addEventListener("keydown", (e)=>{
    if(e.key==="Enter" && headerSearchInput.value.trim()){
      window.location.href = `shop.html?search=${encodeURIComponent(headerSearchInput.value.trim())}`;
    }
  });

  document.getElementById("cartIcon")?.addEventListener("click", openCart);
  document.getElementById("cartCloseBtn")?.addEventListener("click", closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCart);
}

/* ----------------------------------------------------------
   NEWSLETTER + CONTACT FORM (front-end only, no backend)
---------------------------------------------------------- */
function initForms(){
  const nlForm = document.getElementById("newsletterForm");
  nlForm?.addEventListener("submit", (e)=>{
    e.preventDefault();
    showToast("Thanks! You're subscribed.");
    nlForm.reset();
  });

  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (e)=>{
    e.preventDefault();
    showToast("Message sent. We'll get back to you soon!");
    contactForm.reset();
  });
}

/* ----------------------------------------------------------
   SCROLL REVEAL — lightweight IntersectionObserver, no library
---------------------------------------------------------- */
function initScrollReveal(){
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".section-head, .cat-card, .product-card, .feature, .review-card, .faq-item, .stat, .about-hero, .contact-layout, .newsletter-inner"
  );
  if(prefersReduced || !("IntersectionObserver" in window)){
    targets.forEach(el => el.classList.add("reveal-visible"));
    return;
  }
  targets.forEach(el => el.classList.add("reveal"));
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.12, rootMargin:"0px 0px -40px 0px" });
  targets.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------
   CARD 3D TILT — subtle mouse-follow perspective on hover
   (event delegation so it works on dynamically-rendered cards)
---------------------------------------------------------- */
function initCardTilt(){
  const canHover = window.matchMedia("(pointer: fine)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!canHover || prefersReduced) return;

  const maxTiltCard = 4; // degrees, kept small and premium per spec

  document.addEventListener("mousemove", (e)=>{
    const card = e.target.closest(".product-card, .cat-card");
    if(!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTiltCard * 2;
    const rotateX = (0.5 - y) * maxTiltCard * 2;
    const lift = card.classList.contains("product-card") ? -4 : 0;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${lift}px)`;
  });

  document.addEventListener("mouseout", (e)=>{
    const card = e.target.closest(".product-card, .cat-card");
    if(!card) return;
    if(card.contains(e.relatedTarget)) return;
    card.style.transform = "";
  });
}

/* ----------------------------------------------------------
   HERO PARALLAX — subtle mouse-follow depth on hero content
---------------------------------------------------------- */
function initHeroParallax(){
  const heroFull = document.querySelector(".hero-full");
  const heroInner = document.querySelector(".hero-overlay-inner");
  if(!heroFull || !heroInner) return;
  const canHover = window.matchMedia("(pointer: fine)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!canHover || prefersReduced) return;

  const maxRotX = 3, maxRotY = 5;

  heroFull.addEventListener("mousemove", (e)=>{
    const rect = heroFull.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxRotY;
    const rotateX = (0.5 - y) * maxRotX;
    heroInner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroFull.addEventListener("mouseleave", ()=>{
    heroInner.style.transform = "";
  });
}

/* ----------------------------------------------------------
   INIT
---------------------------------------------------------- */
/* ----------------------------------------------------------
   HERO VIDEO PLAYLIST — auto-advance through multiple videos
---------------------------------------------------------- */
function initHeroVideoPlaylist(){
  const video = document.querySelector(".hero-video");
  if(!video) return;

  const playlist = ["hero-video.mp4", "hero-video-2.mp4", "hero-video-3.mp4"];
  let currentIndex = 0; // hero-video.mp4 is already loaded/playing first

  video.addEventListener("ended", ()=>{
    currentIndex = (currentIndex + 1) % playlist.length;
    video.src = playlist[currentIndex];
    video.load();
    video.play().catch(()=>{});
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  initHeader();
  initHero3D();
  initHeroVideoPlaylist();
  renderCart();
  renderHomeSections();
  initShopPage();
  initProductPage();
  initFAQ();
  initForms();
  initScrollReveal();
  initCardTilt();
  initHeroParallax();

  // shop page: pre-fill search box from ?search= param
  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get("search");
  const shopSearch = document.getElementById("shopSearch");
  if(searchParam && shopSearch){
    shopSearch.value = searchParam;
    shopSearch.dispatchEvent(new Event("input"));
  }
});
