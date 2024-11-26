const formatStrapiResponse = (response, model = null) => {
    const { data, meta } = response;
  
    const formatItem = (item) => {
      const formattedItem = { id: item.id, ...item.attributes };
      return model ? new model(formattedItem) : formattedItem;
    };
  
    const formattedData = Array.isArray(data) 
      ? data.map(formatItem) 
      : formatItem(data);
  
    return { data: formattedData, meta };
  };
  
  export default formatStrapiResponse;
  