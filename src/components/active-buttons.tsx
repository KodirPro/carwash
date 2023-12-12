"use client";

import { useContext, useState } from "react";
import { signOut } from "next-auth/react";
import { Button, StateContext, Tooltips } from ".";
import {
  DeleteOutline,
  LogoutOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";

export function ActiveButtons() {
  const c = useContext(StateContext);

  const logOut = () => {
    c.clearInputs();
    signOut();
  };

  return (
    <>
      <Tooltips description="Log Out">
        <div>
          <Button
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
            aria-label="send"
            className="bg-emerald-600"
            onClick={() => {
              c._inputs[0].carNumber.trim() && c._inputs[0].total
                ? c._showDialog[1](true)
                : c._showWarningMessage[1](true);
            }}
          >
            <TaskAltOutlined />
          </Button>
        </div>
      </Tooltips>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={c.closeWarningMessage}
        open={c._showWarningMessage[0]}
        autoHideDuration={5000}
      >
        <Alert
          className="bg-amber-500 animate-fade-left"
          onClose={c.closeWarningMessage}
          severity="warning"
          variant="filled"
          elevation={6}
        >
          <pre
            style={{ fontFamily: "var(--ubuntu-mono)" }}
            className="font-bold text-xl"
          >
            <div>
              Car Number &nbsp;:{" "}
              {c._inputs[0].carNumber.trim() || (
                <span className="text-rose-600">
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                </span>
              )}
            </div>
            <div>
              Car model &nbsp;&nbsp;:{" "}
              {c._carModel?.[0] || (
                <span className="text-rose-600">
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                  <QuestionMarkOutlinedIcon />
                </span>
              )}
            </div>
            <div>
              Car Service :{" "}
              <span className="text-rose-600">
                <QuestionMarkOutlinedIcon />
                <QuestionMarkOutlinedIcon />
                <QuestionMarkOutlinedIcon />
              </span>
            </div>
          </pre>
        </Alert>
      </Snackbar>
    </>
  );
}
