import VaxTrackLogo from "@/components/svgImages/VaxTrackLogo";
import { Button } from "@/components/ui/button"
import { CiMail } from "react-icons/ci";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setCredentials } from "@/redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginFormData = {
    email: string;
    password: string;
};
const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.email": "Invalid email address",
            "string.empty": "Email is required",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters",

            "string.empty": "Password is required",
        }),
});
const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver:
            joiResolver(loginSchema),
    });
    const onSubmit = async (
        data: LoginFormData
    ) => {

        try {

            setLoading(true);

            const response =
                await axios.post(
                    "http://localhost:3000/api/users/login",
                    {
                        email: data.email,
                        password: data.password,
                    }
                );
            const responseData =
                response.data.data;

            dispatch(
                setCredentials({
                    token:
                        responseData.accessToken,

                    user:
                        responseData.user,
                })
            );
            toast.success("Login successfull",);
            const role =
                responseData.user.role;

            if (role === "GUARDIAN") navigate("/guardian/dashboard");
            else if (role === "STAFF") navigate("/staff/dashboard");

            else if (role === "ADMIN") navigate("/admin/dashboard");
        } catch (error) {
            toast.error("Login Failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex flex-col items-center h-screen justify-start gap-3 font-sans">
            <div className="flex w-1/2 justify-center gap-3 items-center mt-5" >
                <div className="flex items-center justify-center bg-[#7C3AED] size-12 border rounded-[12px]">
                    <VaxTrackLogo />
                </div>
                <h1 className="text-[#7C3AED] font-sans font-normal text-[32px]">VaxTrack</h1>
            </div>
            <h1 className="font-sans text-[#5F5A7C] italic">Your family's health, protected.</h1>
            <Card className="w-full max-w-sm rounded-[16px] border border-gray-200 shadow-sm bg-[#F5F5F4]">
                <CardContent className="p-4">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-[16px] text-[#4A4455]">
                            Welcome back
                        </h2>

                        <p className="text-[16px] text-[#4A4455]">
                            Access your child's immunization records.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <label className="text-[16px] text-[#4A4455]">
                                Email
                            </label>

                            <div className="relative">
                                <Input
                                    type="email"
                                    {...register("email")}
                                    placeholder="name@example.com"
                                    className="bg-[#FFFFFF] h-12 rounded-[10px] border-gray-300 pr-12 text-base placeholder:text-gray-400 focus-visible:ring-violet-500"
                                />
                                {
                                    errors.email && (
                                        <p className="text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )
                                }

                                <CiMail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[16px] text-[#4A4455]">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-sm text-[#7C3AED] hover:text-violet-700"
                                    onClick={() =>
                                        navigate("/forgot-password", { state: { allowed: true } })}
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="••••••••"
                                    className="h-12 bg-[#FFFFFF] placeholder:text-[#CCC3D8] rounded-[10px] border-gray-300 pr-12 text-base focus-visible:ring-violet-500"
                                />
                                {
                                    errors.password && (
                                        <p className="text-xs text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )
                                }

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? (
                                        <IoEyeOffOutline className="w-5 h-5" />
                                    ) : (
                                        <MdOutlineRemoveRedEye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button className="cursor-pointer w-full h-12 rounded-[10px] text-base font-medium bg-[#7C3AED] hover:bg-[#6a2fcf] shadow-md" disabled={loading}>
                            {loading ? "Please wait...." : "Login"}
                        </Button>
                    </form>
                    <div className="border-t border-gray-200 my-4" />


                    <p className="text-center text-gray-500 text-[16px] font-normal">
                        New guardian?{" "}
                        <span onClick={()=>navigate("/register")} className="text-[#7C3AED] font-medium cursor-pointer hover:text-violet-700">
                            Create an account
                        </span>
                    </p>
                </CardContent>
            </Card>
            <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                    <img
                        src="https://i.pravatar.cc/40?img=10"
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                        src="https://i.pravatar.cc/40?img=11"
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                        src="https://i.pravatar.cc/40?img=12"
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                </div>

                <p className="text-gray-500 italic text-sm">
                    Join 10,000+ proactive parents
                </p>
            </div>
            <div className="text-[#CCC3D8] fixed bottom-4">
                <h1>VAXTRACK — VACCINATION SCHEDULE TRACKER</h1>
                <div className="flex justify-evenly">
                    <h1>Privacy Policy</h1>
                    <h1>•</h1>
                    <h1>Terms of Service</h1>
                    <h1>•</h1>
                    <h1>Support</h1>
                </div>
            </div>
        </div >
    )
}

export default Login