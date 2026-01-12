$(document).ready(function() {
    const $inputMonto = $('#inputmonto');
    const $depositForm = $('#depositForm');
    const $saldoActualDisplay = $('#saldo-actual');
    const $alertContainer = $('#alert-container');
    const $leyendaDeposito = $('#leyenda-deposito');

    const storageKeySaldo = 'saldoGlobal';
    // Nueva llave para el historial de transacciones
    const storageKeyTransacciones = 'historialTransacciones';

    // Función para obtener y mostrar el saldo actual
    function displayCurrentBalance() {
        let saldoActual = parseFloat(localStorage.getItem(storageKeySaldo)) || 0;
        $saldoActualDisplay.text(`$${saldoActual.toLocaleString('es-CL')}`);
    }

    // Función para guardar una nueva transacción en el historial
    function guardarTransaccion(tipo, monto, detalle) {
        // 1. Obtener historial actual (o array vacío si no existe)
        const historial = JSON.parse(localStorage.getItem(storageKeyTransacciones)) || [];

        // 2. Crear el objeto de la nueva transacción
        const nuevaTransaccion = {
            tipo: tipo, // 'deposito'
            monto: monto,
            detalle: detalle,
            fecha: new Date().toISOString() // Opcional: añadir fecha exacta
        };

        // 3. Añadir al principio del array (para que salgan primero las más nuevas)
        historial.unshift(nuevaTransaccion);

        // 4. Guardar el historial actualizado en localStorage como string JSON
        localStorage.setItem(storageKeyTransacciones, JSON.stringify(historial));
    }

    // Mostrar el saldo actual al cargar la página
    displayCurrentBalance();

    // Manejar el envío del formulario usando jQuery
    $depositForm.on('submit', function(evento) {
        evento.preventDefault();

        const montoIngresado = parseFloat($inputMonto.val());

        if (montoIngresado > 0) {
            let saldoActual = parseFloat(localStorage.getItem(storageKeySaldo)) || 0;
            let nuevoSaldo = saldoActual + montoIngresado;

            // Guardar el nuevo saldo
            localStorage.setItem(storageKeySaldo, nuevoSaldo);

            // AHORA: Guardar esta acción como una transacción en el historial
            guardarTransaccion('deposito', montoIngresado, 'Depósito realizado desde app');

            // Mensajes de éxito y redirección (tu código original)
            $leyendaDeposito.text(`Has depositado: $${montoIngresado.toLocaleString('es-CL')}`);
            const alertHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ¡Depósito exitoso! Tu saldo ha sido actualizado.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $alertContainer.html(alertHTML);
            displayCurrentBalance();

            setTimeout(() => {
                window.location.href = 'menu.html';
            }, 2000);

        } else {
            const errorHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Por favor, ingrese un monto válido mayor a 0.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $alertContainer.html(errorHTML);
        }
    });
});