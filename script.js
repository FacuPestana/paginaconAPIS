console.log('Intentar con 12/08/2025, 10/08/2025, 29/01/2020 (Altas Fotos), TOMA LA FECHA DE USA');

let texto = document.getElementById('text');
let img = document.getElementById('img');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let fechaInput = document.getElementById('fechaInput');
let btnIr = document.getElementById('btnIr');
let btnSuerte = document.getElementById('btnSuerte');
let deco = document.getElementById('deco');
let video = document.getElementById('video'); // iframe para videos

// Fecha actual
let fechaActual = new Date();
fechaInput.max = new Date().toISOString().split("T")[0];
fechaInput.min = "1995-06-20";

// Función para mostrar mensaje mientras carga
function mostrarCargando() {
    deco.innerText = 'cargando...';
}

// Función principal para cargar foto/video
function cargarFoto(fecha) {
    mostrarCargando();

    let fechaStr = fecha.toISOString().split('T')[0];
    let apiKey = "siMvzuSP0NkMW22QSs2zlgo1wlXs1FDOb6ZVOzkp";
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fechaStr}`;

    fetch(url)
        .then(res => res.json())
        .then(datos => {
            console.log(datos.url, datos.date);

            if (datos.media_type === "image") {
                img.src = datos.hdurl || datos.url;
                img.style.display = "block";
                video.style.display = "none";
            } else if (datos.media_type === "video") {
                video.src = datos.url;
                video.style.display = "block";
                img.style.display = "none";
            }

            texto.innerText = `Fecha: ${datos.date}\n\nTítulo: ${datos.title}\n\n`;
            deco.innerText = ''; 
        })
        .catch(err => {
            console.error("Error:", err);
            deco.innerText = 'Error cargando la foto/video.';
        });
}


function limpiarDeco() {
    deco.innerText = '';
}

if (btn1) btn1.addEventListener('click', () => {
    limpiarDeco();
    fechaActual.setDate(fechaActual.getDate() - 1);
    cargarFoto(fechaActual);
});

if (btn2) btn2.addEventListener('click', () => {
    limpiarDeco();
    fechaActual = new Date();
    cargarFoto(fechaActual);
});

if (btn3) btn3.addEventListener('click', () => {
    limpiarDeco();
    fechaActual.setDate(fechaActual.getDate() + 1);
    cargarFoto(fechaActual);
});

if (btnIr) btnIr.addEventListener('click', () => {
    limpiarDeco();
    if (fechaInput.value) {
        fechaActual = new Date(fechaInput.value);
        cargarFoto(fechaActual);
    } else {
        alert("Selecciona una fecha primero.");
    }
});

    if (btnSuerte) btnSuerte.addEventListener('click', () => {
        limpiarDeco();
        let minDate = new Date("1995-06-20");
        let maxDate = new Date();
        let diff = maxDate.getTime() - minDate.getTime();
        let randomTime = minDate.getTime() + Math.random() * diff;
        fechaActual = new Date(randomTime);
        cargarFoto(fechaActual);
    });

deco.innerText = 'esperando petición*';

flatpickr("#datepicker", {
    dateFormat: "d/m/Y"
  });