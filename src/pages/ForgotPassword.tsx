import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import PasswordChangeLayout from "@/components/layouts/PasswordChangeLayout";

type ForgotPasswordFormData = {
    email: string;
};

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
        "string.email": "Invalid email address",
        "string.empty": "Email is required",
    }),
});

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: joiResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:3000/api/users/forgot-password",
                { email: data.email }
            );
            toast.success(response.data.message || "Reset link sent to your email");
            navigate("/login");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Failed to send reset email");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <PasswordChangeLayout
            title="Forgot Password"
            subtitle="Enter your registered email. We'll send you a reset link."
            backPath="/login"
            bottomLinkText="Back to Login"
            bottomLinkPath="/login"
        >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <label className="text-sm font-normal text-[#4A4455]">Email</label>
                    <div className="relative">
                        <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="e.g. parent@example.com"
                            className="pl-10 bg-[#FFF8F4] h-11"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#7C3AED] text-white rounded-[12px] py-3.5 text-base font-medium flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                    {!loading && <AiOutlineSend className="w-4 h-4" />}
                </button>
            </form>
        </PasswordChangeLayout>
    );
};

export default ForgotPassword;