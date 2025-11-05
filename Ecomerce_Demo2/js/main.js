const dataMap = (productos) => productos.map(producto => `
    <div class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <span>$${producto.precio}</span>
        <button class="btn-carrito-simple" onclick="mostrarDetalleProducto(${producto.id})">Ver Detalle</button>
    </div>
`).join("");

const main = document.querySelector("main");
main.innerHTML = dataMap(data);

// EVENTOS CLASE 18
const inputBuscar = document.querySelector('.buscar input');
const buttonBuscar = document.querySelector('.buscar button');
const clearBuscar = document.querySelector('.buscar .clear');

buttonBuscar.addEventListener('click', () => {
    clearBuscar.style.display = 'inline';
    let filterData = data.filter(producto => 
        producto.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase())
    );
    
    if (!filterData.length) {
        main.innerHTML = '<h2>No se encontraron productos</h2>';
    } else {
        main.innerHTML = dataMap(filterData);
    }
});

// Limpiar buscador
clearBuscar.onclick = () => {
    inputBuscar.value = '';
    clearBuscar.style.display = 'none';
    main.innerHTML = dataMap(data);
};

// FILTROS POR CATEGORÍA
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
        main.innerHTML = dataMap(filterData);
        clearFiltros.style.display = 'inline';
    } else {
        main.innerHTML = dataMap(data);
        clearFiltros.style.display = 'none';
    }
};

// Limpiar filtros
clearFiltros.onclick = () => {
    filtrosContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    main.innerHTML = dataMap(data);
    clearFiltros.style.display = 'none';
};