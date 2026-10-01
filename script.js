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
const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER"; // REPLACE_ME e.g. 923001234567

/* ----------------------------------------------------------
   2. PRODUCT DATA — REPLACE_ME
   Swap "image" values with your real product photo URLs/paths.
   Prices are in PKR (Rs.) — edit as needed.
---------------------------------------------------------- */
const PRODUCTS = [
  { id:"kv-001", name:"Nova Runner Sneakers", category:"Sneakers", gender:"Men", sizes:[7,8,9,10,11], price:6500, oldPrice:8500, badge:"Sale", images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85"], desc:"A clean low-top runner built for daily wear — breathable mesh upper, cushioned sole, and a neutral colourway that pairs with everything." },
  { id:"kv-002", name:"Urban Street Hi-Tops", category:"Sneakers", gender:"Men", sizes:[8,9,10,11,12], price:7200, badge:"New", images:["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85"], desc:"High-top silhouette with reinforced ankle support and a chunky outsole for extra street presence." },
  { id:"kv-003", name:"Classic Canvas Slip-Ons", category:"Casual Shoes", gender:"Unisex", sizes:[6,7,8,9,10], price:3200, badge:"", images:["https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"], desc:"Lightweight canvas slip-ons for effortless everyday wear. Easy on, easy off, endlessly comfortable." },
  { id:"kv-004", name:"Aria Platform Sneakers", category:"Women's Shoes", gender:"Women", sizes:[5,6,7,8], price:5800, oldPrice:7000, badge:"Sale", images:["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85"], desc:"A platform sole gives everyday height without sacrificing comfort. Soft leather-look upper." },
  { id:"kv-005", name:"Thrift Find — Retro Runner", category:"Thrift Shoes", gender:"Men", sizes:[9,10], price:2800, badge:"Thrift · 1 left", images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85"], desc:"Pre-loved, carefully inspected retro runner in great condition. One-of-one — once it's gone, it's gone." },
  { id:"kv-006", name:"Everyday Loafers", category:"Casual Shoes", gender:"Men", sizes:[7,8,9,10,11], price:4500, badge:"", images:["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85"], desc:"Smart-casual loafers that move easily from desk to weekend. Cushioned footbed for all-day comfort." },
  { id:"kv-007", name:"Motion Knit Trainers", category:"Sneakers", gender:"Women", sizes:[5,6,7,8,9], price:6900, badge:"New", images:["https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"], desc:"Sock-fit knit upper that moves with your foot, paired with a responsive foam midsole." },
  { id:"kv-008", name:"Heritage Court Sneakers", category:"Sneakers", gender:"Men", sizes:[8,9,10,11], price:5400, badge:"", images:["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85"], desc:"A timeless court silhouette in crisp leather panels — a wardrobe staple that never goes out of style." },
  { id:"kv-009", name:"Thrift Find — Suede Boot", category:"Thrift Shoes", gender:"Women", sizes:[6,7], price:3400, badge:"Thrift · 1 left", images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85"], desc:"A gently worn suede ankle boot, hand-picked and cleaned. Limited to a single pair." },
  { id:"kv-010", name:"Featherlite Sandals", category:"Women's Shoes", gender:"Women", sizes:[5,6,7,8], price:2600, badge:"", images:["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85"], desc:"Ultra-light everyday sandals with a soft footbed built for Karachi summers." },
  { id:"kv-011", name:"Trailblazer Hiking Sneakers", category:"Men's Shoes", gender:"Men", sizes:[8,9,10,11,12], price:8200, oldPrice:9800, badge:"Sale", images:["https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"], desc:"Rugged outsole with extra grip, built for city trails and weekend adventures alike." },
  { id:"kv-012", name:"Pastel Low-Top Sneakers", category:"Women's Shoes", gender:"Women", sizes:[5,6,7,8,9], price:5200, badge:"New", images:["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85","https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85"], desc:"A soft pastel colourway on a classic low-top shape — light, comfortable, easy to style." }
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
    showToast(`${product.name} cart me add ho gaya`);
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


function fallbackProductImage(img){
  if(!img || img.dataset.fallbackApplied === "1") return;
  img.dataset.fallbackApplied = "1";
  const label = (img.alt || "Kick Vibes").replace(/[<>&"]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="#f5f5f5"/>
    <g transform="translate(90 250) rotate(-6 310 150)">
      <path d="M105 255 C155 210 225 190 285 155 L365 90 C392 69 420 72 441 95 L505 168 C527 193 558 208 610 220 L676 235 C705 242 721 266 710 291 C697 321 657 333 616 333 H168 C108 333 70 303 105 255Z" fill="#222"/>
      <path d="M365 104 L430 106 L488 174 L430 205 L350 164Z" fill="#fff"/>
      <path d="M145 264 C265 278 455 277 685 283" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
      <path d="M178 222 L300 178 M210 240 L331 194 M245 255 L364 211" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
    </g>
    <text x="400" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#222">KICK VIBES</text>
    <text x="400" y="692" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#666">${label}</text>
  </svg>`;
  img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

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
    wrap.innerHTML = `<div class="cart-empty">Cart khali hai.<br><br><a href="shop.html" class="btn btn-outline">Shopping Shuru Karen</a></div>`;
  } else {
    wrap.innerHTML = items.map(i => `
      <div class="cart-item">
        <img src="${i.image}" alt="${i.name}" onerror="fallbackProductImage(this)">
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
  let msg = "Assalam-o-Alaikum! Main Kick Vibes se order karna chahta/chahti hoon:%0A%0A";
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
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="fallbackProductImage(this)">
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
  showToast(active ? "Wishlist me add ho gaya" : "Wishlist se remove ho gaya");
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
      : `<div class="empty-state">Koi product is filter se match nahi hua. Filters adjust karen.</div>`;

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
      <div class="pd-main-img"><img id="pdMainImg" src="${p.images[0]}" alt="${p.name}" onerror="fallbackProductImage(this)"></div>
      <div class="pd-thumbs">
        ${p.images.map((img,idx)=>`<img src="${img}" onerror="fallbackProductImage(this)" class="${idx===0?'active':''}" onclick="document.getElementById('pdMainImg').src=this.src; document.querySelectorAll('.pd-thumbs img').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join("")}
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
      <div class="pd-size-label">Size select karen</div>
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
        <a id="pdWaBtn" href="#" target="_blank" class="btn pd-wa-btn">WhatsApp Par Order Karen</a>
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
    const msg = `Assalam-o-Alaikum! Mujhe ye product order karna hai:%0A%0A• ${p.name} (Size ${selectedSize}) x${qty} — ${formatPrice(p.price*qty)}`;
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
    showToast("Shukriya! Aap subscribe ho gaye.");
    nlForm.reset();
  });

  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (e)=>{
    e.preventDefault();
    showToast("Message bhej diya gaya. Hum jald reply karenge!");
    contactForm.reset();
  });
}

/* ----------------------------------------------------------
   INIT
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  initHeader();
  renderCart();
  renderHomeSections();
  initShopPage();
  initProductPage();
  initFAQ();
  initForms();

  // shop page: pre-fill search box from ?search= param
  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get("search");
  const shopSearch = document.getElementById("shopSearch");
  if(searchParam && shopSearch){
    shopSearch.value = searchParam;
    shopSearch.dispatchEvent(new Event("input"));
  }
});
