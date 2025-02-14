import React, { useState } from 'react'
import { CDN_URL } from '../utils/constants'
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    setIsLogin(!isLogin)
  }
  const onlineStatus = useOnlineStatus();
  return (
    <div className='header'>
      <div className='logo-container'>
        <img className='logo' src={CDN_URL} />
      </div>

      <div className='nav-items'>
        <ul>
          <li>
            Active Status : {onlineStatus? '✅': '❌'} 
          </li>
          <Link  to='/'>
          <li>Home</li>
          </Link>
          <Link to='/about'>
          <li>About US</li>
          </Link>
          <Link to='/contact'>
          <li>Contact US</li>
          </Link>
          <Link to='/cart'>
          <li>Cart</li>
          </Link>
          <buttton onClick={handleLogin} className="login">{isLogin ? 'Login' : 'Logout'}</buttton>
        </ul>
      </div>
    </div>
  )
}

export default Header
