// Función para renderizar los productos del carrito
function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartItems");
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-4">
                <h5>Tu carrito está vacío</h5>
                <p>Agrega algunos productos para continuar</p>
            </div>
        `;
        total(cart);
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="d-flex align-items-start border-bottom pb-3 mb-3">
            <div class="me-4">
                <img src="${item.imagen}" alt="${item.nombre}" class="avatar-lg rounded" />
            </div>
            <div class="flex-grow-1 overflow-hidden">
                <h5 class="text-truncate font-size-18">${item.nombre}</h5>
                <div class="row">
                    <div class="col-md-3">
                        <div class="mt-3">
                            <p class="text-muted mb-2">Precio</p>
                            <h5 class="mb-0 mt-2">$${item.precio}</h5>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mt-3">
                            <p class="text-muted mb-2">Cantidad</p>
                            <h5 class="mb-0 mt-2">${item.quantity}</h5>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mt-3">
                            <p class="text-muted mb-2">Total</p>
                            <h5>$${item.precio * item.quantity}</h5>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mt-3">
                            <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${item.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    total(cart);
}

// Función para calcular el total
function total(cart) {
    const cartTotal = document.getElementById("cart-total");
    const totalAmount = cart.reduce((acumulado, actual) => 
        acumulado + (actual.precio * actual.quantity), 0
    );
    cartTotal.textContent = "$ " + totalAmount.toFixed(2);
}

// Función para eliminar un item
function removeItem(id) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter(item => item.id !== id);
    
    localStorage.setItem("cart", JSON.stringify(newCart));
    getCart(newCart);
    
    // Actualizar quantity en nav
    const quantity = newCart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("quantity", quantity.toString());
    updateCartQuantity();
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("quantity", "0");
    getCart([]);
    updateCartQuantity();
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    getCart();
    
    document.getElementById('btn-clear-cart').addEventListener('click', clearCart);
    
    document.getElementById('btn-checkout').addEventListener('click', function() {
        alert('¡Gracias por tu compra!');
        clearCart();
    });
});