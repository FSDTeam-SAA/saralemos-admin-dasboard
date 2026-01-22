"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { useForgetPassword } from "@/lib/hooks/useAuth";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgetPassword();
  const router = useRouter();

  const handleSendCode = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    mutate(email, {
      onSuccess: (data) => {
        toast.success(data.message || "OTP sent to your email. Please check.");
        localStorage.setItem("resetEmail", email);
        router.push(`/verify-otp`);
      },
      onError: (error) => {
        console.log('error',error)
        toast.error(error.message || "Failed to send OTP. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg px-8 py-10"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-[#65A30D] text-center"
        >
          Reset Your Password
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[#6C757D] mt-1 text-sm text-center"
        >
          Enter your email address and we’ll send you code to reset your
          password.
        </motion.p>

        {/* Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="mt-6 space-y-4"
        >
          {/* Email Input */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Label htmlFor="email">Email Address</Label>

            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                id="email"
                type="email"
                className="pl-10 h-10"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
              />
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button
              onClick={handleSendCode}
              disabled={isPending}
              className="w-full bg-[#65A30D] hover:bg-[#54870b] text-white h-11 text-base font-medium transition flex justify-center items-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending...
                </>
              ) : (
                "Send Code"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
