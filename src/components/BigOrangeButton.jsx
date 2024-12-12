import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
export default function BigOrangeButton(props) {
  let { children, loading, bgColor, hideIcon } = props;
  return (
    <LoadingButton
      endIcon={hideIcon ? null : <SendIcon />}
      loadingPosition="end"
      variant="contained"
      type="submit"
      loading={loading}
      sx={{
        fontWeight: 400,
        textTransform: "capitalize",
        backgroundColor: bgColor ? bgColor : "#F68800",
        color: "#ffffff",
        fontSize: "16px",
        fontFamily: "Lobster, sans-serif",
        borderRadius: "47px",

        boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
        "&:hover,&:disabled": {
          backgroundColor: bgColor ? bgColor : "#F88125a1",
        },
      }}
      disabled={loading}
      {...props}
    >
      {loading ? "Processing" : children}
    </LoadingButton>
  );
}
