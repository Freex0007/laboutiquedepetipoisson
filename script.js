/* ---------- Cart logic ---------- */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* Add product to cart */
function addToCart(name, price){
  cart.push({name,price});
  saveCart();
  updateCartDisplay();
}

/* Remove product from cart by index */
function removeFromCart(index){
  cart.splice(index,1);
  saveCart();
  updateCartDisplay();
}

/* Persist cart */
function saveCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

/* UI: display cart items & total */
function updateCartDisplay(){
  const countEl=document.getElementById('cart-count');
  if(countEl) countEl.textContent=cart.length;

  const list=document.getElementById('cart-items');
  const totalEl=document.getElementById('cart-total');
  if(!list||!totalEl) return;

  list.innerHTML='';
  let total=0;
  cart.forEach((item,i)=>{
    const li=document.createElement('li');
    li.innerHTML=
      `<span>${item.name} – ${item.price.toFixed(2)} €</span>
       <button class="secondary-btn" style="margin-left:0.5rem" onclick="removeFromCart(${i})">Supprimer</button>`;
    list.appendChild(li);
    total+=item.price;
  });
  totalEl.textContent=total.toFixed(2);
}

/* ---------- Navigation ---------- */
const burger=document.getElementById('burger');
const navbar=document.getElementById('navbar');
if(burger && navbar){
  burger.addEventListener('click',()=>{
    navbar.classList.toggle('nav--open');
    navbar.style.display=navbar.classList.contains('nav--open')?'flex':'none';
  });
}

/* ---------- Smooth scroll ---------- */
function scrollToProducts(){
  document.getElementById('products')?.scrollIntoView({behavior:'smooth'});
}

/* ---------- Checkout ---------- */
const checkoutBtn=document.getElementById('checkout-btn');
if(checkoutBtn){
  checkoutBtn.addEventListener('click',()=>{
    if(cart.length===0){alert('Votre panier est vide.');return;}
    alert('Commande simulée ! Merci pour votre achat :)');
    cart=[];saveCart();updateCartDisplay();
  });
}

/* ---------- Contact form ---------- */
const contactForm=document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    document.getElementById('form-status').textContent='Merci pour votre message !';
    contactForm.reset();
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded',updateCartDisplay);
