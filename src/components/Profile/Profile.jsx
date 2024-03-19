import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function Profile() {
  const [name, setName] = useState(null);

  useEffect(() => {
    const x = jwtDecode(localStorage.getItem("tkn"));
    setName(x.name);
  }, []);

  if (name === null) {
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
    <div className="main-bg-color container-fluid vh-100">
      <div className=" py-5">
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 rounded-5 row border-5 border-dark border text-bg-dark">
          <div className=" py-2">
            <h1 className="text-center main-color my-1 bg-dark p-3">
              Hello <span> </span>
              <i className="fa-solid fa-face-kiss-wink-heart"></i>
              <h1 className=""> {name} </h1>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
