import { TextField, styled } from "@mui/material";

export const CustomizeInput = styled(TextField)(({ theme }) => ({
  border: "none",
  outline: "none",
  width: "100%",
  "& label.Mui-focused": {
    color: "white",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& label": {
    color: "white",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& .MuiInput-underline:after": {
    border: "none",
    borderBottomColor: "#828282",
    outline: "none",
  },
  "& .MuiOutlinedInput-root": {
    boxShadow: "none",
    color: "#fff",
    backgroundColor: "#301B00",
    "& fieldset": {
      border: "none",
      outline: "none",
      borderColor: "none !important",
    },
    "&:hover fieldset": {
      border: "none",
      //  borderColor: "#828282",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        // borderColor: "#828282",
      },
    },
  },
}));
export const CustomizeContactInput = styled(TextField)(({ theme }) => ({
  // border: "none",
  // outline: "none",
  width: "100%",
  "& label.Mui-focused": {
    color: "white",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& label": {
    color: "black",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& .MuiInput-underline:after": {
    border: "none",
    borderBottomColor: "#828282",
    outline: "none",
  },
  "& .MuiOutlinedInput-root": {
    boxShadow: "none",
    color: "black",
    backgroundColor: "white",
    "& fieldset": {
      border: "none",
      outline: "none",
      borderColor: "none !important",
    },
    "&:hover fieldset": {
      border: "none",
      //  borderColor: "#828282",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        // borderColor: "#828282",
      },
    },
  },
}));
