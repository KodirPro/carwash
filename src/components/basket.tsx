"use client";

import { IModel } from "./types";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  //   fontSize: "1rem",
  // },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: "1rem",
  // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function Basket({ basket }: { basket: IModel[] }) {
  return (
    <div className="h-full overflow-y-auto bg-amber-50 shadow-lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="customized table">
          <TableHead className="bg-blue-950">
            <TableRow>
              <StyledTableCell className="text-white text-lg">Service</StyledTableCell>
              <StyledTableCell className="text-white text-lg">Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.service}
                </StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
