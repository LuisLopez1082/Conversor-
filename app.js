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
