"use client";

import { StateContext, Tooltips } from "@/components";
import { IData } from "./types";
import { useContext } from "react";

export function Services({ data }: { data: IData }) {
  const c = useContext(StateContext);

  return (
    <div className="py-8 overflow-x-hidden overflow-y-auto bg-slate-50 transition-all duration-700 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
      <div className="px-5 sm:px-8 flex flex-wrap justify-center gap-8 sm:gap-10 min-w-[20rem]">
        {c._carModel[0] && data.prices[c._carModel[0]]
          ? Object.entries(data.prices[c._carModel[0]]).map(
              ([service, price]) => (
                <Tooltips
                  key={service}
                  description={data.services[service].description}
                >
                  <button
                    onClick={() =>
                      c.addOrder({ service, price, orderCount: 1 })
                    }
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg shadow-lg bg-cover bg-center overflow-hidden transition-transform duration-300 active:scale-95"
                    style={{
                      backgroundImage: `url('data:image/gif;base64,${data.services[
                        service
                      ].image.replaceAll("\r\n", "")}')`,
                    }}
                  >
                    <div className="h-full w-full grid place-content-end justify-start p-2 bg-gradient-to-b from-transparent from-25% to-60% to-black/60 text-white text-left text-lg font-medium">
                      <div className="line-clamp-2 leading-tight">
                        {service}
                      </div>
                      <div className="line-clamp-1">₩ {price || 0}</div>
                    </div>
                  </button>
                </Tooltips>
              ),
            )
          : Object.keys(data.services).map((service) => (
              <Tooltips
                key={service}
                description={
                  <>
                    Please select one of the
                    <br />
                    <span className="font-sans">Car Model</span> first.
                  </>
                }
              >
                <button
                  style={{
                    backgroundImage: `url('data:image/gif;base64,${data.services[
                      service
                    ].image.replaceAll("\r\n", "")}')`,
                  }}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg shadow-lg bg-cover bg-center overflow-hidden"
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
