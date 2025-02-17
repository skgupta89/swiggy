import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Layout from './Layout'
import Error from './pages/Error'
import RestaurantMenu from './components/RestaurantMenu'
import Shimmer from './components/Shimmer'
import UserContextApi from './utils/UserContext'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

const Grocery = lazy(() => import('./components/Grocery'))

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element:
          <Body />

      },
      {
        path: '/grocery',
        element:
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>

      },
      {
        path: '/about',
        element:

          <About />


      },
      {
        path: '/contact',
        element:
          <Contact />
      },
      {
        path: '/cart',
        element:
          <Cart />
      }
      ,
      {
        path: '/restaurants/:resId',
        element:
          <RestaurantMenu />
      }
    ]
  }
])

function App() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const data = {
      name: 'sandeep'
    };

    setUserName(data.name);
  }, [])
  return <Provider store={appStore}>
    <UserContextApi.Provider value={{ loggedInUser: userName, setUserName }}>
      <RouterProvider router={appRouter} />
    </UserContextApi.Provider>
  </Provider>
}

export default App
