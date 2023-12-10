"use client";

import { Tooltips } from "@/components";
import { IData } from "./types";

export function Services({
  data,
  addOrder,
  carModel,
}: {
  data: IData;
  addOrder: Function;
  carModel: string | null;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,10rem)] place-content-start justify-evenly gap-5 p-5 sm:gap-10 sm:p-10 overflow-auto bg-slate-50 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
      {carModel
        ? Object.entries(data.prices[carModel]).map(([service, price]) => (
            <Tooltips
              key={service}
              description={data.services[service].description}
            >
              <button
                onClick={() =>
                  addOrder({ service, carModel, price, orderCount: 1 })
                }
                className="w-40 h-40 rounded-lg shadow-lg bg-cover bg-center overflow-hidden transition-transform duration-300 active:scale-95"
                style={{
                  backgroundImage: `url('data:image/gif;base64,${data.services[
                    service
                  ].image.replaceAll("\r\n", "")}')`,
                }}
              >
                <span className="h-full w-full flex flex-col justify-end items-start p-2 bg-gradient-to-b from-transparent from-50% to-black t0-60% text-white text-left text-lg font-medium">
                  <span className="line-clamp-1">{service}</span>
                  <span className="line-clamp-1">$ {price || 0}</span>
                </span>
              </button>
            </Tooltips>
          ))
        : Object.keys(data.services).map((service) => (
            <Tooltips
              key={service}
              description={
                <>
                  Please select one of the{" "}
                  <span className="font-bold">Car Model</span> first.
                </>
              }
            >
              <div
                style={{
                  backgroundImage: `url('data:image/gif;base64,${data.services[
                    service
                  ].image.replaceAll("\r\n", "")}')`,
                }}
                className="w-40 h-40 rounded-lg shadow-lg bg-cover bg-center overflow-hidden"
              >
                <button className="h-full w-full flex flex-col justify-end items-start p-2 bg-gradient-to-b from-transparent from-50% to-black t0-60% text-white text-left text-lg font-medium">
                  <span className="line-clamp-1">{service}</span>
                  <span className="line-clamp-1">$ 0</span>
                </button>
              </div>
            </Tooltips>
          ))}
    </div>
  );
}
