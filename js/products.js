const tittleHeading = document.querySelector('.tittle-heading')
const textHeading = document.querySelector('.text-heading');
let catId = localStorage.catID;
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategorieArray = [];
let secondCategorieArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let htmlContentToAppend = "";

function HtmlToAppend(id, image, description, name, soldCount, currency, cost, description) {
    htmlContentToAppend += `
            <div  onclick="viewProd(${id})" class="list-group-item list-group-item-action cursor-active rounded-3 my-1 shadow">
                <div class="row">
                    <div class="col-3">
                        <img src="${image}" alt="${description}" class="img-thumbnail rounded-3">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${name}</h4>
                            <small class="text-muted">${soldCount} Vendidos</small>
                        </div>
                        <p class="mb-1"> ${currency} ${cost}<p> 
                        <p class="mb-1">${description}</p>
                    </div>
                </div>
            </div>
            `
}

function sortCategorie(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
};


function showProdList(){   
    htmlContentToAppend = "";
    
    for(let i = 0; i < currentCategorieArray.length; i++){        
        let prod = currentCategorieArray[i];
            HtmlToAppend(prod.id, prod.image, prod.description, prod.name, prod.soldCount, prod.currency, prod.cost, prod.description);          
        
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;        
    }
}

function sortAndShowProducts(sortCriteria, categorieArray){
    currentSortCriteria = sortCriteria;

    if(categorieArray != undefined){
        currentCategorieArray = categorieArray;
    }

    currentCategorieArray = sortCategorie(currentSortCriteria, currentCategorieArray);
    //Muestro las categor??as ordenadas
    showProdList();
};

function showLeakedPriceList(){
    htmlContentToAppend = "";
    for(let i = 0; i < currentCategorieArray.length; i++){
        let prod = currentCategorieArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(prod.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(prod.cost) <= maxCount))){

                HtmlToAppend(prod.id, prod.image, prod.description, prod.name, prod.soldCount, prod.currency, prod.cost, prod.description); 
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

let llenarPag = () =>{   
    switch(catId){
        case '101':
        
            tittleHeading.innerHTML = "Autos";
            textHeading.innerHTML = "autos"; 
        
            break;
        case '102':
            tittleHeading.innerHTML = "Juguetes";
            textHeading.innerHTML = "juguetes";
            break;
        case '103':
            tittleHeading.innerHTML = "Muebles";
            textHeading.innerHTML = "muebles";
            break;
        case '103':
            tittleHeading.innerHTML = "Herramientas";
            textHeading.innerHTML = "herramientas";
           break;
        case '104':
            tittleHeading.innerHTML = "Computadoras";
            textHeading.innerHTML = "computadoras";
            break;
        case '105':
            tittleHeading.innerHTML = "Vestimenta";
            textHeading.innerHTML = "vestimenta";
            break;
        case '106':
            tittleHeading.innerHTML = "Electrodom??sticos";
            textHeading.innerHTML = "electrodom??sticos";
            break;
        case '107':
            tittleHeading.innerHTML = "Deporte";
            textHeading.innerHTML = "deporte";
            break;
        case '108':
            tittleHeading.innerHTML = "Celulares";
            textHeading.innerHTML = "celulares";
            break;
        case '109':
            tittleHeading.innerHTML = "Juguetes";
            textHeading.innerHTML = "autos";
            break;

    }
    showProdList();
};

// Producto

let viewProd = id => {
    sessionStorage.setItem("prodId", id );
    window.location = "product-info.html"
};

// Escuchadores
document.addEventListener('DOMContentLoaded', function(e) {
    getJSONData(PRODUCTS_URL+catId+EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentCategorieArray = resultObj.data.products;
            secondCategorieArray = resultObj.data.products;
            llenarPag();
        }
    });

    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProdList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por cantidad
        //de productos por categor??a.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showLeakedPriceList();
    }); 

    
});
document.getElementById('input-Filter').addEventListener('input', (e) => {
   const inputValue = e.target.value.toLowerCase();
   if(e.target.value != ""){

       currentCategorieArray = currentCategorieArray.filter(item => item.name.toLowerCase().indexOf(inputValue) === 0);
       llenarPag();
   }else {
        currentCategorieArray = secondCategorieArray;
        llenarPag();
   }

});
