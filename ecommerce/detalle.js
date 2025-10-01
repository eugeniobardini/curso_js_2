const data = [
    {
        id: 1,
        nombre: "Remera básica",
        descripcion: "Remera de algodón 100% en varios colores",
        precio: 5000,
        stock: 20,
        categoria: "Ropa",
        imagen: "imagenes/remerabasica.webp"
    },
    {
        id: 2,
        nombre: "Pantalón jean",
        descripcion: "Jean azul clásico, corte recto",
        precio: 12000,
        stock: 15,
        categoria: "Ropa",
        imagen: "imagenes/pantalonjean.jpg"
    },
    {
        id: 3,
        nombre: "Zapatillas urbanas",
        descripcion: "Zapatillas cómodas para uso diario",
        precio: 25000,
        stock: 10,
        categoria: "Calzado",
        imagen: "imagenes/zapatillasurbanas.webp"
    },
    {
        id: 4,
        nombre: "Cartera de cuero",
        descripcion: "Cartera negra de cuero legítimo",
        precio: 18000,
        stock: 5,
        categoria: "Accesorios",
        imagen: "imagenes/carteracueo.webp"
    }
];


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