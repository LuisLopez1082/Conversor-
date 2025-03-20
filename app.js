// Tasas de cambio manuales
let usdToCopRate = 4000; // 1 USD = 4000 COP
let usdToEurRate = 0.85; // 1 USD = 0.85 EUR

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

// Función para mostrar el conversor
function mostrarConversor() {
    document.getElementById('conversor').classList.remove('hidden');
    document.getElementById('estadistica').classList.add('hidden');
    document.getElementById('noticias').classList.add('hidden');
}

// Función para mostrar la sección de estadística
function mostrarEstadistica() {
    document.getElementById('conversor').classList.add('hidden');
    document.getElementById('estadistica').classList.remove('hidden');
    document.getElementById('noticias').classList.add('hidden');
}

// Función para mostrar la sección de noticias
function mostrarNoticias() {
    document.getElementById('conversor').classList.add('hidden');
    document.getElementById('estadistica').classList.add('hidden');
    document.getElementById('noticias').classList.remove('hidden');
}

// Función para generar el gráfico (datos de ejemplo)
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
