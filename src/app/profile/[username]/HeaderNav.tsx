"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import clsx from "clsx";

interface Props {
  username: string;
}

export default function HeaderNav({ username }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <header className="flex flex-col items-start gap-4 mb-4 border-r-1 pr-5">
      <Link
        href={`/profile/${username}`}
        className={clsx(
          " font-bold px-4 py-2 border-1 border-white rounded-2xl w-30 text-center hover:opacity-80",
          segment === null &&
            "bg-white rounded-2xl  text-black shadow-white shadow-2xl"
        )}
      >
        Profile
      </Link>

      <Link
        href={`/profile/${username}/user-options`}
        className={clsx(
          "font-bold px-4 py-2 border-1 border-white rounded-2xl w-30 text-center hover:opacity-80",
          segment === "user-options" &&
            "bg-white rounded-2xl  text-black shadow-white shadow-2xl"
        )}
      >
        Options
      </Link>
      <Link
        href={`/profile/${username}/user-comments`}
        className={clsx(
          "font-bold px-4 py-2 border-1 border-white rounded-2xl w-30 text-center hover:opacity-80",
          segment === "user-comments" &&
            "bg-white rounded-2xl  text-black shadow-white shadow-2xl"
        )}
      >
        Comments
      </Link>
      <Link
        href={`/profile/${username}/user-likes`}
        className={clsx(
          "font-bold px-4 py-2 border-1 border-white rounded-2xl w-30 text-center hover:opacity-80",
          segment === "user-likes" &&
            "bg-white rounded-2xl  text-black shadow-white shadow-2xl"
        )}
      >
        Likes
      </Link>
    </header>
  );
}
