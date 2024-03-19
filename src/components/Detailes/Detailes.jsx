import axios from "axios";
import React, { useContext, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function Detailes() {
  const { addProductToCart } = useContext(cartContext);

  const { id } = useParams();
  const [sendingLoader, setSendingLoader] = useState(false);

  async function addProduct(id) {
    setSendingLoader(true);

    const res = await addProductToCart(id);
    if (res.status === "success") {
      toast.success(res.message, {
        duration: 2500,
        position: "top-center",
      });
    } else {
      toast.error("Error happend..");
    }
    setSendingLoader(false);
  }

  function getDetalies() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading } = useQuery("Detailes", getDetalies);

  if (isLoading) {
    return (
      <div className="vh-50 d-flex justify-content-center align-items-center">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <figure>
              <img
                className="w-100"
                src={data.data.data.imageCover}
                alt={data.data.data.title}
              />
            </figure>
          </div>
          <div className="col-md-9">
            <div className="detalies text-center">
              <h1>{data.data.data.title}</h1>
              <p className="text-muted">{data.data.data.description}</p>
              <p>{console.log(data.data.data.id)}</p>
              <h5 className="">
                price:{" "}
                <span className="main-color"> {data.data.data.price}</span> EGP
              </h5>
              <button
                onClick={() => addProduct(data.data.data.id)}
                className="w-100 rounded-4 p-2 main-bg-color text-white border-white"
              >
                {sendingLoader ? (
                  <InfinitySpin width="115" color="black" />
                ) : (
                  "+ ADD To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
