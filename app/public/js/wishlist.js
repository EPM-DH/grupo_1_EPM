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

    //To make the modal appear when an error in addition detected 
    if($('#addWishlistModal').css('display') == 'block'){
      $('#addWishlistModal').modal('show');

      $('.closing').on('click', () => {
        window.location='/wishlist';
      });
    }

    //To make the modal appear when an error in edition detected 
    //First change the focus of the list-group 
    //Get all the modals
    let modals = $("[id^='editWishlistModal_']");
    //Get the modal with the display block
    let modal = modals.filter(function() {
      return $(this).css('display') == 'block';
    });
    //Only do if the is a display:block property
    if(modal.length != 0){
      //To change the active class
      //Get the identifier from modal
      let id = modal.attr('id');
      let ident = id.replace('editWishlistModal_', '');
      //Find the active class and remove the active class
      let active = $('.list-group .active');
      active.removeClass('active');
      //Find the class the should be active and add the class
      let newActiveClass = $("a[href*=" + ident + "]");
      newActiveClass.addClass('active');
      //Finally change the list showing in the background
      //Get the element and remove the class from it
      let activeList = $('.tab-content .active');
      activeList.removeClass('active');
      activeList.removeClass('show');
      //Add the active class to the other element
      let newActiveTabClass = $("div[id^=list-" + ident + "]");
      newActiveTabClass.addClass('active');
      newActiveTabClass.addClass('show');

      //The make the modal appear 
      modal.modal('show');
      //To be able to close the modal if wanted
      $('.closing').on('click', () => {
        window.location='/wishlist';
      });
    }

    /*if($('#editWishlistModal_').css('display') == 'block'){
      $('#editWishlistModal_').modal('show');

      $('.closing').on('click', () => {
        let url = $('.modal-body').find('form').attr('action');
        let productId = url.charAt(url.length - 1);
        window.location='/product/' + productId;
      });
    }*/
};