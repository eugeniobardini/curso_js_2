
function renderSessionButtons() {
    const sessionNav = document.getElementById('sessionNav');
    const email = localStorage.getItem("email");
    const quantity = localStorage.getItem("quantity") || "0";
    
    // Ternario para evaluar el email en localStorage
    sessionNav.innerHTML = email 
        ? `<li class="nav-item">
              <span class="navbar-text me-2">Hola, ${email}</span>
           </li>
           <li class="nav-item">
              <img height="25" src="https://static.vecteezy.com/system/resources/previews/004/999/463/non_2x/shopping-cart-icon-illustration-free-vector.jpg" alt="Carrito"/>
              <b id="quantityNav">${quantity}</b>
           </li>
           <li class="nav-item">
              <button class="btn btn-outline-danger btn-sm" onclick="closeSession()">Cerrar sesión</button>
           </li>`
        : `<li class="nav-item">
              <a class="nav-link" href="./login.html">Iniciar sesión</a>
           </li>`;
}

// Función para actualizar quantity en el nav
function updateCartQuantity() {
    const quantityNav = document.getElementById('quantityNav');
    if (quantityNav) {
        const quantity = localStorage.getItem("quantity") || "0";
        quantityNav.textContent = quantity;
    }
}

// Función closeSession()
function closeSession() {
    localStorage.removeItem("email");
    localStorage.removeItem("cart");
    localStorage.removeItem("quantity");
    location.href = "./index.html";
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    renderSessionButtons();
});