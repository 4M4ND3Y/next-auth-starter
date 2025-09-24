"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggler";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, BadgeX } from "lucide-react";

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

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-auto w-auto flex flex-col rounded-2xl border-4">
        {/* Dark Mode Toggler */}
        <div className="flex flex-col items-end p-2">
          <ModeToggle />
          <Avatar className="self-center h-50 w-50">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {verified ? (
          <Badge className="self-center mt-2">
            <BadgeCheckIcon />
            Verified
          </Badge>
        ) : (
          <div className="flex flex-col self-center">
            <Badge className="self-center mt-2" variant="destructive">
              <BadgeX />
              Not Verified
            </Badge>
            <Button className="self-center mt-2" variant="link">
              <Link href="/verifyemail">Verify Now</Link>
            </Button>
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
    </div>
  );
}
