import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

export const BlackButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "white",
  border: "1px solid black",
  paddingTop: 10,
  paddingBottom: 10,
  fontSize: "medium",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
  "&:disabled": {
    backgroundColor: "white",
    color: "lightgray",
  },
}));