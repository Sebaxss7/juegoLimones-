let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const   ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;
let personajeX=canvas.width/2;
let personajeY= canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0
let puntaje=0;
let vidas=3;
let velocidadCaida=200;

function inicar(){
    setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}
function dibujarSuelo(){
    ctx.fillStyle="#55f724bb";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle="#ff0000";
    ctx.fillRect(personajeX,canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE),ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}
function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}
function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}
function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}
function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="#ffff00";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function bajarLimon(){
    limonY = limonY + 5;
    actualizarPantalla();                            
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX + ANCHO_LIMON > personajeX && 
       limonX < personajeX + ANCHO_PERSONAJE && 
       limonY + ALTURA_LIMON > personajeY && 
       limonY < personajeY + ALTURA_PERSONAJE) {
        
        puntaje = puntaje + 1;
        mostrarEnSpan("txtPuntaje", puntaje);
        if (puntaje === 3) {
            velocidadCaida=150;
        } else if (puntaje === 6) {
            velocidadCaida=100;
        } else if (puntaje === 10) {
            alert("¡TIENES LOS LIMONES! AHORA SOLO TE FALTA LA SAL Y EL TEQUILA 🍋🧂🍹 !");
        }
        aparecerLimon();
    }
}

function aparecerLimon(){
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 0;
    actualizarPantalla();
}

function detectarPiso(){
    // Se corrigió "altura" por "ALTURA_LIMON" y "==" por ">="
    if(limonY + ALTURA_LIMON >= canvas.height - ALTURA_SUELO){
        vidas = vidas - 1;
        mostrarEnSpan("txtVidas", vidas);
        if (vidas <= 0) {
            alert("Game Over");
        }
        aparecerLimon();
    }
}