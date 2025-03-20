// Tasas de cambio manuales (puedes actualizarlas semanalmente)
let usdToCopRate = 4000; // 1 USD = 4000 COP
let usdToEurRate = 0.85; // 1 USD = 0.85 EUR

// Mostrar el valor de la TRM
document.getElementById('trmValue').innerText = usdToCopRate.toLocaleString();

// Función para restablecer el campo de entrada
function resetInput() {
    document.getElementById('amount').value = ''; // Limpiar el campo de entrada
    document.getElementById('copResult').innerText = ''; // Limpiar el resultado COP
    document.getElementById('usdResult').innerText = ''; // Limpiar el resultado USD
    document.getElementById('eurResult').innerText = ''; // Limpiar el resultado EUR
}

// Función para formatear el valor de entrada
function formatInput(input) {
    // Eliminar caracteres no numéricos (excepto el punto decimal)
    let value = input.value.replace(/[^0-9.]/g, '');

    // Separar la parte entera y la parte decimal
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? `.${parts[1]}` : '';

    // Formatear la parte entera con separadores de miles
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Actualizar el valor del campo de entrada
    input.value = integerPart + decimalPart;

    // Realizar las conversiones automáticamente
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

    // Convertir el valor ingresado a COP, USD y EUR
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

    // Mostrar los resultados con banderas
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
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ];
    const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
    document.body.style.backgroundImage = `url(${imagenAleatoria})`;
}

// Cambiar la imagen de fondo cada 300 segundos
setInterval(cambiarFondo, 10000);
cambiarFondo(); // Cambiar al cargar la página

// Función para mostrar la sección de estadística
function mostrarEstadistica() {
    document.getElementById('estadistica').style.display = 'block';
    document.querySelector('.converter').style.display = 'none';
    generarGrafico();
}

// Función para generar el gráfico
function generarGrafico() {
    const ctx = document.getElementById('grafico').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1 día', '1 semana', '1 mes', '3 meses', '6 meses', '1 año', '3 años'],
            datasets: [{
                label: 'Variación del cambio (USD a COP)',
                data: [4000, 4050, 4100, 4150, 4200, 4250, 4300], // Datos de ejemplo
                borderColor: '#3498db',
                borderWidth: 2,
                fill: false,
            }],
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
