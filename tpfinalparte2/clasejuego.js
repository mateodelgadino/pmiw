class Juego {
  constructor() {
    // --- IMÁGENES (ya cargadas globalmente en preload) ---
    this.imgInicio = fondoInicio;
    this.imgPerdiste = fondoPerdiste;
    this.imgGanaste = fondoGanaste;

    // --- ESTADO DEL JUEGO ---
    this.estado = "inicio"; // puede ser inicio, jugando, ganado o perdido

    // --- ENTIDADES ---
    this.personaje = new Personaje(50, height / 2);
    this.autos = [];
    this.obstaculos = [];

    // --- VARIABLES DE JUEGO ---
    this.vidas = 3;
    this.tiempo = 30 * 60; // 30 segundos (si el juego corre a 60 FPS)

    // --- CONFIGURAR ENTIDADES ---
    for (let i = 0; i < 7; i++) {
      this.autos[i] = new AutoDePolicia();
    }
    for (let i = 0; i < 5; i++) {
      this.obstaculos[i] = new Obstaculo();
    }

    this.sonidoMisterio = sonidoMisterio;
    this.sonidoChoque = sonidoChoque;
  }

  actualizar() {
    if (this.estado === "jugando") {
       if (!this.sonidoMisterio.isPlaying()) {
        this.sonidoMisterio.loop();
      }
      this.tiempo--;

      // Mover autos y chequear colisiones
      for (let i = 0; i < this.autos.length; i++) {
        this.autos[i].mover();

        if (this.autos[i].colision(this.personaje)) {
          this.vidas--;
          
          if (this.sonidoChoque.isPlaying()) {
            this.sonidoChoque.stop();
          }
          this.sonidoChoque.play();

          // Reinicia la posición del auto
          this.autos[i].y = random(-200, -50);
          this.autos[i].x = random(100, width - 100 - this.autos[i].tam);

          if (this.vidas <= 0) {
            this.estado = "perdido";
          }
        }
      }

      // Colisiones con obstáculos
      for (let i = 0; i < this.obstaculos.length; i++) {
        if (this.obstaculos[i].colision(this.personaje)) {
          this.personaje.y += 10;
        }
      }

      // Detectar victoria
      if (this.personaje.x + this.personaje.tam >= width - 100 && this.vidas > 0) {
        this.estado = "ganado";
        this.sonidoMisterio.stop();
      }

      // Derrota por tiempo
      if (this.tiempo <= 0) {
        this.estado = "perdido";
        this.sonidoMisterio.stop();
      }
    }
  }

  dibujar() {
    if (this.estado === "inicio") {
      image(this.imgInicio, 0, 0, width, height);
      this.mostrarInstrucciones();
    } else if (this.estado === "jugando") {
      this.dibujarJuego();
    } else if (this.estado === "ganado") {
      image(this.imgGanaste, 0, 0, width, height);
      this.mostrarMensaje("¡GANASTE!\nEvitaste a la policía y te uniste a una resistencia misteriosa.\nPulsa ENTER para volver al inicio");
    } else if (this.estado === "perdido") {
      image(this.imgPerdiste, 0, 0, width, height);
      this.mostrarMensaje("PERDISTE\nPulsa ENTER para volver al inicio");
    }
  }

  dibujarJuego() {
    background(50);

    // Vereda izquierda
    fill(100);
    rect(0, 0, 100, height);

    // Calle
    fill(150);
    rect(100, 0, width - 200, height);

    // Vereda derecha
    fill(100, 255, 100);
    rect(width - 100, 0, 100, height);

    // HUD (datos del jugador)
    fill(255);
    textSize(20);
    text("Vidas: " + this.vidas, 50, 30);
    text("Tiempo: " + int(this.tiempo / 60), width - 60, 30)//Como asignamos tiempo = 1800, lo dividimos por 60 (por los fps que corre el programa) y tomamos el valor entero de esta división.;

    this.personaje.dibujar();

    for (let i = 0; i < this.autos.length; i++) {
      this.autos[i].dibujar();
    }

    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].dibujar();
    }
  }

  reiniciar() {
    this.personaje = new Personaje(50, height / 2);
    this.vidas = 3;
    this.tiempo = 30 * 60;
    this.estado = "inicio";

    for (let i = 0; i < this.autos.length; i++) {
      this.autos[i] = new AutoDePolicia();
    }
    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i] = new Obstaculo();
    }
    
    this.sonidoMisterio.stop();
  }

  mostrarInstrucciones() {
    fill(255);
    textAlign(CENTER);
    textSize(18);
    text(
      "Llega al otro lado de la pantalla moviéndote con las flechitas.\n" +
      "Evita los pozos y ser chocado por los autos de policía.\n" +
      "Llegá al otro lado antes de los 30 segundos y con al menos una vida.\n" +
      "Pulsa ESPACIO para jugar.\n\n" +
      "Alumnos: Mateo Delgadino y Ezequiel Lisi",
      width / 2, height - 150
      );
  }

  mostrarMensaje(txt) {
    fill(255);
    textAlign(CENTER);
    textSize(22);
    text(txt, width / 2, height - 100);
  }

  reiniciarTotal() {
    this.personaje = new Personaje(50, height / 2);
    this.vidas = 3;
    this.tiempo = 30 * 60;
    this.estado = "inicio";

    for (let i = 0; i < this.autos.length; i++) {
      this.autos[i] = new AutoDePolicia();
    }
    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i] = new Obstaculo();
    }
    
    this.sonidoMisterio.stop();
  }
}
