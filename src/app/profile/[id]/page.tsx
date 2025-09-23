"use client";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const params = useParams();
  return (
    <div>
      <h1>Profile Page</h1>
      <Button variant="destructive">{params.id}</Button>
    </div>
  );
}
