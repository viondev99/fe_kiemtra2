import React, { useState } from "react";
import { getAuth, deleteAuth } from "../services";

export const ProductContext = React.createContext();

export function ProductContextProvider({ children }) {
  const [listProduct, setListProduct] = useState();
  const [selectedItem, setSlectedItem] = useState();

  const getListProduct = async (callback) => {
    try {
      const response = await getAuth("http://localhost:8000/channel");
      setListProduct(response);
    } catch (e) {
      console.log(e);
    }

    if (callback) {
      callback();
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await getAuth(`http://localhost:8000/channel/${id}`);
      setSlectedItem(response);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProductById = async (id) => {
    try {
      await deleteAuth(`http://localhost:8000/channel/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    getListProduct,
    listProduct,
    getProductById,
    selectedItem,
    deleteProductById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
