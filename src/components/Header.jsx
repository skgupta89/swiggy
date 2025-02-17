import React, { useState,useContext } from 'react'
import { CDN_URL } from '../utils/constants'
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContextApi from '../utils/UserContext';
import { useSelector } from 'react-redux';
const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
const {loggedInUser} =  useContext(UserContextApi)
  const handleLogin = () => {
    setIsLogin(!isLogin)
  }
  const cartItem = useSelector((store)=>store.cart.items)
  console.log(cartItem)
  const onlineStatus = useOnlineStatus();
  return (
    <div className='header'>
      <Link to='/' >
      <div className='logo-container'>
        <img className='logo' src={CDN_URL} />
      </div>
      </Link>

      <div className='nav-items'>
        <ul>
          <li>
            Active Status : {onlineStatus? '✅': '❌'} 
          </li>
          <Link  to='/'>
          <li>Home</li>
          </Link>
          <Link  to='/grocery'>
          <li>GROCERY</li>
          </Link>
          <Link to='/about'>
          <li>About US</li>
          </Link>
          <Link to='/contact'>
          <li>Contact US</li>
          </Link>
          <Link to='/cart'>
          <li>Cart({cartItem.length > 0? cartItem.length : "0"} Items )</li>
          </Link>
          <li style={
          {
            color:'red'
          }
          }>{loggedInUser}</li>
          <buttton onClick={handleLogin} className="login">{isLogin ? 'Login' : 'Logout'}</buttton>
       
        </ul>
      </div>
    </div>
  )
}

export default Header
