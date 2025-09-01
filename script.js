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