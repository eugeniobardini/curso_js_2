/*
let a = prompt("ingrese el primer numero");
a = Number(a);
let b = prompt("ingrese el segundo numero");
b = Number(b);
let operacion = prompt("ingrese la operacion que desea realizar: 1 para suma, 2 para resta, 3 para multiplicacion, 4 para division");


let resultado;

if (operacion === 1) {
    resultado = a + b;
} else if (operacion === 2) {
    resultado = a - b;
} else if (operacion === 3) {
    resultado = a * b;
} else if (operacion === 4) {
    resultado = a / b;
} else {
    resultado = "dato no valido";
}
alert("el resultado es " + resultado);
*/

let opcion = Number(prompt("Ingrese una opcion para ejecutar: \n 1.Suma de dos numeros enteros \n 2.Cuenta regresiva mayor a 10 \n 3.Ingreso de datos personales"))
switch (opcion) {
    case 1:
        let a = Number(prompt("Ingrese el primer numero entero"))
        let b = Number(prompt("Ingrese el segundo numero entero"))
        console.log(a)
        if (isNaN(a) || isNaN(b)) {
            alert("Se ingreso una letra no un numero")
        } else if (a > 0 && b > 0) {
            alert(`La suma de ${a} + ${b} = ${a + b}`)
        } else { alert("El numero debe ser positivo") };
        break;
    case 2:
        let cuenta = Number(prompt("Ingrese un numero mayor o igual a 10"))
        if (cuenta >= 10) {
            for (i = cuenta; i >= 0; i--) {
                console.log(i)
            }
        } else { alert("Numero menor a 10 no es valido") };
        break;
    case 3:
        let nombre = prompt("Por favor ingrese su nombre")
        let edad = prompt("Por favor ingrese su edad")
        if (isNaN(edad)) {
            alert("La edad ingresada no es un numero")
        } else if (!isNaN(nombre)) {
            alert("Nombre no puede ser un numero")
        } else {
            alert(`Hola ${nombre}, tu edad es ${edad}`);
        }
        break;
    default:
        alert("Opcion no valida")
}