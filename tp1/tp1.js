


// https://youtu.be/qMJkTd6w9YY
//mateo delgadino
//comision 1
//obra numero 24








let foto;
let c1 ;
let c2 ;
let tamañooriginal = 40;
let tamañocuadrado ;
let cambiarcolores = false;

function preload() {
   foto=loadImage('data/foto.jpg');
}
function setup() {
 createCanvas(800,400);
 c1 = color(128);
 c2 = color(0);
 tamañocuadrado = tamañooriginal
}
function coloresrandom () {
   c1 = color(random(255), random(255), random(255));
   c2 = color(random(255), random(255), random(255)); 
}
function cambiartamaño( nuevotamaño) {
tamañocuadrado = nuevotamaño;
if (tamañocuadrado < 10) {
  tamañocuadrado = 10;
} else if (tamañocuadrado > 100) {
  tamañocadrado = 100;
}
  }

function draw(){
    background(0);
 image(foto,0,0,width / 2, height);
  dibujar();
} 
 function dibujar() { 

 for ( let fila = 0; fila < 10; fila++) {
   let desplazamiento;
   if (fila % 2 === 0){
     desplazamiento = 0;
   } else {
     desplazamiento = tamañocuadrado / 2;
   }
   for ( let columna = 0; columna < 10; columna++) {
     let x = width / 2 + columna * tamañocuadrado + desplazamiento;
     let y = fila * tamañocuadrado;
     if(cambiarcolores) {
       coloresrandom();
       cambiarcolores = false;
     }
    
    if ((fila + columna) % 2 === 0) {
      fill(c1);
    } else {
      fill (c2);
    }
  rect(x,y,tamañocuadrado,tamañocuadrado);
   }
 }
}
function mousePressed() {
  cambiarcolores = true;
}
function keyPressed(){
 if (key == 'm'  || key ==='M') {
   c1 = color(128);
   c2 = color(0);
   tamañocuadrado = 40;
 }else if (key === 'g') {
tamañocuadrado += 5;
 }else if (key ==='f') {
tamañocuadrado -= 5;
 if (tamañocuadrado < 10) {
   tamañocuadrado = 10;
 }else if (tamañocadrado > 100) {
    tamañocuadrado = 100;
   }
 }
}
