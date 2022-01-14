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

window.onload = (event) => {
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }
};