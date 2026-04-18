let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product){

cart.push(product);

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

console.log("Carrinho:", cart);

Swal.fire({
icon: "success",
title: "Produto adicionado!",
timer: 1200,
showConfirmButton: false
});

}

function openModal(name, image, price){

document.getElementById("modalName").innerText = name;

document.getElementById("modalImage").src = image;

document.getElementById("modalPrice").innerText =
"R$ " + price.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("productModal").style.display = "flex";

}

function closeModal(){

document.getElementById("productModal").style.display = "none";

}

window.onclick = function(event){

let modal = document.getElementById("productModal");

if(event.target === modal){
modal.style.display = "none";
}

}

function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let count = document.getElementById("cart-count");

if(count){
count.innerText = cart.length;
}

}

function updateTotal(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(product => {
total += Number(product.price);
});

let totalElement = document.getElementById("cartTotal");

if(totalElement){
totalElement.innerText =
"R$ " + total.toLocaleString("pt-BR",{minimumFractionDigits:2});
}

}

function checkoutWhatsApp(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let message = "Olá! Quero comprar:\n";

cart.forEach(product => {
message += `• ${product.name} - R$ ${product.price}\n`;
});

let url = `https://wa.me/5541998383828?text=${encodeURIComponent(message)}`;

window.open(url,"_blank");

}


function renderCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cartItems");

if(!container) return;

container.innerHTML = "";

if(cart.length === 0){
container.innerHTML = "<p>Seu carrinho está vazio</p>";
return;

}

cart.forEach((product,index) => {

container.innerHTML += `
<div class="cart-item">

<img src="${product.image}" width="60">

<h3>${product.name}</h3>

<p>R$ ${Number(product.price).toLocaleString("pt-BR",{minimumFractionDigits:2})}</p>

<button onclick="removeItem(${index})">
Remover
</button>

</div>
`;

});


updateTotal();

}

function removeItem(index){
  cart.splice(index, 1); // remove só 1 item
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

updateCartCount();


renderCart();


updateCartCount();
