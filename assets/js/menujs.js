const botondepositar = document.getElementById('depositar');
const botonenviardinero = document.getElementById('enviardinero');
const botonultimosmovmientos = document.getElementById('transacciones');
const monto= parseFloat(document.getElementById('Montodepositado').valueAsNumber)

botondepositar.addEventListener('click', function(){
    
    console.log('Redirigiendo a Depósito')
    alert("Redirigiendo al Depósito")
});

botonenviardinero.addEventListener('click', function(){
    console.log('Redirigiendo a Enviar Dinero')
    alert('Redirigiendo a Enviar Dinero')
});

botonultimosmovmientos.addEventListener('click', function(){
    console.log('Redirigiendo a Últimos Movimientos')
    alert('Redirigiendo a Últimos Movimientos')
});

// capturando datos y estableciendo la variable
document.addEventListener('DOMContentLoaded', () => {
    const displayMonto = document.getElementById('Montodepositado');

    // Intentar obtener el saldo guardado
    const saldoGuardado = localStorage.getItem('saldoGlobal');

    let saldoAMostrar;

//  Si existe un número válido (no es null ni NaN), formatearlo. Si no, poner 0.
    if (!isNaN(saldoGuardado)) {
        // Formateamos el número a estilo moneda con el símbolo $
        saldoAMostrar = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP', // Puedes cambiar CLP por USD, MXN, ARS si es otra moneda
            minimumFractionDigits: 0 // Muestra sin decimales (ej: $1000), si quieres decimales pon 2
        }).format(saldoGuardado);
    } else {
        saldoAMostrar = "$0"; // Valor por defecto si no hay nada guardado
    }
    
    // Mostrar el saldo formateado en el HTML
    displayMonto.textContent = saldoAMostrar;
});