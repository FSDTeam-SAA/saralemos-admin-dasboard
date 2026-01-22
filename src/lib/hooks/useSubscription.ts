import { useQuery } from "@tanstack/react-query";
import { singleSubscription, subscriptionRevenue } from "../api/subscription";


export function useSingleSubscription(id:string){
return useQuery({
    queryKey:['singlesubscription',id],
    queryFn:()=> singleSubscription(id)
})
}


export function useSubscriptionRevenue(){
return useQuery({
    queryKey:['singlesubscription',],
    queryFn:()=> subscriptionRevenue()
})
}
