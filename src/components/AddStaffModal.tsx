import { useState, type ReactNode } from "react"
import axios from "axios"
import Joi from "joi"

import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

import { toast } from "react-toastify"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

import {
    Info,
    Mail,
    Save,
    User,
    X,
} from "lucide-react"

type Props = {
    children: ReactNode
}

type FormData = {
    fullName: string
    email: string
    phone: string
}

const createStaffSchema = Joi.object({
    fullName: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 6 characters",
        }),

    email: Joi.string().email({ tlds: false }).required()
        .messages({ "string.empty": "Email is required", "string.email": "Enter a valid email", }),
    phone: Joi.string().required().min(10).max(10).messages({
        "string.empty": "Phone is required",
        "string.min": "Phone must be  10 digits",
        "string.max": "PHone must be 10 digits"
    })
})

export function AddStaffModal({ children }: Props) {

    const queryClient = useQueryClient()

    const { token } = useSelector(
        (state: RootState) => state.auth
    )

    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormData>({
        resolver: joiResolver(createStaffSchema),

        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
        },
    })

    const createStaffMutation = useMutation({
        mutationFn: async (data: FormData) => {

            const response = await axios.post(
                "http://localhost:3000/api/users/staff",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return response.data
        },

        onSuccess: () => {

            toast.success(
                "Staff account created successfully"
            )

            queryClient.invalidateQueries({
                queryKey: ["staffAccounts"],
            })

            reset()
            setOpen(false)
        },

        onError: (error) => {

            console.error(error)

            toast.error(
                "Failed to create staff account"
            )
        },
    })

    const onSubmit = (data: FormData) => {
        createStaffMutation.mutate(data)
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent className="h-[70vh] w-[80vw] max-w-2xl overflow-y-auto rounded-[16px] border-0 p-0">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <AlertDialogHeader className="px-6 pt-6 pb-4">

                        <div className="flex items-start justify-between">

                            <div className="flex gap-4">

                                <div className="font-normal text-[16px] text-[#1E1B18]">

                                    <AlertDialogTitle>
                                        Add Staff Account
                                    </AlertDialogTitle>

                                    <p>
                                        Create a new medical staff account and send onboarding instructions.
                                    </p>
                                </div>
                            </div>

                            <AlertDialogCancel className="ml-auto h-8 w-8 border-0 shadow-none hover:bg-gray-100">
                                <X className="h-4 w-4" />
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogHeader>

                    <div className="px-6 pb-6">

                        <div className="mb-6 flex gap-3 rounded-[10px] border border-[#DDD6FE] bg-[#E5DEFF4D] p-4">

                            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#474363]" />

                            <p className="text-[16px] text-[#474363]">
                                The staff member will receive an email to set their password securely.
                            </p>
                        </div>

                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Full Name
                            </label>

                            <div className="relative">

                                <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    placeholder="e.g. Dr. Sarah Johnson"
                                    {...register("fullName")}
                                    className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] pr-4 pl-11 text-sm outline-none transition focus:border-[#7C3AED]"
                                />
                            </div>

                            {errors.fullName && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="email"
                                    placeholder="e.g. staff@hospital.com"
                                    {...register("email")}
                                    className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] pr-4 pl-11 text-sm outline-none transition focus:border-[#7C3AED]"
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>

                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Phone Number
                            </label>

                            <div className="relative">

                                <input
                                    type="text"
                                    placeholder="e.g. 9876543210"
                                    {...register("phone")}
                                    className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
                                />
                            </div>

                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                    </div>

                    <AlertDialogFooter className="border-t bg-[#FDF8F4] px-6 py-5">

                        <div className="flex w-full justify-end gap-3">

                            <AlertDialogCancel className="h-11 rounded-xl border border-[#E7E2DC] bg-white px-6 text-sm font-medium text-gray-600 hover:bg-gray-50">
                                Cancel
                            </AlertDialogCancel>

                            <Button
                                disabled={
                                    !isDirty ||
                                    createStaffMutation.isPending
                                }
                                type="submit"
                                className="h-11 rounded-xl bg-[#7C3AED] px-6 text-sm font-medium hover:bg-[#6D28D9]"
                            >
                                <Save className="mr-2 h-4 w-4" />

                                {createStaffMutation.isPending
                                    ? "Creating..."
                                    : "Create Staff"}
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}