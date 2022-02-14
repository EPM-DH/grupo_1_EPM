window.addEventListener('load', () => {
    //For toast
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }

    //For form validation
    let userName = document.querySelector('input#nombre');
    let userLastName = document.querySelector('input#apellido');
    let userEmail = document.querySelector('input#email');
    let userAvatar = document.querySelector('input#avatar');
    let globalValidations = document.querySelector('.global');
    let form = document.querySelector('form.editUser');

    //Events
    userName.addEventListener('blur', () => {
        if(userName.value == ""){
            userName.nextElementSibling.innerText = "El nombre no puede estar vacío";
        } 
    });

    userName.addEventListener('change', () => {
        if(userName.value.length < 2){
            userName.nextElementSibling.innerText = "El nombre debe tener al menos 2 caracteres";
        } else {
            userName.nextElementSibling.innerText = "";
        }
    });

    userLastName.addEventListener('blur', () => {
        if(userLastName.value == ""){
            userLastName.nextElementSibling.innerText = "El apellido no puede estar vacío";
        } 
    });

    userLastName.addEventListener('change', () => {
        if(userLastName.value.length < 2){
            userLastName.nextElementSibling.innerText = "El apellido debe tener al menos 2 caracteres";
        } else {
            userLastName.nextElementSibling.innerText = "";
        }
    });

    userEmail.addEventListener('blur', () => {
        if(userEmail.value == ""){
            userEmail.nextElementSibling.innerText = "El email no puede estar vacío";
        } 
    });

    userEmail.addEventListener('change', () => {
        if(!userEmail.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            userEmail.nextElementSibling.innerText = "El email introducido no tiene un formato válido";
        } else {
            userEmail.nextElementSibling.innerText = "";
        }
    });

    userAvatar.addEventListener('change', () => {
        let acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        let extension = userAvatar.value.split('.').pop();

        if(!acceptedExtensions.includes(extension.toLowerCase())){
            userAvatar.nextElementSibling.innerText = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;
        } else {
            userAvatar.nextElementSibling.innerText = '';
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
            globalValidations.innerText = "Existen errores con los datos ingresados, favor de corregirlos antes de intentar registrar un usuario";
        }
    });

});