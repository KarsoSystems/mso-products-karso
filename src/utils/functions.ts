import { v4 as uuidv4 } from 'uuid';

/**
 * @folio Esta funcion crea el folio de la operación
 * @returns Retorna un id como folio de operación.
 */
export const folio = () => {
  return uuidv4();
};
