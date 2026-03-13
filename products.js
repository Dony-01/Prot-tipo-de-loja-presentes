let products = [

{
name: "Kit Canetas Coloridas",
price: 14.90,
image: "canetas.jpg"
},

{
name: "Fone de Ouvido",
price: 24.90,
image: "fone.jpg"
},

{
name: "Sabonete NBA",
price: 5.90,
image: "sabonete.jpg"
}

];

let newProducts = [

{
name: "Caderno Gamer",
price: 19.90,
image: "caderno ps5.jpg"
},

{
name: "Mouse RGB",
price: 39.90,
image: "mouse warrior.webp"
}

];

let container = document.getElementById("ofertas");

if(container){
renderProducts(products);
}

function renderProducts(list){

container.innerHTML = "";

list.forEach(product => {

container.innerHTML += `
<div class="product-card">

<img src="${product.image}"
onclick="openModal('${product.name}','${product.image}',${product.price})">

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

function renderGrid(list, containerId){

let grid = document.getElementById(containerId);

grid.innerHTML = "";

list.forEach(product => {

grid.innerHTML += `
<div class="product-card">

<img src="${product.image}"
onclick="openModal('${product.name}','${product.image}',${product.price})">

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

renderProducts(products);

renderGrid(newProducts,"newContainer");

const searchInput = document.getElementById("searchInput");
    
searchInput.addEventListener("input",function(){

let search = this.value.toLowerCase();

let filtered = products.filter(product =>
product.name.toLowerCase().includes(search)
);

if(container){
renderProducts(products);
}

renderGrid(newProducts,"newContainer");



});

