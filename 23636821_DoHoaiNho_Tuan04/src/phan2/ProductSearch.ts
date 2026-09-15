export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

export async function fetchProducts(
  keyword: string,
  limit: number
): Promise<ProductResponse> {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data: ProductResponse = await response.json();

  return data;
}

export async function fetchPaginatedProducts(
  page: number,
  limit: number
): Promise<ApiResponse<Product>> {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const json: ProductResponse = await response.json();

  return {
    data: json.products,
    total: json.total,
    page,
  };
}
