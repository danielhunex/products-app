import { Product } from "./Product";

export interface Header {
    name: keyof Product;
    displayName: string;
  }