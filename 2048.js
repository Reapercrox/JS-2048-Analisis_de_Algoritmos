var juego;
var puntuacion = 0;
var filas = 4;
var columnas = 4;

window.onload = function(){
    setJuego();
}

function setJuego() {
    juego = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let espacio = document.createElement("div");
            espacio.id = f.toString() + "-" + c.toString()
            let num = juego[f][c];
            actualizarEspacio(espacio,num);
        }
    }
}