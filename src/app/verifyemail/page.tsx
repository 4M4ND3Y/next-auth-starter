"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <h1 className="text-4xl flex justify-center items-center h-screen">
      {verified ? "Email Verified" : "Email Not Verified"}
    </h1>
  );
}
