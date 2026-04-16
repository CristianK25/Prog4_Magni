import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type Participante from "../models/Participante";
import { ParticipanteService } from "../services/participanteService";

// Interfaz obligatoria: Le avisa a toda la app EXACTAMENTE qué tiene para ofrecer este contexto
export interface ParticipantesContextType {
  participantes: Participante[];
  agregar: (p: Omit<Participante, "id">) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
  cargando: boolean; // Para tirar un "Cargando..." y que quede fachero
}

// 1. Nacimiento del Contexto: Al principio lo creamos "vacío" forzando el tipo para calmar a TypeScript
export const ParticipantesContext = createContext<ParticipantesContextType>(
  {} as ParticipantesContextType
);

// 2. El Provider: Es el componente Padre Absoluto que va a envolver tu app
export const ParticipantesProvider = ({ children }: { children: ReactNode }) => {
  // ACÁ VIENE LA MAGIA: Todo el estado se mudó acá, es la base de datos central en memoria
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [cargando, setCargando] = useState(true);

  // Cuando se monta el provider por primera vez, vamos a buscar al backend
  const cargarParticipantes = async () => {
    setCargando(true);
    try {
      const data = await ParticipanteService.getAll();
      setParticipantes(data);
    } catch (error) {
      console.error("Hubo un drama trayendo de la BD", error);
    } finally {
      setCargando(false);
    }
  };

  // Se ejecuta SOLA una vez cuando arranca
  useEffect(() => {
    cargarParticipantes();
  }, []);

  // AGREGAR: Ya no manipula solo a React, ahora manda al backend primero
  const agregar = async (nuevoParticipante: Omit<Participante, "id">) => {
    try {
      // 1. El backend nos da el OK y nos devuelve el objeto CON EL ID REAL generado
      const participanteCreado = await ParticipanteService.create(nuevoParticipante);
      
      // 2. Si llegamos acá es porque no explotó, recién acá tocamos el estado visible
      setParticipantes((estadoAnterior) => [...estadoAnterior, participanteCreado]);
    } catch (error) {
      console.error("Ups, no se pudo guardar", error);
    }
  };

  // ELIMINAR: Idem, si el back da el visto bueno, lo borramos de la vista
  const eliminar = async (id: number) => {
    try {
      // 1. Mata al loco en la base de datos
      await ParticipanteService.delete(id);
      
      // 2. Lo saca de la memoria local
      setParticipantes((estadoAnterior) =>
        estadoAnterior.filter((p) => p.id !== id)
      );
    } catch (error) {
      console.error("Che, no se pudo eliminar", error);
    }
  };

  // 3. El render que le expone toda la tubería de 'value' a los componentesijos (children)
  return (
    <ParticipantesContext.Provider
      value={{
        participantes,
        agregar,
        eliminar,
        cargando,
      }}
    >
      {/* Acá se enchufa literal toda la aplicación tuya */}
      {children}
    </ParticipantesContext.Provider>
  );
};
