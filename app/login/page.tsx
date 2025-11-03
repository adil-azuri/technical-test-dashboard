"use client";
import { useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { Button, Form, Input, Flex, Checkbox } from "antd";

import { loginAndGetToken } from "@/app/firebase-auth/Firebase-auth";
import { useAuth } from "@/app/context/AuthContext";

import shopAnimation from "@/public/lottie/A small shop.json";

export default function Login() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/products");
    }
  }, [user, loading, router]);

  const onSubmit = async (values: any) => {
    try {
      const token = await loginAndGetToken(values.username, values.password);
      Cookies.set("auth_token", token, {
        expires: 1,
      });
      toast.success("Login successful! Redirecting to dashboard.");
    } catch (error: any) {
      //error handler with toast
      console.error(error);
      if (error.message.includes("auth/user-not-found")) {
        toast.error("User not found. Please check your email.");
      } else if (error.message.includes("auth/wrong-password")) {
        toast.error("Incorrect password. Please try again.");
      } else if (error.message.includes("auth/invalid-email")) {
        toast.error("Invalid email format.");
      } else {
        toast.error("Login failed: " + error.message);
      }
    }
  };

  if (loading || user) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{ minHeight: "100vh", fontSize: "24px" }}
      >
        <p>Verifying User session...</p>
      </Flex>
    );
  }

  return (
    <motion.div className="flex flex-col md:flex-row min-h-screen bg-white">
      <div className="w-full md:w-1/2 bg-amber-600 p-8 relative flex items-center justify-center order-first md:order-last">
        {/* Kolom kanan: Lottie image */}
        <div className="w-full max-w-md">
          <Lottie animationData={shopAnimation} loop={true} />
        </div>
      </div>
      {/* Kolom kiri: For */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md bg-white md:bg-transparent rounded-lg p-6 md:p-0"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome to Markhub!</h1>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  min: 5,
                  message: "Please input your Email at least 5 characters!",
                },
              ]}
              label={<span className="text-gray-500">Enter an Email</span>}
            >
              <Input
                placeholder="Enter your Email here"
                className="py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: "Please input your Password atleast 6 characters!",
                },
              ]}
              label={<span className="text-gray-500">Enter password</span>}
            >
              <Input.Password placeholder="Enter your password here" />
            </Form.Item>

            {/* ... (Remember me/Forgot password) */}
            <Form.Item noStyle>
              <Flex justify="space-between" align="center" className="mb-6">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-500">
                    <span className="ml-2 text-sm">Remember me</span>
                  </Checkbox>
                </Form.Item>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-amber-600"
                >
                  Forgot password?
                </Link>
              </Flex>
            </Form.Item>

            {/* ... (Login Button) */}
            <Form.Item noStyle>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="h-10 bg-amber-700 hover:bg-amber-800 border-none rounded-lg shadow-md text-white font-semibold"
                style={{ backgroundColor: "#4c9e4c", borderColor: "#4c9e9c" }}
              >
                Login
              </Button>
            </Form.Item>

            {/* ... (Don't have an account) */}
            <div className="text-center mt-6 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-amber-600 font-semibold hover:text-amber-700"
              >
                Get Started
              </Link>
            </div>
          </Form>
        </motion.div>
      </div>
    </motion.div>
  );
}
