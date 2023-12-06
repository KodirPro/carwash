import { Services } from "@/components";

export default async function FetcStatic() {
  const res = await fetch("http://localhost/kws/hs/Database/DB", {
    headers: {
      Authorization:
        "Basic " + Buffer.from("Администратор" + ":" + "").toString("base64"),
    },
  });

  const data = await res.json();

  return (
    <div className="p-5">
      <div className="flex justify-between items-center p-10"></div>
      <Services data={data} />
    </div>
  );
}
