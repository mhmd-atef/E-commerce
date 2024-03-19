import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext';
// import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  
  const { totalCartPrice,numOfCartItems,cartProduct ,deleteProduct,updateProduct, removeCart } = useContext(cartContext);
  
//   if(cartProduct=== null){
//     return<> 
//     <div className="vh-100 d-flex justify-content-center align-items-center">
//   <ColorRing
//   visible={true}
//   height="80"
//   width="80"
//   ariaLabel="blocks-loading"
//   wrapperStyle={{}}
//   wrapperClass="blocks-wrapper"
//   colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
// />
// </div> 

//     </>
//   }

  if (cartProduct === null) {
    return<>
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <h1 className='text center'>No Data Found In Your Cart</h1>
      <span className=''><Link style={{position:'absolute'}} className=' text-danger' to='/product'>    ....Get Some Products</Link></span>
    </div></>
  }


  async function deleteElemet(id){
    const res= await deleteProduct(id);
    if (res.status==='success') {
      toast.success('Product Removed Done');
    }else{
      toast.error('Error happened');
    }
  }

  async function updateCount(id, count){
    const res= await updateProduct(id, count);
    if (res.status==='success') {
      toast.success('Product Update Done');
    }else{
      toast.error('Error happened');
    }
  }

  async function deleteCart(){
    await removeCart();
  }

  return <div className='container  py-3'style={{background:'#eee'}}>
  <h2 className=' text-center h1 main-color'>Shop Cart</h2>
  <div className='d-flex m-2 justify-content-center align-items-center'>
    <div className="row col">
      <h3 className='mx-0'>Total Price : <span className='main-color'>{totalCartPrice}</span>EGP</h3>
    </div>
    <div className="row col-2">
      <Link to='/Payment' className='btn btn-outline-success  p-1'>Confirm Payment</Link>
    </div>
  </div>
  <div className='d-flex m-2 justify-content-center align-items-center'>
    <div className="row col">
      <h3 className='mx-0'>Total Items : <span className='main-color'>{numOfCartItems}</span></h3>
    </div>
    <div className="row col-2">
      <Link className='btn btn-outline-danger  p-1 ' onClick={deleteCart}> Clear Cart</Link>
    </div>
  </div>

  {cartProduct.map(function(product, idx){return <div key={idx} className="row align-items-center border-ssecondary border-bottom border-secondary p-2 ">
    <div className="col-sm-1">
      <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
    </div>
    <div className="col-sm-10">
      <h6 className='lead'>{product.product.title}</h6>
      <h4 className='lead'>Price: <span className='main-color'>{product.price}</span> </h4>
      <button className='btn btn-outline-danger btn-sm' onClick={()=>deleteElemet(product.product.id)}>Remove</button>
    </div>
    <div className="col-sm-1 px-0">
    <div className="d-flex align-items-center">
      <button onClick={()=>updateCount(product.product.id, product.count+1 )}  className='btn btn-outline-dark 'style={{width:30}}>  +  </button>
      <span className='main-color mx-2'>{product.count}</span>
      <button  onClick={()=>updateCount(product.product.id, product.count-1>=0)} className='btn btn-outline-dark mx-auto'style={{width:30}}>- </button>
    </div>

    </div>
  </div>
  })}

  </div>
}
