const table = document.querySelector('.table-container');
let cart = [];

const getCart = () => {
    if(localStorage.getItem('cart') == undefined){
        getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj) {
            if(resultObj.status == "ok"){
                appendProducts(resultObj.data.articles);   
                cart = resultObj.data.articles;        
                localStorage.setItem('cart', JSON.stringify(cart)); 
                
            };
        })
    }else {
        cart = JSON.parse(localStorage.getItem('cart'));
        appendProducts(cart);
        
    }
};

const appendProducts = products => {
    let htmlToAppend = "";    
    for( let product of products){
        let subTotal = product.unitCost * product.count;
        htmlToAppend += `
        <tr>
            <th scoope="col" class="col-2" ><img class="img-fluid" src="${product.image}"></img></th>
            <th scoope="col" class="col-3">${product.name}</th>
            <th scoope="col" class="col-2">${product.unitCost}</th>
            <th scoope="col" class="col-2" ><input id="input${product.id}" class="form-control inputCount" min="1" type="number" value="${product.count}"> </input></th>
            <th scoope="col" class="col-3" ><p id="p${product.id}">${product.currency} ${subTotal}</p></th>
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
            for ( let product of cart){
                if(product.id == inputId){
                    let pSubTotal = document.getElementById('p' + inputId); 
                    let subTotal = input.value * product.unitCost;
                    pSubTotal.innerHTML = product.currency + " " + subTotal;                   
                }
            }

        })
    }
};

const addProductToCart =  product  => {
    window.location = "cart.html";     
    
    
};




document.addEventListener('DOMContentLoaded', () => {
    getCart();
});