import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../utils/auth";

const PrivateRoutes = () =>{
    return isLogged() ? <Outlet /> : <Navigate to="/" />
}
export default PrivateRoutes;