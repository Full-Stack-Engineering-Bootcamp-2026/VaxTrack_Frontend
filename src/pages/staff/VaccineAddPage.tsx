import { useState } from "react"

import axios from "axios"

import { toast } from "react-toastify"

import {
  ShieldCheck,
  FileText,
  Stethoscope,
  Clock3,
  Eye,
  Plus,
  Info,
} from "lucide-react"

import Injection from "@/components/svgImages/Injection"

const VaccineAddPage = () => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",

    category: "Viral Combo",

    description: "",

    clinicalNotes: "",

    recommendedAgeInDays: "",

    boosterSchedule: "",

    isActive: true,
  })

  const getToken = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth?.token
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await axios.post(
        "http://localhost:3000/api/vaccines",
        {
          name: formData.name,

          category: formData.category,

          description: formData.description,

          // clinicalNotes: formData.clinicalNotes,

          recommendedAgeInDays: Number(formData.recommendedAgeInDays),

          boosterSchedule: formData.boosterSchedule,

          isActive: formData.isActive,
        },

        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      toast.success("Vaccine added successfully")

      setFormData({
        name: "",

        category: "Viral Combo",

        description: "",

        clinicalNotes: "",

        recommendedAgeInDays: "",

        boosterSchedule: "",

        isActive: true,
      })
    } catch (error) {
      console.error(error)

      toast.error("Failed to add vaccine")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-[#1C1917]">
              Add New Vaccine
            </h1>

            <p className="mt-3 text-[15px] text-[#78716C]">
              Define a new vaccine and its recommended administration window for
              the medical database.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#EADDFF] px-5 py-2">
            <ShieldCheck className="size-4 text-[#7C3AED]" />

            <p className="text-xs font-semibold tracking-wide text-[#7C3AED] uppercase">
              Secured Entry
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E7E5E4] bg-[#F5F5F4] p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white">
                  <FileText className="size-5 text-[#7C3AED]" />
                </div>

                <h2 className="text-3xl font-semibold text-[#1C1917]">
                  Core Information
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#57534E]">
                    Vaccine Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., MMR Vaccine"
                    className="h-14 w-full rounded-2xl border border-[#E7E5E4] bg-white px-4 text-sm transition outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#57534E]">
                    Vaccine Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-[#E7E5E4] bg-white px-4 text-sm transition outline-none focus:border-[#7C3AED]"
                  >
                    <option>Viral Combo</option>

                    <option>Pediatric</option>

                    <option>Booster</option>

                    <option>Influenza</option>

                    <option>Hepatitis</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-[#57534E]">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter general vaccine information, manufacturer details, and purpose..."
                  className="w-full rounded-2xl border border-[#E7E5E4] bg-white px-4 py-4 text-sm transition outline-none focus:border-[#7C3AED]"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-[#E7E5E4] bg-[#F5F5F4] p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white">
                  <Stethoscope className="size-5 text-[#7C3AED]" />
                </div>

                <h2 className="text-3xl font-semibold text-[#1C1917]">
                  Clinical Details
                </h2>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#57534E]">
                  Clinical Notes
                </label>

                <textarea
                  rows={5}
                  name="clinicalNotes"
                  value={formData.clinicalNotes}
                  onChange={handleChange}
                  placeholder="Internal medical staff notes, dosage specifics, and storage requirements..."
                  className="w-full rounded-2xl border border-[#E7E5E4] bg-white px-4 py-4 text-sm transition outline-none focus:border-[#7C3AED]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-[#E7E5E4] bg-[#F5F5F4] p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white">
                  <Clock3 className="size-5 text-[#7C3AED]" />
                </div>

                <h2 className="text-3xl font-semibold text-[#1C1917]">
                  Schedule
                </h2>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#57534E]">
                  Recommended Age In Days
                </label>

                <input
                  type="number"
                  name="recommendedAgeInDays"
                  value={formData.recommendedAgeInDays}
                  onChange={handleChange}
                  placeholder="e.g., 365"
                  className="h-14 w-full rounded-2xl border border-[#E7E5E4] bg-white px-4 text-sm transition outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-[#57534E]">
                  Booster Schedule (Optional)
                </label>

                <input
                  type="text"
                  name="boosterSchedule"
                  value={formData.boosterSchedule}
                  onChange={handleChange}
                  placeholder="e.g., Every 10 years"
                  className="h-14 w-full rounded-2xl border border-[#E7E5E4] bg-white px-4 text-sm transition outline-none focus:border-[#7C3AED]"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-[#E7E5E4] bg-[#F5F5F4] p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white">
                  <Eye className="size-5 text-[#7C3AED]" />
                </div>

                <h2 className="text-3xl font-semibold text-[#1C1917]">
                  Visibility
                </h2>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[#E7E5E4] bg-white p-5">
                <div>
                  <p className="text-sm font-medium text-[#1C1917]">
                    Status Toggle
                  </p>

                  <p className="mt-1 text-xs text-[#78716C]">
                    Make vaccine visible in catalog
                  </p>
                </div>

                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: !prev.isActive,
                    }))
                  }
                  className={`relative h-7 w-14 rounded-full transition ${formData.isActive ? "bg-[#7C3AED]" : "bg-[#D6D3D1]"
                    }`}
                >
                  <div
                    className={`absolute top-1 size-5 rounded-full bg-white transition ${formData.isActive ? "left-8" : "left-1"
                      }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] text-sm font-semibold text-white transition hover:bg-[#6D28D9] disabled:opacity-70"
            >
              <Plus className="size-4" />

              {loading ? "Adding Vaccine..." : "Add to Catalog"}
            </button>

            <button className="h-14 w-full rounded-2xl border border-[#D6D3D1] bg-transparent text-sm font-medium text-[#57534E] transition hover:bg-[#F5F5F4]">
              Cancel
            </button>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-[#D6BCFA] bg-[#F5F3FF] p-8">
          <div className="relative z-10 flex items-start gap-5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white">
              <Info className="size-6 text-[#7C3AED]" />
            </div>

            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[#7C3AED]">
                Protocol Requirement
              </h2>

              <p className="mt-3 text-[15px] leading-8 text-[#6B7280]">
                All new vaccines added to the VaxTrack registry must align with
                current CDC and WHO pediatric recommendations.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -bottom-15 z-0 opacity-10">
            <div className="h-80 w-[320px] text-[#7C3AED]">
              <Injection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaccineAddPage
