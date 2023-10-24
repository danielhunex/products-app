"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Product } from "../types/Product";
import { Header } from "../types/Header";
import DeleteButton from "./DeleteButton";

export interface ProductListProps {
  headers: Header[];
  body: Product[];
}

const ProductList = ({ headers, body }: ProductListProps) => {
  const [filteredData, setFilteredData] = useState<Product[]>(body);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    setFilteredData(
      body.filter(
        (it) => !value || it.color.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div className="overflow-x-auto">
      <div className="flex w-full mb-4 gap-4">
        <label htmlFor="color">Filter by Color:</label>
        <input
          name="color"
          className="bg-gray-200 appearance-none border-2 border-secondary rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
          type="text"
          placeholder="type here"
          onChange={handleOnChange}
        />
      </div>
      <table className="w-full table-fixed border-collapse border border-gray-300">
        <thead className="bg-blue-200 text-secondary">
          <tr>
            {headers.map((head) => (
              <th className="px-4 py-2 w-1/7 text-left" key={head.name}>
                {head.displayName}
              </th>
            ))}
            <th className="px-4 py-2 w-1/7 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((prod, index) => (
            <tr
              key={prod.sku}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {headers.map((head) => (
                <td
                  className="px-4 py-2 w-1/7 text-left"
                  key={`${prod.id}-${head.name}`}
                >
                  {head.name == "price"
                    ? `$${prod[head.name].toFixed(2)}`
                    : prod[head.name]}
                </td>
              ))}
              <td className="px-4 py-2 w-1/7 text-left flex gap-5">
                <Link href={`/products/${prod.sku}`}>
                  <FiEdit
                    size={25}
                    className="text-indigo-300 hover:underline"
                  />
                </Link>
                <DeleteButton itemId={prod.sku} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
