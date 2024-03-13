let apiKey = '9d023bc3821d316bc6121cea519afb7f';
let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let lat
let lon

/*let geo = navigator.geolocation;

let posicion = (pos) => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
}

geo.getCurrentPosition(posicion);*/

let difKelvin = 273.15;

const botonBusqueda = document.getElementById('botonBusqueda');
const ciudadEntrada = document.getElementById('ciudadEntrada');

// Función para manejar el evento de clic en el botón o presionar Enter en el campo de entrada
const manejarBusqueda = () => {
    let ciudad = ciudadEntrada.value;
    ciudad ? fetchDatosClima(ciudad) : null;
};

// Agregar evento de clic al botón
botonBusqueda.addEventListener('click', manejarBusqueda);

// Agregar evento de tecla presionada al campo de entrada
ciudadEntrada.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        manejarBusqueda();
    }
});

const fetchDatosClima = (ciudad) => {
    fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
    .then(res => res.json())
    .then(res => mostrarDatosClima(res))
}

const mostrarDatosClima = (res) => {
    const datos = document.getElementById('datosClima');
    datos.innerHTML = '';
    
    const nombreZona = res.name;
    const temperaturaEnGrados = res.main.temp - difKelvin;
    const descripcion = res.weather[0].description;

    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = nombreZona;

    const temperatura = document.createElement('p');
    temperatura.textContent = `La temperatura es ${Math.round(temperaturaEnGrados)}ºC`;

    const iconoInfo = res.weather[0].icon;
    const agregarIcono = document.createElement('img');
    agregarIcono.src = `https://openweathermap.org/img/wn/${iconoInfo}@2x.png`

    const contenidoDescripcion = document.createElement('p');
    contenidoDescripcion.textContent = `La descripcion meteorologica es ${descripcion}`;
    //console.log(iconoInfo)
    datos.appendChild(ciudadTitulo);
    datos.appendChild(temperatura);
    datos.appendChild(agregarIcono);
    datos.appendChild(contenidoDescripcion);
    /*datos.innerHTML = 
    `<p>Temperatura actual:${Math.round(temperaturaEnGrados)}</p>
    <p>Ciudad Consultada: ${nombreZona}</p>
                    `*/
}