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

export function useRevenue(){
    return useQuery({
        queryKey:['revenue',],
        queryFn:()=>revenueAnalytics()
    })
}
