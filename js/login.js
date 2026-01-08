const submitLogin = document.querySelector("#login form");
const message = document.querySelector("#formLoginMessage");

const handleSubmitLogin = (ev) => {
    ev.preventDefault();
    
    let emailForm = ev.target.elements.email.value;
    let passwordForm = ev.target.elements.password.value;

    if (emailForm === USER_LOGIN.email && passwordForm === USER_LOGIN.password) {
        localStorage.setItem("email", emailForm);
        localStorage.setItem("cart", JSON.stringify([])); // Cart vacío
        localStorage.setItem("quantity", "0"); // Quantity en 0
        location.href = "./index.html";
    } else {
        message.textContent = 'Por favor introduce credenciales válidas.';
        message.style.color = 'red';
    }
};

submitLogin.addEventListener("submit", handleSubmitLogin);