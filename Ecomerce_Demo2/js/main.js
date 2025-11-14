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

    products.forEach((p) => {
        const card = document.createElement("div");
        card.classList.add("card-producto");

        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p class="precio">$${p.precio}</p>
            <button class="btn btn-dark" data-id="${p.id}" data-bs-toggle="modal" data-bs-target="#productoModal">
                Ver Detalle
            </button>
        `;

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
