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


export async function revenueAnalytics() {
   try{
    const res= await api.get(`1/dashboard/revenue-trend-range?startDate=2026-01-01&endDate=2026-12-31`);
    return res.data;
   }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || "Fail to Fetch Your Profile please check everyting")
    }
   } 
    
}

