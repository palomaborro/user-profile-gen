import { UserForm } from "@/components/user-form";

export default function Home() {
  return (
    <main className="container max-w-lg m-auto flex flex-col min-h-screen">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-center">
          User profile generation
        </h1>
      </header>

      <div className="flex flex-col gap-y-2">
        <UserForm />
      </div>
    </main>
  );
}
