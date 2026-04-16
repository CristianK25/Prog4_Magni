import type Participante from "../models/Participante";

/**
 * Interface que representa el estado de los filtros
 */
export interface FiltrosBusqueda {
  texto: string;
  modalidad: string;
  nivel: string;
}

/**
 * Agarra la lista de participantes, los pasa por el "embudo mágico" de los filtros,
 * y devuelve la lista limpia con los que sobrevivieron.
 * 
 * @param participantes Toda la lista completa.
 * @param filtros Las condiciones que debe cumplir.
 * @returns Array de Participantes que cumplen los requisitos.
 */
export const filtrarParticipantes = (
  participantes: Participante[],
  filtros: FiltrosBusqueda
): Participante[] => {
  return participantes.filter((persona) => {
    // 1. Filtro de Texto
    const coincideTexto =
      filtros.texto === "" ||
      persona.nombre.toLowerCase().includes(filtros.texto.toLowerCase());

    // 2. Filtro de Modalidad
    const coincideModalidad =
      filtros.modalidad === "" || persona.modalidad === filtros.modalidad;

    // 3. Filtro de Nivel
    const coincideNivel =
      filtros.nivel === "" || persona.nivel === filtros.nivel;

    // Solo pasan los que cumplan las 3 condiciones a la vez
    return coincideTexto && coincideModalidad && coincideNivel;
  });
};
