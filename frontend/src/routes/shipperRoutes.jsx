import ShipperLoginPage from "../pages/shipperLoginPage"
import Home from "../containers/homeContainer"
import OnBoarding from "../pages/shipperOnboard"
import DispatchPage from "../pages/shipperDispatch"
import Deliveries from "../pages/shipperDeliveris"
import DeliverMgmt from "../pages/DelivererMgmt"

const shipperRoutes = [
  {
    path:"",
    element:<ShipperLoginPage/>
  },
  {
    path: "login",
    element: <ShipperLoginPage/>
  },
  {
    path:"onboarding",
    element:<OnBoarding/>
  },
  {
    path:"dispatched",
    element:<DispatchPage/>
  },
  {
    path:"deliveries",
    element:<Deliveries/>
  },
  {
    path:"deliverermgmt",
    element:<DeliverMgmt/>
  }
]

export default shipperRoutes