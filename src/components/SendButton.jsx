import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
export default function SendButton(props) {
  let { children, loading, bgColor, hideIcon } = props;
  return (
    <LoadingButton
      //   endIcon={hideIcon ? null : <SendIcon />}
      loadingPosition="end"
      variant="contained"
      type="submit"
      loading={loading}
      sx={{
        width: "200px",
        textTransform: "capitalize",
        backgroundColor: bgColor ? bgColor : "#26D88B",
        color: "#ffffff",
        fontFamily: "poppins",
        fontSize: "20px",
        marginRight: "-15px",
        // fontFamily: "Lobster, sans-serif",
        borderRadius: "10px",
        py: "13px",
        fontWeight: "500",

        // boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
        "&:hover,&:disabled": {
          backgroundColor: bgColor ? bgColor : "#1fb876",
        },
      }}
      disabled={loading}
      {...props}
    >
      {loading ? "Processing" : children}
    </LoadingButton>
  );
}
