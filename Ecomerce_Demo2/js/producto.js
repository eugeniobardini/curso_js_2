// Función para mostrar detalle del producto
function mostrarDetalleProducto(id) {
    const producto = data.find(p => p.id === id);
    if (!producto) return;

    const modalBody = document.getElementById('productoModalBody');
    const tieneSesion = localStorage.getItem("email");
    
    // Ternario para mostrar opciones de compra según sesión
    const opcionesCompra = tieneSesion 
        ? `<div class="mt-4">
              <div class="input-group mb-3" style="max-width: 200px;">
                  <button class="btn btn-outline-secondary" type="button" onclick="cambiarCantidad(-1)">-</button>
                  <input type="number" class="form-control text-center" value="1" min="1" max="${producto.stock}" id="cantidadProducto">
                  <button class="btn btn-outline-secondary" type="button" onclick="cambiarCantidad(1)">+</button>
              </div>
              <button class="btn btn-success">Comprar</button>
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

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    modal.show();
}

// Función para cambiar cantidad
function cambiarCantidad(cambio) {
    const inputCantidad = document.getElementById('cantidadProducto');
    let nuevaCantidad = parseInt(inputCantidad.value) + cambio;
    const stockMaximo = parseInt(inputCantidad.max);
    
    if (nuevaCantidad >= 1 && nuevaCantidad <= stockMaximo) {
        inputCantidad.value = nuevaCantidad;
    }
}