/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


import { useEffect } from "react"
import { toast } from "sonner"

import { useGetProfile, useUpdateProfile } from "@/lib/hooks/profile"
import { useSession } from "next-auth/react"
import { useQueryClient } from "@tanstack/react-query"
import UserDetailsPresenter from "./UserDetailsPresenter"
import { PersonalInformationFormData, personalInformationSchema } from "../../sschmas"

const UserDetailsContainer = () => {
  const { data } = useGetProfile()
  const { data: session } = useSession()
  const {mutate, isPending}=useUpdateProfile();
    const queryclient=useQueryClient()


  const profile = data?.data || session?.user
  const form = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      email: profile?.email ?? "",
      phoneNumber: profile?.phoneNumber || profile?.phone || "",
      bio: profile?.bio ?? "",
      country: profile?.country ?? "",
      cityState: profile?.cityState ?? "",
      roadArea: profile?.roadArea ?? "",
      postalCode: profile?.postalCode ?? "",
   
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName ?? "",
        lastName: profile.lastName ?? "",
        email: profile.email ?? "",
        phoneNumber: profile.phoneNumber || profile.phone || "",
        bio: profile.bio ?? "",
        country: profile.country ?? "",
        cityState: profile.cityState ?? "",
        roadArea: profile.roadArea ?? "",
        postalCode: profile.postalCode ?? "",

      })
    }
  }, [profile, form])

  const onSubmit = (data: PersonalInformationFormData) => {
    // Construct JSON payload matching the backend requirement
    const payload: any = {
      firstName: data.firstName, // Assuming firstName holds full name if backend requires so, or is just first name
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      bio: data.bio,
      country: data.country,
      cityState: data.cityState,
      roadArea: data.roadArea,
      postalCode: data.postalCode,

    }

    // Explicitly match the user's requested example if firstName is full name "jishad shikdar"
    // If user meant "firstName" key should have "jishad shikdar", then:
    // payload.firstName = `${data.firstName} ${data.lastName || ""}`.trim();
    // But since standardized backend usually splits names, I'll send both unless instructed otherwise.
    // However, the USER REQUEST showed: "firstName" : "jishad shikdar"
    // I will combine them if lastName is present, to match the example exactly.
    if (data.lastName) {
       payload.firstName = `${data.firstName} ${data.lastName}`.trim();
       delete payload.lastName; // Remove lastName if combined into firstName
    }
    
    // Actually, looking at the user request again:
    // { "firstName": "jishad shikdar", ... }
    // It's safer to send it as is if that's what backend expects.

    const userId = session?.user?.id || (profile as any)?._id || (profile as any)?.id;

    if(userId){
      mutate({data:payload,id:userId}, {
        onSuccess: () => {
          toast.success("Success", {
            description: "Your profile has been updated successfully.",
          })
          queryclient.invalidateQueries({
            queryKey: ['profile']
          })
        },
        onError: () => {
          toast.error("Error", {
            description: "Failed to update profile. Please try again.",
          })
        }
      })
    } else {
       toast.error("Error", {
          description: "User ID not found. Please try refreshing page.",
       })
    }
  }

  const onError = (errors: any) => {
      console.log("Form Validation Errors:", errors);
      toast.error("Validation Error", {
          description: "Please check the form for errors.",
      });
  }

  return <UserDetailsPresenter form={form} onSubmit={onSubmit} onError={onError} isLoading={isPending} profile={profile} />
}

export default UserDetailsContainer
