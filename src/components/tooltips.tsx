"use client";

import * as React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "inherit",
    maxWidth: 220,
    border: "1px solid #0003",
  },
}));

export function Tooltips({
  children,
  description,
}: {
  children: React.ReactElement;
  description: React.ReactNode | string;
}) {
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography color="inherit">{description}</Typography>
        </React.Fragment>
      }
    >
      {children}
    </HtmlTooltip>
  );
}
