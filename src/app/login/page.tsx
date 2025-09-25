"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ModeToggle } from "@/components/ui/mode-toggler";
import { Toaster, toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful!", response.data);

      setTimeout(() => {
        router.push(`/profile`);
      }, 1000);

      return toast.success("You have successfully been logged in");
    } catch (error: any) {
      console.log("Login Failed!", error.message);
      return toast.error("Login unsuccessful!");
    } finally {
      setLoading(false);
    }
  };

  const [resetLoading, setResetLoading] = useState(false);
  const onReset = async () => {
    try {
      setResetLoading(true);
      await axios.post("/api/users/send-reset-email", user);
      return toast.success(
        "Email sent successfully! Please check your mail to reset your password."
      );
    } catch (error: any) {
      console.log(error.response.data);
      return toast.error("Mail to reset password couldn't be sent");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <HoverCard>
        <HoverCardTrigger asChild>
          <h1 className="text-4xl mb-20">Next Auth Starter</h1>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between gap-4">
            <Avatar>
              <AvatarImage src="/amandey.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@next-auth-starter</h4>
                <p className="text-sm">
                  A basic authentication system build with MongoDB in Next.js
                  created by{" "}
                  <Link
                    href="https://github.com/4M4ND3Y"
                    className="text-amber-300"
                  >
                    @4M4ND3Y
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className="w-xs flex flex-col border-4 border-b-amber-50 p-4">
        {/* Dark Mode Toggler */}
        <div className="flex flex-col items-end">
          <ModeToggle />
        </div>
        <h1 className="text-center text-3xl font-bold pb-5">Login</h1>

        {/* Email */}
        <Label htmlFor="email" className="p-2">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Email"
          className="mb-5"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />

        {/* Password */}
        <Label htmlFor="password" className="p-2">
          Password
        </Label>
        <Input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />
        {resetLoading ? (
          <Button className="w-25 flex self-end p-0" variant="link" disabled>
            <Loader2Icon className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                className="flex self-end p-0"
                style={{ fontSize: "10px" }}
                onClick={onReset}
              >
                Forgot Password?
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Please enter your email in the email input and then press forgot
                password to reset your password
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Button */}
        <div className="flex justify-center-safe">
          <Toaster richColors />
          {loading ? (
            <Button className="w-25" disabled>
              <Loader2Icon className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={onLogin}
              disabled={buttonDisabled}
              className="w-25"
            >
              Login
            </Button>
          )}
          <Link href="/signup">
            <Button variant="ghost">Not registered? Signup</Button>
          </Link>
        </div>
      </div>
      <h3 className="mt-10">
        Made with ❤️ by{" "}
        <Link href="https://github.com/4M4ND3Y" className="underline">
          Aman Dey
        </Link>
      </h3>
    </div>
  );
}
