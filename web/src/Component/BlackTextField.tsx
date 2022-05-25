import { Box, styled, TextField } from "@mui/material";

export const BlackTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#C9CE6A",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#C9CE6A",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "#C9CE6A",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C9CE6A",
    },
  },
});
