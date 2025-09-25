"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggler";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function resetPasswordPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState({ password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetUserPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", { user, token });
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
      return toast.success("Password updated successfully");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return toast.error("Password couldn't be updated");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

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

        {/* Password */}
        <Label htmlFor="password" className="p-2">
          Enter New Password
        </Label>
        <Input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />

        {/* Button */}
        <div className="flex justify-center-safe">
          <Toaster richColors />
          {loading ? (
            <Button className="w-25 mt-5" disabled>
              <Loader2Icon className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={resetUserPassword}
              disabled={buttonDisabled}
              className="w-25 mt-5"
            >
              Submit
            </Button>
          )}
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
