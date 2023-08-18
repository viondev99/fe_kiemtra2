import React, { useState } from "react";
import { getAuth, deleteAuth, putAuth } from "../services";

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

  const createProduct = async (payload) => {
    try {
      await postAuth('http://localhost:8000/channel', payload);
    } catch (error) {
      console.error(error);
    }
  }

  const updateProduct = async (id, payload) => {
    try {
      await putAuth(`http://localhost:8000/channel/${id}`, payload);
    } catch (error) {
      console.error(error);
    }
  }

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
    createProduct,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
