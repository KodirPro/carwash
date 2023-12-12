import { App } from "@/components";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}db`, {
    headers: {
      Authorization: `Basic ${Buffer.from("robot:MIG@1475963").toString("base64")}`,
    },
    next: { tags: ["data"] },
  });

  console.log("PAGE UPDATED");

  if (res.ok) {
    const data = await res.json();

    return <App data={data} />;
  }

  return <>Error data</>;
}
