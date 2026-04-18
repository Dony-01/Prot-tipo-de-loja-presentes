let products = [];

fetch("https://sheetdb.io/api/v1/v91yt0l1rpveu")
  .then(res => res.json())
  .then(data => {

    products = data.map(p => ({
      id: Number(p.id),
      name: p.name,
      price: Number(p.price.toString().replace(",", ".")),
      image: p.image,
      category: p.category,
      isNew: p.isNew === "true"
    }));

    initStore();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if(id){
      const product = products.find(p => p.id == id);

      if(product){
        document.getElementById("mainImage").src = product.image;
        document.getElementById("productName").innerText = product.name;
        document.getElementById("productPrice").innerText =
          "R$ " + product.price.toFixed(2);

        document.getElementById("buyButton").onclick = function(){
          addToCart(product);
        };
      }
    }

  });

function renderProducts(list, container){

  container.innerHTML = "";

  list.forEach((product,index) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" 
        onclick="window.location.href='produto.html?id=${product.id}'">
        <h3>${product.name}</h3>

        <p class="price">
        R$ ${product.price.toLocaleString("pt-BR",{minimumFractionDigits:2})}
        </p>

        <button onclick="addToCartById(${product.id})"  >
        Adicionar ao carrinho
        </button>
      </div>
    `;
  });

}


const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const id = params.get("id");

if(id !== null){

document.getElementById("mainImage").src = product.image;

document.getElementById("productName").innerText = product.name;

document.getElementById("productPrice").innerText =
"R$ " + product.price.toFixed(2);

document.getElementById("buyButton").onclick = function(){
  addToCart(product);
};

}


function filterCategory(category){

let container = document.getElementById("offersContainer");

let buttons = document.querySelectorAll(".category-btn");

buttons.forEach(btn => btn.classList.remove("active"));

event.target.classList.add("active");

let filtered = category === "all"
  ? products.filter(p => !p.isNew)
  : products.filter(p => p.category === category && !p.isNew);

renderProducts(filtered, container);
}


function renderGrid(list, containerId){

let grid = document.getElementById(containerId);

if(!grid) return;

grid.innerHTML = "";

list.forEach(product => {

grid.innerHTML += `
<div class="product-card">

<img src="${product.image}" 
onclick="window.location.href='produto.html?id=${product.id}'">

<h3>${product.name}</h3>

<p class="price">
R$ ${product.price.toLocaleString("pt-BR",{minimumFractionDigits:2})}
</p>

<button onclick="addToCartById(${product.id})">
Adicionar ao carrinho
</button>
</div>
`;

});

}

function scrollCarousel(direction){
  const container = document.getElementById("newContainer");
  const scrollAmount = 220;

  container.scrollLeft += direction * scrollAmount;
}

function addToCartById(id){
  let product = products.find(p => p.id === id);
  addToCart(product);
}

  renderGrid(news, "newContainer");

  const searchInput = document.getElementById("searchInput");

  if(searchInput){
    searchInput.addEventListener("input", function(){

      let search = this.value.toLowerCase();

      let filtered = products.filter(product =>
        product.name.toLowerCase().includes(search)
      );

      renderProducts(filtered, container);

      renderGrid(news, "newContainer");
    });
  }

function initStore(){

  let container = document.getElementById("offersContainer");

  let offers = products.filter(p => !p.isNew);
  let news = products.filter(p => p.isNew);

  if(container){
    renderProducts(offers, container);
  }

  renderGrid(news, "newContainer");
}
