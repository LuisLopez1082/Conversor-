// Tasa de cambio manual (1 USD = 4000 COP)
const exchangeRate = 4000;

// Función para convertir la moneda
function convertCurrency() {
    // Obtener el valor ingresado por el usuario
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;

    // Validar que el valor sea un número
    if (isNaN(amount)) {
        document.getElementById('result').innerText = 'Por favor, ingresa una cantidad válida.';
        return;
    }

    let result;
    if (currency === 'usdToCop') {
        // Convertir de USD a COP
        result = amount * exchangeRate;
        document.getElementById('result').innerText = `${amount} USD = ${result.toLocaleString()} COP`;
    } else if (currency === 'copToUsd') {
        // Convertir de COP a USD
        result = amount / exchangeRate;
        // Mostrar el resultado con más de 10 decimales
        document.getElementById('result').innerText = `${amount} COP = ${result.toFixed(12)} USD`;
    }
}

// Función para abrir/cerrar el menú
function toggleMenu() {
    const menu = document.getElementById('menu-opciones');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}

// Fondo aleatorio de comercio exterior
const fondos = [
    'url("https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")', // Puerto
    'url("https://images.unsplash.com/photo-1523437113738-bd3c5e5a0f9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80")', // Contenedores
    'url("https://images.unsplash.com/photo-1506719040632-7d586470c936?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")', // Avión
];

function cambiarFondo() {
    const fondoAleatorio = fondos[Math.floor(Math.random() * fondos.length)];
    document.body.style.backgroundImage = fondoAleatorio;
}

// Cambiar fondo cada 5 minutos (300,000 ms)
setInterval(cambiarFondo, 300000);
cambiarFondo(); // Cambiar al cargar

// Modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Mostrar conversor
function mostrarConverter() {
    document.getElementById('estadistica').style.display = 'none';
    document.getElementById('noticias').style.display = 'none';
    document.querySelector('.converter').style.display = 'block';
    toggleMenu();
}

// Mostrar estadísticas
function mostrarEstadistica() {
    document.querySelector('.converter').style.display = 'none';
    document.getElementById('noticias').style.display = 'none';
    document.getElementById('estadistica').style.display = 'block';
    actualizarFechaConsulta();
    if (!chartInstance) initializeChart();
    toggleMenu();
}

// Actualizar fecha de consulta
function actualizarFechaConsulta() {
    const fechaConsulta = document.getElementById('fechaConsulta');
    const fechaActual = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    fechaConsulta.textContent = fechaActual;
}

// Inicialización al cargar
document.addEventListener('DOMContentLoaded', () => {
    mostrarConverter();
    document.querySelector('.converter').style.display = 'block';
});
