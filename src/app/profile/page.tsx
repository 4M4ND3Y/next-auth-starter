"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  return (
    <div>
      <h1>Profile Page</h1>
      <Button onClick={logout} variant="destructive">
        Logout
      </Button>
    </div>
  );
}
