import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/redux/stores/store";
import { toast } from "react-toastify";

const PublicRoute = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    if (token && user) {
        toast.info("You are already logged in");
        if (user.role === "GUARDIAN") return <Navigate to="/guardian/dashboard" replace />;
        if (user.role === "STAFF") return <Navigate to="/staff/dashboard" replace />;
        if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    }
    return <Outlet />;
};

export default PublicRoute;