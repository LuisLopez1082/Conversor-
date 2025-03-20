// Tasas de cambio manuales (puedes actualizarlas semanalmente)
let usdToCopRate = 4000; // 1 USD = 4000 COP
let usdToEurRate = 0.85; // 1 USD = 0.85 EUR

// Mostrar el valor de la TRM
document.getElementById('trmValue').innerText = usdToCopRate.toLocaleString();

// Función para restablecer el campo de entrada
function resetInput() {
    document.getElementById('amount').value = '';
    document.getElementById('copResult').innerText = '';
    document.getElementById('usdResult').innerText = '';
    document.getElementById('eurResult').innerText = '';
}

// Función para formatear el valor de entrada
function formatInput(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    if ((value.match(/\./g) || []).length > 1) {
        value = value.slice(0, -1);
    }
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? `.${parts[1]}` : '';
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    input.value = integerPart + decimalPart;
    convertAll();
}

// Función para formatear un número (ocultar decimales si son cero)
function formatNumber(number) {
    return number % 1 === 0 ? number.toString() : number.toFixed(5).replace(/\.?0+$/, '');
}

// Función para realizar todas las conversiones
function convertAll() {
    const amount = parseFloat(document.getElementById('amount').value.replace(/,/g, ''));
    const currency = document.getElementById('currency').value;

    if (isNaN(amount)) {
        document.getElementById('copResult').innerText = 'Por favor, ingresa una cantidad válida.';
        document.getElementById('usdResult').innerText = '';
        document.getElementById('eurResult').innerText = '';
        return;
    }

    let copAmount, usdAmount, eurAmount;

    if (currency === 'COP') {
        copAmount = amount;
        usdAmount = copAmount / usdToCopRate;
        eurAmount = usdAmount * usdToEurRate;
    } else if (currency === 'USD') {
        usdAmount = amount;
        copAmount = usdAmount * usdToCopRate;
        eurAmount = usdAmount * usdToEurRate;
    } else if (currency === 'EUR') {
        eurAmount = amount;
        usdAmount = eurAmount / usdToEurRate;
        copAmount = usdAmount * usdToCopRate;
    }

    document.getElementById('copResult').innerHTML = `
        <div class="bandera-resultado">
            <img src="https://flagcdn.com/co.svg" alt="COP">
        </div>
        ${copAmount.toLocaleString()} COP
    `;
    document.getElementById('usdResult').innerHTML = `
        <div class="bandera-resultado">
            <img src="https://flagcdn.com/us.svg" alt="USD">
        </div>
        ${formatNumber(usdAmount)} USD
    `;
    document.getElementById('eurResult').innerHTML = `
        <div class="bandera-resultado">
            <img src="https://flagcdn.com/eu.svg" alt="EUR">
        </div>
        ${formatNumber(eurAmount)} EUR
    `;
}

// Función para cambiar entre modo claro y oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Función para cambiar la imagen de fondo aleatoriamente
function cambiarFondo() {
    const imagenes = [
        'https://images.unsplash.com/photo-1501163268664-3fdf329d019f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ];
    const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
    document.body.style.backgroundImage = `url(${imagenAleatoria})`;
}

// Cambiar la imagen de fondo cada 10 segundos
setInterval(cambiarFondo, 10000);
cambiarFondo();

// Función para mostrar la sección de estadística
function mostrarEstadistica() {
    document.getElementById('estadistica').style.display = 'block';
    document.querySelector('.converter').style.display = 'none';
    document.getElementById('noticias').style.display = 'none';
    generarGrafico();
}

// Función para generar el gráfico con filtros de fechas
async function generarGrafico() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    const datosHistoricos = await obtenerDatosHistoricos(fechaInicio, fechaFin);

    const ctx = document.getElementById('grafico').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datosHistoricos.labels,
            datasets: [
                {
                    label: 'USD a COP',
                    data: datosHistoricos.usdToCop,
                    borderColor: '#3498db',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'EUR a COP',
                    data: datosHistoricos.eurToCop,
                    borderColor: '#e74c3c',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    });
}

// Función para obtener datos históricos de la API
async function obtenerDatosHistoricos(fechaInicio, fechaFin) {
    const apiKey = 'TU_API_KEY'; // Reemplaza con tu API key
    const url = `https://api.exchangerate-api.com/v4/historical/USD?base=USD&start_date=${fechaInicio}&end_date=${fechaFin}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const labels = Object.keys(data.rates);
        const usdToCop = labels.map(fecha => data.rates[fecha].COP);
        const eurToCop = labels.map(fecha => data.rates[fecha].EUR);

        return { labels, usdToCop, eurToCop };
    } catch (error) {
        console.error('Error al obtener datos históricos:', error);
        return { labels: [], usdToCop: [], eurToCop: [] };
    }
}

// Función para mostrar noticias económicas
async function mostrarNoticias() {
    const noticias = await obtenerNoticias();
    const noticiasContainer = document.getElementById('noticiasContainer');

    noticiasContainer.innerHTML = '';

    noticias.forEach(noticia => {
        const noticiaElement = document.createElement('div');
        noticiaElement.className = 'noticia';
        noticiaElement.innerHTML = `
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
            <a href="${noticia.url}" target="_blank">Leer más</a>
        `;
        noticiasContainer.appendChild(noticiaElement);
    });

    document.getElementById('noticias').style.display = 'block';
    document.querySelector('.converter').style.display = 'none';
    document.getElementById('estadistica').style.display = 'none';
}

// Función para obtener noticias económicas
async function obtenerNoticias() {
    const apiKey = 'TU_API_KEY'; // Reemplaza con tu API key de NewsAPI
    const url = `https://newsapi.org/v2/top-headlines?category=business&country=us,co&pageSize=10&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.articles.map(article => ({
            titulo: article.title,
            descripcion: article.description,
            url: article.url,
        }));
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        return [];
    }
}
