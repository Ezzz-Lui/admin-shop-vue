export const getProductImage = (file_name: string) => {
  try {
    return file_name.includes('http')
      ? file_name
      : `${import.meta.env.VITE_BACKEND_API_URL}/files/product/${file_name}`;
  } catch (error) {
    throw new Error(`Error getting url image from server: ${error}`);
  }
};
