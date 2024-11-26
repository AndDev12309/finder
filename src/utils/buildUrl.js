// utils/buildUrl.js
const buildUrl = ({ populate, filters, sort, ...otherParams } = {}) => {
  let url = "";

  // Construir parámetros `populate`
  if (populate) {
    if (typeof populate === "string") {
      url += `populate=${populate}&`;
    } else if (Array.isArray(populate)) {
      populate.forEach((field) => {
        url += `populate=${field}&`;
      });
    } else if (typeof populate === "object") {
      Object.keys(populate).forEach((key) => {
        url += `populate[${key}]=${JSON.stringify(populate[key])}&`;
      });
    }
  }

  // Construir filtros en el formato específico de Strapi
  const addFilters = (filters, parentKey = "filters") => {
    let filterString = "";
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      const fullKey = `${parentKey}[${key}]`;

      if (Array.isArray(value)) {
        // Manejar cada elemento en un arreglo, como en el caso de `$or`
        value.forEach((item, index) => {
          if (typeof item === "object") {
            filterString += addFilters(item, `${fullKey}[${index}]`);
          }
        });
      } else if (typeof value === "object") {
        // Manejar objetos anidados
        filterString += addFilters(value, fullKey);
      } else {
        // Agregar clave-valor para valores directos
        filterString += `${fullKey}=${encodeURIComponent(value)}&`;
      }
    });
    return filterString;
  };

  // Agregar filtros a la URL si existen
  if (filters) {
    url += addFilters(filters);
  }

  // Agregar `sort` si está definido
  if (sort) {
    url += `sort=${encodeURIComponent(sort)}&`;
  }

  // Agregar otros parámetros adicionales
  Object.keys(otherParams).forEach((key) => {
    url += `${key}=${encodeURIComponent(otherParams[key])}&`;
  });

  // Retornar la URL final eliminando el último '&'
  return url.slice(0, -1);
};

export default buildUrl;
