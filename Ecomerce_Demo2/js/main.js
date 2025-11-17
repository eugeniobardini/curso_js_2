const inputBuscar = document.querySelector('.buscar input');
const buttonBuscar = document.querySelector('.buscar button');
const clearBuscar = document.querySelector('.buscar .clear');
// ===============================
//  CONTENEDOR PRINCIPAL
// ===============================
const container = document.getElementById("productos-container");

// ===============================
//   1. FUNCION: MOSTRAR SPINNER
// ===============================
function showSpinner() {
    container.innerHTML = `
        <div class="spinner"></div>
    `;
}

// ===============================
//   2. PROMESA: ESPERAR 3 SEGUNDOS
// ===============================
function loadProductsPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data); // 'data' viene de data.js
        }, 3000);
    });
}

// ===============================
//   3. RENDERIZAR PRODUCTOS
// ===============================
function renderProducts(products) {
    container.innerHTML = "";

    products.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card-producto");

        card.innerHTML = `
          <div class="card">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <span>$${producto.precio}</span>
            <button class="btn-carrito-simple" onclick="mostrarDetalleProducto(${producto.id})">Ver Detalle</button>
         </div>
        `

        container.appendChild(card);
    });
}
// ===============================
//   4. APLICAR FILTROS
// ===============================

// Botones de filtro
const filterButtons = document.querySelectorAll(".filtros button");
const clearFilters = document.querySelector(".filtros .clear");

// Aplicar un filtro
function aplicarFiltro(categoria) {
    const productosFiltrados =
        categoria === "todos"
            ? data
            : data.filter(p => p.categoria === categoria);

    renderProducts(productosFiltrados);
}

// Eventos de los botones
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filtros .active").classList.remove("active");
        btn.classList.add("active");
        aplicarFiltro(btn.dataset.categoria);
    });
});

// Limpiar filtro
clearFilters.addEventListener("click", () => {
    aplicarFiltro("todos");
});

// ===============================
//   5. FLUJO PRINCIPAL
// ===============================
showSpinner();  // Primero: mostrar spinner

loadProductsPromise()  // Espera 3 segundos
    .then((productos) => {
        renderProducts(productos); // Reemplaza el spinner por la grilla
    })
    .catch(() => {
        container.innerHTML = `<p>Error al cargar productos</p>`;
    });
