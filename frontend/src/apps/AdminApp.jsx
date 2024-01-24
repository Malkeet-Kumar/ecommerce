import { Outlet } from 'react-router-dom'
import Header from '../components/adminComponents/header'
import { useContext } from 'react'
import AdminState from '../states/adminState'
import AdminContext from '../context/adminContext'
const Child = (props) => {
    const { user } = useContext(AdminContext)
    return (
        <>
            {
                (user.isAdmin) ?
                    <>
                        <Header />
                        <Outlet />
                    </> :
                    <h1>Unauthorised access</h1>
            }
        </>
    )
}

function AdminApp() {
    return (
        <AdminState>
            <Child />
        </AdminState>
    )
}

export default AdminApp
