"use client";

import { Fragment, useContext, useState } from "react";
import { signOut } from "next-auth/react";
import { Button, StateContext, Tooltips } from ".";
import {
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  DeleteOutline,
  LogoutOutlined,
  HistoryOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";

export function ActiveButtons() {
  const c = useContext(StateContext);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  const closeHistoryDialog = () => {
    setShowHistoryDialog(false);
  };

  const logOut = () => {
    c.clearInputs();
    signOut();
  };

  return (
    <>
      <Tooltips description="History">
        <div>
          <Button
            square
            aria-label="history"
            className="bg-slate-500"
            onClick={() => setShowHistoryDialog(true)}
          >
            <HistoryOutlined />
          </Button>
        </div>
      </Tooltips>
      <Tooltips description="Log Out">
        <div>
          <Button
            square
            onClick={logOut}
            aria-label="log out"
            className="bg-amber-500"
          >
            <LogoutOutlined />
          </Button>
        </div>
      </Tooltips>
      <Tooltips description="Clear All">
        <div>
          <Button
            square
            aria-label="clear"
            onClick={c.clearInputs}
            className="bg-rose-600"
          >
            <DeleteOutline />
          </Button>
        </div>
      </Tooltips>
      <Tooltips description="Send Data">
        <div>
          <Button
            square
            aria-label="send"
            className="bg-emerald-600"
            onClick={() => {
              c._inputs[0].carNumber.trim() && c._inputs[0].total
                ? c._showSendDialog[1](true)
                : c._showWarningMessage[1](true);
            }}
          >
            <TaskAltOutlined />
          </Button>
        </div>
      </Tooltips>
      <Dialog
        open={c._showSendDialog[0]}
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
              className="font-bold text-lg sm:text-xl grid grid-cols-2"
            >
              <span className="w-32">Car number</span>
              <span>: {c._inputs[0].carNumber}</span>
              <span className="w-32">Car model</span>
              <span>: {c._carModel[0]}</span>
              <span className="w-32">Total</span>
              <span>: {c._inputs[0].total} ₩</span>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="gap-1.5 pb-4 px-6">
          <Button onClick={c.closeDialog} className="bg-slate-500">
            Cancel
          </Button>
          <Button onClick={c.sendData} className="bg-emerald-600" autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showHistoryDialog}
        onClose={closeHistoryDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontFamily: "inherit" }}>
          <span className="flex gap-2 justify-center items-center">
            <HistoryOutlined />
            <span>Client History</span>
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className="grid grid-cols-4 min-w-[20rem] w-full max-w-2xl h-screen max-h-[30rem] overflow-auto text-lg sm:text-xl scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
              <span className="sticky top-0 z-10 flex items-center h-12 pl-1.5 bg-blue-950 text-white font-medium border-e border-slate-500 rounded-s">
                1
              </span>
              <span className="sticky top-0 z-10 flex items-center h-12 pl-1.5 bg-blue-950 text-white font-medium border-e border-slate-500">
                1
              </span>
              <span className="sticky top-0 z-10 flex items-center h-12 pl-1.5 bg-blue-950 text-white font-medium border-e border-slate-500">
                1
              </span>
              <span className="sticky top-0 z-10 flex items-center h-12 pl-1.5 bg-blue-950 text-white font-medium border-e border-slate-500 rounded-e">
                1
              </span>
              {Array.from("0123456789asdasda").map((item, i) => (
                <Fragment key={i}>
                  <span className="flex items-center h-10 pl-1.5 border-b">
                    {item}
                  </span>
                  <span className="flex items-center h-10 pl-1.5 border-b">
                    {item}
                  </span>
                  <span className="flex items-center h-10 pl-1.5 border-b">
                    {item}
                  </span>
                  <span className="flex items-center h-10 pl-1.5 border-b">
                    {item}
                  </span>
                </Fragment>
              ))}
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="gap-1.5 pb-4 px-6">
          <Button onClick={closeHistoryDialog} className="bg-slate-500">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={c.closeWarningMessage}
        open={c._showWarningMessage[0]}
        autoHideDuration={5000}
      >
        <Alert
          className="bg-amber-300 animate-fade-left text-slate-700"
          onClose={c.closeWarningMessage}
          severity="warning"
          variant="filled"
          elevation={6}
        >
          <div
            style={{ fontFamily: "var(--ubuntu-mono)" }}
            className="font-bold text-xl grid grid-cols-2"
          >
            <div className="pr-2.5">Car Number</div>
            <div>
              :{" "}
              {c._inputs[0].carNumber.trim() || (
                <span className="text-rose-600">
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                </span>
              )}
            </div>
            <div className="pr-2.5">Car model</div>
            <div>
              :{" "}
              {c._carModel?.[0] || (
                <span className="text-rose-600">
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                </span>
              )}
            </div>
            <div className="pr-2.5">Car Service</div>
            <div>
              :{" "}
              {c._basket?.[0].length || (
                <span className="text-rose-600">
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                </span>
              )}
            </div>
          </div>
        </Alert>
      </Snackbar>
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
