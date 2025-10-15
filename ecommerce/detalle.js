
const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("prod")); 

const producto = data.find(p => p.id === idProducto);

const detalleDiv = document.getElementById("detalle");

if (producto) {
    detalleDiv.innerHTML = `
        <div class="detalle-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <span>$${producto.precio}</span>
        </div>
    `;
} else {
    detalleDiv.innerHTML = "<p>Producto no encontrado</p>";
}