// Tasas de cambio (valores de ejemplo)
const usdToCopRate = 4000;
const eurToCopRate = 4500;
const eurToUsdRate = eurToCopRate / usdToCopRate;

// Elementos del DOM
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const trmValue = document.getElementById('trmValue');
trmValue.textContent = usdToCopRate.toLocaleString();

// Formatear input con separadores de miles
function formatInput(input) {
    let value = input.value.replace(/,/g, '');
    if (!value) {
        input.value = '';
        convertCurrency();
        return;
    }
    
    let number = parseFloat(value);
    if (isNaN(number)) {
        input.value = '';
    } else {
        input.value = number.toLocaleString('en-US');
        convertCurrency();
    }
}

// Reiniciar campos al cambiar moneda
function resetInput() {
    amountInput.value = '';
    convertCurrency();
}

// Conversión principal
function convertCurrency() {
    const amount = parseFloat(amountInput.value.replace(/,/g, ''));
    const currency = currencySelect.value;
    
    // Limpiar resultados si no hay cantidad
    if (isNaN(amount)) {
        document.querySelectorAll('.result, .rate').forEach(el => el.textContent = '');
        return;
    }

    let copAmount, usdAmount, eurAmount;

    switch(currency) {
        case 'COP':
            copAmount = amount;
            usdAmount = copAmount / usdToCopRate;
            eurAmount = copAmount / eurToCopRate;
            break;
        case 'USD':
            usdAmount = amount;
            copAmount = usdAmount * usdToCopRate;
            eurAmount = usdAmount * (1 / eurToUsdRate);
            break;
        case 'EUR':
            eurAmount = amount;
            copAmount = eurAmount * eurToCopRate;
            usdAmount = eurAmount * eurToUsdRate;
            break;
    }

    // Actualizar resultados
    updateResult('cop', copAmount, 'COP', currency);
    updateResult('usd', usdAmount, 'USD', currency);
    updateResult('eur', eurAmount, 'EUR', currency);
}

// Actualizar un resultado específico
function updateResult(currencyCode, amount, symbol, originalCurrency) {
    const resultElement = document.getElementById(`${currencyCode}Result`);
    const rateElement = document.getElementById(`${currencyCode}Rate`);

    if (currencyCode === originalCurrency.toLowerCase()) {
        resultElement.textContent = '';
        rateElement.textContent = '';
        return;
    }

    // Formatear cantidad
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: symbol,
        maximumFractionDigits: 2
    });
    
    resultElement.innerHTML = `
        <span class="bandera-resultado">
            <img src="${getFlagUrl(symbol)}" alt="${symbol}">
        </span>
        ${formatter.format(amount)}
    `;

    // Actualizar tasas
    const rates = {
        cop: `1 COP = ${(1 / usdToCopRate).toFixed(6)} USD | ${(1 / eurToCopRate).toFixed(6)} EUR`,
        usd: `1 USD = ${usdToCopRate.toLocaleString()} COP | ${(1 / eurToUsdRate).toFixed(4)} EUR`,
        eur: `1 EUR = ${eurToCopRate.toLocaleString()} COP | ${eurToUsdRate.toFixed(4)} USD`
    };
    
    rateElement.textContent = rates[currencyCode];
}

// Obtener URL de bandera (función de ejemplo)
function getFlagUrl(currency) {
    const flags = {
        'COP': 'https://flagcdn.com/co.svg',
        'USD': 'https://flagcdn.com/us.svg',
        'EUR': 'https://flagcdn.com/eu.svg'
    };
    return flags[currency];
}

// Modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Gestión de gráficos
let chartInstance = null;

function mostrarEstadistica() {
    document.querySelector('.converter').style.display = 'none';
    document.getElementById('noticias').style.display = 'none';
    document.getElementById('estadistica').style.display = 'block';
    if (!chartInstance) initializeChart();
    toggleMenu();
}

function initializeChart() {
    const ctx = document.getElementById('grafico').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'TRM USD/COP',
                data: [3900, 4000, 4100, 3950, 4050, 4100],
                borderColor: '#3498db',
                tension: 0.1
            }, {
                label: 'TRM EUR/COP',
                data: [4400, 4500, 4600, 4450, 4550, 4600],
                borderColor: '#2ecc71',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Historial de Tasas de Cambio' }
            },
            scales: { y: { beginAtZero: false } }
        }
    });
}

function filtrarDatos() {
    // Implementar lógica de filtrado real aquí
    console.log('Filtrando datos...');
}

// Gestión de noticias
function mostrarNoticias() {
    document.querySelector('.converter').style.display = 'none';
    document.getElementById('estadistica').style.display = 'none';
    document.getElementById('noticias').style.display = 'block';
    cargarNoticias();
    toggleMenu();
}

function cargarNoticias() {
    const noticias = {
        'noticias-usa': [
            { 
                titulo: 'Fed sube tasas de interés', 
                enlace: 'https://www.example.com/noticia-fed' 
            },
            { 
                titulo: 'Nuevo paquete económico en EE.UU.', 
                enlace: 'https://www.example.com/paquete-economico' 
            }
        ],
        'noticias-europa': [
            { 
                titulo: 'BCE anuncia medidas contra inflación', 
                enlace: 'https://www.example.com/bce-inflacion' 
            },
            { 
                titulo: 'UE aprueba nuevo plan energético', 
                enlace: 'https://www.example.com/plan-energetico' 
            }
        ],
        'noticias-colombia': [
            { 
                titulo: 'Banrep aumenta tasa de intervención', 
                enlace: 'https://www.example.com/banrep-tasas' 
            },
            { 
                titulo: 'Nuevas políticas de comercio exterior', 
                enlace: 'https://www.example.com/politicas-comercio' 
            }
        ]
    };

    for (const [id, datos] of Object.entries(noticias)) {
        const lista = document.getElementById(id);
        lista.innerHTML = datos.map(noticia => `
            <li>
                <a href="${noticia.enlace}" target="_blank" rel="noopener noreferrer">
                    ${noticia.titulo}
                </a>
            </li>
        `).join('');
    }
}

// Cierra el menú al hacer clic fuera
document.addEventListener('click', (event) => {
    const menu = document.getElementById('menu-opciones');
    const menuButton = document.querySelector('.menu-principal');
    
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// Inicialización al cargar
document.addEventListener('DOMContentLoaded', () => {
    mostrarConverter();
    document.querySelector('.converter').style.display = 'block';
});
