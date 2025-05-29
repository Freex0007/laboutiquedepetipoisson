let count = 0;
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  count = cart.length;
  updateCartDisplay();
  saveCart();
}

function updateCartDisplay() {
  const list = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if (!list || !total) return;

  list.innerHTML = '';
  let sum = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price.toFixed(2)} € 
    <button onclick="removeFromCart(${index})" style="margin-left:10px;">Supprimer</button>`;
    list.appendChild(li);
    sum += item.price;
  });
  total.textContent = sum.toFixed(2);

  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  saveCart();
}

function showCart() {
  window.location.href = "panier.html";
}

function scrollToProducts() {
  const products = document.getElementById('products');
  if (products) {
    products.scrollIntoView({ behavior: 'smooth' });
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const stored = localStorage.getItem('cart');
  if (stored) {
    cart = JSON.parse(stored);
    count = cart.length;
    updateCartDisplay();
  }
}

document.addEventListener('DOMContentLoaded', loadCart);
