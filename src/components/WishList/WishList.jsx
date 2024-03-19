import React, { useContext } from "react";
import { wishListContext } from "../Context/About";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";

export default function WishList() {
  const { deleteProduct, wishListProduct, setwishListProduct } =
    useContext(wishListContext);
  const { addProductToCart } = useContext(cartContext);

  if (wishListProduct === null) {
    return (
      <>
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <h1 className="text center">No Data Found In Your Wish List </h1>
          <span className="">
            <Link
              style={{ position: "absolute" }}
              className=" text-danger"
              to="/product"
            >
              {" "}
              ....Get Some Products
            </Link>
          </span>
        </div>
      </>
    );
  }

  async function deleteElemet(id) {
    const res = await deleteProduct(id);
    if (res.status === "success") {
      toast.success("Product delete from your Wish List");
      setwishListProduct(wishListProduct);
    } else {
      toast.error("Error happened...");
    }
  }

  async function addProduct(id) {
    const res = await addProductToCart(id);
    if (res.status === "success") {
      toast.success("Product added to your Wish List");
    } else {
      toast.error("Error happend...");
    }
  }

  return (
    <div className="container my-4 py-4" style={{ background: "#eee" }}>
      <h2 className=" text-center h1 main-color">Wish List</h2>
      {wishListProduct?.map(function (product, idx) {
        return (
          <div
            key={idx}
            className="row align-items-center border-ssecondary border-bottom border-secondary p-3 m-2"
          >
            <div className="col-sm-2">
              <img
                className="w-100"
                src={product.imageCover}
                alt={product.title}
              />
            </div>
            <div className="col-sm-7">
              <h6>{product.title}</h6>
              <h4>
                {" "}
                <span className="main-color">{product.price} EGP</span>
              </h4>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteElemet(product.id)}
              >
                {" "}
                Remove
              </button>
            </div>
            <div className="col-sm">
              <button
                onClick={() => addProduct(product.id)}
                className=" w-100 rounded-5  p-2 btn-success btn text-white border-white"
              >
                {" "}
                Add To Cart{" "}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
