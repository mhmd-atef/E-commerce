import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    const x = jwtDecode(localStorage.getItem("tkn"));
    getUserOrders(x.id);
  }, []);

  async function getUserOrders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id} `
      );
      console.log(data);
      setUserOrders(data);
    } catch (error) {
      console.log("errooor", error);
    }
  }

  if (userOrders === null) {
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
      <div className="container">
        <button
          className="btn btn-outline-success w-100 m-3"
          onClick={() => setUserOrders([])}
        >
          {" "}
          Clear All Orders
        </button>
        <div className="row g-5">
          {userOrders.map(function (order, idx) {
            return (
              <>
                <div key={idx} className="col-md-6">
                  <div className="order bg-success rounded-4 p-4">
                    <div className="container">
                      <div className="row">
                        {order.cartItems?.map(function (item, index) {
                          return (
                            <div key={index} className="col-sm-6">
                              <div className="bg-dark my-2">
                                <img
                                  src={item.product.imageCover}
                                  className="w-100"
                                  alt={item.product.title}
                                />
                                <h6 className="text-white lead mb-2 ">
                                  {" "}
                                  {item.product.title
                                    .split(" ")
                                    .splice(0, 2)
                                    .join(" ")}{" "}
                                </h6>
                                <p className="text-white mb-0 ">
                                  Count : {item.count}{" "}
                                </p>
                                <p className="text-white ">
                                  Price : {item.price}{" "}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <p className="h4 ">
                      Order sent to user with phone{" "}
                      <span className="lead text-white">
                        {order.shippingAddress.phone}{" "}
                      </span>
                      and with details{" "}
                      <span className="lead text-white">
                        {" "}
                        {order.shippingAddress.details}{" "}
                      </span>
                      at{" "}
                      <span className="lead text-white">
                        {" "}
                        {order.shippingAddress.city}{" "}
                      </span>
                      <div className="my-2">
                        <h5 className="m-0">
                          {" "}
                          Payment Method :
                          <span className="text-white">
                            {" "}
                            {order.paymentMethodType}
                          </span>{" "}
                        </h5>
                        <h5>
                          {" "}
                          Total Price :{" "}
                          <span className=" text-white">
                            {order.totalOrderPrice}
                          </span>
                        </h5>
                      </div>
                    </p>
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
