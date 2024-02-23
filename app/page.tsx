"use client"
import { UserForm } from "@/components/user-form";
import { useSession } from "next-auth/react";

export default function Home() {

  const { status, data: session } = useSession()


  if (status !== "authenticated") {
    return <h1>Unauthorized</h1>
  }


  console.log({ user: session.user })

  return (
    <main className="container max-w-[80%] m-auto flex flex-col min-h-screen">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-center">
          User profile generation
        </h1>
      </header>
      <UserForm />
    </main>
  );
}
