import Header from '../components/shipperComponents/header'
import { Outlet } from 'react-router-dom'
import ShipperState from '../states/shipperState'
import { useContext } from 'react'
import ShipperConext from '../context/shipperContext'

const Child = ()=>{
  const {user} = useContext(ShipperConext)
  return (
    <>
      {
        (user.isShipper || user.isDeliver)?
        <>
        <Header />
        <Outlet />
        </>:
        <h1>Unauthorised Access</h1>
      }
    </>
  )
}

function ShipperApp() {
  return (
    <>
      <ShipperState>
        <Child/>
      </ShipperState>
    </>
  )
}

export default ShipperApp
