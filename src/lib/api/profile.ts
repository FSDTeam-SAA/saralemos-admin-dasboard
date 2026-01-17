import api from "./api"

export async function getUserProfile() {
   try{
    const res= await api.get(`/user/my-profile`);
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to Fetch Your Profile please check everyting")
    }
   } 
    
}


export async function userProfileUpdate(data: FormData, id: string) {
   try{
    const res= await api.put(`/user/${id}`,data);
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to Fetch Your Profile please check everyting")
    }
   } 
    
}


export async function changePassword({currentPassword,newPassword}:{currentPassword:string,newPassword:string}) {
           try{
    const res= await api.post(`/auth/change-password`,{currentPassword,newPassword});
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to faild to update Password")
    }
   } 
}

export async function uploadUserAvatar(data: FormData, id: string) {
   try {
    const res = await api.post(`/user/upload-avatar/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return res.data;
   } catch(error) {
    if(error instanceof Error){
        throw new Error(error.message || "Failed to upload avatar")
    }
   } 
}