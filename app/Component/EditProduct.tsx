"use client";
import React, { useState } from "react";
import { Product } from "../types/Product";
import { updateProduct } from "../ApiClient/ApiClient";
import { useRouter } from "next/navigation";

export interface EditProductProps {
  product: Product;
}

export const EditProduct = ({ product }: EditProductProps) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValidationError(null);
    if (name === "price") {
      if (!value || isNaN(Number(value)) || Number(value)<0) {
        setValidationError(`${name} should be a number and be greater than or equal to 0 `);
      }
      setEditedProduct({
        ...editedProduct,
        [name]: Number(value),
      });
    } else {
      if (!value || value.length < 3 || value.length > 56) {
        setValidationError(`${name} should have length beteen 3 and 56 `);
      }
      setEditedProduct({
        ...editedProduct,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validationError) {
      return;
    }
    const product = await updateProduct(editedProduct);
    if (product) {
      router.prefetch("/products");
      router.push("/products");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {validationError && (
          <>
            <div className="text-red-500 mb-4">
              Please fix the following errors:
            </div>

            <div className="text-red-500 pb-1">{validationError}</div>
          </>
        )}
        <div className="mb-4">
          <label
            htmlFor="nam {e"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={editedProduct.color}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={editedProduct.type}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="btn btn-active btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};
