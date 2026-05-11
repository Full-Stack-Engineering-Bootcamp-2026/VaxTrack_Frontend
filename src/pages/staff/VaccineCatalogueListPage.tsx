import { useEffect, useMemo, useState } from "react"

import axios from "axios"

import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

import protocolImage from "@/assets/Medical Science.png"

import { useNavigate } from "react-router-dom"

const VaccineCatalogueListPage = () => {
  const navigate = useNavigate()

  const [vaccines, setVaccines] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")

  const [statusFilter, setStatusFilter] = useState("ALL")

  const [page, setPage] = useState(1)

  const limit = 4

  const getToken = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth?.token
  }

  const fetchVaccines = async () => {
    try {
      setLoading(true)

      const response = await axios.get("http://localhost:3000/api/vaccines", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })

      const vaccineData = response.data?.data?.data

      setVaccines(Array.isArray(vaccineData) ? vaccineData : [])
    } catch (error) {
      console.error(error)

      setVaccines([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVaccines()
  }, [])

  const filteredVaccines = useMemo(() => {
    return vaccines.filter((vaccine: any) => {
      const matchesSearch = vaccine?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : statusFilter === "ACTIVE"
            ? vaccine?.isActive
            : !vaccine?.isActive

      return matchesSearch && matchesStatus
    })
  }, [vaccines, search, statusFilter])

  const paginatedVaccines = useMemo(() => {
    const start = (page - 1) * limit

    return filteredVaccines.slice(start, start + limit)
  }, [filteredVaccines, page])

  const totalPages = Math.ceil(filteredVaccines.length / limit)

  const activePercentage =
    vaccines.length > 0
      ? Math.round(
          (vaccines.filter((vaccine: any) => vaccine?.isActive).length /
            vaccines.length) *
            100
        )
      : 0

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#1C1917]">
              Vaccine Catalog
            </h1>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Search by vaccine name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-70 rounded-2xl border border-[#E7E5E4] bg-white px-4 text-sm transition outline-none focus:border-[#7C3AED]"
            />

            <button
              onClick={() => navigate("/staff/vaccination-add")}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-[#6D28D9]"
            >
              <Plus className="size-4" />
              Add Vaccine
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-[#E7E5E4] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#F5F5F4] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold tracking-wide text-[#78716C] uppercase">
                Filter By Status:
              </p>

              <div className="flex items-center rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-1">
                {["ALL", "ACTIVE", "INACTIVE"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setStatusFilter(item)

                      setPage(1)
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      statusFilter === item
                        ? "bg-white text-[#7C3AED] shadow-sm"
                        : "text-[#78716C]"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#F5F5F4]">
                <tr className="text-left">
                  <th className="px-6 py-5 text-xs font-semibold tracking-wide text-[#78716C] uppercase">
                    Vaccine Name
                  </th>

                  <th className="px-6 py-5 text-xs font-semibold tracking-wide text-[#78716C] uppercase">
                    Recommended Age Window
                  </th>

                  <th className="px-6 py-5 text-xs font-semibold tracking-wide text-[#78716C] uppercase">
                    Description
                  </th>

                  <th className="px-6 py-5 text-xs font-semibold tracking-wide text-[#78716C] uppercase">
                    Status
                  </th>

                  {/* <th className="px-6 py-5 text-xs font-semibold tracking-wide text-[#78716C] uppercase">
                    Actions
                  </th> */}
                </tr>
              </thead>

              <tbody>
                {paginatedVaccines.map((vaccine: any) => (
                  <tr key={vaccine.id} className="border-b border-[#F5F5F4]">
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 h-10 w-1 rounded-full ${
                            vaccine?.isActive ? "bg-[#059669]" : "bg-[#D6D3D1]"
                          }`}
                        />

                        <div>
                          <h3 className="font-semibold text-[#1C1917]">
                            {vaccine?.name}
                          </h3>

                          <p className="mt-1 text-xs font-semibold tracking-wide text-[#7C3AED] uppercase">
                            {vaccine?.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-[#1C1917]">
                        {Math.floor((vaccine?.recommendedAgeInDays || 0) / 30)}{" "}
                        Months
                      </p>

                      <p className="mt-1 text-xs text-[#78716C]">
                        Booster: {vaccine?.boosterSchedule || "N/A"}
                      </p>
                    </td>

                    <td className="max-w-[320px] px-6 py-5">
                      <p className="line-clamp-2 text-sm leading-6 text-[#57534E]">
                        {vaccine?.description}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          vaccine?.isActive
                            ? "bg-[#D1FAE5] text-[#047857]"
                            : "bg-[#E7E5E4] text-[#57534E]"
                        }`}
                      >
                        {vaccine?.isActive ? "Active" : "Inactive"}
                      </div>
                    </td>

                    {/* <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <button className="text-[#57534E] transition hover:text-[#7C3AED]">
                          <Pencil className="size-4" />
                        </button>

                        <button className="text-[#57534E] transition hover:text-red-500">
                          <Ban className="size-4" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}

                {!loading && paginatedVaccines.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center text-sm text-[#78716C]"
                    >
                      No vaccines found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#78716C]">
              Showing{" "}
              {filteredVaccines.length === 0 ? 0 : (page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, filteredVaccines.length)} of{" "}
              {filteredVaccines.length} vaccines
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex size-10 items-center justify-center rounded-xl border border-[#E7E5E4] bg-white text-[#57534E] disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
              </button>

              {Array.from({
                length: totalPages || 1,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`flex size-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                    page === index + 1
                      ? "bg-[#7C3AED] text-white"
                      : "border border-[#E7E5E4] bg-white text-[#57534E]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
                className="flex size-10 items-center justify-center rounded-xl border border-[#E7E5E4] bg-white text-[#57534E] disabled:opacity-40"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl bg-[#DDD6FE] p-6">
            <p className="text-xs font-semibold tracking-wide text-[#5B21B6] uppercase">
              Catalog Health
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[#1C1917]">
              {activePercentage}% Active
            </h2>

            <div className="mt-8 flex items-end gap-2">
              {[70, 55, 72, 18, 74, 48].map((height, index) => (
                <div
                  key={index}
                  style={{
                    height: `${height}px`,
                  }}
                  className="w-8 rounded-t-md bg-[#5B21B6]"
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-5">
              <img
                src={protocolImage}
                alt="Protocol"
                className="size-16 rounded-2xl object-cover"
              />

              <div>
                <div className="inline-flex rounded-full bg-[#D1FAE5] px-3 py-1 text-xs font-semibold tracking-wide text-[#047857] uppercase">
                  New Protocol
                </div>

                <h2 className="mt-3 text-2xl font-semibold text-[#1C1917]">
                  Updated CDC Guidelines (2024)
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#57534E]">
                  Recent updates regarding HepB series for infants have been
                  integrated into the smart suggestions engine.
                </p>

                <button className="mt-4 text-sm font-semibold text-[#7C3AED]">
                  View Documentation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaccineCatalogueListPage
