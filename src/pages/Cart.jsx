import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../store/cartSlice';

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const itemList = useSelector((store) => store.cart.items);

  useEffect(() => {
    setCartList(itemList);

    // Calculate total cost whenever itemList changes
    if (itemList && itemList.length > 0) {
      const cost = itemList.reduce((sum, item) => sum + (item.card.info.price / 100), 0);
      setTotalCost(cost);
    } else {
      setTotalCost(0);
    }
  }, [itemList]);

  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      <h1>Total Items: {cartList.length}</h1>
      <h5>Total Cost: ₹{totalCost}</h5>

      <div className='recomandaed container'>
        {cartList && cartList.map((item) => {
          return (
            <div className='card' key={item.card.info.id}>
              <div className='left-section'>
                <h6>{item?.card?.info?.name}</h6>
                <h5>Price - ₹{item?.card?.info?.price / 100 ?? item?.card?.info?.defaultPrice / 100}</h5>
                <p>{item?.card?.info.description}</p>
              </div>

              <div className="right-section">
                <img 
                  className='res-logo' 
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.info?.imageId}`} 
                  alt={item?.card?.info?.name} 
                />
                <button onClick={() => handleRemoveItem(item.card.info.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart;
