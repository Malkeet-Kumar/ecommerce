import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserApp from './apps/UserApp.jsx';
import SellerApp from './apps/SellerApp.jsx'
import ShipperApp from './apps/ShipperApp.jsx'
import AdminApp from './apps/AdminApp.jsx'

import userRoutes from './routes/userRoutes.jsx';
import sellerRoutes from './routes/sellerRoutes.jsx'
import shipperRoutes from './routes/shipperRoutes.jsx';
import adminRoutes from './routes/adminRoutes.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<UserApp/>,
    children:userRoutes
  },
  {
    path:"/seller",
    element:<SellerApp/>,
    children:sellerRoutes
  },
  {
    path:"/shipper",
    element:<ShipperApp/>,
    children:shipperRoutes
  },
  {
    path:"/admin",
    element:<AdminApp/>,
    children:adminRoutes
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)
