document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const alertMessage = document.getElementById('alert-message');
    const btnIngresar = document.getElementById('btn-ingresar');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitamos recarga de la página

        alertMessage.style.display = 'none'; // Reseteamos la alerta
        btnIngresar.disabled = true;
        btnIngresar.textContent = 'Ingresando...';

        const usuario = document.getElementById('usuario').value;
        const clave = document.getElementById('clave').value;

        try {
            // Llamamos a la API usando la función definida en api.js
            const result = await api.login(usuario, clave);

            if (result.respuesta === 'OK') {
                // Login exitoso
                window.location.href = 'lista.html';
            } else {
                // Login fallido
                alertMessage.textContent = result.mje || 'Error desconocido';
                alertMessage.className = 'alert alert-error';
                alertMessage.style.display = 'block';
            }
        } catch (error) {
            alertMessage.textContent = 'No se pudo conectar con el servidor.';
            alertMessage.className = 'alert alert-error';
            alertMessage.style.display = 'block';
        } finally {
            btnIngresar.disabled = false;
            btnIngresar.textContent = 'Ingresar';
        }
    });
});
