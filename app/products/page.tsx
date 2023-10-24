import React from "react";
import ProductList from "../Component/ProductList";
import { Product } from "../types/Product";
import { getProducts } from "../ApiClient/ApiClient";
import { Header } from "../types/Header";

const Products = async () => {
  const products: Product[] = await getProducts();

  const headers: Header[] = [
    { name: "name", displayName: "Name" },
    { name: "color", displayName: "Color" },
    { name: "type", displayName: "Type" },
    {
      name: "price",
      displayName: "Cost",
    },
  ];

  //TODO: we need pagination

  return (
    <div>
      <div className="overflow-x-auto">
        <ProductList headers={headers} body={products} />
      </div>
    </div>
  );
};

export default Products;
