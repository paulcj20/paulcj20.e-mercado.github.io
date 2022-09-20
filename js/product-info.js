//Generales

const prodId = sessionStorage.getItem('prodId');
const catId = localStorage.getItem('catID');
const container = document.querySelector('.product-container');
//Carta Producto

let productTitle = document.querySelector('.product-title');
let productPrice = document.querySelector('.product-price');
let productDescription = document.querySelector('.product-description');
let productCategorie = document.querySelector('.product-categorie');
let productCount = document.querySelector('.product-count');
let productImage1 = document.querySelector('.product-image1');
let productImage2 = document.querySelector('.product-image2');
let productImage3 = document.querySelector('.product-image3');
let productImage4 = document.querySelector('.product-image4');

// Comentarios
let contenedorComentarios = document.querySelector('.comentarios');
let getCommentsArray = () => {
    getJSONData(PRODUCT_INFO_COMMENTS_URL+prodId+".json").then(function(resultObj){
        if(resultObj.status === "ok") {
            appendComments(resultObj.data)
            
        }
    });
};

let appendComments = comments => {
    for(let comment of comments){
        let htmlToAppend = 
        '<div class="card mx-5 mb-1 comment ">'+
            '<div class="card-header col d-inline ">'+
                '<p class="card-title ms-3 fw-bold">'+comment.user+" - "+ comment.dateTime+'</p> <span class="fa fa-star ms-3 " ></span><span class="fa fa-star "></span><span class="fa fa-star "></span><span class="fa fa-star "></span><span class="fa fa-star "></span>'+            
            '<div/>'+
            '<div class="card-body">'+
                '<p class="card-text">'+comment.description+' </p>'+
            '</div>'+
        '</div>';

        contenedorComentarios.innerHTML += htmlToAppend;
        
    }
    loadStars(comments);
}

let loadStars = comments => {
    let commentsUploaded = document.querySelector('.comentarios').children;
    for (let i = 0; i < comments.length ; i++){
        if(comments[i].score != 0){
            for(let e = 0; e < comments[i].score; e++  ){
                commentsUploaded[i].querySelectorAll('.fa-star')[e].className += "checked";
            };
        }
    };
};

//Producto
let getCategorieArray = () => {
    getJSONData(PRODUCTS_URL+catId+EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok"){
            let currentArray = resultObj.data.products;
            getProductInfo(resultObj.data.catName , currentArray)
            
        }
    });
};

let getProductInfo = (catName, categorieArray) => {
    for (let prod of categorieArray){
        if(prod.id == prodId){
            appendProd(catName, prod);
        };
    }
};

let appendProd = (catName, prod) => {
    productTitle.innerHTML += prod.name;
    productPrice.innerHTML += prod.cost;
    productDescription.innerHTML += prod.description;
    productCategorie.innerHTML += catName;
    productCount.innerHTML += prod.soldCount;
    productImage1.src = "img/prod"+prodId+"_1.jpg";
    productImage2.src = "img/prod"+prodId+"_2.jpg";
    productImage3.src = "img/prod"+prodId+"_3.jpg";
    productImage4.src = "img/prod"+prodId+"_4.jpg";
};
// Comentarios

const opinion = document.getElementById('inputOpinion');
const estrellas = document.getElementById('inputClasificacion');
const btnEnviar = document.getElementById('btnEnviar');
const alerta = document.querySelector('#mensajeAlerta');

btnEnviar.addEventListener('click', ()=> {
    
    if(opinion.value && estrellas.value != "Seleccionar"){
        let date = new Date();
        let dateTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() +
        " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let retorno = {
            product: prodId,
            score: estrellas.value,
            description: " "+opinion.value,
            user: localStorage.getItem('email'),
            dateTime: dateTime
        }
        getJSONData(PRODUCT_INFO_COMMENTS_URL+prodId+".json").then(function(resultObj){
            if(resultObj.status === "ok"){
                let currentArray = resultObj.data;
                currentArray.push(retorno);
                contenedorComentarios.innerHTML = "";
                appendComments(currentArray);
            }
        });
        alerta.innerHTML = "";
        opinion.innerHTML = "";
        estrellas.selected = selected;
    }else {
        alerta.innerHTML = "Debes completar todos los campos.";
    };
});

document.addEventListener('DOMContentLoaded', () => {
    getCategorieArray();
    getCommentsArray();
});
