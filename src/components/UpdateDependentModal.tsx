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
import {
    Info,
    Pencil,
    Users,
    X,
    Save,
    Baby,
} from "lucide-react"
import { FaCodeBranch } from "react-icons/fa"
import {
    useState,
    type ReactNode,
} from "react"
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
type Gender =
    (typeof Gender)[keyof typeof Gender]
type Relationship =
    (typeof Relationship)[keyof typeof Relationship]
type Props = {
    children: ReactNode
    dependent: {
        id: number
        fullName?: string
        dateOfBirth?: string
        gender?: Gender
        relationship?: Relationship
        notes?: string
    }
    
}
const updateDependentSchema = Joi.object({
    fullName: Joi.string(),
    dateOfBirth: Joi.date(),
    gender: Joi.string().valid(
        ...Object.values(Gender)
    ),
    relationship: Joi.string().valid(
        ...Object.values(Relationship)
    ),
    notes: Joi.string(),
}).min(1)
type FormData = {
    fullName?: string
    dateOfBirth?: string
    gender?: Gender
    relationship?: Relationship
    notes?: string
}
export function UpdateDependentModal({
    children,
    dependent,
}: Props) {
    const { token } = useSelector(
        (state: RootState) => state.auth
    )
    const [open, setOpen] =
        useState(false)
    const queryClient =
        useQueryClient()
    const updateDependentMutation =
        useMutation({
            mutationFn: async (
                data: FormData
            ) => {
                const response =
                    await axios.put(
                        `http://localhost:3000/api/dependents/${dependent.id}`,
                        data,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    )
                return response.data
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [
                        "guardianDashboard",
                    ],
                })
                toast.success(
                    "Dependent updated successfully"
                )
                setOpen(false)
            },
            onError: () => {
                toast.error(
                    "Failed to update dependent"
                )
            },
        })
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: {
            errors,
            isDirty,
        },
    } = useForm<FormData>({
        resolver:
            joiResolver(
                updateDependentSchema
            ),
        defaultValues: {
            fullName:
                dependent.fullName,
            dateOfBirth:
                dependent.dateOfBirth
                    ?.split("T")[0],
            gender:
                dependent.gender,
            relationship:
                dependent.relationship,
            notes:
                dependent.notes,
        },
    })
    const selectedRelationship =
        useWatch({
            control,
            name: "relationship",
        })
    const onSubmit = (
        data: FormData
    ) => {
        updateDependentMutation.mutate(
            data
        )
    }
    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="max-h-[90vh] w-full max-w-xl! overflow-y-auto rounded-[16px] border-0 p-0">
                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                >
                    <AlertDialogHeader className="px-6 pt-6 pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#EEE5FF]">
                                    <Pencil className="h-5 w-5 text-[#7C3AED]" />
                                </div>
                                <div>
                                    <AlertDialogTitle className="text-[18px] font-semibold text-[#1E1B18]">
                                        Update Dependent
                                    </AlertDialogTitle>
                                    <p className="mt-1 text-sm text-[#78716C]">
                                        Modify dependent information.
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
                            <p className="text-sm text-[#474363]">
                                Updating DOB may affect vaccination schedules.
                            </p>
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Full Name
                            </label>
                            <input
                                type="text"
                                {...register(
                                    "fullName"
                                )}
                                className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-xs text-red-500">
                                    {
                                        errors.fullName
                                            .message
                                    }
                                </p>
                            )}
                        </div>
                        <div className="mb-5 grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#444]">
                                    Date Of Birth
                                </label>
                                <input
                                    type="date"
                                    {...register(
                                        "dateOfBirth"
                                    )}
                                    className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#444]">
                                    Gender
                                </label>
                                <select
                                    {...register(
                                        "gender"
                                    )}
                                    className="h-12 w-full rounded-xl border border-[#E7E2DC] bg-[#FDF9F6] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
                                >
                                    <option value="">
                                        Select Gender
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
                                        : "border-[#E7E2DC] bg-white text-gray-600"
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
                                        : "border-[#E7E2DC] bg-white text-gray-600"
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
                                        : "border-[#E7E2DC] bg-white text-gray-600"
                                        }`}
                                >
                                    <Users className="h-4 w-4" />
                                    Other
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#444]">
                                Notes
                            </label>
                            <textarea
                                rows={4}
                                {...register(
                                    "notes"
                                )}
                                className="w-full resize-none rounded-2xl border border-[#E7E2DC] bg-[#FDF9F6] p-4 text-sm outline-none transition"
                            />
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
                                Update Dependent
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}