function calcularBeca(promedio, ingresos, esSobrino = false) {
    // Caso 1: Beca completa
    if ((promedio >= 9 && ingresos <= 1000) || esSobrino) {
        return "Beca completa";
    } 
    // Caso 2: Beca parcial
    else if (promedio >= 7 && ingresos <= 500) {
        return "Beca parcial";
    } 
    // Caso 3: Sin beca
    else {
        return "No se otorga beca";
    }
}

console.log(calcularBeca(9.2, 900));
console.log(calcularBeca(8, 400));
console.log(calcularBeca(6, 300));
console.log(calcularBeca(5, 200, true));
