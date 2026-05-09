import { useState } from "react"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useNavigate, useSearchParams, Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { FiLock } from "react-icons/fi"
import { IoEyeOffOutline } from "react-icons/io5"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { Input } from "@/components/ui/input"
import PasswordChangeLayout from "@/components/layouts/PasswordChangeLayout"

type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Please confirm your password",
  }),
})

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const persistedState = localStorage.getItem("persist:root")

  const parsedState = persistedState ? JSON.parse(persistedState) : null

  const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

  const token = auth?.token

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: joiResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:3000/api/users/reset-password",
        { token, password: data.password }
      )
      toast.success(response.data.message || "Password updated successfully")
      navigate("/login")
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update password. The link might be expired."
        )
      } else {
        toast.error("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    toast.error("Invalid or missing reset token.")
    return <Navigate to="/login" />
  }

  return (
    <PasswordChangeLayout
      title="Change Password"
      subtitle="Please create a new, secure password for your account."
      backPath="/login"
      bottomLinkText="Back to Login"
      bottomLinkPath="/login"
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm font-normal text-[#4A4455]">
            New Password
          </label>
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              className="h-11 bg-[#FFF8F4] pr-10 pl-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <IoEyeOffOutline className="h-5 w-5" />
              ) : (
                <MdOutlineRemoveRedEye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-normal text-[#4A4455]">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="h-11 bg-[#FFF8F4] pr-10 pl-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <IoEyeOffOutline className="h-5 w-5" />
              ) : (
                <MdOutlineRemoveRedEye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#7C3AED] py-3.5 text-base font-medium text-white"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
          {!loading && <AiOutlineCheckCircle className="h-5 w-5" />}
        </button>
      </form>
    </PasswordChangeLayout>
  )
}

export default ResetPassword
