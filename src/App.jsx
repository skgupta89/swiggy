import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Layout from './Layout'
import Error from './pages/Error'
import RestaurantMenu from './components/RestaurantMenu'

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
  return <RouterProvider router={appRouter} />
}

export default App
