/*$(document).ready(function(){
  $('#liveToast').toast('show');
});
$('.toast').on("load",function(){
    console.log("Entré");
    $('.toast').toast('show');
});*/

window.onload = (event) => {
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert.show();
    }
};