$('#confirmationModal').on('click', () => {
    //Get the list id
    let identifier = $('.list-group .active').attr('aria-controls');

    //Add it to the delete button
    $('#confirmationModal').attr('data-target', '#confirmationModal' + '_' + identifier);

    //Add List to the delete button form action
    let modal = $('#confirmationModal_' + identifier);
    let originalUrl = modal.find('form').attr('action');
    originalUrl = originalUrl.replace('delete', 'deleteList');
    modal.find('form').attr('action', originalUrl);
});

function extract(identifier) {
  let text = identifier.substring(0,identifier.indexOf(' '));
  let delButTex = 'Eliminar lista';
  $('#confirmationModal').text(delButTex + ' ' + text);
}

function updateActive(element) {
  extract($(element).text());
}

window.onload = (event) => {
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }

    //To add the name of the list to the button
    let identifier = $('.list-group .active').text();
    extract(identifier);

    if($('#addWishlistModal').css('display') == 'block'){
      $('#addWishlistModal').modal('show');

      $('.closing').on('click', () => {
        let url = $('.modal-body').find('form').attr('action');
        let productId = url.charAt(url.length - 1);
        window.location='/product/' + productId;
      });
    }
};