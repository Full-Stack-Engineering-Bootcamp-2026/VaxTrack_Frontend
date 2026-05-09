import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import { type RootState } from "@/redux/stores/store";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
    allowedRole: string;
}
const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    if (!token || !user) return <Navigate to="/login" replace />;
    if (user.role !== allowedRole) {
        toast.warning("Unauthorized Access");
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;