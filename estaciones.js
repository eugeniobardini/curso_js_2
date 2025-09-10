function determinarEstacion() {
    let dia = parseInt(prompt("Día (1-31):"));
    let mes = parseInt(prompt("Mes (1-12):"));
    let año = parseInt(prompt("Año:"));
    
    if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
        return "Fecha inválida";
    }
    
    const fecha = new Date(año, mes - 1, dia);
    const mesNum = fecha.getMonth() + 1;
    const diaNum = fecha.getDate();
    
    if ((mesNum === 12 && diaNum >= 21) || mesNum <= 2 || (mesNum === 3 && diaNum < 20)) 
        return `El ${dia}/${mes}/${año} es Verano ☀️`;
    if ((mesNum === 3 && diaNum >= 20) || mesNum <= 5 || (mesNum === 6 && diaNum < 21)) 
        return `El ${dia}/${mes}/${año} es Otoño 🍂`;
    if ((mesNum === 6 && diaNum >= 21) || mesNum <= 8 || (mesNum === 9 && diaNum < 23)) 
        return `El ${dia}/${mes}/${año} es Invierno ❄️`;
    
    return `El ${dia}/${mes}/${año} es Primavera 🌸`;
}

let estacion = determinarEstacion();
alert(estacion);