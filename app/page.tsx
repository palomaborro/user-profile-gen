import { UserForm } from "@/components/user-form";

export default function Home() {
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
