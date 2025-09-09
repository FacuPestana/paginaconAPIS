// Elementos del DOM
let texto = document.getElementById('text');
let img = document.getElementById('img');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let fechaInput = document.getElementById('fechaInput');

// Fecha actual
let fechaActual = new Date();

// Limitar input a rango válido
fechaInput.max = new Date().toISOString().split("T")[0];
fechaInput.min = "1995-06-16";

// Función para cargar solo imagen por fecha
function cargarFoto(fecha) {
    let fechaStr = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
    fetch(`https://api.nasa.gov/planetary/apod?api_key=siMvzuSP0NkMW22QSs2zlgo1wlXs1FDOb6ZVOzkp&date=${fechaStr}`)
        .then(res => res.json())
        .then(datos => {
            console.log(datos.url, datos.date);

            // Solo imagen
            if (datos.media_type === "image") {
                img.src = datos.hdurl || datos.url;
                img.style.display = "";
            } else {
                img.style.display = "none";
            }

            // Mostrar fecha, título
            texto.innerText = 
                `Fecha: ${datos.date}\n\n` +
                `Título: ${datos.title}\n\n` 
               
        })
        .catch(err => console.error("Error:", err));
}

// Botones
btn1.addEventListener('click', () => {
    fechaActual.setDate(fechaActual.getDate() - 1);
    cargarFoto(fechaActual);
});

btn2.addEventListener('click', () => {
    fechaActual = new Date();
    cargarFoto(fechaActual);
});

btn3.addEventListener('click', () => {
    fechaActual.setDate(fechaActual.getDate() + 1);
    cargarFoto(fechaActual);
});

btnIr.addEventListener('click', () => {
    if (fechaInput.value) {
        fechaActual = new Date(fechaInput.value);
        cargarFoto(fechaActual);
    } else {
        alert("Selecciona una fecha primero.");
    }
});

// Carga inicial (foto de hoy)
cargarFoto(fechaActual);
