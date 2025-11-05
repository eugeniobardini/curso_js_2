// SOLO para los botones de sesión
function renderSessionButtons() {
    const sessionNav = document.getElementById('sessionNav');
    const email = localStorage.getItem("email");
    
    // Ternario para evaluar el email en localStorage
    sessionNav.innerHTML = email 
        ? `<li class="nav-item">
              <span class="navbar-text me-2">Hola, ${email}</span>
           </li>
           <li class="nav-item">
              <button class="btn btn-outline-danger btn-sm" onclick="closeSession()">Cerrar sesión</button>
           </li>`
        : `<li class="nav-item">
              <a class="nav-link" href="./login.html">Iniciar sesión</a>
           </li>`;
}

// Función closeSession()
function closeSession() {
    localStorage.removeItem("email");
    location.href = "./index.html";
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    renderSessionButtons();
});