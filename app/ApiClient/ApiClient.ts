import { Product } from "../types/Product";

const baseUrl = "http://localhost:3001";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${baseUrl}/products`, { cache: "no-store" });
  const products: Product[] = await response.json();
  return products;
};

export const getProductBySku = async (
  sku: string
): Promise<Product | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/products/${sku}`, {
      cache: "no-store",
    });
    const product = await response.json();
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  editedProduct: Product
): Promise<Product | null> => {
  try {
    const response = await fetch(`${baseUrl}/products/${editedProduct.sku}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(editedProduct),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      return updatedProduct as Product;
    } else {
      console.error("Product update failed");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProduct = async (sku: string): Promise<void> => {
  await fetch(`${baseUrl}/products/${sku}`, {
    method: "Delete",
  });
};
