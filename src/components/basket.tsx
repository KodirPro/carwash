"use client";

import { useContext } from "react";
import { ActiveButtons, StateContext } from "@/components";
import { IOrder } from "./types";
import {
  AddOutlined,
  RemoveOutlined,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";

export function Basket() {
  const c = useContext(StateContext);

  return (
    <div className="grid grid-rows-[min-content_auto_min-content] lg:grid-rows-[auto_min-content] min-w-[20rem] overflow-y-auto whitespace-nowrap bg-amber-50 shadow-lg">
      <section className="lg:hidden flex justify-evenly py-1 animate-fade-in text-3xl ">
        <ActiveButtons />
      </section>
      <section className="overflow-auto bg-white shadow-md scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-950 sticky top-0 z-10 text-white sm:text-lg text-center font-medium">
              <th className="pl-3 py-2.5 text-left">Service</th>
              <th className="px-0 py-2.5">Price</th>
              <th className="py-2.5">Count</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {c._basket[0].map((order: IOrder) => (
              <tr
                key={order.service}
                className="even:bg-blue-50 last:shadow-md text-center"
              >
                <td className="px-2 py-2.5 text-left overflow-hidden max-w-[160px] text-ellipsis">
                  {order.service}
                </td>
                <td className="px-2 py-2.5">
                  {order.price * order.orderCount}
                </td>
                <td className="px-2 py-2.5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="flex justify-center items-center w-8 h-8 bg-rose-50 text-rose-600 hover:bg-rose-200 rounded shadow-md"
                      onClick={() => c.removeOrder(order)}
                      aria-label="remove"
                    >
                      <RemoveOutlined />
                    </button>
                    <span>{order.orderCount}</span>
                    <button
                      className="flex justify-center items-center w-8 h-8 bg-emerald-50 text-emerald-600 hover:bg-emerald-200 rounded p-1 shadow-md"
                      onClick={() => c.addOrder(order)}
                      aria-label="add"
                    >
                      <AddOutlined />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="grid gap-1 p-4 pt-2 sm:p-8 sm:pt-5 text-slate-600 text-xl">
        <div className="font-medium px-2">Total:</div>
        <div className="p-3.5 font-medium bg-emerald-50 rounded-md shadow-md">
          <AccountBalanceWalletOutlined className="text-slate-500" />{" "}
          <span className="font-bold text-2xl pl-1 align-middle">
            {c._inputs[0].total}
          </span>
        </div>
      </section>
    </div>
  );
}
