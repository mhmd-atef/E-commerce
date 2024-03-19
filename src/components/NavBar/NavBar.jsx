import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { authContext } from "../Context/authentication";
import { cartContext } from "../Context/CartContext";
import { wishListContext } from "../Context/About";

export default function NavBar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const { count } = useContext(wishListContext);

  const Nav = useNavigate();

  function logout() {
    Nav("/login");

    localStorage.removeItem("tkn");

    setToken(null);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/WishList">
                      Wish List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/product">
                      Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/AllOrders">
                      All Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link position-relative" to="/cart">
                      Cart
                      <span class="position-absolute top-1 start-100 translate-middle badge  rounded-pill main-bg-color text-dark">
                        {numOfCartItems}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto  mb-2  mb-lg-0 mt-1">
              {token ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <li className="nav-item">
                      <Link
                        className="nav-link position-relative me-3"
                        to="/WishList"
                      >
                        <span class="position-absolute top-1 start-100 translate-middle badge  rounded-pill main-bg-color text-dark">
                          {count}
                          <span class="visually-hidden">unread messages</span>
                        </span>
                        <i className="ffad fa-heart fa-solid fs-3"></i>
                      </Link>
                    </li>
                    {/* <i className='fab mx-1 fa-twitter'></i>
              <i className='fab mx-1 fa-instagram'></i>
              <i className="fa-brands mx-1 me-4  fa-linkedin"></i> */}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <i className="fa-regular ms-2 fa-user"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                      <i className="fa-solid mx-0 fa-right-from-bracket"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
