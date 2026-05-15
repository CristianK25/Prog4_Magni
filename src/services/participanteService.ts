import api from "./api";
import type Participante from "../models/Participante";

export const ParticipanteService = {
  getAll: async (): Promise<Participante[]> => {
    try {
      const response = await api.get<Participante[]>("/participantes");
      return response.data;
    } catch (error) {
      console.error("Error trayendo participantes del back", error);
      return [];
    }
  },

  create: async (nuevoParticipante: Omit<Participante, "id">): Promise<Participante> => {
    const response = await api.post<Participante>("/participantes", nuevoParticipante);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/participantes/${id}`);
  },

  update: async (id: number, datosActualizados: Omit<Participante, "id">): Promise<Participante> => {
    const response = await api.put<Participante>(`/participantes/${id}`, datosActualizados);
    return response.data;
  },
};
