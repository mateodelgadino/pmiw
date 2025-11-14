class AutoDePolicia {
  constructor() {
    this.tam = 100;
    this.x = random(100, width - 100 - this.tam); 
    this.y = random(-200, -50);
    this.velY = random(2, 5);
  }

  dibujar() {
    image(autopolicia, this.x, this.y, this.tam, this.tam);
  }

  mover() {
    this.y += this.velY;

    if (this.y > height) {
      this.y = random(-200, -50);
      this.x = random(100, width - 100 - this.tam);
      this.velY = random(2, 5);
    }
  }

  colision(personaje) {
    return (this.x < personaje.x + personaje.tam && this.x + this.tam > personaje.x && this.y < personaje.y + personaje.tam && this.y + this.tam / 2 > personaje.y);
  }
}
