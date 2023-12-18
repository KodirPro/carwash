import { App } from "@/components";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}db`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.NEXT_API_SECRET).toString(
        "base64",
      )}`,
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
