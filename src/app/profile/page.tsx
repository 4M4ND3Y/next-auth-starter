"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggler";

export default function Profile() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [username, setUsername] = useState("nothing");
  const [email, setEmail] = useState("nothing");

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setUsername(response.data.user.username);
    setEmail(response.data.user.email);
  };

  getUserDetails();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className="h-115 w-auto flex flex-col rounded-2xl border-2"
        style={{ backgroundColor: "#171717" }}
      >
        {/* Dark Mode Toggler */}
        <div className="flex flex-col items-end p-2">
          <ModeToggle />
          <Avatar className="self-center h-50 w-50">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <h1 className="mt-5 flex self-center text-2xl mr-3 ml-3">
          Username : {username}
        </h1>
        <h1 className="mt-2 flex self-center text-2xl mr-3 ml-3">
          Email : {email}
        </h1>
        <Button
          onClick={logout}
          variant="destructive"
          className="w-50 flex self-center text-xl mt-15"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
