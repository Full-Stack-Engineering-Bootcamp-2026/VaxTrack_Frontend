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
  X,
} from "lucide-react"

import { toast } from "react-toastify"

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

  const [loading, setLoading] = useState(true)

  const [updating, setUpdating] = useState(false)

  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    imageUrl: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const getToken = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth?.token
  }

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

        imageUrl: response.data.data.url,
      })

      toast.success("Profile image uploaded")
    } catch (error) {
      console.error(error)

      toast.error("Image upload failed")
    } finally {
      setImageUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    try {
      await axios.delete("http://localhost:3000/api/users/profile-temp", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })

      setFormData({
        ...formData,
        imageUrl: "",
      })

      toast.success("Image removed")
    } catch (error) {
      console.error(error)

      toast.error("Failed to remove image")
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

      toast.success("Profile updated successfully")

      fetchProfile()
    } catch (error) {
      console.error(error)

      toast.error("Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

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
          <Card className="rounded-3xl border border-[#E7E5E4] shadow-sm">
            <CardContent className="flex flex-col items-center justify-center gap-5 p-8">
              <div className="relative">
                <Avatar className="size-32 border-4 border-white shadow-lg">
                  <AvatarImage src={formData.imageUrl} />

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

              <div className="rounded-full bg-[#F5F3FF] px-4 py-1.5">
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

              <div className="flex w-full flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageUploading}
                  className="h-11 rounded-xl"
                >
                  {imageUploading ? "Uploading..." : "Upload Photo"}
                </Button>

                {formData.imageUrl && (
                  <Button
                    variant="destructive"
                    onClick={handleRemoveImage}
                    className="h-11 rounded-xl"
                  >
                    <X className="mr-2 size-4" />
                    Remove Photo
                  </Button>
                )}
              </div>

              <p className="text-center text-xs text-[#A8A29E]">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-3xl border border-[#E7E5E4] shadow-sm">
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
                    {updating ? "Saving..." : "Edit Profile"}
                  </Button>

                  <Button variant="secondary" className="h-11 rounded-xl px-6">
                    Change Password
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
                      className="h-12 rounded-xl pl-10"
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
                      className="h-12 rounded-xl pl-10"
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
                      className="h-12 rounded-xl pl-10"
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
                      className="h-12 rounded-xl pl-10"
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
                    className="h-12 rounded-xl pl-10"
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
                      Last security audit performed recently.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
