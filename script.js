fetch('https://api.nasa.gov/planetary/apod?api_key=siMvzuSP0NkMW22QSs2zlgo1wlXs1FDOb6ZVOzkp')
document.getElementById('text')
document.getElementById('img')
.then(res => res.json())
.then(datos => {
    console.log(datos.url)
})