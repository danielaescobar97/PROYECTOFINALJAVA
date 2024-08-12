// Obtener referencias a los elementos del DOM
const carritoModal = document.getElementById('cartModal');
const buyItems = document.getElementById('buyItems');
const sumPrices = document.getElementById('sum-prices');
const checkoutButton = document.querySelector('.checkout');
const emptyMessage = document.querySelector('.empty');

// Variable global para el carrito
let carrito = [];

// Cargar carrito desde localStorage
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

        // Actualizar el total de precios
        const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
        sumPrices.innerText = `Total: $${total}`;
    } else {
        emptyMessage.classList.remove('hidden');
        checkoutButton.classList.add('hidden');
        sumPrices.innerText = '';
    }
}

// Añadir producto al carrito
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

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarritoUI();
}

// Función para el checkout
function finalizarCompra() {
    const nombre = prompt("Ingrese su nombre:");
    const direccion = prompt("Ingrese su dirección:");
    const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

    alert(`Gracias por tu compra, ${nombre}!\nDirección: ${direccion}\nTotal a pagar: $${total}`);
    
    vaciarCarrito();
}

// Eventos
document.addEventListener('DOMContentLoaded', cargarCarrito);

document.querySelectorAll('.addToCart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId, 10);
        agregarProducto(productId);
    });
});

checkoutButton.addEventListener('click', finalizarCompra);
