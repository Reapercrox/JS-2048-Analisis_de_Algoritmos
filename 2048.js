var juego;
var puntuacion = 0;
var filas = 4;
var columnas = 4;

window.onload = function(){
    setJuego();
}

function setJuego() {
    juego = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let espacio = document.createElement("div");
            espacio.id = f.toString() + "-" + c.toString()
            let num = juego[f][c];
            actualizarEspacio(espacio,num);
            document.getElementById("juego").append(espacio);
        }
    }

    colocaDos();
    colocaDos();
}

/*Se encarga de actualizar el numero mostrado en un espacio*/
function actualizarEspacio(espacio, num) {
    espacio.innerText = "";
    espacio.classList.value = "";
    espacio.classList.add("espacio");
    if (num > 0){
        espacio.innerText = num.toString();
        if (num <= 4096){
            espacio.classList.add("e"+num.toString());
        }
        else{
            espacio.classList.add("e8192");
        }
    }
}

document.addEventListener('keyup', (e) =>{
    if(e.code == "ArrowLeft"){
        deslizaIzq(); 
        colocaDos();
    }
    else if(e.code == "ArrowRight"){
        deslizaDer();
        colocaDos(); 
    }
    else if(e.code == "ArrowUp"){
        deslizaArr();
        colocaDos(); 
    }
    else if(e.code == "ArrowDown"){
        deslizaAb();
        colocaDos(); 
    }
    document.getElementById("puntuacion").innerText = puntuacion;
})

/*Reinicia espacios a 0*/
function filtraCero(fila){
    return fila.filter(num => num != 0);
}


/*Se encarga de realizar el incremento en un espacio*/
function deslizar(fila){

    fila = filtraCero(fila);

    for(let i = 0; i < fila.length-1; i++){

        if(fila[i] == fila[i+1]){
            fila[i] *= 2;
            fila[i+1] = 0;
            puntuacion += fila[i];
        }

    }

    fila = filtraCero(fila);

    while(fila.length < columnas){
        fila.push(0);
    }

    return fila;
}

function deslizaIzq(){

    for (let f = 0; f <= filas; f++){
        let fila = juego[f];
        fila = deslizar(fila);
        juego[f] = fila;

        for (let c = 0; c <= columnas; c++){
            let espacio = document.getElementById(f.toString() + "-" + c.toString());
            let num = juego[f][c];
            actualizarEspacio(espacio,num);
        }
    }
}


function deslizaDer(){
    for (let f = 0; f <= filas; f++){
        let fila = juego[f];
        fila.reverse();
        fila = deslizar(fila);
        fila.reverse();
        juego[f] = fila;
        for (let c = 0; c <= columnas; c++){
            let espacio = document.getElementById(f.toString() + "-" + c.toString());
            let num = juego[f][c];
            actualizarEspacio(espacio,num);
        }
    }
}

function deslizaArr(){
    for(let c = 0; c < columnas; c++){
        let fila = [juego[0][c], juego[1][c], juego[2][c], juego[3][c]];
        fila  = deslizar(fila);
        
        for (let f = 0; f <= filas; f++){
            juego[f][c] = fila[f];
            let espacio = document.getElementById(f.toString() + "-" + c.toString());
            let num = juego[f][c];
            actualizarEspacio(espacio,num);
        }

    }
}

function deslizaAb(){
    for(let c = 0; c < columnas; c++){
        let fila = [juego[0][c], juego[1][c], juego[2][c], juego[3][c]];
        fila.reverse();
        fila = deslizar(fila);
        fila.reverse();

        for (let f = 0; f <= filas; f++){
            juego[f][c] = fila[f];
            let espacio = document.getElementById(f.toString() + "-" + c.toString());
            let num = juego[f][c];
            actualizarEspacio(espacio,num);
        }
    }
}


function colocaDos() {
    if(!espacioVacio()){
        return;
    }

    let encontrado = false;
    while(!encontrado){

        let f = Math.floor(Math.random()*filas);
        let c = Math.floor(Math.random()*columnas);

        if(juego[f][c] == 0){
            juego[f][c] = 2;

            let espacio = document.getElementById(f.toString()+"-"+c.toString());
            espacio.innerText = "2";
            espacio.classList.add("e2");
            encontrado = true;
        }
    }
}


function espacioVacio(){
    let cuenta = 0;

    for (let f = 0; f < filas; f++){
        for (let c = 0; c < columnas; c++){
            if(juego[f][c] == 0){
                return true;
            }
        }
    }

    return false;
}


