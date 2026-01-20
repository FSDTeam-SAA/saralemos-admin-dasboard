import api from "./api";

export async function overallview() {
   try{
    const res= await api.get(`/subscription/dashboard/overview`);
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to Fetch Your Profile please check everyting")
    }
   } 
    
}

