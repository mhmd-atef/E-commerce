import React from "react";
import "./App.css";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Product from "./components/Product/Product";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import About from "./components/Context/About";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { AuthProvider } from "./components/Context/authentication";
import ProductedRoute from "./components/ProductedRoute/ProductedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import Detailes from "./components/Detailes/Detailes";
import CartContextProvider from "./components/Context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import { Offline } from "react-detect-offline";
import ForgetPass from "./components/ForgetPass/ForgetPass";
import WishList from "./components/WishList/WishList";
import AboutProvider from "./components/Context/About";
// import { Toast } from 'bootstrap';

const myRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "product",
        element: (
          <ProductedRoute>
            <Product />
          </ProductedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProductedRoute>
            <Cart />
          </ProductedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProductedRoute>
            <Brands />
          </ProductedRoute>
        ),
      },
      { path: "Home", element: <Home /> },
      {
        path: "About",
        element: (
          <ProductedRoute>
            <About />
          </ProductedRoute>
        ),
      },
      {
        path: "Detailes/:id",
        element: (
          <ProductedRoute>
            <Detailes />
          </ProductedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProductedRoute>
            <Profile />
          </ProductedRoute>
        ),
      },
      {
        path: "AllOrders",
        element: (
          <ProductedRoute>
            <AllOrders />
          </ProductedRoute>
        ),
      },
      {
        path: "WishList",
        element: (
          <ProductedRoute>
            <WishList />
          </ProductedRoute>
        ),
      },
      {
        path: "Payment",
        element: (
          <ProductedRoute>
            <Payment />
          </ProductedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "forgetPass", element: <ForgetPass /> },

      {
        path: "*",
        element: (
          <div className="  container-fluid   bg-danger">
            <div className="row justify-content-center  vh-100">
              <div className=" text-black col-md-6    text-center m-auto  fw-bolder">
                <h1>
                  Not Found{" "}
                  <span className="text-dark align-content-cetner text-center m-auto col-md-2 d-flex">
                    4 0 4
                  </span>{" "}
                </h1>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default function App() {
  let ClientQuery = new QueryClient({});
  return (
    <>
      <QueryClientProvider client={ClientQuery}>
        <CartContextProvider>
          <AboutProvider>
            <AuthProvider>
              <RouterProvider router={myRouter} />
            </AuthProvider>
          </AboutProvider>
        </CartContextProvider>

        <Toaster />
        <Offline>
          <div className="position-fixed bottom-0 text-center start-50 mx-auto bg-danger main-bg-color text-white  p-3 rounded-3">
            ❌Oops... you are offline now.
          </div>
        </Offline>
      </QueryClientProvider>
    </>
  );
}
