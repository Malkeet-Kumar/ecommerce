import AllProducts from "../pages/adminAllProducts"
import AdminLoginPage from "../pages/adminLoginPage"
import ShipperMgmtPage from "../pages/adminSihpperMgmt"
import ApproveProducts from "../pages/approveProducts"
import ApproveSeller from "../pages/approveSellers"

const adminRoutes = [
  {
    path: "",
    element: <AdminLoginPage />
  },
  {
    path: "login",
    element: <AdminLoginPage />
  },
  {
    path: "sellers",
    element: <ApproveSeller />
  },
  {
    path: "products",
    element: <ApproveProducts />
  },
  {
    path: "allproducts",
    element: <AllProducts />
  },
  {
    path: "shipper",
    element: <ShipperMgmtPage/>
  }

]

export default adminRoutes