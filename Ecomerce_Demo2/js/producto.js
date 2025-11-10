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
              <button class="btn btn-success col-12" onclick="addItems()">Comprar</button>
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

// Función para agregar items al carrito
function addItems() {
    if (!counter || !currentProduct) return;
    
    const cantidad = Number(counter.value);
    if (cantidad < 1) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === currentProduct.id);

    if (productIndex !== -1) {
        // Si ya existe, actualizar cantidad
        cart[productIndex].quantity += cantidad;
    } else {
        // Si no existe, agregar producto completo
        cart.push({
            ...currentProduct,
            quantity: cantidad
        });
    }

    // Guardar carrito actualizado
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Calcular y actualizar quantity total
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("quantity", totalQuantity.toString());
    
    // Actualizar nav
    updateCartQuantity();
    
    // Resetear counter y cerrar modal
    counter.value = 1;
    const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
    modal.hide();
    
    alert('Producto agregado al carrito!');
}