let currentProduct = null;
let counter = null;

// Función para mostrar detalle del producto
function mostrarDetalleProducto(id) {
    const producto = data.find(p => p.id === id);
    if (!producto) return;

    currentProduct = producto;
    const modalBody = document.getElementById('productoModalBody');
    const tieneSesion = localStorage.getItem("email");
    
    // Ternario para mostrar opciones de compra según sesión
    const opcionesCompra = tieneSesion 
        ? `<div class="mt-4">
              <div class="input-group mb-3" style="max-width: 200px;">
                  <button class="btn btn-outline-secondary" type="button" onclick="decreaseItem()">-</button>
                  <input type="number" class="form-control text-center" value="1" min="1" max="${producto.stock}" id="cantidadProducto">
                  <button class="btn btn-outline-secondary" type="button" onclick="increaseItem()">+</button>
              </div>
              <button class="btn btn-success col-12" onclick="addItems()">
                  <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">
                    shopping_cart
                  </span>
                  Agregar al Carrito
              </button>
           </div>`
        : `<div class="mt-4">
              <a href="./login.html" class="btn btn-primary">Iniciar sesión para comprar</a>
           </div>`;

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
            </div>
            <div class="col-md-6">
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <p><strong>Precio: $${producto.precio}</strong></p>
                <p><strong>Stock: ${producto.stock}</strong></p>
                <p><strong>Categoría: ${producto.categoria}</strong></p>
                ${opcionesCompra}
            </div>
        </div>
    `;

    // Inicializar el counter después de renderizar el modal
    counter = document.querySelector('#cantidadProducto');
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    modal.show();
}

// Función para aumentar cantidad
function increaseItem() {
    if (!counter || !currentProduct) return;
    
    let nuevaCantidad = Number(counter.value) + 1;
    if (nuevaCantidad <= currentProduct.stock) {
        counter.value = nuevaCantidad;
    }
}

// Función para disminuir cantidad
function decreaseItem() {
    if (!counter) return;
    
    let nuevaCantidad = Number(counter.value) - 1;
    if (nuevaCantidad >= 1) {
        counter.value = nuevaCantidad;
    }
}


function addItems() {
    if (!counter || !currentProduct) return;
    
    const cantidad = Number(counter.value);
    if (cantidad < 1) return;

    // SweetAlert2 para confirmación
    Swal.fire({
        title: '¿Estás segura/o?',
        text: `¿Querés agregar ${cantidad} ${currentProduct.nombre} al carrito?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '¡Sí, agregar!',
        cancelButtonText: 'Ay no, tengo miedo',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        background: '#ffffff',
        customClass: {
            popup: 'border-radius-15'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // LÓGICA ORIGINAL DEL CARRITO (INTACTA)
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const productIndex = cart.findIndex(item => item.id === currentProduct.id);

            if (productIndex !== -1) {
                cart[productIndex].quantity += cantidad;
            } else {
                cart.push({
                    ...currentProduct,
                    quantity: cantidad
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            
            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            localStorage.setItem("quantity", totalQuantity.toString());
            
            updateCartQuantity();
            
            Toastify({
                text: `✅ Agregaste ${cantidad} ${currentProduct.nombre} al carrito`,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "#28a745",
                    borderRadius: "8px",
                    fontSize: "14px",
                    padding: "12px 20px"
                }
            }).showToast();

            // Resetear y cerrar modal
            counter.value = 1;
            const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
            modal.hide();
        }
    });
}