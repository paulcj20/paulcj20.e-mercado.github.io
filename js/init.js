const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//botones
const btnlogOut = document.getElementById('logOut');

let initCart = () => {
  if(localStorage.getItem('cart') == undefined){
    getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj) {
      if(resultObj.status == "ok"){
        localStorage.setItem('cart', JSON.stringify(resultObj.data.articles));
      }
    });
  }
};

let addProductToCart = product => {
  let cart = localStorage.getItem('cart');
  if(cart == ''){
    cart = [];
    cart[cart.length] = product;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location = "cart.html";
  }else {
    cart = JSON.parse(localStorage.getItem('cart'));
    cart[cart.length] = product;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location = "cart.html";
  }
};

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let showMail = function() {
  const email = localStorage.getItem('email');
  const pMail = document.querySelector('.email-container');
  pMail.textContent += email;
}

let logOut = () =>{
  sessionStorage.clear();
  localStorage.clear();
  window.location = "login.html";
};

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


//btnlogOut.addEventListener('click', logOut());

document.addEventListener('DOMContentLoaded', () => {
  if(sessionStorage.getItem('logued') == undefined || sessionStorage.getItem('logued') == 'false'){
    sessionStorage.setItem('logued', 'false');
    window.location = "login.html";
  }
  showMail();
  initCart();
})

