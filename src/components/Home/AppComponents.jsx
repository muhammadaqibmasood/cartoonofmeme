import { Alert, Box, Select, Snackbar, TextField, styled } from "@mui/material";
import { Button } from "@mui/material";

export function ToastNotify({ alertState, setAlertState }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertState.open}
      autoHideDuration={10000}
      key={"top center"}
      onClose={() => setAlertState({ ...alertState, open: false })}
    >
      <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        severity={alertState.severity}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}
export const CustomizedSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  borderRadius: "35px",
  backgroundColor: "#F4F5F7",
  color: "#000 !important",
  "& .MuiSelect-select": {
    borderRadius: "35px",
    height: "18px",
    paddingLeft: "15px",
    display: "flex",
    alignItems: "center",
  },
  "&:focus": {
    borderRadius: "35px",
    backgroundColor: "#F4F5F7",
    color: "#000 !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiSelect-icon": {
    color: "#000", // to make the dropdown arrow match your color theme
  },
}));
export function StyledButton({ children, ...props }) {
  return (
    <>
      <Button
        {...props}
        sx={{
          color: "#fff",
          background: "rgba(43, 65, 29, 1)",
          fontSize: "22px",
          fontFamily: '"Black Ops One", system-ui',
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          textTransform: "capitalize",
          borderRadius: "12px",
          fontWeight: "600",
          width: props.width,
          "&.Mui-disabled": {
            color: "#979EA7",
          },
          "&:hover": {
            background: "rgba(43, 65, 29, 0.9)",
          },
        }}
      >
        {children}
      </Button>
    </>
  );
}

export function StyledText({ children, ...props }) {
  return (
    <>
      <Box
        {...props}
        sx={{
          color: "#000000",
          fontSize: "20px",
          fontFamily: "Outfit",
          fontWeight: "600",
          mr: props.mr,
        }}
      >
        {children}
      </Box>
    </>
  );
}
export function StyledTitle({ children, ...props }) {
  return (
    <>
      <Box
        {...props}
        sx={{
          color: "#000000",
          fontSize: "28px",
          fontFamily: "Outfit",
          fontWeight: "600",
          mr: props.mr,
        }}
      >
        {children}
      </Box>
    </>
  );
}

export const StyledInput = ({ color, borderColor, ...props }) => {
  return (
    <TextField
      {...props}
      sx={{
        background: "#0F101E",
        borderRadius: "14px",
        border: `2px solid ${borderColor}`,
        width: "100%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          pr: 0.6,
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },

        input: {
          "&::placeholder": {
            color: "#66656D !important",
            opacity: 1,
          },
          color: `${color}`,
          paddingTop: "16px",
          paddingBottom: "16px",

          fontSize: "20px",
          fontWeight: "600",
          fontFamily: "Outfit",
          lineHeight: "32px",
        },
      }}
    />
  );
};

export function StyledSelect({ children, ...props }) {
  return (
    <>
      <Select
        {...props}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: "#514e57",
              mt: 0.5,
              borderRadius: "10px",
              "& .MuiMenuItem-root": {
                color: "#ffffff",
                fontFamily: "Outfit",
                mt: 1,
                fontWeight: "600",
                forntSize: "20px",
              },
            },
          },
        }}
        sx={{
          background:
            "linear-gradient(92.51deg, #68bcbb 0.48%, #68bcbb 50.74%, #68bcbb 100%)",
          color: "#131315",
          borderRadius: "12px",
          height: "50px",
          fontFamily: "Outfit",
          fontWeight: "600",
          forntSize: "20px",
          padding: "25px 0",
          ".MuiSvgIcon-root ": {
            fill: "#0F101E !important",
          },
          ".MuiSelect-select": {
            display: "flex",
            alignItems: "center",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        {children}
      </Select>
    </>
  );
}
