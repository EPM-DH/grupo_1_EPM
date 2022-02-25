function addCharacteristic() {
    //Get all the list elements
    let elements = $('.caracteristicas').children();
    //Enable minus button if required
    if(elements.length == 1) {
        let trigger = $('#decrease');
        trigger.css({"pointer-events":"auto","opacity":"1"});
    }
    //Get the id string from the last element
    let lastIdString = elements.last().children().attr('id');
    //Extract the number from the string
    var lastId = parseInt(lastIdString.match(/(\d+)/)[0]);
    //Add the new element to the end of the list
    //Get the element in the same structure <li><input></li>
    let newElement = $('#characteristic1').parent().clone();
    //Change the input data
    newElement.children().attr("id",'characteristic' + (lastId + 1)).attr("name",'characteristic' + (lastId + 1)).val('');
    //Append to the ul
    newElement.appendTo('.caracteristicas');
}

function removeCharacteristic() {
    //Get all the list elements
    let elements = $('.caracteristicas').children();
    //Gray out the minus button if required
    if(elements.length == 2) {
        let trigger = $('#decrease');
        trigger.css({"pointer-events":"none","opacity":"0.4"});
    }
    //Get the id string from the last element
    let lastIdString = elements.last().children().attr('id');

    //Delete element
    $('#' + lastIdString).parent().remove();
}

window.onload = (event) => {
    //For adding more characteristics
    let elements = $('.caracteristicas').children();
    if(elements.length > 1) {
        let trigger = $('#decrease');
        trigger.css({"pointer-events":"auto","opacity":"1"});
    }

    //Form validation in events
    let productName = document.querySelector('input#name');
    let productPrice = document.querySelector('input#price');
    let productShortDescription = document.querySelector('textarea#shortDescription');
    let productLongDescription = document.querySelector('textarea#longDescription');
    let productRating = document.querySelector('input#rating');
    let productIdentifier = document.querySelector('input#identifier');
    let productImage = document.querySelector('input#imagenPrincipal');
    let globalValidations = document.querySelector('.global');
    let form = document.querySelector('form.productRegister');

    //To make the cursor focus in the first input of the form
    productName.focus();
    productName.select();

    //Events
    productName.addEventListener('blur', () => {
        if(productName.value == ""){
            productName.nextElementSibling.innerText = "El nombre del producto no puede estar vacío";
        } 
    });

    productName.addEventListener('change', () => {
        if(productName.value.length < 5){
            productName.nextElementSibling.innerText = "El nombre del producto debe tener al menos 5 caracteres";
        } else {
            productName.nextElementSibling.innerText = "";
        }
    });

    productPrice.addEventListener('blur', () => {
        if(productPrice.value == ""){
            productPrice.nextElementSibling.innerText = "El precio del producto no puede estar vacío";
        } else {
            productPrice.nextElementSibling.innerText = "";
        } 
    });

    productShortDescription.addEventListener('blur', () => {
        if(productShortDescription.value == ""){
            productShortDescription.nextElementSibling.innerText = "La descripción corta del producto no puede estar vacía";
        } 
    });

    productShortDescription.addEventListener('change', () => {
        if(productShortDescription.value.length < 20){
            productShortDescription.nextElementSibling.innerText = "La descripción corta del producto debe tener al menos 20 caracteres";
        } else {
            productShortDescription.nextElementSibling.innerText = "";
        }
    });

    productLongDescription.addEventListener('blur', () => {
        if(productLongDescription.value == ""){
            productLongDescription.nextElementSibling.innerText = "La descripción larga del producto no puede estar vacía";
        } 
    });

    productLongDescription.addEventListener('change', () => {
        if(productLongDescription.value.length < 40){
            productLongDescription.nextElementSibling.innerText = "La descripción larga del producto debe tener al menos 40 caracteres";
        } else {
            productLongDescription.nextElementSibling.innerText = "";
        }
    });

    productRating.addEventListener('blur', () => {
        if(productRating.value == ""){
            productRating.nextElementSibling.innerText = "La calificación del producto no puede estar vacía";
        } else {
            productRating.nextElementSibling.innerText = "";
        } 
    });

    productIdentifier.addEventListener('blur', () => {
        if(productIdentifier.value == ""){
            productIdentifier.nextElementSibling.innerText = "El identificador del producto no puede estar vacío";
        } 
    });

    productIdentifier.addEventListener('change', () => {
        if(productIdentifier.value.length < 6){
            productIdentifier.nextElementSibling.innerText = "El identificador del producto debe tener al menos 6 caracteres";
        } else {
            productIdentifier.nextElementSibling.innerText = "";

            if(document.title == "Crear producto"){
                let settings = {
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                    }
                };
    
                fetch('http://localhost:3500/api/v2/product/identifier?identifier=' + productIdentifier.value, settings)
                .then((dat) => {
                    return dat.json();
                })
                .then((identifier) => {
                    if(identifier.producto == productIdentifier.value){
                        productIdentifier.nextElementSibling.innerText = "El identificador ingresado ya se encuentra en uso. Favor de utilizar uno diferente";
                    } 
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        }
    });

    productImage.addEventListener('change', () => {
        let acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        let extension = productImage.value.split('.').pop();

        if(!acceptedExtensions.includes(extension.toLowerCase())){
            productImage.nextElementSibling.innerText = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;
        } else {
            productImage.nextElementSibling.innerText = '';
        }
        
    });

    form.addEventListener('submit', (e) => {
        let error = false;
        let errores = document.querySelectorAll('div.jsFront');
        errores.forEach((elemento) => {
            if(elemento.innerText != ''){
                error = true;
            } 
        });
        
        if(error){
            e.preventDefault();
            globalValidations.innerText = "Existen errores con los datos ingresados, favor de corregirlos antes de intentar crear un producto";
        }
    });
};