import { useQuery } from "@tanstack/react-query";
import { overallview, revenueAnalytics, usersanlytics } from "../api/overallview";

export function useOverAllView(){
    return useQuery({
        queryKey:['overallview',],
        queryFn:()=>overallview()
    })
}


export function useUserAnalytics(){
    return useQuery({
        queryKey:['useranalytics',],
        queryFn:()=>usersanlytics()
    })
}

export function useRevenue(startDate?: string, endDate?: string){
    return useQuery({
        queryKey:['revenue', startDate, endDate],
        queryFn:()=>revenueAnalytics(startDate, endDate)
    })
}
