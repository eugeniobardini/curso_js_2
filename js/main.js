const inputBuscar = document.querySelector('.buscar input');
const buttonBuscar = document.querySelector('.buscar button');
const clearBuscar = document.querySelector('.buscar .clear');
const container = document.getElementById("productos-container");

// ===============================
//   FUNCIÓN ORIGINAL DATA MAP
// ===============================
const dataMap = (productos) => productos.map(producto => `
    <div class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <span>$${producto.precio}</span>
        <button class="btn-carrito-simple" onclick="mostrarDetalleProducto(${producto.id})">Ver Detalle</button>
    </div>
`).join("");

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
            resolve(data);
        }, 3000);
    });
}

// ===============================
//   3. RENDERIZAR PRODUCTOS
// ===============================
function renderProducts(products) {
    container.innerHTML = dataMap(products);
}

// ===============================
//   4. BUSCADOR (FUNCIONALIDAD ORIGINAL)
// ===============================
buttonBuscar.addEventListener('click', () => {
    clearBuscar.style.display = 'inline';
    let filterData = data.filter(producto => 
        producto.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase())
    );
    
    if (!filterData.length) {
        container.innerHTML = '<h2>No se encontraron productos</h2>';
    } else {
        renderProducts(filterData);
    }
});

// Limpiar buscador
clearBuscar.onclick = () => {
    inputBuscar.value = '';
    clearBuscar.style.display = 'none';
    renderProducts(data);
};

// ===============================
//   5. FILTROS POR CATEGORÍA
// ===============================
const filtrosContainer = document.querySelector('.filtros');
const clearFiltros = document.querySelector('.filtros .clear');

filtrosContainer.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const botones = filtrosContainer.querySelectorAll('button');
    botones.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const categoriaSeleccionada = e.target.dataset.categoria;
    
    if (categoriaSeleccionada !== 'todos') {
        const filterData = data.filter(producto => 
            producto.categoria.toLowerCase() === categoriaSeleccionada
        );
        renderProducts(filterData);
        clearFiltros.style.display = 'inline';
    } else {
        renderProducts(data);
        clearFiltros.style.display = 'none';
    }
};

// Limpiar filtros
clearFiltros.onclick = () => {
    filtrosContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    renderProducts(data);
    clearFiltros.style.display = 'none';
};

// ===============================
//   6. FLUJO PRINCIPAL
// ===============================
showSpinner();

loadProductsPromise()
    .then((productos) => {
        renderProducts(productos);
    })
    .catch(() => {
        container.innerHTML = `<p>Error al cargar productos</p>`;
    });