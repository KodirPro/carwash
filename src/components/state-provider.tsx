"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { IHistory, IInputs, IOrder, IStoredData } from "./types";

export const StateContext = createContext<{ [key: string]: any }>({});

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const inputRefPhoneNumber = useRef<HTMLInputElement>(null);
  const inputRefCarmodel = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSendDialog, setshowSendDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [newClient, setNewClient] = useState(false);
  const [carModelInput, setCarModelInput] = useState("");
  const [carModel, setCarModel] = useState<string | null>(null);
  const [carHistory, setCarHistory] = useState<IHistory[]>([]);
  const [openMenu, setOpenMenu] = useState(true);
  const [basket, setBasket] = useState<IOrder[]>([]);
  const initialInputs: IInputs = {
    phoneNumber: "",
    carNumber: "",
    comment: "",
    total: 0,
    cash: 0,
    card: 0,
  };
  const [inputs, setInputs] = useState<IInputs>(initialInputs);

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
    setCarModelInput("");
    setCarModel(null);
    setCarHistory([]);
    setInputs(initialInputs);
  };

  const sendData = async () => {
    if (!inputs.carNumber.trim() || !inputs.total)
      return setShowWarningMessage(true);
    const res = await fetch("api/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        link: `${process.env.NEXT_PUBLIC_API_URL}ds`,
        method: "POST",
        ...inputs,
        carModel,
        basket,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setSuccessMessage(data.orderId);
      setShowSuccessMessage(true);
      closeDialog();
      clearInputs();
    } else console.log("ERROR");
  };

  const getClient = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!inputs.carNumber) return;

    if (event.type === "click") "pass";
    else if (event.key !== "Enter") return;

    const res = await fetch("api/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        link: `${process.env.NEXT_PUBLIC_API_URL}car`,
        carNumber: inputs.carNumber,
        method: "POST",
      }),
    });

    if (res.ok) {
      const data = await res.json();

      setNewClient(false);
      setCarModel(data.carModel);
      setCarModelInput(data.carModel);
      setCarHistory(data.history);
      setInputs({ ...inputs, phoneNumber: data.phoneNumber });
    } else if (res.status === 404) {
      clearInputs();
      setNewClient(true);
      setInputs({
        ...initialInputs,
        carNumber: inputs.carNumber,
      });
      setTimeout(() => inputRefPhoneNumber.current?.focus(), 500);
    } else console.log("Something went wrong!");
  };

  const closeSuccessMessage = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;

    setShowSuccessMessage(false);
  };

  const closeWarningMessage = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;

    setShowWarningMessage(false);
  };

  const closeDialog = () => {
    setshowSendDialog(false);
  };

  return (
    <StateContext.Provider
      value={{
        _showSuccessMessage: [showSuccessMessage, setShowSuccessMessage],
        _showWarningMessage: [showWarningMessage, setShowWarningMessage],
        _successMessage: [successMessage, setSuccessMessage],
        _showSendDialog: [showSendDialog, setshowSendDialog],
        _newClient: [newClient, setNewClient],
        _carModelInput: [carModelInput, setCarModelInput],
        _carModel: [carModel, setCarModel],
        _carHistory: [carHistory, setCarHistory],
        _openMenu: [openMenu, setOpenMenu],
        _basket: [basket, setBasket],
        _inputs: [inputs, setInputs],
        inputRefPhoneNumber,
        closeSuccessMessage,
        closeWarningMessage,
        inputRefCarmodel,
        autoComplete,
        removeOrder,
        handleInput,
        clearInputs,
        closeDialog,
        getClient,
        sendData,
        addOrder,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
