// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
const table = document.querySelector('.table-container');
let varCart = [];
const getCart = () => {
    let cart = localStorage.getItem('cart');
    if(cart != ''){
        cart = JSON.parse(localStorage.getItem('cart'));
        varCart = cart;
        appendProducts(cart);
    }
};

const appendProducts = products => {
    let htmlToAppend = "";    
    for( let product of products){
        let subTotal = 0;
        if(product.currency == "UYU"){
             subTotal = product.unitCost * product.count / 40;
        }else {
             subTotal = product.unitCost * product.count;
        }
        htmlToAppend += `
        <tr>
            <th scoope="col" class="col-2" ><img class="img-fluid" src="${product.image}"></img></th>
            <th scoope="col" class="col-3">${product.name}</th>
            <th scoope="col" class="col-1">${product.unitCost}</th>
            <th scoope="col" class="col-2" ><input id="input${product.id}" class="form-control inputCount" min="1" type="number" value="${product.count}"> </input></th>
            <th scoope="col" class="col-3 p" ><p class="productSub" id="p${product.id}">USD ${subTotal}</p></th>
            <th scoope="col" class"col-1"><button type="button" class="btn-close" id="rem${product.id}" aria-label="Close" onclick="removeProduct(${product.id})"></button></th>
        </tr>`; 
    }
    table.innerHTML = htmlToAppend;
    addListeners();
};

const addListeners = () => {
    let inputs = document.querySelectorAll('.inputCount');
    for (let input of inputs){
        let inputId = input.getAttribute('id').substring(5,10);
        input.addEventListener('input', () => { /* Recordatorio intentar fragmentar */
            for ( let product of varCart){
                if(product.id == inputId){
                    let pSubTotal = document.getElementById('p' + inputId); 
                    let subTotal = input.value * product.unitCost;
                    pSubTotal.innerHTML = product.currency + " " + subTotal;
                    setPrices(); 
                    product.count = input.value;
                    localStorage.setItem('cart', JSON.stringify(varCart));                  
                }; 
            };

        });
    };
};
//Precios
const subTotal = document.getElementById('pSubtotal');
const shippingCost = document.getElementById('pEnvio');
const total = document.getElementById('pTotal');
let setPrices = () => {
    let productsSub = document.querySelectorAll('.productSub');
    let additionSubt = 0;
    for(let productSubtotal of productsSub){
        additionSubt += parseInt(productSubtotal.innerText.substring(4));
    }
    subTotal.innerHTML = "USD " + additionSubt;
    setShippingCost(additionSubt);
};

let premium = document.getElementById('premium');
let express = document.getElementById('express');
let standard = document.getElementById('standard');


let setShippingCost = sub => {
    let calcShippingCost = 0;
    
    if(premium.checked){
        calcShippingCost = Math.round(sub * 0.15);
    }else if (express.checked){
        calcShippingCost = Math.round(sub * 0.07);
    }else if(standard.checked){
        calcShippingCost = Math.round(sub * 0.05);
    }else {
        total.innerHTML = 0;
    }
    shippingCost.innerHTML = "USD " + calcShippingCost;
    calcShippingCost += sub;
    total.innerHTML = "USD " + calcShippingCost;
};

// Escuchadores tipo de envio
premium.addEventListener('click', () => {
    setPrices();
});
express.addEventListener('click', () => {
    setPrices();
});
standard.addEventListener('click', () => {
    setPrices();
});

//Tipo de pago
const creditCard = document.getElementById('credit-card');
const wireTransfer = document.getElementById('wire-transfer');
//inputs modal
const cardNumber = document.getElementById('card-number');
const segurityCode = document.getElementById('segurity-code');
const expiration = document.getElementById('expiration');
const countNumber = document.getElementById('count-number');

creditCard.addEventListener('click', () => {
    if(creditCard.checked){
        countNumber.setAttribute('disabled', 'true')

        cardNumber.removeAttribute('disabled');
        segurityCode.removeAttribute('disabled');
        expiration.removeAttribute('disabled');
    }
});

wireTransfer.addEventListener('click', () => {
    if(wireTransfer.checked){
        cardNumber.setAttribute('disabled', 'true');
        segurityCode.setAttribute('disabled', 'true');
        expiration.setAttribute('disabled', 'true');

        countNumber.removeAttribute('disabled');
        
    }
});

//inputs direccion
const inputStreet = document.getElementById('input-street');
const inputNumber = document.getElementById('input-number');
const inputCorner = document.getElementById('input-corner');

const btnCheckout = document.getElementById('checkout');


let checkShipping = () => {
    if(premium.checked || express.checked || standard.checked){
        document.getElementById('shipping-feedback').classList.add('d-none');
    }else {
        document.getElementById('shipping-feedback').classList.remove('d-none');
    }
};

let checkDirection = () => {
    if(!inputStreet.value){
        inputStreet.classList.remove('is-valid');
        inputStreet.classList.add('is-invalid');
    }else {
        inputStreet.classList.remove('is-invalid');
        inputStreet.classList.add('is-valid');
    }
    if (!inputNumber.value) {
        inputNumber.classList.remove('is-valid');
        inputNumber.classList.add('is-invalid');
    }else {
        inputNumber.classList.remove('is-invalid');
        inputNumber.classList.add('is-valid');
    }
    if (!inputCorner.value){
        inputCorner.classList.remove('is-valid');
        inputCorner.classList.add('is-invalid');
    }else {
        inputCorner.classList.remove('is-invalid');
        inputCorner.classList.add('is-valid');
    }
};

let checkModalValidity = () => {
    const formulario = document.getElementById('form-modal');
    formulario.addEventListener('submit', function(event){  
            if (!form.checkValidity()) {
              
            }
            form.classList.add('was-validated')
          
    });
};

const cbCreditCard = document.getElementById('cretit-card');
const cbWireTransfer = document.getElementById('wire-transfer');
const inputCardNumber = document.getElementById('card-number');
const inputSeguriryCode = document.getElementById('segurity-code');
const inputExpiration = document.getElementById('expiration');
const inputCountNumber = document.getElementById('count-number');
const btnSubmitPayMethod = document.getElementById('btnSubmitPayMethod');
const pPayMethod = document.getElementById('pPayMethod');

let checkModal = () => {
    if(cbCreditCard.checked){
        if(!inputCardNumber.value){
            inputCardNumber.classList.remove('is-valid')
            inputCardNumber.classList.add('is-invalid')
        }else{
            inputCardNumber.classList.remove('is-invalid')
            inputCardNumber.classList.add('is-valid');
        }
        if(!inputSeguriryCode.value){
            inputSeguriryCode.classList.remove('is-valid');
            inputSeguriryCode.classList.add('is-invalid');
        }else {
            inputSeguriryCode.classList.remove('is-invalid');
            inputSeguriryCode.classList.add('is-valid');
        }
        if(!inputExpiration.value){
            inputExpiration.classList.remove('is-valid');
            inputExpiration.classList.add('is-invalid');
        }else {
            inputExpiration.classList.remove('is-invalid');
            inputExpiration.classList.add('is-valid');
        }
    }else if(cbWireTransfer.checked){
        if(!inputCountNumber.value){
            inputCountNumber.classList.remove('is-valid');
            inputCountNumber.classList.add('is-invalid');
        }else {
            inputCountNumber.classList.remove('is-invalid');
            inputCountNumber.classList.add('is-valid');
        }
    }else {
        
    }
};

//Borrar producto

let removeProduct = prodId => {
    for( let i = 0; i < varCart.length; i++){
        if(varCart[i].id == prodId){
            varCart.splice(i, 1); 
            localStorage.setItem('cart', JSON.stringify(varCart));   
            getCart();
        }
    }
};

// escuchadores

cbCreditCard.addEventListener('click', () => {
    if(cbCreditCard.checked){
        pPayMethod.value = 'Tarjeta de crédito';
        console.log('hola');
    }
});

cbWireTransfer.addEventListener('click', () => {
    if(cbWireTransfer.checked){
        pPayMethod.value = 'Tranferencia bancaria';
    }
});

btnCheckout.addEventListener('click', () => {
    checkShipping();
    checkDirection();
});

btnSubmitPayMethod.addEventListener('click', () => {
    checkModal(); 
});

document.addEventListener('DOMContentLoaded', () => {
    getCart();
    setPrices();
});