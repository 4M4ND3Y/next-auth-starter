"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ModeToggle } from "@/components/ui/mode-toggler";
import { Toaster, toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Successful!", response.data);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return toast.success("You have successfully signed up");
    } catch (error: unknown) {
      console.log(
        "Signup Failed!",
        error instanceof Error ? error.message : "Unknown error"
      );
      return toast.error("Registration unsuccessful!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <HoverCard>
        <HoverCardTrigger asChild>
          <h1 className="text-4xl mb-15">Next Auth Starter</h1>
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
      <div className="w-s flex flex-col border-4 border-b-amber-50 p-4">
        {/* Dark Mode Toggler */}
        <div className="flex flex-col items-end">
          <ModeToggle />
        </div>
        <h1 className="text-center text-3xl font-bold pb-5">Signup</h1>

        {/* Username */}
        <Label htmlFor="username" className="p-2">
          Username
        </Label>
        <Input
          type="username"
          placeholder="Username"
          className="mb-5"
          value={user.username}
          onChange={(event) =>
            setUser({ ...user, username: event.target.value })
          }
        />

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
          className="mb-5"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />

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
              onClick={onSignup}
              disabled={buttonDisabled}
              className="w-25"
            >
              Register
            </Button>
          )}

          <Link href="/login">
            <Button variant="ghost">Already registered? Login</Button>
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
