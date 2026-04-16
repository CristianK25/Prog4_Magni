import axios from "axios";
import type Participante from "../models/Participante";

// Configuramos una instancia de axios.
// Cuando tengas el backend real levantado, cambiás esta URL y magia, anda en todos lados.
const api = axios.create({
  baseURL: "http://localhost:8080/api", 
  // Podrías ponerle timeout o headers acá, etc.
});

// Envolvemos todo en un lindo objeto para exportar, así cuando se importa en otros lados
// hacemos ParticipanteService.getAll() y queda súper claro.
export const ParticipanteService = {
  // Llama para traerlos a todos
  getAll: async (): Promise<Participante[]> => {
    try {
      const response = await api.get<Participante[]>("/participantes");
      return response.data;
    } catch (error) {
      console.error("Error trayendo participantes del back", error);
      // Por ahora para no frenarte te devuelve vacío.
      // Cuando tengamos el backend real capaz querés que estalle con throw error;
      return []; 
    }
  },

  // Llama para mandarle el form al back
  create: async (nuevoParticipante: Omit<Participante, "id">): Promise<Participante> => {
    const response = await api.post<Participante>("/participantes", nuevoParticipante);
    return response.data; // El back nos tendría que devolver al chabón recién creado (con su ID)
  },

  // LLamado para volar a un participante
  delete: async (id: number): Promise<void> => {
    await api.delete(`/participantes/${id}`);
  },
};
