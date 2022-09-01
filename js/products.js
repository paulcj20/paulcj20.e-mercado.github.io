const tittleHeading = document.querySelector('.tittle-heading')
const textHeading = document.querySelector('.text-heading');
let catId = localStorage.catID;
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategorieArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

document.addEventListener('DOMContentLoaded', function(e) {
    getJSONData(PRODUCTS_URL+catId+EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentCategorieArray = resultObj.data.products;
            llenarPag();
        }
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
    
        document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_ASC_BY_NAME, categorieArray);
        });
    
        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_NAME, categorieArray);
        });
    
        document.getElementById("sortByCount").addEventListener("click", function(){
            sortAndShowProducts(ORDER_BY_PROD_COUNT, categorieArray);
        });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCount = undefined;
            maxCount = undefined;
    
            showProdList();
        });

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

function sortCategorie(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
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
}

function sortAndShowProducts(sortCriteria, categorieArray){
    currentSortCriteria = sortCriteria;

    if(categorieArray != undefined){
        currentCategorieArray = categorieArray;
    }

    currentCategorieArray = sortCategorie(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showProdList();
}

function showProdList(){   
    let htmlContentToAppend = "";
    
    for(let i = 0; i < currentCategorieArray.length; i++){
        
        let prod = currentCategorieArray[i];
            htmlContentToAppend += `
            <div  class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${prod.image}" alt="${prod.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${prod.name}</h4>
                            <small class="text-muted">${prod.soldCount} Vendidos</small>
                        </div>
                        <p class="mb-1"> ${prod.currency} ${prod.cost}<p> 
                        <p class="mb-1">${prod.description}</p>
                    </div>
                </div>
            </div>
            `
        
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;        
    }
}

function showLeakedPriceList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategorieArray.length; i++){
        let prod = currentCategorieArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(prod.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(prod.cost) <= maxCount))){

                htmlContentToAppend += `
                <div  class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${prod.image}" alt="${prod.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${prod.name}</h4>
                                <small class="text-muted">${prod.soldCount} Vendidos</small>
                            </div>
                            <p class="mb-1"> ${prod.currency} ${prod.cost}<p> 
                            <p class="mb-1">${prod.description}</p>
                        </div>
                    </div>
                </div>
                `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

let llenarPag = function(){   
    switch(catId){
        case '101':
        
            tittleHeading.innerHTML = "Autos";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría autos";
            showProdList(); 
        
            break;
        case '102':
            tittleHeading.innerHTML = "Juguetes";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría autos";
            showProdList();
            break;
        case '103':
            tittleHeading.innerHTML = "Muebles";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría muebles";
            showProdList();
            break;
        case '103':
            tittleHeading.innerHTML = "Herramientas";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría herramientas";
            showProdList();
           break;
        case '104':
            tittleHeading.innerHTML = "Computadoras";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría computadoras";
            showProdList();
            break;
        case '105':
            tittleHeading.innerHTML = "Vestimenta";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría vestimenta";
            showProdList();
            break;
        case '106':
            tittleHeading.innerHTML = "Electrodomésticos";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría electrodomésticos";
            showProdList();
            break;
        case '107':
            tittleHeading.innerHTML = "Deporte";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría deporte";
            showProdList();
            break;
        case '108':
            tittleHeading.innerHTML = "Celulares";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría celulares";
            showProdList();
            break;
        case '109':
            tittleHeading.innerHTML = "Juguetes";
            textHeading.innerHTML = "Veras aquí todos los productos de la categoría autos";
            showProdList();
            break;

    }
}
