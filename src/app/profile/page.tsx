"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggler";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, BadgeX, Loader2Icon } from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Profile() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      router.push("/login");
    } catch (error: unknown) {
      console.log(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const [username, setUsername] = useState("nothing");
  const [email, setEmail] = useState("nothing");
  const [verified, setVerified] = useState(false);

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setUsername(response.data.user.username);
    setEmail(response.data.user.email);
    setVerified(response.data.user.isVerified);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const [loading, setLoading] = useState(false);
  const onVerify = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/send-verification");
      console.log(response);
      return toast.success(
        "Email has been sent successfully! Please check your mail."
      );
    } catch (error: unknown) {
      console.log(
        "Error : ",
        error instanceof Error ? error.message : "Unknown error"
      );
      return toast.error("Email couldn't be sent!");
    } finally {
      setLoading(false);
    }
  };

  const profilePictures = ["s", "sh", "sha", "shad", "shadc", "shadcn"];

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
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
      <div className="h-auto w-auto flex flex-col rounded-2xl border-4">
        {/* Dark Mode Toggler */}
        <div className="flex flex-col items-end p-2">
          <ModeToggle />
          <Avatar className="self-center h-50 w-50">
            <AvatarImage
              src={`https://github.com/${
                profilePictures[
                  Math.floor(Math.random() * profilePictures.length)
                ]
              }.png`}
            />
            <AvatarFallback className="text-2xl">
              {username.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {verified ? (
          <Badge className="bg-blue-500 text-white dark:bg-blue-600 self-center mt-2">
            <BadgeCheckIcon />
            Verified
          </Badge>
        ) : (
          <div className="flex flex-col self-center">
            <Badge className="self-center mt-2" variant="destructive">
              <BadgeX />
              Not Verified
            </Badge>
            <Toaster richColors />
            {loading ? (
              <Button size="sm" disabled className="self-center mt-2 w-25 h-10">
                <Loader2Icon className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                className="self-center mt-2 w-25 h-10"
                variant="outline"
                onClick={onVerify}
              >
                Verify Now
              </Button>
            )}
          </div>
        )}
        <h1 className="mt-5 flex self-center text-2xl mr-3 ml-3">
          Username : {username}
        </h1>
        <h1 className="mt-2 flex self-center text-2xl mr-3 ml-3">
          Email : {email}
        </h1>
        <Button
          onClick={logout}
          variant="destructive"
          className="w-50 flex self-center text-xl mt-7 mb-3"
        >
          Logout
        </Button>
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
