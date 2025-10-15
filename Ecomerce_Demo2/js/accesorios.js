
const main = document.querySelector("main");

// Filtrar SOLO productos de accesorios
const productosMujer = data.filter(producto => producto.categoria === "accesorios");

const listaProductos = productosMujer.map(producto => {
    return `
        <div class="card">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <span>$${producto.precio}</span>
        </div>
    `;
}).join(""); 

main.innerHTML = listaProductos;