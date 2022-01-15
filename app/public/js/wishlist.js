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

function deleteButton(text) {
  let delButTex = 'Eliminar lista';
  $('#confirmationModal').text(delButTex + ' ' + text);
}

function editButton(text) {
  let editButTex = 'Editar lista';
  $('#confirmationModal').parent().prev().children().text(editButTex + ' ' + text);
}

function extract(identifier) {
  let text = identifier.substring(0,identifier.indexOf(' '));
  deleteButton(text);
  editButton(text);
}

function updateActive(element) {
  //Change the buttons name
  extract($(element).text());

  //Change the modal identifier for the button
  //Get the new value
  let newVal = $(element).attr('href').replace('#list-', ''); 

  //let value = $('#editModal').attr('data-target');
  //value = value.replace('#editWishlistModal_', '');
  $('#editModal').attr('data-target', '#editWishlistModal_' + newVal);
}

$('#editModal').on('click', () => {
  //Cambiar título
  let identifier = $('.list-group .active').text();
  let text = identifier.substring(0,identifier.indexOf(' '));
  let editButTex = 'Edición de lista';
  $('#editWishlistModalTitle').text(editButTex + ' ' + text);

  //Cambiar input data 
  //$('#name').val(text);

  //Cambiar selector
});

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