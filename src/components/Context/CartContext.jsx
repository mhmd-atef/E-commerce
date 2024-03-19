import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartProduct, setCartProduct] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getUserCart();

      return data;
    } catch (e) {
      console.log("error", e);
    }
  }

  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPricev);
      setCartProduct(data.data.products);
      setCartId(data.data._id);
    } catch (e) {
      console.log("errorrre", e);
    }
  }

  async function deleteProduct(product) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${product}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProduct(data.data.products);
      return data;
    } catch (e) {
      console.log("eerr", e);
    }
  }

  async function updateProduct(product, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${product}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProduct(data.data.products);
      return data;
    } catch (error) {
      console.log("errorr", error);
    }
  }

  async function removeCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setCartProduct([]);
      return data;
    } catch (error) {
      console.log("ERORR", error);
    }
  }

  useEffect(function () {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartId,
        removeCart,
        updateProduct,
        deleteProduct,
        getUserCart,
        addProductToCart,
        cartProduct,
        totalCartPrice,
        numOfCartItems,
        setCartProduct,
        setTotalCartPrice,
        setNumOfCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
