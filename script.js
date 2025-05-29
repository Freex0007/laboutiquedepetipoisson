
let products=[];
fetch('products.json').then(r=>r.json()).then(d=>{products=d;init();});

let cart=JSON.parse(localStorage.getItem('montipoisson-cart')||'[]');
function saveCart(){localStorage.setItem('montipoisson-cart',JSON.stringify(cart));}
function updateCartCount(){const c=document.getElementById('cart-count');if(c) c.textContent=cart.length;}

function buildRows(){
 const container=document.getElementById('rows-container');if(!container)return;
 const cats=[...new Set(products.map(p=>p.category))];
 cats.forEach(cat=>{
   const sec=document.createElement('section');sec.className='row';
   sec.innerHTML=`<h2>${cat}</h2><div class="row-inner"></div>`;
   container.appendChild(sec);
   const inner=sec.querySelector('.row-inner');
   products.filter(p=>p.category===cat).forEach(p=>{
     const card=document.createElement('div');card.className='card';card.onclick=()=>location.href=`product.html?id=${p.id}`;
     card.innerHTML=`<img src="${p.image}?w=400&auto=format" alt="${p.name}"><div class="card-info"><h4>${p.name}</h4><div class="star">${'★'.repeat(Math.round(p.rating))}</div><div class="price">${p.price.toFixed(2)} €</div></div>`;
     inner.appendChild(card);
   });
 });
}

function scrollToRows(){document.getElementById('rows-container').scrollIntoView({behavior:'smooth'});}

function initSearch(){
 const input=document.getElementById('search-input');const btn=document.getElementById('search-btn');
 if(!input||!btn) return;
 const exec=()=>search(input.value);
 btn.addEventListener('click',exec);
 input.addEventListener('keypress',e=>{if(e.key==='Enter')exec();});
}
function search(v){
 document.querySelectorAll('.card').forEach(c=>c.style.display='');
 if(v){v=v.toLowerCase();document.querySelectorAll('.card').forEach(c=>{const t=c.querySelector('h4').textContent.toLowerCase();c.style.display=t.includes(v)?'':'none';});}
}

function renderProductPage(){
 const cont=document.getElementById('product-page');if(!cont)return;
 const id=parseInt(new URLSearchParams(location.search).get('id'));const p=products.find(x=>x.id===id);
 if(!p){cont.textContent='Produit introuvable';return;}
 cont.innerHTML=`<img src="${p.image}?w=600&auto=format" alt="${p.name}"><div class="product-info"><h2>${p.name}</h2><div class="star">${'★'.repeat(Math.round(p.rating))} <span style="color:#888">(${p.reviews})</span></div><p class="price">${p.price.toFixed(2)} €</p><p>${p.description}</p><button class="add-btn" onclick="addToCart(${p.id})">Ajouter au panier</button></div>`;
}

function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;cart.push(p);saveCart();updateCartCount();alert('Ajouté au panier !');}
function removeFromCart(i){cart.splice(i,1);saveCart();renderCart();updateCartCount();}

function renderCart(){
 const items=document.getElementById('cart-items');const totalEl=document.getElementById('cart-total');
 if(!items||!totalEl)return;
 items.innerHTML='';let total=0;
 cart.forEach((p,i)=>{total+=p.price;const div=document.createElement('div');div.className='cart-item';
   div.innerHTML=`<img src="${p.image}?w=200&auto=format" alt="${p.name}"><div><h4>${p.name}</h4><p class="price">${p.price.toFixed(2)} €</p><button class="remove-btn" onclick="removeFromCart(${i})">Supprimer</button></div>`;items.appendChild(div);});
 totalEl.textContent=total.toFixed(2);
}
function initCheckout(){const btn=document.getElementById('checkout-btn');if(!btn)return;btn.onclick=()=>{if(cart.length===0){alert('Votre panier est vide');return;}alert('Commande simulée – merci !');cart=[];saveCart();renderCart();updateCartCount();};}

function init(){updateCartCount();buildRows();initSearch();renderProductPage();renderCart();initCheckout();}
document.addEventListener('DOMContentLoaded',updateCartCount);
