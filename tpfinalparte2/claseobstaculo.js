class Obstaculo {
  constructor() {
    this.tam = 50;
    this.x = random(100, width - 100 - this.tam); // 
    this.y = random(0, height - this.tam);
  }

  dibujar() {
    image(pozo, this.x, this.y, this.tam, this.tam);
  }

  colision(personaje) {
    return dist(this.x, this.y, personaje.x, personaje.y) < 30;
  }
}
