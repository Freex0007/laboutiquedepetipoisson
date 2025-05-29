let count = 0;
let cart = [];

function addToCart(name, price) {
  count++;
  document.getElementById('cart-count').textContent = count;
  cart.push({ name, price });
  updateCartDisplay();
}

function updateCartDisplay() {
  const list = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  list.innerHTML = '';
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price.toFixed(2)} €`;
    list.appendChild(li);
    sum += item.price;
  });
  total.textContent = sum.toFixed(2);
}

function showCart() {
  const section = document.getElementById('cart-section');
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
  scrollToElement(section);
}

function scrollToProducts() {
  scrollToElement(document.getElementById('products'));
}

function scrollToElement(el) {
  el.scrollIntoView({ behavior: 'smooth' });
}

function filterProducts() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const priceFilter = document.getElementById('priceFilter').value;
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    const price = parseFloat(product.dataset.price);
    const matchesName = name.includes(search);
    const matchesPrice = priceFilter === "all" || price <= parseFloat(priceFilter);
    product.style.display = matchesName && matchesPrice ? "block" : "none";
  });
}
