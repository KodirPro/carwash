"use client";

import { useEffect, useState } from "react";
import { IData, IInputs, IOrder, IStoredData } from "./types";
import { Basket, Services, NumericInput, Button, Tooltips } from "@/components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
  PinOutlined,
  PhoneOutlined,
  CreditCardOutlined,
  MonetizationOnOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { PatternFormat } from "react-number-format";
import { ActiveButtons } from "./active-buttons";

export function Screen({ data }: { data: IData }) {
  const [isRefreshing, setIsRefreshing] = useState(true);
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
    if (isRefreshing) return setIsRefreshing(false);

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
    setBasket([]);
    localStorage.removeItem("storedData");
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
// 
    // const res = await fetch("http://localhost/kws/hs/database/ds", {
      // headers: { Authorization: "Bearer " + "session.accessToken" },
      // cache: "no-store",
    // });

    // const data = await res.json();

    console.log({ carModel, basket, ...inputs });
    clearInputs();
  };

  return (
    <div className="fixed inset-0 grid grid-rows-[min-content_auto_min-content] animate-fade-in">
      <header className="bg-sky-100 flex gap-5 p-6 justify-between items-center shadow-md relative">
        <section className="grid h-16 pt-2 sm:h-auto overflow-y-auto sm:grid-cols-3 gap-5 items-center scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent animate-fade-in">
          <TextField
            required
            type="search"
            name="carNumber"
            variant="outlined"
            label="Car Number"
            onChange={handleInput}
            value={inputs.carNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PinOutlined />
                </InputAdornment>
              ),
            }}
          />
          <PatternFormat
            mask="_"
            variant="outlined"
            name="phoneNumber"
            label="Phone Number"
            allowEmptyFormatting
            onChange={(event) => {
              if (event.target.value === inputs.phoneNumber) return;
              handleInput(event);
            }}
            customInput={TextField}
            value={inputs.phoneNumber}
            format="+82 (###) #### ###"
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
            onChange={(event: any, carValue: string | null) => {
              autoComplete(carValue);
            }}
            inputValue={carInput}
            onInputChange={(event, inputValue) => setCarInput(inputValue)}
            renderInput={(params) => (
              <TextField {...params} label="Car Model" />
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
          icon={<MonetizationOnOutlined />}
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
