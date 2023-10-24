import React from "react";
import { Product } from "@/app/types/Product";
import { getProductBySku } from "@/app/ApiClient/ApiClient";
import { EditProduct } from "@/app/Component/EditProduct";

const productDetail = async ({ params }: { params: { sku: string } }) => {
  const product: Product|undefined = await getProductBySku(params.sku)
//TODO: handle when the API returns undefined
  return (
    <div>
     <EditProduct product={product!}/>
    </div>
  );
};

export default productDetail;
