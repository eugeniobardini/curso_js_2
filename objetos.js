const sanLorenzo = {
    nombre: "Club Atletico San Lorenzo de Almagro",
    fundacion: 1908,
    estadio: "Estadio Pedro Bidegain",
    capacidad: 47840,
    titulosTotales: 22,
    descripcion: function() {
        return `${this.nombre} fue fundado en ${this.fundacion}. Su estadio es ${this.estadio} con una capacidad de ${this.capacidad} espectadores. Ha ganado un total de ${this.titulosTotales} títulos. Es uno de los cinco grandes del fútbol argentino y tiene una rica historia tanto a nivel nacional como internacional. A, y tiene de hijo a boca :)`;
    }
}

const bocaJuniors = {
    nombre: "Club Atlético Boca Juniors",
    fundacion: 1905,
    estadio: "La Bombonera",
    capacidad: 54000,
    titulosTotales: 70,
    descripcion: function() {
        return `${this.nombre} fue fundado en ${this.fundacion}. Su estadio es ${this.estadio} con una capacidad de ${this.capacidad} espectadores. Ha ganado un total de ${this.titulosTotales} títulos. Es uno de los clubes más grandes y populares de Argentina y del mundo, conocido por su rica historia tanto a nivel nacional como internacional.`;
    }
}

let eleccion = prompt("Elige un club: San Lorenzo o Boca Juniors");

function mostrarEquipo(equipo) {
    console.table(equipo);
}

if (eleccion.toLowerCase() === "san lorenzo") {
    mostrarEquipo(sanLorenzo);
    alert(sanLorenzo.descripcion());
} else if (eleccion.toLowerCase() === "boca juniors") {
    mostrarEquipo(bocaJuniors);
    alert(bocaJuniors.descripcion());
}
else {
    alert("Club no reconocido. Por favor elige 'San Lorenzo' o 'Boca Juniors'.");
}