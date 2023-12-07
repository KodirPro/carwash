"use client";

import * as React from "react";
import { IModel } from "./types";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "inherit",
    maxWidth: 220,
    border: "1px solid #0003",
  },
}));

export function Services({
  modelList,
  basket,
  setBasket,
}: {
  modelList: IModel[];
  basket: IModel[];
  setBasket: Function;
}) {
  const pick = (item: IModel) => {
    setBasket([
      ...basket,
      {
        id: item.id,
        service: item.service,
        modelAuto: item.modelAuto,
        price: item.price,
      },
    ]);
  };

  return (
    <div className="h-full grid grid-cols-[repeat(auto-fill,10rem)] place-content-start justify-evenly gap-10 p-10 overflow-y-auto bg-slate-50">
      {modelList.map((item: IModel) => (
        <HtmlTooltip
          key={item.id}
          title={
            <React.Fragment>
              <Typography color="inherit">{item.description}</Typography>
            </React.Fragment>
          }
        >
          <div
            style={{
              backgroundImage: `url('data:image/gif;base64,${item.foto.replaceAll(
                "\r\n",
                ""
              )}')`,
            }}
            className="w-40 h-40 rounded-lg shadow-lg bg-cover bg-center overflow-hidden"
            // title={item.description}
          >
            <button
              onClick={() => pick(item)}
              className="h-full w-full flex flex-col justify-end items-start p-2 bg-gradient-to-b from-transparent from-50% to-black t0-60% text-white text-left text-lg font-medium"
            >
              <span className="line-clamp-1">{item.service}</span>
              <span className="line-clamp-1">$ {item.price || 0}</span>
            </button>
          </div>
        </HtmlTooltip>
      ))}
    </div>
  );
}
