import axios from "axios";
import React, { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../Context/About";

export default function Product() {
  const { addToList } = useContext(wishListContext);
  const { addProductToCart } = useContext(cartContext);

  async function addProduct(id) {
    const res = await addProductToCart(id);
    if (res.status === "success") {
      toast.success(res.message, {
        duration: 2500,
        position: "top-center",
      });
    } else {
      toast.error("Error happend...");
    }
  }
  async function addProductToList(id) {
    const res = await addToList(id);
    if (res.status === "success") {
      toast.success(res.message, {
        duration: 2500,
        position: "top-center",
      });
    } else {
      toast.error("Error happend...");
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isFetching, isLoading } = useQuery(
    "allProducts",
    getAllProducts
  );

  console.log(data?.data.data, isError, isLoading, isFetching);

  function search(term) {
    var selected = [];
    for (var i = 0; i < data.data.leangth; i++) {
      if (data[i].title.toLowerCase().includes(term.toLowerCase())) {
        console.log(data[i]);
        selected.push(data[i]);
        getAllProducts(selected);
      } else {
        console.log("not found");
      }
    }
  }
  if (isLoading) {
    return (
      <>
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container py-5">
        <input
          onInput={search()}
          type="text"
          placeholder="Search.. "
          className="form-control mx-auto w-75 mb-4"
        />

        <div className="row gy-4">
          {data?.data.data.map(function (product, idx) {
            <input
              onInput={search()}
              type="text"
              placeholder="Search.. "
              className="form-control mx-auto w-75"
            />;
            return (
              <>
                <div key={idx} className="col-md-3">
                  <div className="product zbo p-3">
                    <Link to={`/Detailes/${product.id}`}>
                      <img
                        src={product.imageCover}
                        alt="product"
                        className="w-100"
                      />
                      <h6 className="main-color">{product.category.name}</h6>
                      <h5 className="h6">
                        {product.title.split(" ").slice(0, 3).join(" ")}
                      </h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>
                          <span className="main-color">{product.price}</span>{" "}
                          EGP
                        </h6>
                        <h6>
                          {" "}
                          <span>
                            <i className="fa-solid fa-star main-color"></i>
                          </span>{" "}
                          {product.ratingsAverage}
                        </h6>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                      <span></span>
                      <button
                        onClick={() => addProduct(product.id)}
                        className="fadd w-100 rounded-5 p-1  btn main-bg-color mt-2 text-white border-white"
                      >
                        {" "}
                        Add To Cart{" "}
                      </button>
                      <span>
                        <Link>
                          <i
                            onClick={() => addProductToList(product.id)}
                            class="ffad fa-heart fa-lg main-color m-3 fs-2 mx-1 fa-solid"
                          ></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
