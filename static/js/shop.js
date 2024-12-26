console.log("Running JS");

const products = [
  {
    name: "Maillot Uva",
    image: "mailliot-grape.jpg",
    description: 'Maillot para ballet color Uva con recorte tipo "V"',
    sizes: "Talles: S - M - L - XL",
    price: 50000
  },
  {
    name: "Set Unicornio",
    image: "unicorn-set.jpg",
    description: "Conjunto infantil personalizado para eventos",
    sizes: "Talles: 0 - 2 - 4 - 6 - 8",
    price: 80000
  },
  {
    name: "Guantes Frosted",
    image: "accesories-gloves.jpg",
    description: "Guantes con aplique de piedras para patinaje artístico",
    sizes: "Talles: S - M - L",
    price: 25000
  }
];

const navMenu = document.querySelector(".nav-menu a i");
const navItems = document.querySelectorAll("#main-menu .nav-item");
const productsContainer = document.getElementById("productsContainer");
const cartCounter = document.getElementById("cart-counter");
const shopCart = document.querySelector("#shop-cart-wrapper ul");
const shopCartValue = document.querySelector("#shop-cart-wrapper span");
const shopCartCheckout = document.getElementById("check-out");
const shopCartClear = document.getElementById("clear-cart");
const errorMessage = document.querySelector("#shop-cart-wrapper .error-message");

let shopCartTotal = 0;
let shopCartCount = 0;
let productCards = "";

console.log(navItems);

// Carga de productos
for (let index=0; index < products.length; index++)
productCards += `
  <div class="product-card">
  <a href="#" class="product-link">
    <div class="product-card-header" style="background-image: url(./static/img/thumbnail/${products[index].image})"></div>
    <div class="product-card-body">
      <h3 class="product-card-body-title">${products[index].name}</h3>
      <p class="product-card-body-description">
        ${products[index].description}
        <span class="product-size">${products[index].sizes}</span>
      </p>
      <p class="product-price">Valor: $ ${products[index].price}</p>
    </div>
  </a>
  <div class="product-card-footer">
    <button class="btn btn-small btn-secondary btn-add-cart">
      <i class="fa-solid fa-cart-shopping"></i>
      Agregar
    </button>
  </div>
  </div>
`;
productsContainer.innerHTML = productCards;

// Agregado de funcionalidad a los botones de "Agregar al carrito"
const buttonsAddCart = document.querySelectorAll(".btn-add-cart");
for(let index = 0; index < buttonsAddCart.length; index++){
  function addToCart(){
    const shopCartElement = document.createElement("li");
    shopCartElement.innerHTML = `<img src='./static/img/thumbnail/${products[index].image}' width='64' class='shop-cart-thumbnail'>`+` $${products[index].price} - ${products[index].name}`;
    // shopCartElement.innerText = `$${products[index].price} - ${products[index].name}`;
    shopCart.appendChild(shopCartElement);
    shopCartTotal += products[index].price;
    shopCartValue.innerText = "Total a pagar: $"+ shopCartTotal;
    shopCartCount++;
    cartCounter.innerText = shopCartCount;
  }
  buttonsAddCart[index].addEventListener("click", addToCart);
}

// Agregado de funcionalidad al botón de "Limpiar carrito"
function clearCart(){
  shopCart.innerHTML = "";
  shopCartTotal = 0;
  shopCartValue.innerText = "Total a pagar: $0";
  errorMessage.innerText = "";
  shopCartCount = 0;
  cartCounter.innerText = shopCartCount;
}
shopCartClear.addEventListener("click", clearCart);

// Agregado de funcionalidad al botón de "Ir a pagar"
function checkOut(){
  if(shopCartTotal > 0){
    window.location.href = "./checkout.html";
  }else{
    errorMessage.innerText = "No hay productos en tu carrito";
  };
}
shopCartCheckout.addEventListener("click", checkOut);

// Agregado de funcionalidad del menú hamburguesa
function dropDown(){
  for(let index=0; index < navItems.length; index++){
    if(navItems[index].classList.contains("nav-collapse")){
      navItems[index].classList.remove("nav-collapse");
      navItems[index].classList.add("nav-show");
      navMenu.classList.remove("fa-bars");
      navMenu.classList.add("fa-times");
    }else{
      navItems[index].classList.remove("nav-show");
      navItems[index].classList.add("nav-collapse");
      navMenu.classList.remove("fa-times");
      navMenu.classList.add("fa-bars");
    };
  }
}
navMenu.addEventListener("click", dropDown);