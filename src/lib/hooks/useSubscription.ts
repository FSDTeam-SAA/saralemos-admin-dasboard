import { useQuery } from "@tanstack/react-query";
import { subscriptionRevenue } from "../api/subscription";


export function useSubscriptionRevenue(){
return useQuery({
    queryKey:['singlesubscription',],
    queryFn:()=> subscriptionRevenue()
})
}
