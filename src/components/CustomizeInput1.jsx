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
    borderBottomColor: "#26D88B",
    outline: "none",
  },
  "& .MuiOutlinedInput-root": {
    boxShadow: "none",
    color: "#666666",
    fontSize: "18px",
    fontFamily: "poppins",
    fontWeight: "600",
    backgroundColor: "#E9FFF5",
    border: "1px solid #26D88B",
    borderRadius: "10px",
    "& fieldset": {
      border: "none",
      outline: "none",
      borderColor: "#26D88B",
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
