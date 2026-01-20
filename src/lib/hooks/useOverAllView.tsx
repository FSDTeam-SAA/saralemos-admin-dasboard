import { useQuery } from "@tanstack/react-query";
import { overallview } from "../api/overallview";

export function useOverAllView(){
    return useQuery({
        queryKey:['overallview',],
        queryFn:()=>overallview()
    })
}
