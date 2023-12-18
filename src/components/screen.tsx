"use client";

import { useContext } from "react";
import { IData } from "./types";
import {
  Basket,
  Services,
  NumericInput,
  Button,
  Tooltips,
  ActiveButtons,
  StateContext,
} from "@/components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import {
  PinOutlined,
  MenuOutlined,
  PhoneOutlined,
  SearchOutlined,
  PaymentsOutlined,
  CreditCardOutlined,
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
                value={c._inputs[0].carNumber}
                onKeyDown={(event) => c.getClient(event)}
                InputProps={{
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
              onChange={(event) => {
                const value = event.target.value;
                if (value !== "" && !/^[0-9\s\+\-\(\)]+$/.test(value)) return;
                c.handleInput(event);
              }}
              value={c._inputs[0].phoneNumber}
              inputRef={c.inputRefPhoneNumber}
              onKeyDown={(event) =>
                event.key === "Enter" && c.inputRefCarmodel.current?.focus()
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              inputValue={c._carInput[0]}
              value={c._carModel[0] || null}
              options={Object.keys(data.prices).map((carModel) => carModel)}
              onInputChange={(event, inputValue) => c._carInput[1](inputValue)}
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
          <section className="flex gap-5 animate-fade-in text-3xl">
            <Tooltips description="Menu">
              <div>
                <Button
                  aria-label="menu"
                  className="bg-blue-500"
                  onClick={() => c._openMenu[1](!c._openMenu[0])}
                >
                  <MenuOutlined />
                </Button>
              </div>
            </Tooltips>
            <div className="hidden lg:flex gap-5 animate-fade-in">
              <ActiveButtons />
            </div>
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
        <footer className="bg-amber-200 flex gap-5 p-4 sm:p-6 justify-evenly items-center">
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
        </footer>
      </div>
      <Dialog
        open={c._showDialog[0]}
        onClose={c.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontFamily: "inherit" }}>
          Are you sure you want to submit this order?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span
              style={{ fontFamily: "var(--ubuntu-mono)" }}
              className="font-bold text-lg sm:text-xl grid"
            >
              <span>Car number : {c._inputs[0].carNumber}</span>
              <span>Car model &nbsp;: {c._carModel[0]}</span>
              <span>
                Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {c._inputs[0].total} ₩
              </span>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="gap-1.5 pb-4 px-6">
          <Button onClick={c.closeDialog} className="bg-rose-600">
            Cancel
          </Button>
          <Button onClick={c.sendData} className="bg-emerald-600" autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={c.closeSuccessMessage}
        open={c._showSuccessMessage[0]}
      >
        <Alert
          className="bg-emerald-600 animate-fade-left"
          onClose={c.closeSuccessMessage}
          severity="success"
          variant="filled"
          elevation={6}
        >
          <div>Order received with ID:</div>
          <div className="font-bold">{c._successMessage[0]}</div>
        </Alert>
      </Snackbar>
    </>
  );
}
