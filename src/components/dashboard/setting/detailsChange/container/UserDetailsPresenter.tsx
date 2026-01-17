/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


import { PersonalInformationFormData } from "../../sschmas";
import { ProfileResponse } from "@/types/profile";

interface PersonalInformationPresenterProps {
  form: UseFormReturn<PersonalInformationFormData>;
  onSubmit: (data: PersonalInformationFormData) => void;
  onError?: (errors: any) => void;
  isLoading?: boolean;
  profile?: ProfileResponse;
}

const UserDetailsPresenter = ({
  form,
  onSubmit,
  onError,
  isLoading = false,
  profile
}: PersonalInformationPresenterProps) => {
  console.log('profile edit data',profile)
  const profileData=profile?.data;
  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Personal Information
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your personal information and profile details.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* First and Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Olivia"
                      {...field}
                      defaultValue={profileData?.firstName || ""}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rhye"
                      {...field}
                      defaultValue={profileData?.lastName || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

         

          {/* Location and Postal Code Row */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="30301"
                      {...field}
                      defaultValue={profileData?.postalCode || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          {/* Street and Phone Row */}
          {/* Bio Row */}
          <div className="grid grid-cols-1 gap-6">
             <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Bio
                  </FormLabel>
                   <FormControl>
                    <textarea
                      placeholder="Tell us about yourself"
                      {...field}
                      defaultValue={profileData?.bio || ""}
                       className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                       type="email"
                      placeholder="bessieedwards@gmail.com"
                      {...field}
                      defaultValue={profileData?.email || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Phone Number"
                      {...field}
                      defaultValue={profileData?.phoneNumber || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location Details Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bangladesh"
                      {...field}
                       defaultValue={profileData?.country || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="cityState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    City/State
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mohakhali"
                      {...field}
                      defaultValue={profileData?.cityState || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

           {/* Location Details Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="roadArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Road/Area
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="BRAC"
                      {...field}
                      defaultValue={profileData?.roadArea || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1211"
                      {...field}
                      defaultValue={profileData?.postalCode || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          {/* Gender */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                   <FormLabel className="text-gray-700 font-medium">
                    Gender
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      defaultValue={profileData?.gender || ""}
                      className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          {/* Email (Read-only if needed) */}
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Email Address (Read-only)
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="bessieedwards@gmail.com"
                    {...field}
                    defaultValue={profile?.email || ""}
                    readOnly
                    className="border-gray-300 bg-gray-50 focus:border-teal-600 focus:ring-teal-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              onClick={() => {
                // Reset form to original profile values
                if (profileData) {
                  form.reset({
                    firstName: profileData.firstName || "",
                    lastName: profileData.lastName || "",
                    country: profileData.country || "",
                    cityState: profileData.cityState || "",
                    // email: profileData.email || "",
                    postalCode: profileData.postalCode || "",
                    roadArea: profileData.roadArea || "",
               
                    phoneNumber: profileData.phoneNumber || profileData.phone || "",
                  
                  });
                }
              }}
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#65A30D] cursor-pointer hover:bg-primary/90 text-white"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserDetailsPresenter;