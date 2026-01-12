$(document).ready(function() {
    // Uso de jQuery para manejar el envío del formulario
    $('#loginForm').submit(function(event) {
        // Prevenir que la página se recargue
        event.preventDefault();

        // Uso de selectores de jQuery para obtener valores
        const email = $('#Email').val();
        const password = $('#Password').val();

        // Validación
        if (email === "francisco@mail.com" && password === "1234") {
            
            // Uso de alertas de Bootstrap para éxito
            $('#mensaje').html(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Ingreso exitoso!</strong> Redirigiendo al menú...
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                </div>
            `);

            // Uso de jQuery para redirigir (después de 1.5 segundos para ver la alerta)
            setTimeout(function() {
                window.location.href = './menu.html';
            }, 1500);

        } else {
            // Uso de alertas de Bootstrap para error
            $('#mensaje').html(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Acceso denegado:</strong> Correo o contraseña incorrectos.
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                </div>
            `);
        }
    });
});