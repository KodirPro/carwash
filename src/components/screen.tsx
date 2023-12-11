"use client";

import { useEffect, useRef, useState } from "react";
import { IData, IInputs, IOrder, IStoredData } from "./types";
import {
  Basket,
  Services,
  NumericInput,
  Button,
  Tooltips,
  ActiveButtons,
} from "@/components";
import { PatternFormat } from "react-number-format";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
  PinOutlined,
  PhoneOutlined,
  CreditCardOutlined,
  MenuOutlined,
  PaymentsOutlined,
} from "@mui/icons-material";

export function Screen({ data }: { data: IData }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newClient, setNewClient] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [carInput, setCarInput] = useState("");
  const [carModel, setCarModel] = useState<string | null>(null);
  const [basket, setBasket] = useState<IOrder[]>([]);
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState<IInputs>({
    phoneNumber: "",
    carNumber: "",
    total: 0,
    cash: 0,
    card: 0,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("storedData");

    if (storedData) {
      const data: IStoredData = JSON.parse(storedData);

      data.carModel && setCarModel(data.carModel);
      data.basket && setBasket(data.basket);
      data.inputs && setInputs(data.inputs);
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem(
        "storedData",
        JSON.stringify({ carModel, basket, inputs }),
      );
    };

    return () => {
      window.onbeforeunload = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carModel, basket, inputs]);

  const setWallet = () => {
    if (refreshing) return setRefreshing(false);

    const total = basket.reduce(
      (total, item) => total + item.price * item.orderCount,
      0,
    );

    if (total === 0) setInputs({ ...inputs, total, cash: 0, card: 0 });
    else setInputs({ ...inputs, total, cash: total - +inputs.card });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(setWallet, [basket]);

  const autoComplete = (carValue: string | null) => {
    setCarModel(carValue);
    setBasket([]);
  };

  const addOrder = (newOrder: IOrder) => {
    for (const order of basket) {
      if (order.service === newOrder.service) {
        order.orderCount++;

        return setBasket([...basket]);
      }
    }

    setBasket([...basket, newOrder]);
  };

  const removeOrder = (newOrder: IOrder) => {
    for (const order of basket) {
      if (order.service === newOrder.service && order.orderCount > 1) {
        order.orderCount--;

        return setBasket([...basket]);
      }
    }

    setBasket(basket.filter((order) => order.service !== newOrder.service));
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    separator = "",
  ) => {
    const input = event.target.name;
    const value = event.target.value;

    if (input === "cash") {
      const cash = +value.replaceAll(separator, "");

      setInputs({ ...inputs, cash, card: inputs.total - cash });
    } else if (input === "card") {
      const card = +value.replaceAll(separator, "");

      setInputs({ ...inputs, cash: inputs.total - card, card });
    } else setInputs({ ...inputs, [input]: value });
  };

  const clearInputs = () => {
    localStorage.removeItem("storedData");
    setBasket([]);
    setNewClient(false);
    setCarModel(null);
    setCarInput("");
    setInputs({
      phoneNumber: "",
      carNumber: "",
      total: 0,
      cash: 0,
      card: 0,
    });
  };

  const sendData = async () => {
    if (!inputs.total) return;

    const res = await fetch("api/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        link: `${process.env.NEXT_PUBLIC_API_URL}ds`,
        ...inputs,
        carModel,
        basket,
      }),
    });

    if (res.ok) clearInputs();
    else console.log("ERROR");
  };

  const getClient = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" || !inputs.carNumber) return;

    const res = await fetch("api/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        link: `${process.env.NEXT_PUBLIC_API_URL}car`,
        carNumber: inputs.carNumber,
      }),
    });

    if (res.ok) {
      const data = await res.json();

      setCarModel(data.carModel);
      setCarInput(data.carModel);
      setInputs({ ...inputs, phoneNumber: data.phoneNumber });
    } else {
      setNewClient(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 grid grid-rows-[min-content_auto_min-content] animate-fade-in">
      <header className="bg-sky-100 flex gap-5 p-6 justify-between items-center shadow-md relative">
        <section className="grid h-16 pt-2 sm:h-auto overflow-y-auto sm:overflow-y-visible sm:grid-cols-3 gap-x-5 gap-y-8 items-top scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent animate-fade-in">
          <div className="relative">
            <TextField
              required
              type="search"
              name="carNumber"
              variant="outlined"
              label="Car Number"
              onChange={handleInput}
              value={inputs.carNumber}
              onKeyDown={(event) => getClient(event)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PinOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {newClient && (
              <div className="absolute -top-2.5 right-2.5 py-1 px-2 rounded shadow-md bg-emerald-500 text-white text-xs leading-none font-bold animate-fade-in">
                New Client
              </div>
            )}
          </div>
          <PatternFormat
            mask="_"
            variant="outlined"
            name="phoneNumber"
            inputRef={inputRef}
            label="Phone Number"
            allowEmptyFormatting
            customInput={TextField}
            value={inputs.phoneNumber}
            // +82-1-234-56-78
            format="+82 (#) ###-##-##"
            onChange={(event) => {
              if (event.target.value === inputs.phoneNumber) return;
              handleInput(event);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlined />
                </InputAdornment>
              ),
            }}
          />
          <Autocomplete
            options={Object.keys(data.prices).map((carModel) => carModel)}
            value={carModel || null}
            inputValue={carInput}
            onInputChange={(event, inputValue) => setCarInput(inputValue)}
            onChange={(event: any, carValue: string | null) => {
              autoComplete(carValue);
            }}
            renderInput={(params) => (
              <TextField required {...params} label="Car Model" />
            )}
          />
        </section>
        <section className="flex gap-5 animate-fade-in text-3xl">
          <Tooltips description="Menu">
            <div>
              <Button
                aria-label="menu"
                className="bg-blue-500"
                onClick={() => setOpen(!open)}
              >
                <MenuOutlined />
              </Button>
            </div>
          </Tooltips>
          <div className="hidden lg:flex gap-5 animate-fade-in">
            <ActiveButtons clearInputs={clearInputs} sendData={sendData} />
          </div>
        </section>
      </header>
      <main
        className="relative grid overflow-hidden transition-all duration-500"
        style={{ gridTemplateColumns: open ? "auto 20rem" : "auto 0rem" }}
      >
        <Services data={data} carModel={carModel} addOrder={addOrder} />
        <Basket
          basket={basket}
          sendData={sendData}
          addOrder={addOrder}
          total={inputs.total}
          removeOrder={removeOrder}
          clearInputs={clearInputs}
        />
      </main>
      <footer className="bg-amber-200 flex gap-5 p-6 justify-evenly items-center">
        <NumericInput
          name="cash"
          label="Cash"
          value={inputs.cash}
          total={inputs.total}
          onChange={handleInput}
          icon={<PaymentsOutlined />}
        />
        <NumericInput
          name="card"
          label="Card"
          value={inputs.card}
          total={inputs.total}
          onChange={handleInput}
          icon={<CreditCardOutlined />}
        />
      </footer>
    </div>
  );
}
