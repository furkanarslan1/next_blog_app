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
          " font-bold px-4 py-2 border-1 border-white rounded-2xl w-30 text-center",
          segment === null &&
            "bg-white rounded-2xl  text-black shadow-white shadow-2xl"
        )}
      >
        Profile
      </Link>

      <Link
        href={`/profile/${username}/user-options`}
        className={clsx(
          "font-bold px-4 py-2 border-1 border-white rounded-2xl w-30 text-center",
          segment === "user-options" &&
            "bg-white rounded-2xl  text-black shadow-white shadow-2xl"
        )}
      >
        Options
      </Link>
    </header>
  );
}
