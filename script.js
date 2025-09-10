console.log('Intentar con 12/08/2025 y 10/08/2025 (Altas Fotos)')
let texto = document.getElementById('text');
let img = document.getElementById('img');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let fechaInput = document.getElementById('fechaInput');
let btnIr = document.getElementById('btnIr'); // faltaba este
let url = document.getElementById('url');

// Fecha

let fechaActual = new Date();

fechaInput.max = new Date().toISOString().split("T")[0];
fechaInput.min = "1995-06-20";

function cargarFoto(fecha) {
    let fechaStr = fecha.toISOString().split('T')[0];
    let apiKey = "siMvzuSP0NkMW22QSs2zlgo1wlXs1FDOb6ZVOzkp";
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fechaStr}`;

    fetch(url)
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

            texto.innerText =
                `Fecha: ${datos.date}\n\n` +
                `Título: ${datos.title}\n\n`;
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
        console.log(fechaInput);
        cargarFoto(fechaActual);
    } else {
        alert("Selecciona una fecha primero.");
    }
});

// Primera carga
cargarFoto(fechaActual)