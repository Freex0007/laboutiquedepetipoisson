let count = 0;
function addToCart() {
  count++;
  document.getElementById('cart-count').textContent = count;
}
function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
