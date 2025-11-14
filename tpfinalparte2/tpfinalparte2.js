//mateo delgadino,ezequiel  lisi
//comision 1
//cuenta: el peaton
//https://youtu.be/tY9-nBI5Bwo
let juego;


let autopolicia;
let pozo;
let pj;
let fondoInicio;
let fondoPerdiste;
let fondoGanaste;


let sonidoChoque;
let sonidoMisterio;


function preload() {
  autopolicia = loadImage('data/autopolicia.png');
  pozo = loadImage('data/pozo.png');
  pj = loadImage('data/pj.jpeg');
  fondoInicio = loadImage('data/0.jpeg');
  fondoPerdiste = loadImage('data/1.jpeg');
  fondoGanaste = loadImage('data/2.jpeg');
  
  
  sonidoChoque = loadSound('data/choque.mp3');
  sonidoMisterio = loadSound('data/misterio.mp3');
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego();
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}

function keyPressed() {
  if (key === ' ') {
    if (juego.estado === "inicio") {
      juego.estado = "jugando";
    } else if (juego.estado === "jugando") {
      juego.reiniciar();
    }
  }

  if (keyCode === ENTER) {
    if (juego.estado === "ganado" || juego.estado === "perdido") {
      juego.reiniciarTotal();
    }
  }

  // Movimiento del personaje solo si está jugando
  if (juego.estado === "jugando") {
    juego.personaje.mover(keyCode);
  }
}
