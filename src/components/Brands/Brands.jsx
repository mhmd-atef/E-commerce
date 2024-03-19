import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
// import { data } from "jquery";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isError, isFetching, isLoading } = useQuery(
    "allBrands",
    getAllBrands
  );
  console.log(isError, isLoading, isFetching);


  return (
    <>
      <h1 className="main-color text-center py-4 ">All Brands</h1>
      <div className="container ">
        <div className="row gy-4 ">
          {data?.data.data.map(function (product, idx) {
            return (
              <div key={idx} className="col-md-3">
                <div className="zbo p-3">
                  <img
                    src={product.image}
                    className="w-100"
                    alt={product.slug}
                  />
                  <div className="text-center main-color">
                    <h5>{product.name} </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
