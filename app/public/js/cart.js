function calculateTotals() {
    //Cambiar subtotal y total
    let subtotals = $('[id^="subtotalI"]').text().replace(/[\n\r\s]+/g, '').trim().split('$');
    subtotals.shift();
    let subtotal = 0;
    for(item of subtotals){
        subtotal += parseFloat(item.replace(/,/g, ''));
    }
    $('#subtotal').text("$" + subtotal.toLocaleString());
    let total = subtotal + parseFloat($('#descuentos').text().replace(/[\n\r\s]+/g, '').replace('$', '').replace(/,/g, '')) + parseFloat($('#envio').text().replace(/[\n\r\s]+/g, '').replace('$', '').replace(/,/g, ''));
    $('#total').text("$" + total.toLocaleString());
}

function countItems() {
    let items = $('[id^="number"]');
    let quantity = 0;
    for(item of items) {
        quantity += parseInt(item.value);
    }
    $('#totalItems').text(quantity);
}

function calculateSubtotals(id, element, type) {
    let quantity = parseInt(element.val());
    let finalId = id.replace(type, '');
    let precio = parseFloat($('#precio' + finalId).text().trim().replace('$', '').replace(/,/g, ''));
    let subtotal = quantity*precio;
    $('#subtotalI' + finalId).text("$" + subtotal.toLocaleString());
}

function decreaseValue(element, cartId) {
    let inputElement = $('#' + element).next();
    if(parseInt(inputElement.val()) == 2){
        //Add disabled attribute to div
        let trigger = $('#' + element);
        trigger.css({"pointer-events":"none","opacity":"0.4"});
    }
    //inputElement.val(parseInt(inputElement.val()) - 1);
    //AJAX call for DB update
    //Update product subtotals
    calculateSubtotals(element, inputElement, 'decrease');

    //Update number of cart items
    countItems();

    //Update final totals
    calculateTotals();

    //Trigger backend routing
    window.location='/cart/decrease/' + cartId;
}

function increaseValue(element, cartId) {
    let inputElement = $('#' + element).prev();
    if(parseInt(inputElement.val()) == 1){
        //Remove disabled attribute from div
        let trigger = $('#' + element).prev().prev();
        trigger.css({"pointer-events":"auto","opacity":"1"});
    }
    //inputElement.val(parseInt(inputElement.val()) + 1);
    //AJAX call for DB update
    //Update product subtotals
    calculateSubtotals(element, inputElement, 'increase');

    //Update number of cart items
    countItems();

    //Update final totals
    calculateTotals();

    //Trigger backend routing
    window.location='/cart/increase/' + cartId;
}

window.onload = (event) => {
    //For toast
    let myAlert = document.querySelectorAll('.toast')[0];
    if (myAlert) {
      let bsAlert = new bootstrap.Toast(myAlert);
      bsAlert._config.delay = 4000;
      bsAlert.show();
    }

    //For cart
    calculateTotals();
    countItems();
};