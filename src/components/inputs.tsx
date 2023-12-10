"use client";

import { NumericFormat } from "react-number-format";
import { InputAdornment, TextField } from "@mui/material";
import { INumericInput } from "./types";

export const NumericInput = ({
  name,
  label,
  value,
  onChange,
  icon,
  total,
  separator = " ",
}: INumericInput) => {
  return (
    <NumericFormat
      name={name}
      label={label}
      value={value}
      readOnly={!total}
      fixedDecimalScale
      variant="outlined"
      allowNegative={false}
      customInput={TextField}
      thousandSeparator={separator}
      onChange={(event) => {
        if (+event.target.value.replaceAll(separator, "") === value) return;
        onChange(event, separator);
      }}
      isAllowed={(values) => {
        if (!values.value) return true;
        const { floatValue } = values;
        return (floatValue || 0) <= total;
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};

// decimalScale={2}
// defaultValue="12312"
// onValueChange={(values, sourceInfo) => {
//   console.log(values, sourceInfo);
// }}
