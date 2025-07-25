import { backendAPI } from '@/api/backendAPI';
import type { Product } from '../interfaces/products.interfaces';
import { getProductImage } from './getProductImage';

export const getProducts = async (page: number = 1, limit: number = 12) => {
  try {
    const { data } = await backendAPI.get<Product[]>(
      `/products?limit=${limit}&&offset=${page * limit}`,
    );

    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImage),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
