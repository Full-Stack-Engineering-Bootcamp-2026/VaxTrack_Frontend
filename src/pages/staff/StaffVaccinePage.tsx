import { useEffect, useMemo, useState } from "react"

import axios from "axios"

import { CalendarDays, Filter, Search } from "lucide-react"

import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

import VaccinationTable from "@/components/dashboard/table/VaccinationTable"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import useDebounce from "@/hooks/useDebounce"

const StaffVaccinesPage = () => {
  const { user, token } = useSelector((state: RootState) => state.auth)

  const [records, setRecords] = useState<any[]>([])

  const [filteredRecords, setFilteredRecords] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)

  const [pagination, setPagination] = useState({
    page: 1,

    totalPages: 1,

    total: 0,

    hasNextPage: false,

    hasPreviousPage: false,
  })

  const [search, setSearch] = useState("")

  const [status, setStatus] = useState("ALL")

  const [selectedVaccine, setSelectedVaccine] = useState("ALL")

  const [fromDate, setFromDate] = useState("")

  const [toDate, setToDate] = useState("")

  const [vaccines, setVaccines] = useState<any[]>([])

  const debouncedSearch = useDebounce(search, 500)

  const fetchVaccinationRecords = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        `http://localhost:3000/api/vaccination-record?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const fetchedRecords = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data?.data?.data)
          ? response.data.data.data
          : []

      const paginationData = response.data?.pagination ||
        response.data?.data?.pagination || {
          page: 1,

          totalPages: 1,

          total: 0,

          hasNextPage: false,

          hasPreviousPage: false,
        }

      setRecords(fetchedRecords)

      setPagination(paginationData)

      const uniqueVaccines = [
        ...new Map(
          fetchedRecords.map((record: any) => [
            record?.vaccine?.id,
            record?.vaccine,
          ])
        ).values(),
      ]

      setVaccines(uniqueVaccines)
    } catch (error) {
      console.error(error)

      setRecords([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVaccinationRecords()
  }, [page])

  const applyFilters = () => {
    let filtered = [...records]

    if (debouncedSearch.trim()) {
      filtered = filtered.filter((record) =>
        record?.dependent?.fullName
          ?.toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      )
    }

    if (status !== "ALL") {
      filtered = filtered.filter((record) => record.status === status)
    }

    if (selectedVaccine !== "ALL") {
      filtered = filtered.filter(
        (record) => record?.vaccine?.id?.toString() === selectedVaccine
      )
    }

    if (fromDate) {
      filtered = filtered.filter(
        (record) => new Date(record.dueDate) >= new Date(fromDate)
      )
    }

    if (toDate) {
      filtered = filtered.filter(
        (record) => new Date(record.dueDate) <= new Date(toDate)
      )
    }

    setFilteredRecords(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [debouncedSearch, page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)

    applyFilters()
  }

  useEffect(() => {
    setFilteredRecords(records)
  }, [records])

  const stats = useMemo(() => {
    const total = records.length

    const completed = records.filter(
      (record) => record.status === "COMPLETED"
    ).length

    const overdue = records.filter(
      (record) => record.status === "OVERDUE"
    ).length

    const upcoming = records.filter(
      (record) => record.status === "UPCOMING"
    ).length

    const compliance = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total,
      completed,
      overdue,
      upcoming,
      compliance,
    }
  }, [records])

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1C1917]">
              Vaccination Records
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A8A29E]" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by dependent..."
                className="h-11 w-[260px] rounded-2xl border-[#E9E1DB] bg-[#FFF8F4] pl-10"
              />
            </div>

            <div className="flex items-center gap-3">
              <img
                src={user?.imageUrl || "https://i.pravatar.cc/150?img=12"}
                alt="profile"
                className="size-12 rounded-full object-cover"
              />

              <div>
                <h3 className="text-sm font-semibold text-[#7C3AED]">
                  {user?.fullName}
                </h3>

                <p className="text-xs text-[#78716C]">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
        <Card className="rounded-[28px] border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Vaccine Name
              </p>

              <Select
                value={selectedVaccine}
                onValueChange={setSelectedVaccine}
              >
                <SelectTrigger className="h-12 rounded-2xl border border-[#D8D1CB] bg-[#FFF8F4] px-4 text-[#44403C] shadow-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="All Vaccines" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Vaccines</SelectItem>

                  {vaccines.map((vaccine) => (
                    <SelectItem key={vaccine.id} value={vaccine.id.toString()}>
                      {vaccine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Status
              </p>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-12 rounded-2xl border border-[#D8D1CB] bg-[#FFF8F4] px-4 text-[#44403C] shadow-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>

                  <SelectItem value="COMPLETED">Completed</SelectItem>

                  <SelectItem value="UPCOMING">Upcoming</SelectItem>

                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Date Range
              </p>

              <div className="relative">
                <CalendarDays className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#78716C]" />

                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="h-12 rounded-2xl border border-[#D8D1CB] bg-[#FFF8F4] pl-11 text-[#44403C] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button
                onClick={applyFilters}
                className="h-12 w-full rounded-2xl border border-[#D8D1CB] bg-[#E9E1DB] text-[#5F5A7C] shadow-none hover:bg-[#DDD4CD]"
              >
                <Filter className="size-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="flex h-40 items-center justify-center rounded-3xl border border-[#E7E5E4] bg-white">
            <p className="text-[#78716C]">Loading vaccination records...</p>
          </div>
        ) : (
          <VaccinationTable
            records={filteredRecords}
            pagination={{
              ...pagination,

              currentPageColor: "#7C3AED",
            }}
            onPageChange={handlePageChange}
            refetchData={fetchVaccinationRecords}
          />
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-3xl border border-[#E7E5E4] p-5 shadow-sm">
            <p className="text-xs text-[#78716C] uppercase">Total Records</p>

            <div className="mt-3 flex items-end gap-2">
              <h2 className="text-4xl font-bold text-[#1C1917]">
                {stats.total}
              </h2>
            </div>
          </Card>

          <Card className="rounded-3xl border border-[#E7E5E4] p-5 shadow-sm">
            <p className="text-xs text-[#78716C] uppercase">Upcoming</p>

            <div className="mt-3 flex items-end gap-2">
              <h2 className="text-4xl font-bold text-blue-600">
                {stats.upcoming}
              </h2>
            </div>
          </Card>

          <Card className="rounded-3xl border border-[#E7E5E4] p-5 shadow-sm">
            <p className="text-xs text-[#78716C] uppercase">Overdue</p>

            <div className="mt-3 flex items-end gap-2">
              <h2 className="text-4xl font-bold text-red-500">
                {stats.overdue}
              </h2>
            </div>
          </Card>

          <Card className="rounded-3xl border border-[#E7E5E4] p-5 shadow-sm">
            <p className="text-xs text-[#78716C] uppercase">Compliance Rate</p>

            <h2 className="mt-3 text-4xl font-bold text-[#1C1917]">
              {stats.compliance}%
            </h2>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E9D5FF]">
              <div
                className="h-full rounded-full bg-[#7C3AED]"
                style={{
                  width: `${stats.compliance}%`,
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StaffVaccinesPage
