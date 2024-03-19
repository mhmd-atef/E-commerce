import React, { useContext } from "react";
import { cartContext } from "../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Payment() {
  const { cartId, setCartProduct, setTotalCartPrice, setNumOfCartItems } =
    useContext(cartContext);

  async function confirmCashPayment() {
    const PhoneValue = document.querySelector("#Phone").value;
    const CityValue = document.querySelector("#City").value;
    const DetailsValue = document.querySelector("#Details").value;

    const shoppingAddress = {
      shippingAddress: {
        details: DetailsValue,
        phone: PhoneValue,
        city: CityValue,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shoppingAddress,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      console.log(data);
      if (data.status === "success") {
        toast.success("Order Done");
        setCartProduct([]);
        setTotalCartPrice(0);
        setNumOfCartItems(0);
      } else {
        toast.error("Error on Creating Order ");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Erroor happend", error);
    }
  }

  async function confirmOnlinePayment() {
    const PhoneValue = document.querySelector("#Phone").value;
    const CityValue = document.querySelector("#City").value;
    const DetailsValue = document.querySelector("#Details").value;

    const shoppingAddress = {
      shippingAddress: {
        details: DetailsValue,
        phone: PhoneValue,
        city: CityValue,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        shoppingAddress,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params: { url: `http://${window.location.host}` },
        }
      );
      console.log(data.session.url);
      window.open(data.session.url, "_blank");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div className="container p-5">
        <form>
          <label htmlFor="">Phone :</label>
          <input
            className="mb-4 form-control"
            type="tel"
            id="Phone"
            placeholder="Phone"
          />

          <label htmlFor="">City :</label>
          <input
            className="mb-4 form-control"
            type="text"
            id="City"
            placeholder="City"
          />

          <label htmlFor="">Details :</label>
          <textarea
            className="mb-4 form-control"
            type="text"
            id="Details"
            placeholder="Details"
          ></textarea>
          <div className="d-flex justify-content-center mx-5">
            <button
              type="button"
              onClick={confirmCashPayment}
              className="btn btn-dark mx-auto "
            >
              {" "}
              Confirm <span className="main-color"> Cash</span> Payment
            </button>

            <button
              type="button"
              onClick={confirmOnlinePayment}
              className="btn btn-dark mx-auto "
            >
              {" "}
              Confirm <span className="main-color"> Online</span> Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
