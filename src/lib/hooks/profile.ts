import { useMutation, useQuery } from "@tanstack/react-query";
import { changePassword, getUserProfile, userProfileUpdate, uploadUserAvatar as uploadAvatar } from "../api/profile";
import { UserProfile } from "@/types/profile";



export function useGetProfile(){
    return useQuery({
        queryKey:['profile'],
        queryFn:()=>getUserProfile()
    })
}


export function useUpdateProfile() {
    return useMutation({
    mutationKey :['profile'],
    mutationFn:({data,id}:{data:FormData,id:string})=> userProfileUpdate(data,id)
    })
    
}

export function useUploadAvatar() {
    return useMutation({
        mutationKey: ['upload-avatar'],
        mutationFn: ({ data, id }: { data: FormData, id: string }) => uploadAvatar(data, id)
    })
}


export function useUpdatePassword() {
    return useMutation({
    mutationKey :['password'],
    mutationFn:(data:{currentPassword:string,newPassword:string})=> changePassword(data)
    })
    
}