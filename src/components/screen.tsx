"use client";

import { useContext } from "react";
import { IData } from "./types";
import {
  Basket,
  Services,
  NumericInput,
  ActiveButtons,
  StateContext,
  Button,
  Tooltips,
} from "@/components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
  PinOutlined,
  PhoneOutlined,
  SearchOutlined,
  CommentOutlined,
  PaymentsOutlined,
  CreditCardOutlined,
  MenuOutlined,
} from "@mui/icons-material";

export function Screen({ data }: { data: IData }) {
  const c = useContext(StateContext);

  return (
    <>
      <div className="fixed inset-0 grid grid-rows-[min-content_auto_min-content] animate-fade-in">
        <header className="bg-sky-100 flex gap-5 p-4 sm:p-6 justify-between items-center shadow-md relative">
          <section className="grid h-16 pt-2 sm:h-auto overflow-y-auto sm:overflow-y-visible sm:grid-cols-3 gap-x-5 gap-y-8 items-top scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent animate-fade-in">
            <div className="relative">
              <TextField
                required
                name="carNumber"
                variant="outlined"
                label="Car Number"
                onChange={c.handleInput}
                placeholder="000저0000"
                value={c._inputs[0].carNumber || ""}
                onKeyDown={(event) => c.getClient(event)}
                InputProps={{
                  readOnly: c._newClient[0],
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <button
                className="absolute right-2 bottom-1/2 translate-y-1/2 flex justify-center items-center w-10 h-10 bg-sky-50 text-sky-600 hover:bg-sky-200 rounded p-1 shadow-md"
                onClick={(event) => c.getClient(event)}
                aria-label="add"
              >
                <SearchOutlined />
              </button>
              {c._newClient[0] && (
                <div className="absolute z-10 -top-2 sm:-top-2.5 right-2.5 py-0.5 sm:py-1 px-2 rounded shadow-md bg-emerald-500 text-white text-xs leading-none font-bold pointer-events-none animate-fade-in">
                  New Client
                </div>
              )}
            </div>
            <TextField
              name="phoneNumber"
              variant="outlined"
              label="Phone Number"
              placeholder="+___-____-____"
              inputRef={c.inputRefPhoneNumber}
              value={c._inputs[0].phoneNumber || ""}
              onChange={(event) => {
                const value = event.target.value;
                if (value !== "" && !/^[0-9\s\+\-\(\)]+$/.test(value)) return;
                c.handleInput(event);
              }}
              onKeyDown={(event) =>
                event.key === "Enter" && c.inputRefCarmodel.current?.focus()
              }
              InputProps={{
                disabled: !c._newClient[0],
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              disabled={!c._newClient[0]}
              inputValue={c._carModelInput[0]}
              value={c._carModel[0] || null}
              options={Object.keys(data.prices).map((carModel) => carModel)}
              onInputChange={(event, inputValue) =>
                c._carModelInput[1](inputValue)
              }
              onChange={(event: any, carValue: string | null) =>
                c.autoComplete(carValue)
              }
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Car Model"
                  inputRef={c.inputRefCarmodel}
                />
              )}
            />
          </section>
          <section className="flex gap-3.5 animate-fade-in text-3xl">
            <div className="hidden lg:flex gap-3.5 animate-fade-in">
              <ActiveButtons />
            </div>
            <Tooltips description="Menu">
              <div>
                <Button
                  square
                  aria-label="menu"
                  className="bg-blue-500"
                  onClick={() => c._openMenu[1](!c._openMenu[0])}
                >
                  <MenuOutlined />
                </Button>
              </div>
            </Tooltips>
          </section>
        </header>
        <main
          className="relative grid overflow-hidden transition-all duration-700"
          style={{
            gridTemplateColumns: c._openMenu[0] ? "auto 20rem" : "auto 0rem",
          }}
        >
          <Services data={data} />
          <Basket />
        </main>
        <footer className="bg-amber-200 grid grid-cols-2 sm:flex gap-5 p-4 sm:p-6 items-center">
          <NumericInput
            name="cash"
            label="Cash"
            value={c._inputs[0].cash}
            total={c._inputs[0].total}
            onChange={c.handleInput}
            icon={<PaymentsOutlined />}
          />
          <NumericInput
            name="card"
            label="Card"
            value={c._inputs[0].card}
            total={c._inputs[0].total}
            onChange={c.handleInput}
            icon={<CreditCardOutlined />}
          />
          <TextField
            fullWidth
            type="search"
            name="comment"
            label="Comment"
            placeholder="Abc..."
            variant="outlined"
            onChange={c.handleInput}
            className="col-span-2 w-full sm:max-w-md"
            value={c._inputs[0].comment || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CommentOutlined />
                </InputAdornment>
              ),
            }}
          />
        </footer>
      </div>
    </>
  );
}
