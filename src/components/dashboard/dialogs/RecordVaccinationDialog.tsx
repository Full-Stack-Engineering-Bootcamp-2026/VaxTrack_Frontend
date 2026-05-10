import { useState } from "react"

import axios from "axios"

import { CalendarDays, ShieldCheck, X } from "lucide-react"

import { toast } from "react-toastify"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

interface RecordVaccinationDialogProps {
  open: boolean

  onOpenChange: (open: boolean) => void

  record: any

  refetchData: () => void
}

const RecordVaccinationDialog = ({
  open,
  onOpenChange,
  record,
  refetchData,
}: RecordVaccinationDialogProps) => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    administeredDate: new Date().toISOString().split("T")[0],

    administeredBy: "",

    batchNumber: "",

    notes: "",
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
  ) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await axios.put(
        `http://localhost:3000/api/vaccination-record/${record.id}/record`,

        {
          administeredDate: formData.administeredDate,

          administeredBy: formData.administeredBy,

          batchNumber: formData.batchNumber,

          notes: formData.notes,
        },

        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      toast.success("Vaccination recorded successfully")

      refetchData()

      onOpenChange(false)
    } catch (error) {
      console.error(error)

      toast.error("Failed to record vaccination")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed top-[50%] left-[50%] w-[92vw] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[28px] border-0 bg-white p-0 sm:w-full  sm:max-w-[720px]">
        <DialogHeader className="border-b bg-[#FAFAF9] px-6 py-5">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[22px] font-semibold text-[#1C1917]">
              Record Vaccination
            </DialogTitle>

            <button
              onClick={() => onOpenChange(false)}
              className="text-[#78716C] transition-all hover:text-[#1C1917]"
            >
              
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-4 rounded-3xl border border-[#C4B5FD] bg-[#F8F5FF] p-5 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-medium tracking-wide text-[#78716C] uppercase">
                Dependent
              </p>

              <h3 className="mt-2 text-[18px] font-semibold text-[#1C1917]">
                {record?.dependent?.fullName}
              </h3>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-wide text-[#78716C] uppercase">
                Vaccine
              </p>

              <h3 className="mt-2 text-[18px] font-semibold text-[#1C1917]">
                {record?.vaccine?.name}
              </h3>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-wide text-[#78716C] uppercase">
                Recommended Age
              </p>

              <h3 className="mt-2 text-[18px] font-semibold text-[#1C1917]">
                {record?.vaccine?.recommendedAge ||
                  record?.recommendedAge ||
                  "N/A"}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-[15px] font-medium text-[#1C1917]">
                Date Administered
              </Label>

              <div className="relative">
                <Input
                  type="date"
                  name="administeredDate"
                  value={formData.administeredDate}
                  onChange={handleChange}
                  className="h-12  rounded-2xl border-[#E7E5E4] bg-[#FAFAF9] pr-12 text-[15px]"
                />

              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[15px] font-medium text-[#1C1917]">
                Administered By
              </Label>

              <Input
                name="administeredBy"
                value={formData.administeredBy}
                onChange={handleChange}
                placeholder="Dr. Sarah Jenkins"
                className="h-12 rounded-2xl border-[#E7E5E4] bg-[#FAFAF9] text-[15px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[15px] font-medium text-[#1C1917]">
              Batch / Lot Number
            </Label>

            <Input
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              placeholder="e.g. MMR-2023-X99"
              className="h-12 rounded-2xl border-[#E7E5E4] bg-[#FAFAF9] text-[15px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[15px] font-medium text-[#1C1917]">
              Clinical Notes
            </Label>

            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="
                Note any reactions or specific clinical observations...
              "
              className="min-h-32.5 resize-none rounded-2xl border-[#E7E5E4] bg-[#FAFAF9] p-4 text-[15px]"
            />
          </div>

          <div className="flex items-center gap-4 rounded-3xl border border-[#E7E5E4] bg-[#FAFAF9] p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9D5FF]">
              <ShieldCheck className="size-6 text-[#7C3AED]" />
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-[#1C1917]">
                St. Jude Pediatric Wing
              </h3>

              <p className="mt-1 text-[13px] leading-6 text-[#78716C]">
                Records are digitally signed and encrypted for patient privacy.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t bg-[#FAFAF9] px-6 py-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-2xl border-[#DDD6FE] bg-[#DDD6FE] px-6 text-[15px] font-medium text-[#7C3AED] hover:bg-[#C4B5FD]"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="h-11 rounded-2xl bg-[#7C3AED] px-6 text-[15px] font-medium hover:bg-[#6D28D9]"
          >
            {loading ? "Saving..." : "Save Record"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RecordVaccinationDialog
