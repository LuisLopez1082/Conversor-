// Tasas de cambio (ejemplo)
const usdToCopRate = 4114.18; // 1 USD = 4114.18 COP
const eurToCopRate = 4500; // 1 EUR = 4500 COP
const eurToUsdRate = 1.08740; // 1 EUR = 1.08740 USD

// Función para formatear el input
function formatInput(input) {
    // Eliminar caracteres no numéricos
    input.value = input.value.replace(/[^0-9.]/g, '');
    // Convertir a número y formatear
    const amount = parseFloat(input.value);
    if (!isNaN(amount)) {
        input.value = amount.toLocaleString();
    }
    // Actualizar conversiones
    updateConversions();
}

// Función para actualizar las conversiones
function updateConversions() {
    const amount = parseFloat(document.getElementById('amount').value.replace(/,/g, ''));
    const currency = document.getElementById('currency').value;

    if (isNaN(amount)) return;

    let copAmount, usdAmount, eurAmount;

    if (currency === 'COP') {
        copAmount = amount;
        usdAmount = amount / usdToCopRate;
        eurAmount = amount / eurToCopRate;
    } else if (currency === 'USD') {
        copAmount = amount * usdToCopRate;
        usdAmount = amount;
        eurAmount = amount / eurToUsdRate;
    } else if (currency === 'EUR') {
        copAmount = amount * eurToCopRate;
        usdAmount = amount * eurToUsdRate;
        eurAmount = amount;
    }

    // Mostrar resultados
    document.getElementById('copResult').innerText = `COP: ${copAmount.toLocaleString()}`;
    document.getElementById('usdResult').innerText = `USD: ${usdAmount.toLocaleString()}`;
    document.getElementById('eurResult').innerText = `EUR: ${eurAmount.toLocaleString()}`;
}

// Función para resetear el input
function resetInput() {
    document.getElementById('amount').value = '';
    updateConversions();
}

// Función para alternar el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Función para mostrar estadísticas
function mostrarEstadistica() {
    document.getElementById('estadistica').style.display = 'block';
    document.getElementById('noticias').style.display = 'none';
}

// Función para mostrar noticias
function mostrarNoticias() {
    document.getElementById('noticias').style.display = 'block';
    document.getElementById('estadistica').style.display = 'none';
}

// Inicializar gráfico (requiere Chart.js)
const ctx = document.getElementById('grafico').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
            label: 'TRM (USD a COP)',
            data: [4000, 4100, 4200, 4150, 4300, 4400],
            borderColor: '#3498db',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});
