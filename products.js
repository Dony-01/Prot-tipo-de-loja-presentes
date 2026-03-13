let products = [

{
name: "Kit Canetas Coloridas",
price: 14.90,
image: "img/canetas.jpg",
category: "papelaria"
},

{
name: "Fone de Ouvido",
price: 24.90,
image: "img/fone.jpg",
category: "eletronicos"
},

{
name: "Sabonete NBA",
price: 5.90,
image: "img/sabonete.jpg",
category: "presentes"
}

];

let newProducts = [

{
name: "Caderno Gamer",
price: 19.90,
image: "img/caderno ps5.jpg"
},

{
name: "Mouse RGB",
price: 39.90,
image: "img/mouse warrior.webp"
}

];

let container = document.getElementById("ofertas");

if(container){
renderProducts(products);
}

function renderProducts(list){

container.innerHTML = "";

list.forEach((product,index) => {
container.innerHTML += `
<div class="product-card">

<img src="${product.image}"
onclick="window.location.href='produto.html?id=${index}'">
<h3>${product.name}</h3>

<p class="price">
R$ ${product.price.toLocaleString("pt-BR",{minimumFractionDigits:2})}
</p>

<button onclick='addToCart(${JSON.stringify(product)})'>
Adicionar ao carrinho
</button>

</div>
`;

});

}

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

if(id !== null){

const product = products[id];

document.getElementById("productImage").src = product.image;

document.getElementById("productName").innerText = product.name;

document.getElementById("productPrice").innerText =
"R$ " + product.price.toFixed(2);

document.getElementById("buyButton").onclick = function(){

addToCart(product);

};

}


function filterCategory(category){

let buttons = document.querySelectorAll(".category-btn");

buttons.forEach(btn => btn.classList.remove("active"));

event.target.classList.add("active");

if(category === "all"){
renderProducts(products);
return;
}

let filtered = products.filter(product =>
product.category === category
);

renderProducts(filtered);

}


function renderGrid(list, containerId){

let grid = document.getElementById(containerId);

if(!grid) return;

grid.innerHTML = "";

list.forEach(product => {

grid.innerHTML += `
<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="price">
R$ ${product.price.toLocaleString("pt-BR",{minimumFractionDigits:2})}
</p>

<button onclick='addToCart(${JSON.stringify(product)})'>
Adicionar ao carrinho
</button>

</div>
`;

});


}

renderGrid(newProducts,"newContainer");

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",function(){

let search = this.value.toLowerCase();

let filtered = products.filter(product =>
product.name.toLowerCase().includes(search)
);

if(container){
renderProducts(filtered);
}

renderGrid(newProducts,"newContainer");

});

}
