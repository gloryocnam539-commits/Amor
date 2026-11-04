
const canvas = document.getElementById("universo");
const ctx = canvas.getContext("2d");

let estrellas = [];
let animacionActiva = true;

function ajustarCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    estrellas = [];

    const cantidad = Math.min(
        350,
        Math.floor(window.innerWidth * window.innerHeight / 3000)
    );

    for (let i = 0; i < cantidad; i++) {
        estrellas.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radio: Math.random() * 1.8 + 0.3,
            brillo: Math.random(),
            velocidad: Math.random() * 0.008 + 0.002
        });
    }
}

function dibujarUniverso() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    estrellas.forEach(estrella => {
        estrella.brillo += estrella.velocidad;

        const opacidad = 0.35 +
            Math.abs(Math.sin(estrella.brillo)) * 0.65;

        ctx.beginPath();
        ctx.arc(
            estrella.x,
            estrella.y,
            estrella.radio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255, 240, 255, ${opacidad})`;
        ctx.fill();

        // Algunas estrellas brillan como pequeñas cruces
        if (estrella.radio > 1.6) {
            ctx.fillStyle = `rgba(255, 225, 180, ${opacidad * 0.5})`;
            ctx.fillRect(estrella.x - 4, estrella.y, 8, 0.6);
            ctx.fillRect(estrella.x, estrella.y - 4, 0.6, 8);
        }
    });

    if (animacionActiva) {
        requestAnimationFrame(dibujarUniverso);
    }
}

ajustarCanvas();
dibujarUniverso();

window.addEventListener("resize", ajustarCanvas);

// COMENZAR LA EXPERIENCIA

const comenzar = document.getElementById("comenzar");
const intro = document.getElementById("intro");
const experiencia = document.getElementById("experiencia");

comenzar.addEventListener("click", () => {

    intro.classList.add("oculto");

    setTimeout(() => {
        experiencia.classList.add("visible");

        // La semilla aparece
        const semilla = document.getElementById("semilla");

        semilla.animate([
            { opacity: 0, transform: "translateX(-50%) scale(0)" },
            { opacity: 1, transform: "translateX(-50%) scale(1.5)" },
            { opacity: 1, transform: "translateX(-50%) scale(1)" }
        ], {
            duration: 2000,
            fill: "forwards",
            easing: "ease-out"
        });

        // La flor empieza a crecer
        setTimeout(() => {
            document.getElementById("flor").classList.add("crecer");
        }, 1800);

        // Aparece el mensaje de la flor
        setTimeout(() => {
            document.getElementById("fraseFlor")
                .classList.add("visible");
        }, 5500);

        // Aparece el botón de la carta
        setTimeout(() => {
            document.getElementById("botonCarta")
                .classList.add("visible");
        }, 7500);

    }, 900);
});

// ABRIR LA CARTA

const botonCarta = document.getElementById("botonCarta");
const carta = document.getElementById("carta");

botonCarta.addEventListener("click", () => {

    carta.classList.add("visible");
    botonCarta.style.display = "none";

    setTimeout(() => {
        carta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 200);
});

// CUIDAR LA ANIMACIÓN SI LA PÁGINA SE OCULTA

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        animacionActiva = false;
    } else if (!animacionActiva) {
        animacionActiva = true;
        dibujarUniverso();
    }
});

