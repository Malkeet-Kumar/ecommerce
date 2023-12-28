import Home from "../containers/homeContainer"
import Login from '../pages/sellerLoginSignUp'
import InventoryContainer from "../pages/sellerInventory"
import SellerOrderPage from "../pages/sellerOrderPage"
import SellerReport from "../pages/sellerReports"
const sellerRoutes = [
  {
    path: "",
    element: <Login />
  },
  {
    path: "home",
    element: <Home />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "inventory",
    element: <InventoryContainer />
  },
  {
    path: "orders",
    element: <SellerOrderPage />
  },
  {
    path:"reports",
    element: <SellerReport/>
  }
]

export default sellerRoutes