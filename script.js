// ------------------ Data fetch ------------------
let products = [];
fetch('products.json').then(res => res.json()).then(data => {
  products = data;
  initSite();
});

// ------------------ Cart ------------------
let cart = JSON.parse(localStorage.getItem('mega-cart') || '[]');

function saveCart(){
  localStorage.setItem('mega-cart', JSON.stringify(cart));
}

function updateCartCount(){
  const el = document.getElementById('cart-count');
  if(el) el.textContent = cart.length;
}

function addToCart(id){
  const product = products.find(p => p.id === id);
  if(!product) return;
  cart.push(product);
  saveCart();
  updateCartCount();
  alert('Ajouté au panier !');
}

function removeFromCart(index){
  cart.splice(index,1);
  saveCart();
  renderCart();
}

// ------------------ Index ------------------
function renderCategories(){
  const list = document.getElementById('category-list');
  if(!list) return;
  const cats = [...new Set(products.map(p => p.category))];
  cats.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;
    li.onclick = () => renderGrid(cat);
    list.appendChild(li);
  });
}

function renderGrid(filterCat = null, searchTerm = ''){
  const grid = document.getElementById('product-grid');
  if(!grid) return;
  grid.innerHTML = '';
  products
    .filter(p => (filterCat ? p.category === filterCat : true))
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}?w=400&auto=format" alt="${p.name}">
        <h4>${p.name}</h4>
        <div class="rating">${'★'.repeat(Math.round(p.rating))} <span class="review-count">(${p.reviews})</span></div>
        <div class="price">${p.price.toFixed(2)} €</div>
        <button class="primary-btn" onclick="location.href='product.html?id=${p.id}'">Voir le produit</button>
      `;
      grid.appendChild(card);
    });
}

function initSearch(){
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  if(!input || !btn) return;
  btn.onclick = () => renderGrid(null, input.value);
  input.addEventListener('keypress', e => {
    if(e.key === 'Enter') renderGrid(null, input.value);
  });
}

// ------------------ Product page ------------------
function renderProductPage(){
  const container = document.getElementById('product-page');
  if(!container) return;
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  if(!product){container.textContent='Produit non trouvé.';return;}
  container.innerHTML = \`
    <img src="\${product.image}?w=600&auto=format" alt="\${product.name}">
    <div class="product-info">
      <h2>\${product.name}</h2>
      <div class="rating">\${'★'.repeat(Math.round(product.rating))} <span class="review-count">(\${product.reviews} avis)</span></div>
      <p class="price">\${product.price.toFixed(2)} €</p>
      <p>\${product.description}</p>
      <button class="primary-btn add-btn" onclick="addToCart(\${product.id})">Ajouter au panier</button>
    </div>
  \`;
}

// ------------------ Cart page ------------------
function renderCart(){
  const itemsContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!itemsContainer || !totalEl) return;
  itemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach((p,i) => {
    total += p.price;
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = \`
      <img src="\${p.image}?w=200&auto=format" alt="\${p.name}">
      <div>
        <h4>\${p.name}</h4>
        <p class="price">\${p.price.toFixed(2)} €</p>
        <button class="remove-btn" onclick="removeFromCart(\${i})">Supprimer</button>
      </div>
    \`;
    itemsContainer.appendChild(item);
  });
  totalEl.textContent = total.toFixed(2);
}

// ------------------ Checkout ------------------
function initCheckout(){
  const btn = document.getElementById('checkout-btn');
  if(!btn) return;
  btn.onclick = () => {
    if(cart.length === 0){ alert('Votre panier est vide.'); return;}
    alert('Commande simulée ! Merci pour votre achat.');
    cart = []; saveCart(); renderCart(); updateCartCount();
  };
}

// ------------------ Init Site ------------------
function initSite(){
  updateCartCount();
  renderCategories();
  renderGrid();
  initSearch();
  renderProductPage();
  renderCart();
  initCheckout();
}

document.addEventListener('DOMContentLoaded', updateCartCount);
