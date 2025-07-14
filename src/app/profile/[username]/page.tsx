import { getUserFromToken } from "@/lib/aut";

import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserFromToken();

  if (!user || user.username !== params.username) {
    return redirect("/login");
  }

  return (
    <div className="space-y-6 border p-6 rounded-2xl w-fit lg:w-4xl mx-auto text-center">
      <h1 className="text-xl font-bold border-b-2 pb-2">User Profile</h1>
      {user.avatarUrl && (
        <div className="relative aspect-square w-40 mx-auto">
          <Image
            src={user.avatarUrl}
            alt={user.username}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover rounded-full"
          />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <p className="text-xl font-bold">First name: {user.firstName}</p>
        <p className="text-xl font-bold">Last name: {user.lastName}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}
