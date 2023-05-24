"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage(
  {
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }) {

  const router = useRouter();
  const { data: session, status } = useSession();


  useEffect(() => {

    console.log(status);

    if (status !== "loading" && status !== "authenticated") {
      router.push("/signin");
    }

  }, [status]);

  return <h1>My Page</h1>;
}