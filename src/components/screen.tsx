"use client";

import { redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { IModel, IService } from "./types";
import { Basket, Services, Button } from "@/components";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
  CreditCardOutlined,
  MonetizationOnOutlined,
  PhoneOutlined,
  PinOutlined,
} from "@mui/icons-material";

export function Screen({
  data,
  emptyModelList,
}: {
  data: IService[];
  emptyModelList: IModel[];
}) {
  const { data: session } = useSession();
  const [basket, setBasket] = useState<IModel[]>([]);
  const [modelList, setModelList] = useState<IModel[]>(emptyModelList);
  
  if (!session) return redirect("/api/auth/signin");

  const autoComplete = ({ target }: React.SyntheticEvent<Element, Event>) => {
    const tag = target as HTMLElement;
    const modelAuto = tag.innerText;

    if (modelAuto)
      setModelList(
        data.map((item) => ({
          id: item.id,
          service: item.service,
          description: item.description,
          foto: item.foto,
          ...item.dataPrice.filter((model) => model.modelAuto == modelAuto)[0],
        }))
      );
    else setModelList(emptyModelList);
  };

  return (
    <div className="max-h-screen h-screen flex flex-col">
      <header className="h-28 bg-sky-100 flex justify-between items-center gap-5 px-5 shadow-md relative">
        <section className="grid grid-cols-3 gap-5 items-center">
          <TextField
            label="Auto Number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PinOutlined />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlined />
                </InputAdornment>
              ),
            }}
          />
          <Autocomplete
            onChange={(e) => autoComplete(e)}
            options={data[0].dataPrice.map(({ modelAuto }) => modelAuto)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Auto models"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </section>
        <section className="grid gap-2">
          <div className="capitalize text-center p-1 font-medium bg-white rounded shadow-md">
            {session?.user?.name}
          </div>
          <div className="flex gap-5">
            <Button onClick={() => ""} className="bg-emerald-600">
              OK
            </Button>
            <Button onClick={() => signOut()} className="bg-rose-600">
              Logout
            </Button>
          </div>
        </section>
      </header>
      <main className="max-h-[calc(100%-14rem)] grow grid grid-cols-[auto_20rem]">
        <Services modelList={modelList} setBasket={setBasket} basket={basket} />
        <Basket basket={basket} />
      </main>
      <footer className="h-28 bg-amber-200 flex gap-5 px-5 items-center justify-evenly">
        <TextField
          label="Cash"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOnOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Card"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCardOutlined />
              </InputAdornment>
            ),
          }}
        />
      </footer>
    </div>
  );
}
