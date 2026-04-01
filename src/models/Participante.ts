export default interface Participante {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  tecnologias: string[];
  modalidad: string;
  nivel: string;
  aceptaTerminos: boolean;
}
