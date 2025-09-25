"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: unknown) {
      console.log(error);
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    }
  }, [router, token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <h1 className="text-4xl flex justify-center items-center h-screen">
      {verified ? "Email Verified" : "Email Not Verified"}
    </h1>
  );
}
