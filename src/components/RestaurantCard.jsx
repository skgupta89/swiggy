import React from 'react'

const RestaurantCard = ({ resName, img, cuisines, rating, time, price }) => {
    return (
      <div className='res-card'>
        <div className='img-wrapper'>
  
        <img className='res-logo' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${img}`} />
        </div>
        <h3>{resName}</h3>
        <h4>{cuisines}</h4>
        
          <h4>{rating}</h4>
          <h4>{time} - min</h4>
          <h4>cost for Two - {price}</h4>
      </div>
    )
  }
  

  export const withTopRatedLabel = (Children)=>{
   return(props)=>{
    return(
      <div className='higher-order-component'>
        <label className='absolute bg-black text-white m-2 p-2 rounded-lg'>Top Rated</label>
        <Children {...props} />
      </div>
    )
   }
  }
  

export default RestaurantCard
