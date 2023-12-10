import { Screen } from "@/components";
// import data from "./test.json";

export default async function Page() {
  const res = await fetch("http://localhost/kws/hs/database/db", {
    // http://localhost/kws/hs/database/car"
    headers: {
      Authorization:
        "Basic " + Buffer.from("Администратор" + ":" + "123").toString("base64"),
    },
  });

  if (res.ok) {
    const data = await res.json();

    console.log("===> Page Updated");
    return <Screen data={data} />;
    
  }
  return <>Error data</>;
}
