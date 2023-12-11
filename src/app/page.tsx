import { Screen } from "@/components";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}db`, {
    headers: {
      Authorization:
        "Basic " + Buffer.from("asd" + ":" + "asd").toString("base64"),
    },
  });

  if (res.ok) {
    const data = await res.json();

    return <Screen data={data} />;
  }

  return <>Error data</>;
}
