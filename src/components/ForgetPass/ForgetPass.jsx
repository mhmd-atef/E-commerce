import React from 'react'

export default function ForgetPass() {
  return <div className='p-5'>
    <h3>please enter your verification code</h3>
    <input type="text"  placeholder='Email' className='form-control my-3'/>
    <button className='btn btn-outline-success  btn-lg mx-2'>verify</button>
  </div>
}
