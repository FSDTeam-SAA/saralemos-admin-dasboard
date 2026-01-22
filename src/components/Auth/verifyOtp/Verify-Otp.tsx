"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSentOtp } from "@/lib/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { mutate, isPending } = useSentOtp();
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      toast.error("Session expired. Please try resetting your password again.");
      router.push("/forget-password");
      return;
    }

    mutate(
      { otp: otpCode, email },
      {
        onSuccess: (data) => {
          toast.success(data.message || "OTP verified successfully!");
          router.push("/reset-password");
        },
        onError: (error) => {
          toast.error(error.message || "Invalid OTP. Please try again.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-md p-10"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold text-[#65A30D] mb-2 text-center"
        >
          Verify Your Account
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[#6C757D] mb-6 text-center"
        >
          Enter the 6-digit code sent to your email to continue.
        </motion.p>

        {/* OTP Inputs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="flex items-center gap-3 justify-center mb-8"
        >
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              className={`w-14 h-14 text-2xl text-center border rounded-lg outline-none transition
                ${
                  digit
                    ? "border-[#65A30D] text-[#65A30D]"
                    : "border-gray-300 text-gray-700 focus:border-[#65A30D]"
                }`}
            />
          ))}
        </motion.div>

        {/* Verify Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleVerify}
            disabled={isPending}
            className="w-full bg-[#65A30D] hover:bg-[#54870b] text-white h-12 text-lg font-medium transition flex justify-center items-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
