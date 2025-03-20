<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversor de Moneda - Comercio Exterior</title>
    <style>
        /* Estilos generales */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Fondo semitransparente para mejorar la legibilidad */
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semitransparente */
            z-index: -1;
            transition: background-color 0.3s ease;
        }

        /* Modo oscuro */
        body.dark-mode::before {
            background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro semitransparente */
        }

        body.dark-mode {
            color: #ffffff;
        }

        body.dark-mode .converter {
            background-color: rgba(0, 0, 0, 0.9); /* Fondo oscuro semitransparente */
            color: #ffffff;
        }

        body.dark-mode .section {
            background-color: rgba(51, 51, 51, 0.9); /* Fondo oscuro semitransparente */
        }

        body.dark-mode input,
        body.dark-mode select {
            background-color: #333;
            color: #fff;
            border-color: #555;
        }

        body.dark-mode .result,
        body.dark-mode .rate {
            color: #fff;
        }

        /* Contenedor principal */
        .converter {
            background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco semitransparente */
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            backdrop-filter: blur(5px); /* Efecto de desenfoque */
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Título */
        .converter h2 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 10px;
            font-weight: 600;
            transition: color 0.3s ease;
        }

        body.dark-mode .converter h2 {
            color: #ffffff;
        }

        /* Mensaje de periodo de aplicación */
        .converter .periodo {
            font-size: 14px;
            color: #7f8c8d;
            margin-bottom: 20px;
            transition: color 0.3s ease;
        }

        body.dark-mode .converter .periodo {
            color: #cccccc;
        }

        /* Secciones separadas */
        .converter .section {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            background-color: rgba(236, 240, 241, 0.9); /* Fondo semitransparente */
            transition: background-color 0.3s ease;
        }

        /* Campos de entrada */
        .converter input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            color: #333;
            outline: none;
            transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
        }

        .converter input:focus {
            border-color: #3498db;
        }

        /* Selector de moneda */
        .converter select {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            color: #333;
            background-color: #fff;
            outline: none;
            transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
        }

        .converter select:focus {
            border-color: #3498db;
        }

        /* Resultados */
        .converter .result {
            margin-top: 10px;
            font-size: 18px;
            color: #2c3e50;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: color 0.3s ease;
        }

        body.dark-mode .converter .result {
            color: #ffffff;
        }

        /* Bandera en el resultado */
        .bandera-resultado {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .bandera-resultado img {
            width: 20px;
            height: 20px;
            object-fit: cover;
        }

        /* Tasas de cambio */
        .converter .rate {
            margin-top: 5px;
            font-size: 14px;
            color: #7f8c8d;
            transition: color 0.3s ease;
        }

        body.dark-mode .converter .rate {
            color: #cccccc;
        }

        /* Botón de modo oscuro */
        .modo-oscuro {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: #3498db;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .modo-oscuro:hover {
            background-color: #2980b9;
        }

        /* Menú de estadística */
        .menu-estadistica {
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: #3498db;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .menu-estadistica:hover {
            background-color: #2980b9;
        }

        /* Gráficos */
        .grafico {
            margin-top: 20px;
            width: 100%;
            height: 200px;
        }
    </style>
</head>
<body>

<!-- Botón de modo oscuro -->
<button class="modo-oscuro" onclick="toggleDarkMode()">Modo Oscuro</button>

<!-- Menú de estadística -->
<button class="menu-estadistica" onclick="mostrarEstadistica()">Estadística</button>

<div class="converter">
    <h2>Conversor de Moneda</h2>
    <p class="periodo">Periodo de aplicación Desde: <span id="fechaInicio">01/01/2025</span> Hasta: <span id="fechaFin">31/12/2025</span></p>
    
    <!-- Campo de entrada y selector de moneda -->
    <div class="section">
        <input type="text" id="amount" placeholder="Digite el valor" oninput="formatInput(this)">
        <select id="currency" onchange="resetInput()">
            <option value="COP">COP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
        </select>
        <p class="trm-text">TRM: 1 USD = <span id="trmValue">${usdToCopRate.toLocaleString()}</span> COP</p>
    </div>

    <!-- Resultados de las conversiones -->
    <div class="section">
        <p class="result" id="copResult"></p>
        <p class="rate" id="copRate"></p>
    </div>

    <div class="section">
        <p class="result" id="usdResult"></p>
        <p class="rate" id="usdRate"></p>
    </div>

    <div class="section">
        <p class="result" id="eurResult"></p>
        <p class="rate" id="eurRate"></p>
    </div>
</div>

<!-- Sección de estadística -->
<div id="estadistica" style="display: none;">
    <h2>Estadística</h2>
    <canvas id="grafico" class="grafico"></canvas>
</div>

<!-- Vincular el archivo app.js -->
<script src="app.js"></script>

<!-- Librería Chart.js para gráficos -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</body>
</html>
