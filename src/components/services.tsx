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
    <div className="p-5 sm:p-10 overflow-auto bg-slate-50 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
      <div className="flex flex-wrap justify-evenly gap-5 sm:gap-10">
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
                  className="w-44 h-44 rounded-lg shadow-lg bg-cover bg-center overflow-hidden transition-transform duration-300 active:scale-95"
                  style={{
                    backgroundImage: `url('data:image/gif;base64,${data.services[
                      service
                    ].image.replaceAll("\r\n", "")}')`,
                  }}
                >
                  <div className="h-full w-full grid place-content-end justify-start p-2 bg-gradient-to-b from-transparent from-25% to-60% to-black/60 text-white text-left text-lg font-medium">
                    <div className="line-clamp-2 leading-tight">{service}</div>
                    <div className="line-clamp-1">
                      <span className="font-bold">₩</span> {price || 0}
                    </div>
                  </div>
                </button>
              </Tooltips>
            ))
          : Object.keys(data.services).map((service) => (
              <Tooltips
                key={service}
                description={
                  <>
                    Please select one of the{" "}
                    <div className="font-sans">Car Model</div> first.
                  </>
                }
              >
                <button
                  style={{
                    backgroundImage: `url('data:image/gif;base64,${data.services[
                      service
                    ].image.replaceAll("\r\n", "")}')`,
                  }}
                  className="w-44 h-44 rounded-lg shadow-lg bg-cover bg-center overflow-hidden"
                >
                  <div className="h-full w-full grid place-content-end justify-start p-2 bg-gradient-to-b from-transparent from-25% to-60% to-black/60 text-white text-left text-lg font-medium">
                    <div className="line-clamp-2 leading-tight">{service}</div>
                    <div className="line-clamp-1 w-full">
                      <span className="font-sans">₩</span> 0
                    </div>
                  </div>
                </button>
              </Tooltips>
            ))}
      </div>
    </div>
  );
}
