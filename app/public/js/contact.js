// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: 19.448314775791964, lng: -99.13126022572531 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
}

window.onload = (event) => {
  let myAlert = document.querySelectorAll('.toast')[0];
  if (myAlert) {
    let bsAlert = new bootstrap.Toast(myAlert);
    bsAlert._config.delay = 4000;
    bsAlert.show();
  }

  //Form validation
  let contactName = document.querySelector('input#nombreCompleto');
  let contactEmail = document.querySelector('input#email');
  let contactMessage = document.querySelector('textarea#message');
  let globalValidations = document.querySelector('.global');
  let form = document.querySelector('form.contactForm');

  //Events
  contactName.addEventListener('blur', () => {
    if(contactName.value == ""){
      contactName.nextElementSibling.innerText = "El nombre no puede estar vacío";
    } 
  });

  contactName.addEventListener('change', () => {
      if(contactName.value.length < 2){
        contactName.nextElementSibling.innerText = "El nombre debe tener al menos 2 caracteres";
      } else {
        contactName.nextElementSibling.innerText = "";
      }
  });

  contactEmail.addEventListener('blur', () => {
      if(contactEmail.value == ""){
        contactEmail.nextElementSibling.innerText = "El email no puede estar vacío";
      } 
  });

  contactEmail.addEventListener('change', () => {
      if(!contactEmail.value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
          contactEmail.nextElementSibling.innerText = "El email introducido no tiene un formato válido";
      } else {
        contactEmail.nextElementSibling.innerText = "";
      }
  });

  contactMessage.addEventListener('blur', () => {
    if(contactMessage.value == ""){
      contactMessage.nextElementSibling.innerText = "El mensaje no puede estar vacío";
    } 
  });

  contactMessage.addEventListener('change', () => {
      if(contactMessage.value.length < 20){
        contactMessage.nextElementSibling.innerText = "El mensaje debe tener al menos 20 caracteres";
      } else {
        contactMessage.nextElementSibling.innerText = "";
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
          globalValidations.innerText = "Existen errores con los datos ingresados, favor de corregirlos antes de intentar enviar un mensaje";
      }
  });
}