import React, { useState } from "react";
import{useFormik} from 'formik'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

// Handling Exception => try catch 


export default function Register() {
  
  let user={
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:"",
  }

  const [ errMsg, setErrMsg] = useState(null);
  const [ sussMsg, setSussMsg] = useState(null);
  const [ loading,setLoading ]=useState(false) ;
  const navigate=useNavigate()

  async function registerNewUser (x) {
    setLoading(true);
    console.log('Sending to backend');
    setErrMsg(null) 


    //!^// const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', x )
    // .catch(function (error) {
    //   console.log('error done ');
    //   console.log(error.response.data.message);
    //   console.log(data);
    // })

    try {
      
      const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', x )
      
      console.log(data);

      if (data.message==='success') {
        // success message for user => navigate for login 
        setSussMsg('Account has created successfully')

        setTimeout(()=>{
          return navigate("/login") ;
        },3000)
      }
    } catch (err) {
      
      console.log('error', err.response.data.message);
      setErrMsg(err.response.data.message)
    }
    setLoading(false)

    // console.log("Submit..", x);
    // Calling APIs
  }




  const myFormik= useFormik({
    
    initialValues:user,

    onSubmit:registerNewUser  ,


    validate:function (x) {
      // console.log('Validating',x);
      setErrMsg(null)
      setSussMsg(null)

      const errors={};
      if (x.name.length<4 ||x.name.length>15) {
        errors.name="Name must be between 4 to 15 characters"
      }
      if (x.email.includes("@") ===false || x.email.includes(".") ===false ) {
        errors.email="Email is invalid"
      }
      if (!x.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone="Phone is invalid"
      }
      if (x.password.length<5 || x.password.length>15) {
        errors.password="Password must be between 5 to 15 characters"
      }
      if (x.rePassword!==x.password) {
        errors.rePassword="Repassword and Password not Match"
      }
      return errors;
    }
  })



  return (
    <>
      
      <div className="w-75 p-4 m-auto ">
        {errMsg? <div className="alert alert-danger" > {errMsg}</div>: ''}
        {sussMsg? <div className="alert alert-success" >{sussMsg} </div>: ''}
        


        <h3 className="text-center">Register Now :</h3>
        
        <form onSubmit={myFormik.handleSubmit}>

          <label htmlFor="name">Name :</label>
          <input id="name" className="form-control mb-3" placeholder="Name" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} type="text"/>
          {myFormik.errors.name && myFormik.touched.name? <div className="alert alert-danger">{myFormik.errors.name}</div>:""}

          <label htmlFor="email">Email :</label>
          <input id="email" className="form-control mb-3" placeholder="Email" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email"/>
          {myFormik.errors.email && myFormik.touched.email? <div className="alert alert-danger">{myFormik.errors.email}</div>:""}

          <label htmlFor="phone">Phone :</label>
          <input id="phone" className="form-control mb-3" placeholder="Phone" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="tel"/>
          {myFormik.errors.phone && myFormik.touched.phone? <div className="alert alert-danger">{myFormik.errors.phone}</div>:""}

          <label htmlFor="password">Password :</label>
          <input id="password" className="form-control mb-3" placeholder="Password" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password"/>
          {myFormik.errors.password && myFormik.touched.password? <div className="alert alert-danger">{myFormik.errors.password}</div>:""}

          <label htmlFor="rePassword">RePassword :</label>
          <input id="rePassword" className="form-control mb-3" placeholder="RePassword" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.Repassword} type="password"/>
          {myFormik.errors.rePassword && myFormik.touched.rePassword? <div className="alert alert-danger">{myFormik.errors.rePassword}</div>:""}
          <div className="d-flex justify-content-center align-items-between">
            <button className="btn btn-outline-success btn-lg " disabled={ myFormik.dirty ===false || myFormik.isValid ===false} type="submit"> 
              {loading? <ThreeCircles
                height="25"
                width="50"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass="black"
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="#198754"
                innerCircleColor="#4fa94d"
                middleCircleColor="green"
              />:'Register Now'}
            
            
            </button>
          </div>
          
        </form>
      </div>
    </>
  );
}
