window.addEventListener('load', () => {
    //For toast
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }

    let userName = document.querySelector('input#nombre');
    let userLastName = document.querySelector('input#apellido');
    let userEmail = document.querySelector('input#email');
    let userPassword = document.querySelector('input#contrasena');
    let userPasswordConfirmation = document.querySelector('input#confirmarcontrasena');
    let userAvatar = document.querySelector('input#avatar');
    let globalValidations = document.querySelector('.global');
    let passwordCheck = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    let form = document.querySelector('form.userRegister');

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
    })

    userPassword.addEventListener('blur', () => {
        if(userPassword.value == ""){
            userPassword.nextElementSibling.innerText = "La contraseña no puede estar vacía";
        } 
    });

    userPassword.addEventListener('change', () => {
        if(userPassword.value.length < 8){
            userPassword.nextElementSibling.innerText = "La contraseña debe tener al menos 8 caracteres";
        } else {
            if(!passwordCheck.test(userPassword.value)){
                userPassword.nextElementSibling.innerText = "La contraseña debe contener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial";
            } else {
                userPassword.nextElementSibling.innerText = "";
            }
        }
    });

    userPasswordConfirmation.addEventListener('blur', () => {
        if(userPasswordConfirmation.value == ""){
            userPasswordConfirmation.nextElementSibling.innerText = "La confirmación de contraseña no puede estar vacía";
        } 
    });

    userPasswordConfirmation.addEventListener('change', () => {
        if(userPasswordConfirmation.value.length < 8){
            userPasswordConfirmation.nextElementSibling.innerText = "La confirmación de contraseña debe tener al menos 8 caracteres";
        } else {
            if(!passwordCheck.test(userPasswordConfirmation.value)){
                userPasswordConfirmation.nextElementSibling.innerText = "La contraseña debe contener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial";
            } else {
                userPasswordConfirmation.nextElementSibling.innerText = "";
            }
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