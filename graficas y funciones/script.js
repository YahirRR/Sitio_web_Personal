const ctx = document.getElementById('grafica').getContext('2d');

// Función para generar los valores de las funciones
function generarDatos(funcion, inicio, fin, paso) {
    const x = [];
    const y = [];
    for (let i = inicio; i <= fin; i += paso) {
        x.push(i);
        y.push(funcion(i));
    }
    return { x, y };
}

// Funciones matemáticas
const funcionCuadratica = (x) => x * x;
const funcionExponencial = (x) => Math.exp(x);
const funcionLineal = (x) => x;
const funcionSeno = (x) => Math.sin(x);

// Crear y configurar el gráfico
let grafica;

function actualizarGrafico(inicio, fin, paso) {
    // Generación de los datos
    const datosCuadratica = generarDatos(funcionCuadratica, inicio, fin, paso);
    const datosExponencial = generarDatos(funcionExponencial, inicio, fin, paso);
    const datosLineal = generarDatos(funcionLineal, inicio, fin, paso);
    const datosSeno = generarDatos(funcionSeno, inicio, fin, paso);

    // Datos para Chart.js
    const data = {
        labels: datosCuadratica.x, // Usamos los mismos valores de 'x' para todas las funciones
        datasets: [
            {
                label: 'Cuadrática (x²)',
                data: datosCuadratica.y,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                borderWidth: 2
            },
            {
                label: 'Exponencial (e^x)',
                data: datosExponencial.y,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                borderWidth: 2
            },
            {
                label: 'Lineal (x)',
                data: datosLineal.y,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                borderWidth: 2
            },
            {
                label: 'Seno (sin(x))',
                data: datosSeno.y,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: false,
                borderWidth: 2
            }
        ]
    };

    // Si ya existe un gráfico, lo destruye y crea uno nuevo
    if (grafica) {
        grafica.destroy();
    }

    // Configuración del gráfico
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'x'
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'y'
                    }
                }
            }
        }
    };

    // Crear el gráfico
    grafica = new Chart(ctx, config);
}

// Llamar a la función para inicializar el gráfico con los valores predeterminados
actualizarGrafico(-10, 10, 0.1);

// Escuchar el evento de clic en el botón para actualizar el gráfico
document.getElementById('actualizar').addEventListener('click', () => {
    const inicio = parseFloat(document.getElementById('inicio').value);
    const fin = parseFloat(document.getElementById('fin').value);
    const paso = parseFloat(document.getElementById('paso').value);
    actualizarGrafico(inicio, fin, paso);
});
