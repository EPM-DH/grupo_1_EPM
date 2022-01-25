window.onload = (event) => {
    $('#cartModal').modal('show');
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }
};

$('.dimiss-button').on('click', () => {
  $('#cartModal').modal('hide');
});

$('.add-button').on('click', () => {
  $('#cartModal').modal('hide');
});