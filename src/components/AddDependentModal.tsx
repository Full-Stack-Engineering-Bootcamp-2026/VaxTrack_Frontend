import { useForm, useWatch } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
import { FaCodeBranch } from "react-icons/fa";
import {
    Info,
    UserPlus,
    Users,
    X,
    Save,
    Baby,
} from "lucide-react"
import { useState, type ReactNode } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/stores/store"
import { toast } from "react-toastify"
import axios from "axios"

const Gender = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other",
} as const

const Relationship = {
    CHILD: "child",
    SIBLING: "sibling",
    OTHER: "other",
} as const

type props = {
    children: ReactNode;
}
type Gender = (typeof Gender)[keyof typeof Gender]
type Relationship = (typeof Relationship)[keyof typeof Relationship]

const createDependentSchema = Joi.object({
    fullName: Joi.string().required().min(6).messages({
        "string.min": "Full name must be 6 characters long",
        "string.empty": "Full name is required",
    }),

    dateOfBirth: Joi.date().required().messages({
        "date.base": "Invalid date",
        "any.required": "Date of birth is required",
    }),

    gender: Joi.string()
        .valid(...Object.values(Gender))
        .required()
        .messages({
            "any.only": "Select a valid gender",
            "string.empty": "Gender is required",
        }),

    relationship: Joi.string()
        .valid(...Object.values(Relationship))
        .required()
        .messages({
            "any.only": "Select a valid relationship",
            "string.empty": "Relationship is required",
        }),

    notes: Joi.string().required().messages({
        "string.empty": "Notes are required",
    }),
})

type FormData = {
    fullName: string
    dateOfBirth: string
    gender: Gender
    relationship: Relationship
    notes: string
}
export function AddDependentModal({ children }: props) {
    const { token } = useSelector((state: RootState) => state.auth);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const createDependentMutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await axios.post(
                "http://localhost:3000/api/dependents",
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
            queryClient.invalidateQueries({
                queryKey: ["guardianDashboard"],
            })
            toast.success("Dependent added successfully");
            setOpen(false);
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data)
            }
            console.error(error)
            toast.error("Failed to add dependent")
        },
    })
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isDirty },
    } = useForm<FormData>({
        resolver: joiResolver(createDependentSchema),
        defaultValues: {
            fullName: "",
            dateOfBirth: "",
            gender: undefined,
            relationship: undefined,
            notes: "",
        },
    })

    const selectedRelationship = useWatch({
        control,
        name: "relationship",
    })

    const onSubmit = (data: FormData) => {
        createDependentMutation.mutate(data);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>

            <AlertDialogContent className="max-h-[90vh] w-full max-w-xl! overflow-y-auto rounded-[16px] border-0 p-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AlertDialogHeader className="px-6 pt-6 pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#EEE5FF]">
                                    <UserPlus className="h-6 w-6 text-[#7C3AED]" />
                                </div>

                                <div className="font-normal text-[16px] text-[#1E1B18]">
                                    <AlertDialogTitle>
                                        Add Dependent
                                    </AlertDialogTitle>

                                    <p>
                                        Create a new profile to track
                                        immunization progress.
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

                            <p className="text-[16px]  text-[#474363]">
                                Date of birth is used to automatically derive
                                the recommended vaccination schedule.
                            </p>
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Leo Maxwell Thompson"
                                {...register("fullName")}
                                className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
                            />

                            {errors.fullName && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-5 grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#444]">
                                    DOB(date Picker)
                                </label>

                                <div className="relative">
                                    <input
                                        type="date"
                                        {...register("dateOfBirth")}
                                        className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
                                    />
                                </div>

                                {errors.dateOfBirth && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {
                                            errors.dateOfBirth
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#444]">
                                    Gender
                                </label>

                                <select
                                    {...register("gender")}
                                    className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
                                >
                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="male">
                                        Male
                                    </option>

                                    <option value="female">
                                        Female
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>
                                </select>

                                {errors.gender && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.gender.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Relationship
                            </label>

                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setValue(
                                            "relationship",
                                            Relationship.CHILD
                                        )
                                    }
                                    className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${selectedRelationship ===
                                        Relationship.CHILD
                                        ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
                                        : "border-[#E7E2DC] bg-white text-gray-600 hover:border-[#7C3AED]"
                                        }`}
                                >
                                    <Baby className="h-4 w-4" />
                                    Child
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setValue(
                                            "relationship",
                                            Relationship.SIBLING
                                        )
                                    }
                                    className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${selectedRelationship ===
                                        Relationship.SIBLING
                                        ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
                                        : "border-[#E7E2DC] bg-white text-gray-600 hover:border-[#7C3AED]"
                                        }`}
                                >
                                    <FaCodeBranch className="h-4 w-4" />
                                    Sibling
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setValue(
                                            "relationship",
                                            Relationship.OTHER
                                        )
                                    }
                                    className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${selectedRelationship ===
                                        Relationship.OTHER
                                        ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
                                        : "border-[#E7E2DC] bg-white text-gray-600 hover:border-[#7C3AED]"
                                        }`}
                                >
                                    <Users className="h-4 w-4" />
                                    Other
                                </button>
                            </div>

                            {errors.relationship && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        errors.relationship
                                            .message
                                    }
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Notes
                            </label>

                            <textarea
                                rows={4}
                                placeholder="Any allergies, previous reactions, or medical considerations..."
                                {...register("notes")}
                                className="resize-none w-full rounded-2xl border border-[#E7E2DC] bg-[#FDF9F6] p-4 text-sm outline-none transition"
                            />

                            {errors.notes && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.notes.message}
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
                                disabled={!isDirty}
                                type="submit"
                                className="h-11 rounded-xl bg-[#7C3AED] px-6 text-sm font-medium hover:bg-[#6D28D9]"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Save Dependent
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}