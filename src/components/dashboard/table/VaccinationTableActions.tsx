import { useState } from "react"

import axios from "axios"

import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Syringe,
} from "lucide-react"

import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import RecordVaccinationDialog from "@/components/dashboard/dialogs/RecordVaccinationDialog"

interface VaccinationTableActionsProps {
  id: number

  status: "COMPLETED" | "UPCOMING" | "OVERDUE"

  onSuccess?: () => void

  record: any

  refetchData: () => void
}

const VaccinationTableActions = ({
  id,
  status,
  onSuccess,
  record,
  refetchData,
}: VaccinationTableActionsProps) => {

  const [editOpen, setEditOpen] =
    useState(false)

  const [deleteOpen, setDeleteOpen] =
    useState(false)

  const [
    openRecordDialog,
    setOpenRecordDialog,
  ] = useState(false)

  const [loading, setLoading] =
    useState(false)

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState(status)

  const getToken = () => {

    const persistedState =
      localStorage.getItem(
        "persist:root"
      )

    const parsedState =
      persistedState
        ? JSON.parse(
            persistedState
          )
        : null

    const auth =
      parsedState?.auth
        ? JSON.parse(
            parsedState.auth
          )
        : null

    return auth?.token
  }

  const handleUpdate =
    async () => {

      try {

        setLoading(true)

        await axios.patch(
          `http://localhost:3000/api/vaccination-record/${id}/status`,

          {
            status:
              selectedStatus,
          },

          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`,
            },
          }
        )

        toast.success(
          "Vaccination updated successfully"
        )

        setEditOpen(false)

        onSuccess?.()

        refetchData()

      } catch (error) {

        console.error(error)

        toast.error(
          "Failed to update vaccination"
        )

      } finally {

        setLoading(false)
      }
    }

  const handleDelete =
    async () => {

      try {

        setLoading(true)

        await axios.delete(
          `http://localhost:3000/api/vaccination-record/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`,
            },
          }
        )

        toast.success(
          "Vaccination deleted successfully"
        )

        setDeleteOpen(false)

        onSuccess?.()

        refetchData()

      } catch (error) {

        console.error(error)

        toast.error(
          "Failed to delete vaccination"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <>

      <DropdownMenu>

        <DropdownMenuTrigger asChild>

          <Button
            variant="ghost"

            size="icon"

            className="rounded-xl hover:bg-[#F5F3FF]"
          >

            <MoreHorizontal className="size-5" />

          </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"

          className="w-52 rounded-2xl"
        >

          <DropdownMenuItem
            onClick={() =>
              setEditOpen(true)
            }

            className="cursor-pointer"
          >

            <Pencil className="size-4" />

            Edit Record

          </DropdownMenuItem>

          {
            status !== "COMPLETED" && (

              <DropdownMenuItem
                onClick={() =>
                  setOpenRecordDialog(
                    true
                  )
                }

                className="cursor-pointer"
              >

                <Syringe className="size-4" />

                Record Vaccination

              </DropdownMenuItem>
            )
          }

          <DropdownMenuItem
            onClick={() =>
              setDeleteOpen(true)
            }

            className="
              cursor-pointer
              text-red-600
              focus:text-red-600
            "
          >

            <Trash2 className="size-4" />

            Delete

          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

      <Dialog
        open={editOpen}

        onOpenChange={
          setEditOpen
        }
      >

        <DialogContent className="rounded-3xl">

          <DialogHeader>

            <DialogTitle className="text-2xl">
              Edit Vaccination
            </DialogTitle>

            <DialogDescription>
              Update vaccination status.
            </DialogDescription>

          </DialogHeader>

          <div className="py-4">

            <Select
              value={
                selectedStatus
              }

              onValueChange={(
                value: any
              ) =>
                setSelectedStatus(
                  value
                )
              }
            >

              <SelectTrigger className="h-12 w-full rounded-2xl">

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="UPCOMING">
                  Upcoming
                </SelectItem>

                <SelectItem value="COMPLETED">
                  Completed
                </SelectItem>

                <SelectItem value="OVERDUE">
                  Overdue
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <DialogFooter>

            <Button
              variant="outline"

              onClick={() =>
                setEditOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              onClick={
                handleUpdate
              }

              disabled={loading}

              className="bg-[#7C3AED] hover:bg-[#6D28D9]"
            >

              {
                loading
                  ? "Updating..."
                  : "Save Changes"
              }

            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

      <Dialog
        open={deleteOpen}

        onOpenChange={
          setDeleteOpen
        }
      >

        <DialogContent className="rounded-3xl">

          <DialogHeader>

            <DialogTitle className="text-2xl">
              Delete Vaccination
            </DialogTitle>

            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>

          </DialogHeader>

          <DialogFooter>

            <Button
              variant="outline"

              onClick={() =>
                setDeleteOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              onClick={
                handleDelete
              }

              disabled={loading}

              className="bg-red-600 hover:bg-red-700"
            >

              {
                loading
                  ? "Deleting..."
                  : "Delete"
              }

            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

      <RecordVaccinationDialog
        open={
          openRecordDialog
        }

        onOpenChange={
          setOpenRecordDialog
        }

        record={record}

        refetchData={
          refetchData
        }
      />

    </>
  )
}

export default VaccinationTableActions