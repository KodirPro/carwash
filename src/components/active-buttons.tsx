import React from "react";
import { Button, Tooltips } from ".";
import {
  DeleteOutline,
  LogoutOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";

export function ActiveButtons({
  clearInputs,
  sendData,
}: {
  clearInputs: Function;
  sendData: Function;
}) {
  return (
    <>
      <Tooltips description="Log Out">
        <div>
          <Button
            aria-label="sign-out"
            href="/api/auth/signout"
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
            onClick={() => clearInputs()}
            className="bg-rose-600"
          >
            <DeleteOutline />
          </Button>{" "}
        </div>
      </Tooltips>{" "}
      <Tooltips description="Send Data">
        <div>
          <Button
            aria-label="send"
            onClick={() => sendData()}
            className="bg-emerald-600"
          >
            <TaskAltOutlined />
          </Button>{" "}
        </div>
      </Tooltips>
    </>
  );
}
