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

opcion = Number(prompt("ingrese una opcion para ejecutar 1.suma de dos numeros enteros 2.Cuenta regresiva mayor a 10 3.Ingreso de datos personales"))
switch(opcion){
    case 1:
        a = Number(prompt("ingrese el primer numero entero"))
        b = Number(prompt("ingrese el segundo numero entero"))
        console.log(a)
        if(a!=NaN && b!=NaN){alert("Se ingreso una letra no un numero")
        }else if(a > 0 && b > 0){console.log(`la suma de ${a} + ${b} = ${a+b}`)
            }else{alert("el numero debe ser positivo")};
    break;
    case 2:
        cuenta = Number(prompt("ingrese un numero mayor a 10"))  
      if(cuenta > 10){
            for(i = cuenta; i >= 0; i--){
                console.log(i)
            }
        }else{alert("numero menor a 10 no es valido")};
    break;
    case 3:
        nombre = prompt("porfavor ingrese su nombre")
        edad = prompt("porfavor ingrese su edad")
        console.log(`Hola ${nombre} tu edad es ${edad}`);
    break;
    default:
        alert("opcion no valida")
}

//verificacion push 8/08 4:55