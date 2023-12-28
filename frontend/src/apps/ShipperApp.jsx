import Header from '../components/shipperComponents/header'
import { Outlet } from 'react-router-dom'
function ShipperApp() {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default ShipperApp
