2:12 p. m.
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
    return number % 1 === 0 ? number.toString() : number.toFixed(8).replace(/\.?0+$/, '');
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
