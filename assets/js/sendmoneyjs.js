// --- Variables Globales y Selectores ---
const modal = document.getElementById("modalContacto");
const btnAbrir = document.getElementById("btnAbrirForm");
const btnCerrar = document.getElementById("btnCerrar");
const btnCancelar = document.getElementById("btnCancelar");
const formulario = document.getElementById("formContacto");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const inputBuscar = document.getElementById("inputBuscarContacto");
const btnBuscar = document.getElementById("btnBuscar");
const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

// Datos iniciales
let contactos = [
    { nombre: 'Alfonso Algarrobo', cbu: '1231231231231231231231', alias: 'Amigo', banco:'Banco Nación'},
    { nombre: 'Nicolás Barraza', cbu: '1231231231231231231231', alias: 'Amigo' , banco:'Banco Nación' },
    { nombre: 'Javier González', cbu: '1231231231231231231231', alias: 'Amigo' , banco:'Banco Nación'},
    { nombre: 'Antonio Moraga', cbu: '1231231231231231231231', alias: 'Amigo' , banco:'Banco Nación'},
];

// --- FUNCIÓN CLAVE PARA TRANSACTIONS.HTML ---
function registrarMovimiento(tipo, monto, detalle) {
    const storageKey = 'historialTransacciones';
    // Obtenemos lo que ya existe o creamos un array vacío
    let historial = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // Creamos el nuevo movimiento
    const nuevoMovimiento = {
        tipo: tipo, // Debe ser 'transferencia' para que el filtro lo vea
        monto: monto,
        detalle: detalle,
        fecha: new Date().toLocaleString()
    };

    // Lo agregamos al principio
    historial.unshift(nuevoMovimiento);
    
    // Guardamos de nuevo en LocalStorage
    localStorage.setItem(storageKey, JSON.stringify(historial));
}

// --- Funciones de Interfaz ---

function renderizarContactos(filtro = '') {
    cuerpoTabla.innerHTML = ''; 
    const contactosFiltrados = contactos.filter(contacto => 
        contacto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        contacto.alias.toLowerCase().includes(filtro.toLowerCase())
    );

    contactosFiltrados.forEach((contacto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="table-light">${contacto.nombre}</td>
            <td>${contacto.cbu}</td>
            <td>${contacto.alias}</td>
            <td>${contacto.banco}</td>
            <td><button class="btn btn-success btn-sm btn-enviar" data-nombre="${contacto.nombre}">Enviar Dinero</button></td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    // Re-asignar eventos a los botones
    document.querySelectorAll('.btn-enviar').forEach(button => {
        button.onclick = manejarEnvioDinero; 
    });
}

function manejarEnvioDinero(evento) {
    const nombreContacto = evento.target.getAttribute('data-nombre');
    const inputIngresado = parseInt(prompt(`¿Cuánto dinero desea enviar a ${nombreContacto}?`));
    
    if (isNaN(inputIngresado) || inputIngresado <= 0) {
        alert("Monto no válido.");
        return;
    }

    let saldoActual = parseFloat(localStorage.getItem('saldoGlobal')) || 0;

    if (inputIngresado > saldoActual) {
        alert("Saldo insuficiente. Tu saldo es: $" + saldoActual);
        return;
    }

    if (confirm(`¿Confirmas el envío de $${inputIngresado} a ${nombreContacto}?`)) {
        // 1. Restar saldo
        let nuevoSaldo = saldoActual - inputIngresado;
        localStorage.setItem('saldoGlobal', nuevoSaldo);
        
        // 2. REGISTRAR PARA TRANSACTIONS.HTML
        // Importante: Usamos 'transferencia' para que coincida con el <select> de transactions.html
        registrarMovimiento('transferencia', inputIngresado, `Envío a ${nombreContacto}`);

        // 3. Feedback visual
        mostrarMensajeConfirmacion();
    }
}

function mostrarMensajeConfirmacion() {
    mensajeConfirmacion.style.display = 'block';
    setTimeout(() => { mensajeConfirmacion.style.display = 'none'; }, 3000);
}

// --- Event Listeners ---

btnAbrir.addEventListener("click", () => modal.style.display = "block");
btnCerrar.addEventListener("click", () => modal.style.display = "none");
btnCancelar.addEventListener("click", () => modal.style.display = "none");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevo = {
        nombre: document.getElementById("nombre").value,
        cbu: document.getElementById("cbu").value,
        banco: document.getElementById("banco").value, 
        alias: document.getElementById("alias").value,            
    };
    contactos.push(nuevo);
    renderizarContactos();
    modal.style.display = "none";
    formulario.reset();
});

btnBuscar.addEventListener('click', () => {
    renderizarContactos(inputBuscar.value);
});

document.addEventListener('DOMContentLoaded', () => {
    renderizarContactos();
    if (localStorage.getItem('saldoGlobal') === null) {
        localStorage.setItem('saldoGlobal', 100000); 
    }
});