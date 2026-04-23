
console.log("RODOU products.js");

const supabaseClient = window.supabase.createClient(
  "https://rpdkkgutaqvdajdcokma.supabase.co",
  "sb_publishable_98uCafB5OOqdsu5vIbMGIA_mCTvSpdh"
);


let products = [];

async function loadProducts(){
  console.log("Buscando..."); // 👈 aqui

const { data, error } = await supabaseClient
  .from("products")
  .select("*");

  console.log("DATA:", data);  
  console.log("ERROR:", error); 

  if(error){
    console.error(error);
    return;
  }

  products = data;

  initStore();
  loadProductPage();
}


function loadProductPage(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  
  if(!id) return;

  const product = products.find(p => p.id == id);
if(!product) return;

const img = document.getElementById("mainImage");

let images = [];

if(product.image){
  images.push(product.image);
}

if(product.images){
  let extra = typeof product.images === "string"
    ? JSON.parse(product.images)
    : product.images;

  images = images.concat(extra);
}

if(img && images.length > 0){
  img.src = images[0];
}

const gallery = document.getElementById("gallery");

if(gallery && images.length > 1){
  gallery.innerHTML = "";

  images.forEach(src => {
    gallery.innerHTML += `<img src="${src}" width="60">`;
  });
}
  const nameEl = document.getElementById("productName");
if(nameEl){
  nameEl.innerText = product.name;
}
const price = document.getElementById("productPrice");
if(price){
  price.innerText = "R$ " + product.price.toFixed(2);
}
  const desc = document.getElementById("productDescription");
const btn = document.getElementById("buyButton");

if(desc){
  desc.innerText = product.description ? product.description : "Sem descrição";
}

if(btn){
  btn.onclick = () => addToCart(product);
}
}

function renderProducts(list, container){
  container.innerHTML = "";

  list.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" onclick="window.location.href='produto.html?id=${product.id}'">
        <h3>${product.name}</h3>
        <p class="price">R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCartById(${product.id})">
          Adicionar ao carrinho
        </button>
      </div>
    `;
  });
}

function renderGrid(list, containerId){
  let grid = document.getElementById(containerId);
  if(!grid) return;

  grid.innerHTML = "";

  list.forEach(product => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" onclick="window.location.href='produto.html?id=${product.id}'">
        <h3>${product.name}</h3>
        <p class="price">R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCartById(${product.id})">
          Adicionar ao carrinho
        </button>
      </div>
    `;
  });
}

function addToCartById(id){
  let product = products.find(p => p.id === id);
  addToCart(product);
}

loadProducts();


function filterCategory(category){
  let container = document.getElementById("offersContainer");

  let filtered = category === "all"
    ? products.filter(p => !p.isNew)
    : products.filter(p => p.category === category && !p.isNew);

  renderProducts(filtered, container);
}

function scrollCarousel(direction){
  const container = document.getElementById("newContainer");
  const scrollAmount = 220;

  container.scrollLeft += direction * scrollAmount;
}

const searchInput = document.getElementById("searchInput");

if(searchInput){
  searchInput.addEventListener("input", function(){
    let container = document.getElementById("offersContainer");

    let search = this.value.toLowerCase();

    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );

    renderProducts(filtered, container);
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
