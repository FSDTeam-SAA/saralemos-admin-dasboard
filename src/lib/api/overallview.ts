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





export async function usersanlytics() {
   try{
    const res= await api.get(`/dashboard/user-analytics`);
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to Fetch Your Profile please check everyting")
    }
   } 
    
}


export async function revenueAnalytics(startDate?: string, endDate?: string) {
   try{
    const res= await api.get(`/dashboard/revenue-trend-range?`, {
        params: {
            startDate,
            endDate
        }
    });
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to Fetch Your Profile please check everyting")
    }
   } 
    
}

