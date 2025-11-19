// Función para renderizar los productos del carrito
function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartItems");
    const actionButtons = document.querySelector('.text-sm-end'); // Contenedor de botones
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-4">
                <h5>Tu carrito está vacío</h5>
                <p>Agrega algunos productos para continuar</p>
            </div>
        `;
        
        //  OCULTAR BOTONES CUANDO EL CARRITO ESTÁ VACÍO
        if (actionButtons) {
            actionButtons.style.display = 'none';
        }
        
        total(cart);
        return;
    }
    
    //  MOSTRAR BOTONES CUANDO HAY ITEMS
    if (actionButtons) {
        actionButtons.style.display = 'block';
    }

    cartContainer.innerHTML = cart.map(item => {
        //  CALCULAR TOTAL POR PRODUCTO CON PRECISIÓN
        const totalProducto = (item.precio * item.quantity);
        const totalFormateado = totalProducto.toFixed(2);
        
        return `
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
                            <h5 class="mb-0 mt-2">$${item.precio.toFixed(2)}</h5>
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
                            <h5>$${totalFormateado}</h5>
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
        `;
    }).join("");

    total(cart);
}

// Función para calcular el total
function total(cart) {
    const cartTotal = document.getElementById("cart-total");
    
    //  CÁLCULO PRECISO CON REDONDEO A 2 DECIMALES
    const totalAmount = cart.reduce((acumulado, actual) => {
        const subtotal = actual.precio * actual.quantity;
        return acumulado + subtotal;
    }, 0);
    
    //  FORMATEAR SIEMPRE CON 2 DECIMALES
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

//  NUEVA FUNCIÓN PARA CHECKOUT CON NUEVA MOCKAPI
async function checkoutOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const userEmail = localStorage.getItem("email");
    
    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'Agrega productos al carrito antes de checkout'
        });
        return;
    }
    
    if (!userEmail) {
        Swal.fire({
            icon: 'error',
            title: 'Sesión requerida',
            text: 'Debes iniciar sesión para realizar checkout'
        });
        return;
    }
    
    try {
        // Datos para enviar a MockAPI
        const orderData = {
            items: cart,
            user: userEmail
        };
        
        console.log('Enviando orden a MockAPI...', orderData);
        
        //  FETCH POST A NUEVA MOCKAPI - URL CORREGIDA
        const response = await fetch('https://691e2271bb52a1db22bd1cee.mockapi.io/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('Respuesta recibida:', response.status);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Orden creada exitosamente:', result);
        
        //  SWEETALERT DE ÉXITO
        await Swal.fire({
            icon: 'success',
            title: '¡Orden Creada!',
            html: `
                <p><strong>Email:</strong> ${userEmail}</p>
                <p><strong>Número de Orden:</strong> ${result.id}</p>
                <p>Tu pedido ha sido procesado exitosamente</p>
            `,
            confirmButtonText: '¡Genial!'
        });
        
        //  VACIAR CARRITO DESPUÉS DE ÉXITO
        clearCart();
        
    } catch (error) {
        //  SWEETALERT DE ERROR
        console.error('Error completo en checkout:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error en Checkout',
            text: 'No se pudo procesar tu orden. Intenta nuevamente.',
            confirmButtonText: 'Entendido'
        });
    }
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    getCart();
    
    document.getElementById('btn-clear-cart').addEventListener('click', clearCart);
    
    //  MODIFICADO: Ahora usa checkoutOrder con MockAPI
    document.getElementById('btn-checkout').addEventListener('click', checkoutOrder);
});