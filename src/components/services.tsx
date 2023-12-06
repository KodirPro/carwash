"use client";

export function Services({ data }: { data: [{ [key: string]: any }] }) {
  const pick = (item: { [key: string]: any }) => {
    console.log(item);
  };

  return (
    <div className="h-[calc(100vh-20rem)] overflow-auto flex flex-wrap gap-10 p-10 bg-emerald-100 shadow-lg rounded-lg">
      {data.map((item) => (
        <div
          key={item.id}
          style={{ backgroundImage: `url('data:image/gif;base64,${item.foto.replaceAll("\r\n","")}')` }}
          className="h-40 w-40 rounded-lg shadow-lg bg-cover bg-center overflow-hidden"
        >
          <button
            onClick={() => pick(item)}
            className="h-full w-full flex flex-col justify-end items-start p-2 bg-gradient-to-b from-transparent from-50% to-black t0-60% text-white text-left"
          >
            <span className="line-clamp-1">{item.service}</span>
            <span className="line-clamp-1">{"0"}</span>
          </button>
        </div>
      ))}
    </div>
  );
 }
