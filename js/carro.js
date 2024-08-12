
const carritoModal = document.getElementById('cartModal');
const buyItems = document.getElementById('buyItems');
const sumPrices = document.getElementById('sum-prices');
const checkoutButton = document.querySelector('.checkout');
const emptyMessage = document.querySelector('.empty');

let carrito = [{ id: 1, title: "Collar Iniciales", category: "Collares", price: 19000, img: "./img/img1.png" },
    { id: 2, title: "Pulsera 3 circulos", category: "Pulseras", price: 66000, img: "./img/img2.png" },
    { id: 3, title: "Aretes circulos multifunción", category: "Aretes", price: 50000, img: "./img/img3.png" },
    { id: 4, title: "Earcuf Circulos", category: "Aretes", price: 36000, img: "./img/img4.png" },
    { id: 5, title: "Aretes Murralla", category: "Aretes", price: 50000, img: "./img/img5.png" },
    { id: 6, title: "Topos Flor con Murralla", category: "Aretes", price: 31000, img: "./img/img6.png" },
    { id: 7, title: "Topos Monstera con Murralla", category: "Aretes", price: 31000, img: "./img/img7.png" },
    { id: 8, title: "Topos Circulos textura con Murralla", category: "Aretes", price: 31000, img: "./img/img8.png" },
    { id: 9, title: "Aretes Monstera Fiigrana", category: "Aretes", price: 100000, img: "./img/img9.png" },
    { id: 10, title: "Aretes Filigrana loros con murralla", category: "Aretes", price: 70000, img: "./img/img10.png" }];


function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    actualizarCarritoUI();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar la interfaz del carrito
function actualizarCarritoUI() {
    buyItems.innerHTML = '';
    if (carrito.length > 0) {
        emptyMessage.classList.add('hidden');
        checkoutButton.classList.remove('hidden');

        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'buyItem';

            li.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="product-details">
                    <h5>${item.title}</h5>
                    <h6>$${item.price} x ${item.cantidad}</h6>
                    <button class="btn btn-danger btn-sm eliminar-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            buyItems.appendChild(li);
        });

      
        const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
        sumPrices.innerText = `Total: $${total}`;
    } else {
        emptyMessage.classList.remove('hidden');
        checkoutButton.classList.add('hidden');
        sumPrices.innerText = '';
    }
}


function agregarProducto(productoId) {
    const producto = catalogo.find(item => item.id === productoId);

    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarritoUI();
}

// Eliminar producto individual del carrito
buyItems.addEventListener('click', function (e) {
    if (e.target.classList.contains('eliminar-item')) {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarritoUI();
    }
});


function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarritoUI();
}


function finalizarCompra() {
    const nombre = prompt("Ingrese su nombre:");
    const direccion = prompt("Ingrese su dirección:");
    const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

    alert(`Gracias por tu compra, ${nombre}!\nDirección: ${direccion}\nTotal a pagar: $${total}`);
    
    vaciarCarrito();
}


document.addEventListener('DOMContentLoaded', cargarCarrito);

document.querySelectorAll('.addToCart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId, 10);
        agregarProducto(productId);
    });
});

checkoutButton.addEventListener('click', finalizarCompra);
