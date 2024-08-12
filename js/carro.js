const catalogo = [
    { id: 1, title: "Collar Iniciales", category: "Collares", price: 19000, img: "./img/img1.png" },
    { id: 2, title: "Pulsera 3 circulos", category: "Pulseras", price: 66000, img: "./img/img2.png" },
    { id: 3, title: "Aretes circulos multifunción", category: "Aretes", price: 50000, img: "./img/img3.png" },
    { id: 4, title: "Earcuf Circulos", category: "Aretes", price: 36000, img: "./img/img4.png" },
    { id: 5, title: "Aretes Murralla", category: "Aretes", price: 50000, img: "./img/img5.png" },
    { id: 6, title: "Topos Flor con Murralla", category: "Aretes", price: 31000, img: "./img/img6.png" },
    { id: 7, title: "Topos Monstera con Murralla", category: "Aretes", price: 31000, img: "./img/img7.png" },
    { id: 8, title: "Topos Circulos textura con Murralla", category: "Aretes", price: 31000, img: "./img/img8.png" },
    { id: 9, title: "Aretes Monstera Fiigrana", category: "Aretes", price: 100000, img: "./img/img9.png" },
    { id: 10, title: "Aretes Filigrana loros con murralla", category: "Aretes", price: 70000, img: "./img/img10.png" }
];

const sectionCenter = document.querySelector('.section-center');
const filterbtns = document.querySelectorAll('.filter-btn');

window.addEventListener("DOMContentLoaded", function () {
    displaycatalogoitems(catalogo);
});

filterbtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const category = e.currentTarget.dataset.id;
        if (category === 'todo') {
            displaycatalogoitems(catalogo);
        } else {
            const catalogocategoria = catalogo.filter(function (catalogoitems) {
                return catalogoitems.category === category;
            });
            displaycatalogoitems(catalogocategoria);
        }
    });
});

function displaycatalogoitems(catalogoitems) {
    let displaycatalogo = catalogoitems.map(function (item) {
        return <article class="item">
            <img src=${item.img} class="photo" alt=${item.title}>
            <div class="item-info">
                <h4 class="productName">${item.title}</h4>
                <h4 class="price priceValue">${item.price}</h4>
                <button type="button" class="btn btn-light addToCart" data-product-id=${item.id}>Comprar</button>
            </div>
        </article>;
    });
    displaycatalogo = displaycatalogo.join("");
    sectionCenter.innerHTML = displaycatalogo;
}
y el js del carro de compras es: let productsInCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelector('.section-center');
const closeButton = document.querySelector('#closeButton');

const countTheSumPrice = function () {
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price * item.count;
    });
    return sum;
};

const updateShoppingCartHTML = function () {
    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return 
                <li class="buyItem">
                    <img src="${product.image}">
                    <div class="product-details">
                        <h5>${product.name}</h5>
                        <h6>$${product.price}</h6>
                        <div class="quantity-controls">
                            <button class="button-minus" data-id=${product.id}>-</button>
                            <span class="countOfProduct">${product.count}</span>
                            <button class="button-plus" data-id=${product.id}>+</button>
                        </div>
                    </div>
                </li>;
        }).join('');

        result += 
            <div class="total-section">
                <span class="total">Total: $${countTheSumPrice()}</span>
            </div>;

        parentElement.innerHTML = result;
        cartSumPrice.innerHTML = '$' + countTheSumPrice();
    } else {
        parentElement.innerHTML = '<h4 class="empty">Tu carro está vacío</h4>';
        cartSumPrice.innerHTML = '';
    }
};

function updateProductsInCart(product) {
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += 1;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
}

products.addEventListener('click', (e) => {
    if (e.target.classList.contains('addToCart')) {
        const productID = e.target.dataset.productId;
        const productName = e.target.parentNode.querySelector('.productName').innerText;
        const productPrice = e.target.parentNode.querySelector('.priceValue').innerText;
        const productImage = e.target.parentNode.parentNode.querySelector('img').src;

        let product = {
            name: productName,
            image: productImage,
            id: productID,
            count: 1,
            price: +productPrice,
            basePrice: +productPrice,
        };

        updateProductsInCart(product);
        updateShoppingCartHTML();
    }
});

parentElement.addEventListener('click', (e) => {
    const isPlusButton = e.target.classList.contains('button-plus');
    const isMinusButton = e.target.classList.contains('button-minus');

    if (isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == e.target.dataset.id) {
                if (isPlusButton) {
                    productsInCart[i].count += 1;
                } else if (isMinusButton) {
                    productsInCart[i].count -= 1;
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

                if (productsInCart[i].count <= 0) {
                    productsInCart.splice(i, 1);
                }
                break;
            }
        }
        updateShoppingCartHTML();
    }
});

closeButton.addEventListener('click', () => {
    document.querySelector('.producstOnCart').classList.add('hide');
    document.body.classList.remove('stopScrolling');
});

updateShoppingCartHTML();
