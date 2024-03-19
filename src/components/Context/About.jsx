import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const wishListContext = createContext();

export default function About({ children }) {
  const [wishListProduct, setwishListProduct] = useState(null);
  const [count, setCountList] = useState(0);
  const [WishListId, setWishListId] = useState(null);

  async function addToList(productIid) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: productIid },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      console.log("data addlist", data);

      getUSerList();

      return data;
    } catch (error) {
      console.log("error error", error);
    }
  }

  async function getUSerList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      console.log("data getlist", data);

      setCountList(data.count);
      setwishListProduct(data.data);
      setWishListId(data._id);
    } catch (e) {
      console.log("errorrre", e);
    }
  }

  async function deleteProduct(product) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${product}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      console.log("del", data);
      setwishListProduct(data.data);
      setWishListId(data._id);
      return data;
    } catch (e) {
      console.log("eerr", e);
    }
  }

  useEffect(function () {
    getUSerList();
  }, []);

  return (
    <wishListContext.Provider
      value={{
        count,
        deleteProduct,
        getUSerList,
        addToList,
        setwishListProduct,
        setWishListId,
        WishListId,
        wishListProduct,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
