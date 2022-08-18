// Autos Cat 101
const urlAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const textHeading = document.querySelector('.text-heading');
const productCard = document.querySelector('.card-container');

let mostrarAutos = function(){   
    textHeading.innerHTML += "Veras aquí todos los productos de la categoría autos";
    const autos = getJSONData(urlAutos);
    let newCard = document.createElement('div');
    newCard = productCard;
    let precio = newCard.querySelector('.precio')
    let nombre = newCard.querySelector('.nombre')
    let descripcion = newCard.querySelector('.descripcion')
    let vendidos = newCard.querySelector('.vendidos')
    let imagen = newCard.getElementsByTagName('img');
    
    
    for (car of autos){
        precio.innerHTML += car[3];  
        nombre.innerHTML += car[1]; 
        descripcion.innerHTML += car[2];  
        vendidos.innerHTML += car[5];
        imagen
    }

}
let catId = localStorage.catID;
let llenarPag = function(){
    switch(catId){
        case '101':
            mostrarAutos();
        break;
    }
}
llenarPag();