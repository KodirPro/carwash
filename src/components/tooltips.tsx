"use client";

import * as React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: "0 0.25rem 0.5rem #0003",
    backgroundColor: "#fde68a",
    color: "inherit",
    maxWidth: 220,
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
      arrow
      placement="top"
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
