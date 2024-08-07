/**
 * @whiteList Valida que la ruta este en la white list de rutas sin autenticacion.
 * @param pathname Recibe la ruta que se solicita en el request.
 * @returns retorna un balor boleano que especifica que se encunetra en la white list
 */
export const whiteList = (pathname: string): boolean => {
  return [`${process.env.BASEPATH}/products`].includes(pathname);
};
