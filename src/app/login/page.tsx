"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Particle animation for background
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "login-particles";
    canvas.className = "absolute inset-0 pointer-events-none";
    const container = document.querySelector(".login-container");
    if (container) {
      container.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 49, 254, 0.15)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) container.removeChild(canvas);
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (res.ok) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      const body = await res.json();
      setError(body?.message || "Login failed");
    }
  }

  return (
    <div className="login-container relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1b26] to-[#24283b]">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#6431FE] rounded-full filter blur-3xl opacity-10"
      ></motion.div>

      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#B696FF] rounded-full filter blur-3xl opacity-10"
      ></motion.div>

      {/* Glowing Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[#6431FE]/5 animate-spin-slow"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full border border-[#B696FF]/5 animate-spin-slower"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
        }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="relative bg-gradient-to-br from-[#1a1b26]/80 to-[#24283b]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-[#6431FE]/5 p-8 md:p-10">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6431FE] to-[#B696FF] flex items-center justify-center shadow-lg shadow-[#6431FE]/20 mb-4"
            >
              <FiShield className="text-white text-3xl" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400"
              >
                <FiCheckCircle className="text-green-400" />
                <span className="text-sm">
                  Login successful! Redirecting...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400"
              >
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500 group-focus-within:text-[#6431FE] transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 focus:border-[#6431FE] transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6431FE]/0 via-[#6431FE]/5 to-[#B696FF]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500 group-focus-within:text-[#6431FE] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 focus:border-[#6431FE] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6431FE]/0 via-[#B696FF]/5 to-[#6431FE]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-[#6431FE] transition-colors duration-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || isSuccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
                isLoading || isSuccess
                  ? "bg-gradient-to-r from-[#6431FE]/50 to-[#B696FF]/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#6431FE] to-[#B696FF] hover:shadow-lg hover:shadow-[#6431FE]/30"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </>
                ) : isSuccess ? (
                  <>
                    <FiCheckCircle className="text-white" />
                    Success!
                  </>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Protected by{" "}
              <span className="text-[#6431FE]">⚡ Secure Authentication</span>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-[#6431FE]/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-[#B696FF]/5 rounded-full blur-2xl"></div>
        </div>
      </motion.div>
    </div>
  );
}
