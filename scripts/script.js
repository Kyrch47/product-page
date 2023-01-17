var headerLinks = document.getElementsByClassName("header-links");
var mobileNav = document.getElementById("mobile-nav-container");

var mainImage = document.getElementById("main-product-image");
var thumbnailImages = document.getElementsByClassName("small-product-image");

var cartWindow = document.getElementById("cart");
var cartElements = document.getElementsByClassName("cart-info");
var cartNoItem = document.getElementById("cart-no-item");
var cartHasItem = document.getElementById("cart-has-item");
var cartBtnQnt = document.getElementById("cart-button-qnt");
var cartBtnDelete = document.getElementById("cart-window-delete");
var cartColor = document.getElementById("cart-path");

var itemName = document.getElementById("item-name");
var unitPrice = document.getElementById("item-price");
var quantity = document.getElementById("item-quantity");


function changeHeaderTab(tab) {
    for (let i = 0; i < headerLinks.length; i++) {
        headerLinks[i].removeAttribute("id");
    }
    tab.setAttribute('id', 'active-tab');
}

function openMobileNav() {
    mobileNav.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeMobileNav() {
    mobileNav.style.display = "none";
    document.body.style.overflow = "auto";
}

// close cart window if the user clicks anywhere else:
document.body.addEventListener('click', (event) => {
    let element = [];
    for (let i = 0; i < event.composedPath().length; i++) {
        element.push(event.composedPath()[i].className) ;   
    }
    if (!(element.includes("cart-window-container") || element.includes("cart"))) {
        cartWindow.style.display = "none";
        cartColor.style.fill = "#69707D";
    }
});

var total = 0;
var currentTotal = 0

function updateQuantity(increment) {
    total += increment;

    if (total < 0) {
        total = 0;
    } else if (total > 15) {
        total = 15;
    }

    quantity.innerText = total;
}


function cartUpdate() {
    if (cartEmpty) {
        cartNoItem.style.display = "block";
        cartHasItem.style.display = "none";
    } else if (!cartEmpty) {
        cartNoItem.style.display = "none";
        cartHasItem.style.display = "block";
    }
}


function showCart() {
    if (cartWindow.style.display == "none") {
        cartWindow.style.display = "block";
        cartColor.style.fill = "hsl(220, 13%, 13%)";
    } else if (cartWindow.style.display == "block") {
        cartWindow.style.display = "none";
        cartColor.style.fill = "#69707D";
    }

    cartUpdate();
}


var cartEmpty = true;

function addToCart() {
    currentTotal += total
    if (currentTotal > 15) {
        currentTotal = 15;
    }

    if (total > 0) {
        cartEmpty = false;
        
        let price = parseFloat(unitPrice?.innerText.replace("$", ""));
        let name = itemName?.innerText;
        let totalPrice = price * currentTotal;
        let itemInfo = [name, "$" + price.toFixed(2) + " x " + currentTotal, "$" + totalPrice.toFixed(2)];
        
        for (let i = 0; i < cartElements.length; i++) {
            cartElements[i].innerText = itemInfo[i];
        }

        cartBtnQnt.style.display = "block";
        cartBtnQnt.innerHTML = currentTotal
    }
    quantity.innerText = 0;
    total = 0
}


function removeFromCart() {
    cartEmpty = true;
    total = 0;
    currentTotal = 0;
    cartBtnQnt.style.display = "none";
    cartUpdate();
}

let photoNumber = 0;

function mobileUpdateImage(element) {
    if (element.className == "gallery-buttons button-next" && photoNumber < 3) {
        mainImage.src = imageDisplayURL[photoNumber + 1];
        photoNumber++;
    } else if (element.className == "gallery-buttons button-previous" && photoNumber > 0) {
        mainImage.src = imageDisplayURL[photoNumber - 1];
        photoNumber--;
    }
}

let imageDisplayURL = ["images/image-product-1.jpg", "images/image-product-2.jpg", "images/image-product-3.jpg", "images/image-product-4.jpg"]


for (let i = 0; i < thumbnailImages.length; i++) {
    thumbnailImages[i].addEventListener("click", () => {
        mainImage.src = imageDisplayURL[i];
    });
};
