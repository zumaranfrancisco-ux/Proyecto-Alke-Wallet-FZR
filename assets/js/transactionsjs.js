$(document).ready(function () {
  // Quitamos la lista ficticia y definimos la llave de storage
  const storageKeyTransacciones = 'historialTransacciones';

  // 1. Función para obtener el tipo en formato legible
  function getTipoTransaccion(tipo) {
    const tipos = {
      compra: "🛍️ Compra en línea",
      deposito: "💰 Depósito",
      transferencia: "💸 Envío de dinero",
    };
    return tipos[tipo] || tipo;
  }

  // 2. Función para mostrar los movimientos dinámicamente
  function mostrarUltimosMovimientos(filtro = "todos") {
    const $lista = $("#listaMovimientos");
    $lista.empty(); // Limpiar lista actual

    // *** CAMBIO CLAVE AQUÍ: Leer del localStorage ***
    // Si no hay datos, usamos un array vacío
    const listaTransacciones = JSON.parse(localStorage.getItem(storageKeyTransacciones)) || [];

    // Filtrar la lista según la opción seleccionada
    const movimientosFiltrados =
      filtro === "todos"
        ? listaTransacciones
        : listaTransacciones.filter((t) => t.tipo === filtro);

    // Renderizar cada movimiento
    movimientosFiltrados.forEach((m) => {
      // Usamos el campo 'detalle' para el texto
      const detalleTexto = m.detalle || 'Sin detalles adicionales'; 
      const claseMonto = m.tipo === "compra" || m.tipo === "transferencia" ? "text-danger" : "text-success";
      const signo = m.tipo === "compra" || m.tipo === "transferencia" ? "-" : "+";

      const itemHtml = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${getTipoTransaccion(m.tipo)}</strong><br>
                        <small class="text-muted">${detalleTexto}</small>
                    </div>
                    <span class="${claseMonto} font-weight-bold">
                        ${signo} $${m.monto.toLocaleString("es-CL")}
                    </span>
                </li>
            `;
      $lista.append(itemHtml);
    });

    if (movimientosFiltrados.length === 0) {
      $lista.append('<li class="list-group-item">No hay movimientos registrados todavía.</li>');
    }
  }

  // 3. Escuchar cambios en el elemento SELECT
  $("#filtroTipo").on("change", function () {
    const seleccion = $(this).val();
    mostrarUltimosMovimientos(seleccion);
  });

  // 4. Carga inicial (mostrar todos)
  mostrarUltimosMovimientos();
});