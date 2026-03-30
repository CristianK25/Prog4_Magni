const BASE_URL = 'http://localhost:8000';

const api = {
    /**
     * Realiza el login de un usuario
     * @param {string} user Nombre de usuario
     * @param {string} pass Contraseña
     * @returns {Promise<{respuesta: string, mje: string}>}
     */
    login: async (user, pass) => {
        try {
            const url = `${BASE_URL}/tp1/login?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Error en petición login:", error);
            return { respuesta: "ERROR", mje: "No se pudo conectar con el servidor" };
        }
    },

    /**
     * Obtiene la lista de usuarios, opcionalmente filtrada por nombre de usuario
     * @param {string} [usuario=""] Filtro de búsqueda (LIKE)
     * @returns {Promise<Array>} Lista de usuarios
     */
    getUsers: async (usuario = "") => {
        try {
            let url = `${BASE_URL}/tp1/lista?action=BUSCAR`;
            if (usuario) {
                url += `&usuario=${encodeURIComponent(usuario)}`;
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return []; // En caso de error devolvemos lista vacía
        }
    },

    /**
     * Bloquea o desbloquea un usuario
     * @param {string|number} idUser ID del usuario
     * @param {string} estado 'Y' para bloquear, 'N' para desbloquear
     * @returns {Promise<{respuesta: string, mje: string}>}
     */
    setBlockStatus: async (idUser, estado) => {
        try {
            const url = `${BASE_URL}/tp1/lista?action=BLOQUEAR&idUser=${encodeURIComponent(idUser)}&estado=${encodeURIComponent(estado)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error al cambiar estado de bloqueo (ID: ${idUser}, Estado: ${estado}):`, error);
            return { respuesta: "ERROR", mje: "Error de conexión con el servidor" };
        }
    }
};

// Exportamos el objeto api para si se usa como módulo, o lo dejamos global si no
if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
} else if (typeof window !== 'undefined') {
    window.api = api;
}
