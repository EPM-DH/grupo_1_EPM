function addCharacteristic() {
    //Get all the list elements
    let elements = $('.caracteristicas').children();
    //Enable minus button if required
    if(elements.length == 1) {
        let trigger = $('#decrease');
        trigger.css({"pointer-events":"auto","opacity":"1"});
    }
    //Get the id string from the last element
    let lastIdString = elements.last().children().attr('id');
    //Extract the number from the string
    var lastId = parseInt(lastIdString.match(/(\d+)/)[0]);
    //Add the new element to the end of the list
    //Get the element in the same structure <li><input></li>
    let newElement = $('#characteristic1').parent().clone();
    //Change the input data
    newElement.children().attr("id",'characteristic' + (lastId + 1)).attr("name",'characteristic' + (lastId + 1)).val('');
    //Append to the ul
    newElement.appendTo('.caracteristicas');
}

function removeCharacteristic() {
    //Get all the list elements
    let elements = $('.caracteristicas').children();
    //Gray out the minus button if required
    if(elements.length == 2) {
        let trigger = $('#decrease');
        trigger.css({"pointer-events":"none","opacity":"0.4"});
    }
    //Get the id string from the last element
    let lastIdString = elements.last().children().attr('id');

    //Delete element
    $('#' + lastIdString).parent().remove();
}

window.onload = (event) => {
    let elements = $('.caracteristicas').children();
    if(elements.length > 1) {
        let trigger = $('#decrease');
        trigger.css({"pointer-events":"auto","opacity":"1"});
    }
};