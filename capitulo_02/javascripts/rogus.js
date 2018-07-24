function moneyTextToFloat(text) {
    var cleanText = text.replace("R$ ", "").replace(",", ".");
    return parseFloat(cleanText);
}

function floatToMoneyText(value) {
    console.log(value < 1 ? "0" : "");
    console.log(Math.floor(value * 100));
    var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
    console.log(text);
    text = "R$ " + text;
    console.log(text);
    console.log(text.substr(0, text.length - 2) + "," + text.substr(-2));
    return text.substr(0, text.length - 2) + "," + text.substr(-2);
}

function readTotal() {
    var total = document.getElementById("total");
    return moneyTextToFloat(total.innerHTML);
}

function writeTotal(value) {
    var total = document.getElementById("total");
    total.innerHTML = floatToMoneyText(value);
}

function calculateTotalProducts() {
    var produtos = document.getElementsByClassName("produto");

    var totalProdutos = 0;

    for (var pos = 0; pos < produtos.length; pos++) {
        var priceElements = produtos[pos].getElementsByClassName("price");
        var priceText = priceElements[0].innerHTML;
        var price = moneyTextToFloat(priceText);

        var qtyElements = produtos[pos].getElementsByClassName("quantity");
        var qtyText = qtyElements[0].value;
        var quantity = moneyTextToFloat(qtyText);

        totalProdutos += quantity * price;

    }

    return totalProdutos;
}

function onQuantityChange() {
    writeTotal(calculateTotalProducts());
}

function onDocumentLoad() {
    var textEdits = document.getElementsByClassName("quantity");

    for (var i = 0; i < textEdits.length; i++) {
        //toda vez que um campo .quantity mudar, esse método sera invocado
        //textEdits[i].onchange =function(){writeTotal(calculateTotalProducts());};
        textEdits[i].onchange = onQuantityChange;
    }
}

window.onload = onDocumentLoad;