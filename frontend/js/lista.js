document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btn-buscar');
    const inputBuscador = document.getElementById('buscador');
    const tbody = document.getElementById('users-tbody');
    const alertMessage = document.getElementById('alert-message');
    const emptyState = document.getElementById('empty-state');
    const tableContainer = document.querySelector('.table-container');

    // Cargar grilla inicial
    cargarUsuarios();

    // Evento para el botón de búsqueda
    btnBuscar.addEventListener('click', () => {
        const query = inputBuscador.value.trim();
        cargarUsuarios(query);
    });

    // Permitir buscar con Enter
    inputBuscador.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = inputBuscador.value.trim();
            cargarUsuarios(query);
        }
    });

    function mostrarAlerta(mensaje, esError = true) {
        alertMessage.textContent = mensaje;
        alertMessage.className = esError ? 'alert alert-error' : 'alert'; // Se puede añadir una clase alert-success si se desea
        if(!esError) {
            alertMessage.style.backgroundColor = '#d1fae5';
            alertMessage.style.color = '#065f46';
            alertMessage.style.borderColor = '#34d399';
            alertMessage.style.display = 'block';
        }
        alertMessage.style.display = 'block';
        
        // Auto ocultar después de 4 segundos
        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 4000);
    }

    async function cargarUsuarios(query = "") {
        try {
            // Llamamos a api.js para obtener usuarios
            const usuarios = await api.getUsers(query);
            renderTable(usuarios);
        } catch (error) {
            mostrarAlerta('No se pudieron obtener los usuarios. Verifique la conexión.');
        }
    }

    function renderTable(usuarios) {
        tbody.innerHTML = '';
        alertMessage.style.display = 'none';

        if (!usuarios || usuarios.length === 0) {
            tableContainer.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        tableContainer.style.display = 'block';
        emptyState.style.display = 'none';

        usuarios.forEach(user => {
            const tr = document.createElement('tr');

            // Asignar clase para color según el TP
            const esBloqueado = user.bloqueado === 'Y';
            tr.className = esBloqueado ? 'row-blocked' : 'row-unblocked';

            tr.innerHTML = `
                <td>${user.id || ''}</td>
                <td>${user.usuario || ''}</td>
                <td>${user.bloqueado || ''}</td>
                <td>${user.apellido || ''}</td>
                <td>${user.nombre || ''}</td>
                <td style="text-align: center;">
                    <button class="action-btn block-btn" data-id="${user.id}" title="Bloquear usuario">👍</button>
                </td>
                <td style="text-align: center;">
                    <button class="action-btn unblock-btn" data-id="${user.id}" title="Desbloquear usuario">👎</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Adjuntar eventos de bloqueo/desbloqueo a los botones recién creados
        document.querySelectorAll('.block-btn').forEach(btn => {
            btn.addEventListener('click', (e) => cambiarEstadoBloqueo(e.target.dataset.id, 'Y'));
        });

        document.querySelectorAll('.unblock-btn').forEach(btn => {
            btn.addEventListener('click', (e) => cambiarEstadoBloqueo(e.target.dataset.id, 'N'));
        });
    }

    async function cambiarEstadoBloqueo(idUser, estado) {
        try {
            // Llamamos a api.js para cambiar el estado
            const result = await api.setBlockStatus(idUser, estado);

            if (result.respuesta === 'OK') {
                mostrarAlerta(`Estado actualizado correctamente (${estado}).`, false);
                // Recargar grilla manteniendo la búsqueda actual
                cargarUsuarios(inputBuscador.value.trim());
            } else {
                mostrarAlerta('Error: ' + result.mje, true);
            }
        } catch (error) {
            mostrarAlerta('Ocurrió un error al intentar cambiar el estado.', true);
        }
    }
});
