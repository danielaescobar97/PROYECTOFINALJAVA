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
        return `<article class="item">
            <img src=${item.img} class="photo" alt=${item.title}>
            <div class="item-info">
                <h4 class="productName">${item.title}</h4>
                <h4 class="price priceValue">${item.price}</h4>
                <button type="button" class="btn btn-light addToCart" data-product-id=${item.id}>Comprar</button>
            </div>
        </article>`;
    });
    displaycatalogo = displaycatalogo.join("");
    sectionCenter.innerHTML = displaycatalogo;
}
