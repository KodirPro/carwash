"use client";

import { useRouter } from "next/navigation";

export function UpdateButton() {
  const router = useRouter();

  const updatePage = async () => {
    const res = await fetch("/api/update-page?secret=123");
    const data = await res.json();

    if (res.ok) router.refresh();

    console.log(data);
  };

  return (
    <button
      onClick={updatePage}
      className="px-5 py-2 bg-emerald-600 text-white font-bold text-2xl rounded-md hover:bg-emerald-700"
    >
      Update
    </button>
  );
}
