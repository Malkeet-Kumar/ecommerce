import ShipperLoginPage from "../pages/shipperLoginPage"
import Home from "../containers/homeContainer"
import OnBoarding from "../pages/shipperOnboard"
import DispatchPage from "../pages/shipperDispatch"
const shipperRoutes = [
  {
    path: "home",
    element: <Home/>
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
    path:"login",
    element:<ShipperLoginPage />
  }
]

export default shipperRoutes