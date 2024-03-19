import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { InfinitySpin } from 'react-loader-spinner';

export default function CategorySlider() {

  function getAllCategory(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')}
  
  const {data, isLoading}= useQuery('CategroySlider',getAllCategory)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  };
  
  if(isLoading){
    return <InfinitySpin 
    width='200'
    color="#4fa94d"
  />
  }
  return <>


    <div className='my-5'>
        <h2>Categories Slider</h2>
        <Slider {...settings}>
          {data?.data.data.map(function (category,idx){
            return<div key={idx}>
            <img style={{width:"100%" , height:'200px'}}  src={category.image} alt="Slider" />
            <h6 className='mt-2'>{category.name}</h6>
          </div>
          })}
        </Slider>
      </div>
  </>
}
