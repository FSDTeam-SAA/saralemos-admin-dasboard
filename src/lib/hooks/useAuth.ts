import { useMutation } from "@tanstack/react-query";
import { forgetPassword, sentOtp, resetPassword } from "../api/api";

export function  useForgetPassword(){
    return useMutation({
        mutationFn:(email:string)=>forgetPassword(email)
    })
}

export function  useSentOtp(){
    return useMutation({
        mutationFn:({otp,email}:{otp:string,email:string})=>sentOtp(otp,email)
    })
}


export function  useResetPassword(){
    return useMutation({
        mutationFn:({newPassword,email}:{newPassword:string,email:string})=>resetPassword(newPassword,email)
    })
}