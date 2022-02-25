window.addEventListener('load', () => {
    //For toast
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }

    let userEmail = document.querySelector('input#email');
    let userPassword = document.querySelector('input#contrasena');
    let globalValidations = document.querySelector('.global');
    let form = document.querySelector('form.userLogin');

    //To make the cursor focus in the first input of the form
    userEmail.focus();
    userEmail.select();

    //Events
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

            let settings = {
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                }
            };

            fetch('http://localhost:3500/api/v2/user/email?email=' + userEmail.value, settings)
            .then((dat) => {
                return dat.json();
            })
            .then((correo) => {
                if(correo.email != userEmail.value){
                    userEmail.nextElementSibling.innerText = "El email ingresado no ha sido registrado aún. Favor de crear una cuenta para poder iniciar sesión";
                } 
            })
            .catch((e) => {
                console.log(e);
            });
        }
    })

    userPassword.addEventListener('blur', () => {
        if(userPassword.value == ""){
            userPassword.nextElementSibling.innerText = "La contraseña no puede estar vacía";
        } else {
            userPassword.nextElementSibling.innerText = "";
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
            globalValidations.innerText = "Existen errores con los datos ingresados, favor de corregirlos antes de intentar iniciar sesión";
        }
    });

});