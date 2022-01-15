window.onload = (event) => {
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }

    if($('#addWishlistModal').css('display') == 'block'){
      $('#addWishlistModal').modal('show');

      $('.closing').on('click', () => {
        let url = $('.modal-body').find('form').attr('action');
        let productId = url.charAt(url.length - 1);
        window.location='/product/' + productId;
      });
    }
};