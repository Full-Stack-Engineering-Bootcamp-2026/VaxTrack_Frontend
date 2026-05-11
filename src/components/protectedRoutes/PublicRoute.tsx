import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/redux/stores/store";

const PublicRoute = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    if (token && user) {
        if (user.role === "GUARDIAN") return <Navigate to="/guardian/dashboard" replace />;
        if (user.role === "STAFF") return <Navigate to="/staff/dashboard" replace />;
        if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    }
    return <Outlet />;
};
export default PublicRoute;