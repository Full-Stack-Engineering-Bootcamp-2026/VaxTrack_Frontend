import { useEffect, useRef, useState } from "react"

import axios from "axios"

import {
  Calendar,
  Camera,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react"

import { toast } from "react-toastify"

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Skeleton } from "@/components/ui/skeleton"
import { useNavigate } from "react-router-dom"

interface UserProfile {
  id: number
  fullName: string
  email: string
  phone: string
  imageUrl: string | null
  role: string
  createdAt: string
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const [dependents, setDependents] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [updating, setUpdating] = useState(false)

  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    imageUrl: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const getPersistedUser = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth
  }

  const getToken = () => {
    const auth = getPersistedUser()

    return auth?.token
  }

  useEffect(() => {
    const persistedUser = getPersistedUser()?.user

    if (persistedUser) {
      setProfile(persistedUser)

      setFormData({
        fullName: persistedUser.fullName || "",

        phone: persistedUser.phone || "",

        imageUrl: persistedUser.imageUrl || "",
      })
    }
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      const user = response.data.data

      if (user.role === "GUARDIAN") {
        const dependentResponse = await axios.get(
          "http://localhost:3000/api/dependents",
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        )

        const dependentData = dependentResponse.data.data

        setDependents(
          Array.isArray(dependentData)
            ? dependentData
            : Array.isArray(dependentData.data)
              ? dependentData.data
              : []
        )
      }

      setProfile(user)

      setFormData({
        fullName: user.fullName,

        phone: user.phone,

        imageUrl: user.imageUrl || "",
      })
    } catch (error) {
      console.error(error)

      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    try {
      setImageUploading(true)

      const uploadData = new FormData()

      uploadData.append("image", file)

      const response = await axios.post(
        "http://localhost:3000/api/users/profile-temp",
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,

            "Content-Type": "multipart/form-data",
          },
        }
      )

      setFormData({
        ...formData,

        imageUrl: response.data.data.fileName,
      })

      setProfile((prev) => ({
        ...prev!,
        imageUrl: response.data.data.imageUrl,
      }))

      toast.success("Profile image uploaded")
    } catch (error) {
      console.error(error)

      toast.error("Image upload failed")
    } finally {
      setImageUploading(false)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true)

      await axios.put(
        "http://localhost:3000/api/users/profile",

        {
          fullName: formData.fullName,

          phone: formData.phone,

          imageUrl: formData.imageUrl,
        },

        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      const refreshedProfile = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      const updatedUser = refreshedProfile.data.data

      setProfile(updatedUser)

      setFormData({
        fullName: updatedUser.fullName,

        phone: updatedUser.phone,

        imageUrl: updatedUser.imageUrl || "",
      })

      const persistedState = localStorage.getItem("persist:root")

      if (persistedState) {
        const parsedState = JSON.parse(persistedState)

        const auth = JSON.parse(parsedState.auth)

        auth.user = {
          ...auth.user,

          fullName: updatedUser.fullName,

          phone: updatedUser.phone,

          imageUrl: updatedUser.imageUrl,
        }

        parsedState.auth = JSON.stringify(auth)

        localStorage.setItem(
          "persist:root",

          JSON.stringify(parsedState)
        )
      }

      toast.success("Profile updated successfully")
    } catch (error) {
      console.error(error)

      toast.error("Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-10 w-52" />

            <Skeleton className="h-4 w-80" />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
            <Skeleton className="h-125 rounded-3xl" />

            <Skeleton className="h-125 rounded-3xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#1C1917]">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#78716C]">
            Manage your personal information and security settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
          <Card className="rounded-3xl border border-[#E7E5E4] bg-[#F5F5F4] shadow-sm">
            <CardContent className="flex flex-col items-center justify-center gap-5 p-8">
              <div className="relative">
                <Avatar className="size-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profile?.imageUrl || undefined} />

                  <AvatarFallback className="text-3xl">
                    {profile?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-0 bottom-0 flex size-10 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-lg transition-all hover:bg-[#6D28D9]"
                >
                  <Camera className="size-4" />
                </button>
              </div>

              <div className="rounded-full bg-[#E9D5FF] px-4 py-1.5">
                <p className="text-sm font-medium text-[#7C3AED]">
                  {profile?.role}
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="h-11 w-full rounded-xl"
              >
                {imageUploading ? "Uploading..." : "Upload Photo"}
              </Button>

              <p className="text-center text-xs text-[#A8A29E]">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-3xl border border-[#E7E5E4] bg-[#F5F5F4] shadow-sm">
            <div className="absolute top-0 left-0 h-full w-2 bg-[#7C3AED]" />

            <CardContent className="space-y-8 p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-3xl font-bold text-[#1C1917]">
                  Account Details
                </h2>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={updating}
                    className="h-11 rounded-xl bg-[#7C3AED] px-6 hover:bg-[#6D28D9]"
                  >
                    {updating ? "Saving..." : "Save Profile"}
                  </Button>

                  <Button
                    onClick={() => navigate("/forgot-password")}
                    className="h-11 rounded-xl bg-[#DDD6FE] px-6 text-[#7C3AED] hover:bg-[#C4B5FD]"
                  >
                    Reset Password
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>

                  <div className="relative">
                    <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A8A29E]" />

                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl border-[#E7E5E4] bg-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A8A29E]" />

                    <Input
                      value={profile?.email}
                      disabled
                      className="h-12 rounded-xl border-[#E7E5E4] bg-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary Role</Label>

                  <div className="relative">
                    <Users className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A8A29E]" />

                    <Input
                      value={profile?.role}
                      disabled
                      className="h-12 rounded-xl border-[#E7E5E4] bg-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>

                  <div className="relative">
                    <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A8A29E]" />

                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl border-[#E7E5E4] bg-white pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Member Since</Label>

                <div className="relative">
                  <Calendar className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A8A29E]" />

                  <Input
                    value={new Date(
                      profile?.createdAt || ""
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    disabled
                    className="h-12 rounded-xl border-[#E7E5E4] bg-white pl-10"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#DDD6FE] bg-[#F5F3FF] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 text-[#7C3AED]" />

                  <div>
                    <h3 className="font-semibold text-[#1C1917]">
                      Account Verification
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#78716C]">
                      Your account is fully verified for medical record access.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {profile?.role === "GUARDIAN" && (
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-[#1C1917]">
              Linked Dependents
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {Array.isArray(dependents) &&
                dependents.map((dependent, index) => (
                  <div
                    key={dependent.id}
                    className="flex items-center justify-between rounded-2xl border border-[#E7E5E4] bg-[#F5F5F4] p-5 transition-all hover:border-[#DDD6FE] hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/150?img=${index + 10}`}
                        alt="dependent"
                        className="size-12 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="text-sm font-semibold text-[#1C1917]">
                          {dependent.fullName}
                        </h3>

                        <p
                          className={`mt-1 text-xs ${
                            dependent.isVaccinated
                              ? "text-[#16A34A]"
                              : "text-[#DC2626]"
                          } `}
                        >
                          {dependent.isVaccinated
                            ? "● Fully Vaccinated"
                            : "● Vaccination Pending"}
                        </p>
                      </div>
                    </div>

                    <span className="text-[#78716C]">›</span>
                  </div>
                ))}

              <button
                onClick={() => (window.location.href = "/guardian/dashboard")}
                className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D6D3D1] bg-[#F5F5F4] p-5 text-sm font-medium text-[#78716C] transition-all hover:border-[#7C3AED] hover:text-[#7C3AED]"
              >
                <span className="text-lg">+</span>
                Add Dependent
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
