import { redirect } from "next/navigation";

import { getSession } from "~/server/better-auth/server";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">
            Welcome, {session.user?.name}!
          </h2>
          <p className="text-gray-600">
            You are successfully logged in with {session.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
