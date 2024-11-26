function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(1);
    let mensaje = `Tu IMC es: ${imc}. `;
    let clase = '';

    if (imc < 18.5) {
        mensaje += 'Bajo peso';
        clase = 'blue';
    } else if (imc >= 18.5 && imc <= 24.9) {
        mensaje += 'Peso normal';
        clase = 'green';
    } else if (imc >= 25 && imc <= 29.9) {
        mensaje += 'Sobrepeso';
        clase = 'yellow';
    } else if (imc >= 30 && imc <= 34.9) {
        mensaje += 'Obesidad grado I';
        clase = 'orange';
    } else if (imc >= 35 && imc <= 39.9) {
        mensaje += 'Obesidad grado II';
        clase = 'dark-orange';
    } else {
        mensaje += 'Obesidad grado III';
        clase = 'red';
    }

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = mensaje;
    resultadoDiv.className = `result ${clase}`;
}
