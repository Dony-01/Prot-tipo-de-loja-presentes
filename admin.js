
console.log("ADMIN CARREGOU");

const supabaseClient = window.supabase.createClient(
  "https://rpdkkgutaqvdajdcokma.supabase.co",
  "sb_publishable_98uCafB5OOqdsu5vIbMGIA_mCTvSpdh"
);

console.log("SUPABASE CRIADO"); 

async function addProduct(){
  const name = document.getElementById("name").value;
  const rawPrice = document.getElementById("price").value;

  const price = parseFloat(
    rawPrice.replace("R$", "").replace(",", ".").trim()
  );

  const file = document.getElementById("fileInput").files[0];

  console.log("FILE:", file); // ✅ aqui sim funciona

  let image = "";

  if(file){
    image = await uploadImage(file);
  }

  const product = {
    name,
    price,
    image,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    isNew: document.getElementById("isNew").checked
  };

  const { error } = await supabaseClient
    .from("products")
    .insert([product]);

if(error){
  console.error(error);
  alert("Erro ao salvar");
} else {
  alert("Produto salvo!");
  location.reload(); // 👈 aqui
}
}


async function uploadImage(file){
  const fileName = Date.now() + "_" + file.name;

  const { data, error } = await supabaseClient.storage
    .from("products")
    .upload(fileName, file);

  console.log("UPLOAD DATA:", data);   // 👈 aqui
  console.log("UPLOAD ERROR:", error); // 👈 e aqui

  if(error){
    console.error(error);
    return null;
  }

  const { data: publicUrl } = supabaseClient.storage
    .from("products")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}

async function loadProducts(){
  const { data } = await supabaseClient.from("products").select("*");

const list = document.getElementById("productList");
if(!list) return;

list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div>
        ${p.name} - R$ ${p.price}
        <button onclick="deleteProduct(${p.id})">Excluir</button>
      </div>
    `;
  });
}


document.getElementById("fileInput").addEventListener("change", function(){
  const preview = document.getElementById("preview");
  preview.innerHTML = "";

  for(let file of this.files){
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.width = 80;
    preview.appendChild(img);
  }
});

async function deleteProduct(id){
  await supabaseClient.from("products").delete().eq("id", id);
  loadProducts();
}

loadProducts();
