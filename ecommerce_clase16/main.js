const main = document.querySelector("main");

const listaProductos = data.map(producto => {
    return `
        <div class="card">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <span>$${producto.precio}</span>
            <a href="detalle.html?prod=${producto.id}">Ver más</a>
        </div>
    `;
}).join(""); 

main.innerHTML = listaProductos;