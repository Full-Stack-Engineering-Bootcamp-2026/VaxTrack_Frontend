import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import zxcvbn from "zxcvbn";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiMail, CiLock, CiPhone } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FiShield } from "react-icons/fi";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import CreateAccountLogo from "@/components/svgImages/CreateAccountLogo";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type CreateAccountFormData = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

const createAccountSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min":
                "Name must be at least 3 characters",
        }),

    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.email": "Invalid email address",
            "string.empty": "Email is required",
        }),

    phone: Joi.string()
        .min(10)
        .required()
        .messages({
            "string.min":
                "Phone number must be valid",
            "string.empty": "Phone is required",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min":
                "Password must be at least 8 characters",
            "string.empty": "Password is required",
        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Passwords do not match",
            "any.required":
                "Confirm password is required",
        }),
});

const CreateAccount = () => {
    const [showPassword, setShowPassword] =
        useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateAccountFormData>({
        resolver: joiResolver(createAccountSchema),
    });

    const password = useWatch({
        control,
        name: "password",
        defaultValue: ""
    });

    const passwordStrength = zxcvbn(password);

    const strengthLabels = [
        "Very Weak Password",
        "Weak Password",
        "Fair Password",
        "Good Password",
        "Strong Password",
    ];

    const strengthWidths = [
        "20%",
        "40%",
        "65%",
        "80%",
        "100%",
    ];

    const inputFields = [
        {
            name: "fullName",
            label: "Full Name",
            type: "text",
            placeholder: "Enter your full name",
            icon: FaRegUser,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "name@example.com",
            icon: CiMail,
        },
        {
            name: "phone",
            label: "Phone",
            type: "text",
            placeholder: "+1 (555) 000-0000",
            icon: CiPhone,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Min. 8 characters",
            icon: CiLock,
            showStrength: true,
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Repeat your password",
            icon: FiShield,
        },
    ];

    const registerMutation = useMutation({
        mutationFn: async (data: CreateAccountFormData) => {
            const response = await axios.post("http://localhost:3000/api/users/register", {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                phone: data.phone
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Guardian registered successfully. Login to continue");
            navigate("/login");
        },
        onError: () => {
            toast.error("Registration failed");
        }
    })

    const onSubmit = (
        data: CreateAccountFormData
    ) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center pt-14 px-4 font-sans">
            <div className="fixed left-0 top-0 size-80 rounded-full bg-[#630ED4] opacity-20 blur-[100px]" />
            <div className="fixed bottom-0 right-0 size-80 rounded-full bg-[#85F8C4] opacity-20 blur-[100px]" />
            <div className="flex flex-col items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9DFFF]">
                    <CreateAccountLogo />
                </div>

                <div className="text-center">
                    <h1 className="text-[36px] font-bold text-[#1E1B18]">
                        Create Your Guardian Account
                    </h1>

                    <p className="mt-2 text-[15px] leading-6 text-[#78716C]">
                        Securely manage and track your family's <br />
                        vaccination schedule in one place.
                    </p>
                </div>
            </div>

            <Card className="mt-8 w-full max-w-sm md:max-w-lg  rounded-2xl border border-[#E7E5E4] bg-white shadow-sm">
                <CardContent className="p-6">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {inputFields.map((field) => {
                            const Icon = field.icon;

                            return (
                                <div key={field.name} className="space-y-2">
                                    <label className="text-sm font-medium text-[#44403C]">
                                        {field.label}
                                    </label>

                                    <div className="relative">
                                        <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <Input
                                            {...register(
                                                field.name as keyof CreateAccountFormData
                                            )}
                                            type={
                                                field.type === "password"
                                                    ? showPassword
                                                        ? "text"
                                                        : "password"
                                                    : field.type
                                            }
                                            placeholder={field.placeholder}
                                            className="h-12 rounded-xl border-[#E7E5E4] bg-[#FFF8F4] pl-11 pr-11 text-sm placeholder:text-[#A8A29E] focus-visible:ring-[#7C3AED]"
                                        />

                                        {field.type === "password" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showPassword ? (
                                                    <IoEyeOffOutline className="h-5 w-5" />
                                                ) : (
                                                    <MdOutlineRemoveRedEye className="h-5 w-5" />
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {errors[
                                        field.name as keyof CreateAccountFormData
                                    ] && (
                                            <p className="text-xs text-red-500">
                                                {
                                                    errors[
                                                        field.name as keyof CreateAccountFormData
                                                    ]?.message
                                                }
                                            </p>
                                        )}

                                    {field.showStrength && password && (
                                        <div className="mt-2 space-y-1">
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E7E5E4]">
                                                <div
                                                    className="h-full bg-[#7C3AED] transition-all duration-300"
                                                    style={{
                                                        width:
                                                            strengthWidths[
                                                            passwordStrength.score
                                                            ],
                                                    }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-[#630ED4]">
                                                    {
                                                        strengthLabels[
                                                        passwordStrength.score
                                                        ]
                                                    }
                                                </span>

                                                <span className="text-[#A8A29E]">
                                                    {Math.min(
                                                        100,
                                                        (passwordStrength.score + 1) *
                                                        20
                                                    )}
                                                    % secure
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <Button className="h-12 w-full rounded-xl bg-[#7C3AED] font-medium text-white shadow-md hover:bg-[#6D28D9]">
                            Create Account
                        </Button>
                    </form>

                    <div className="my-6 border-t border-[#F1F5F9]" />

                    <p className="text-center text-sm text-[#78716C]">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className="cursor-pointer font-medium text-[#7C3AED]">
                            Login
                        </span>
                    </p>
                </CardContent>
            </Card>

            <p className="mt-8 text-center text-[12px] leading-5 text-[#A8A29E]">
                By creating an account, you agree to
                VaxTrack's Terms of Service and Privacy <br />
                Policy. We encrypt all medical data using
                enterprise-grade security <br /> protocols.
            </p>
        </div>
    );
};

export default CreateAccount;