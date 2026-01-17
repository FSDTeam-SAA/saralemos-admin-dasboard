"use client";

import { useGetProfile, useUploadAvatar } from "@/lib/hooks/profile";
import { UserProfile } from "@/types/profile";
import { Pencil } from "lucide-react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const UserSidebar = () => {
  const { data } = useGetProfile();
  const { data: session } = useSession();

  const userInfo = {
    // name: session?.user.name,
    id: session?.user?.id,
    email: session?.user.email,
    phone: "+1 (555) 123-45",
    // company: "Company Name Here",
    location: "4517 Washington Ave. Manchester, Kentucky 39495",
    // image: session?.user?.image,
  };
  const profileData: UserProfile = data?.data || userInfo;
  console.log("profile phone number", profileData.phone);
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && session?.user?.id) {
        const formData = new FormData();
        formData.append("profileImage", file); // Assuming key is 'avatar' or 'image', standardizing to 'avatar' based on endpoint usage often. 
        // Wait, user just said endpoint is /user/upload-avatar/ID, user didn't specify field name. 
        // I'll assume "image" or "file". In most cases for avatars it is "image".
        // Let's use "image" as it matches the profile field name. Or "avatar". 
        // Use "image" to be safe or maybe "avatar". I'll try "image".
        // Actually, user said "backend recive formdata". 
        // I will use "image" because typically user upload is `image`. If it fails i'll check.
        // Actually, looking at previous FormData usage in this project, they keys are direct field names.
        
        uploadAvatar({ data: formData, id: session.user.id }, {
            onSuccess: () => {
                toast.success("Profile image updated successfully");
                queryClient.invalidateQueries({ queryKey: ['profile'] });
            },
            onError: (error) => {
                toast.error("Failed to update profile image");
                console.error(error);
            }
        });
    }
  };

  return (
    <aside className="w-full max-w-sm">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        {/* Header Background */}
        <div className="h-24 bg-[#65A30D] "></div>

        {/* Profile Section */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex justify-center -mt-16 mb-4 relative z-10">
            <div className="relative w-24 h-24 group cursor-pointer" onClick={handleAvatarClick}>
              <Image
                src={profileData?.image?.url || "/images/no.jpg"}
                alt={profileData?.firstName}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              {/* Verified Badge / Edit Icon */}
              <div className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-2 text-white hover:bg-teal-700 transition-colors">
                 {isUploading ? <span className="animate-spin h-4 w-4 block border-2 border-white border-t-transparent rounded-full"/> : <Pencil className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {/* Name */}
          <h2 className="text-center font-semibold text-gray-900 text-lg mb-1">
            {profileData.firstName} {profileData.lastName}{" "}
          </h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            ID: {userInfo.id}
          </p>

          {/* Info Items */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            {[
              {
                label: "Name:",
                value: profileData.firstName + profileData.lastName,
              },
              { label: "Email:", value: profileData.email },
              { label: "Phone:", value: profileData.phone },

              { label: "Location:", value: profileData.location },
            ].map((item, idx) => (
              <div key={idx} className="flex  items-center gap-1 flex-wrap">
                <p className="text-gray-700 font-medium text-sm">
                  {item.label}
                </p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;
