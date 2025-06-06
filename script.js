
let products = [];
fetch('products.json').then(res => res.json()).then(data => { products = data; initSite(); });

let cart = JSON.parse(localStorage.getItem('montipoisson-cart') || '[]');

function saveCart() { localStorage.setItem('montipoisson-cart', JSON.stringify(cart)); }
function updateCartCount() { const el = document.getElementById('cart-count'); if (el) el.textContent = cart.length; }

/* Build rows by category */
function buildRows() {
  const container = document.getElementById('rows-container');
  if (!container) return;
  const cats = [...new Set(products.map(p => p.category))];
  cats.forEach(cat => {
    const row = document.createElement('section'); row.className = 'row';
    row.innerHTML = `<h2>${cat}</h2><div class="row-inner"></div>`;
    container.appendChild(row);
    const inner = row.querySelector('.row-inner');
    products.filter(p => p.category === cat).forEach(p => {
      const card = document.createElement('div'); card.className = 'card';
      card.onclick = () => location.href = `product.html?id=${p.id}`;
      card.innerHTML = `
        <img src="${p.image}?w=400&auto=format" alt="${p.name}">
        <div class="card-info">
          <h4>${p.name}</h4>
          <div class="star">${'★'.repeat(Math.round(p.rating))}</div>
          <div class="price">${p.price.toFixed(2)} €</div>
        </div>`;
      inner.appendChild(card);
    });
  });
}

/* Search */
function initSearch() {
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  if (!input || !btn) return;
  btn.onclick = () => performSearch(input.value);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(input.value); });
}
function performSearch(val) {
  document.querySelectorAll('.card').forEach(c => c.style.display = '');
  if (val) {
    val = val.toLowerCase();
    document.querySelectorAll('.card').forEach(c => {
      const title = c.querySelector('h4').textContent.toLowerCase();
      c.style.display = title.includes(val) ? '' : 'none';
    });
  }
}

/* Product page */
function renderProductPage() {
  const cont = document.getElementById('product-page'); if (!cont) return;
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  const p = products.find(x => x.id === id);
  if (!p) { cont.textContent = 'Produit introuvable'; return; }
  cont.innerHTML = `
    <img src="${p.image}?w=650&auto=format" alt="${p.name}">
    <div class="product-info">
      <h2>${p.name}</h2>
      <div class="star">${'★'.repeat(Math.round(p.rating))} <span style="color:#777">(${p.reviews})</span></div>
      <p class="price">${p.price.toFixed(2)} €</p>
      <p>${p.description}</p>
      <button class="add-btn" onclick="addToCart(${p.id})">Ajouter au panier</button>
    </div>`;
}

/* Cart */
function addToCart(id) { const p = products.find(x => x.id === id); if (!p) return; cart.push(p); saveCart(); updateCartCount(); alert('Ajouté !'); }
function removeFromCart(index) { cart.splice(index, 1); saveCart(); renderCart(); updateCartCount(); }

function renderCart() {
  const items = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!items || !totalEl) return;
  items.innerHTML = ''; let total = 0;
  cart.forEach((p, i) => {
    total += p.price;
    const div = document.createElement('div'); div.className = 'cart-item';
    div.innerHTML = `
      <img src="${p.image}?w=240&auto=format" alt="${p.name}">
      <div>
        <h4>${p.name}</h4>
        <p class="price">${p.price.toFixed(2)} €</p>
        <button class="remove-btn" onclick="removeFromCart(${i})">Supprimer</button>
      </div>`;
    items.appendChild(div);
  });
  totalEl.textContent = total.toFixed(2);
}

/* Checkout */
function initCheckout() {
  const btn = document.getElementById('checkout-btn'); if (!btn) return;
  btn.onclick = () => {
    if (cart.length === 0) { alert('Votre panier est vide'); return; }
    alert('Commande simulée – merci !');
    cart = []; saveCart(); renderCart(); updateCartCount();
  };
}

/* Helper */
function scrollToRows() { document.getElementById('rows-container').scrollIntoView({ behavior: 'smooth' }); }

function initSite() {
  updateCartCount();
  buildRows();
  initSearch();
  renderProductPage();
  renderCart();
  initCheckout();
}

document.addEventListener('DOMContentLoaded', updateCartCount);
