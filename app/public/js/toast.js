/*$(document).ready(function(){
  $('#liveToast').toast('show');
});
$('.toast').on("load",function(){
    console.log("Entré");
    $('.toast').toast('show');
});*/

window.onload = (event) => {
  console.log("Holaaaa");
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }
};