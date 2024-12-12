import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { CustomizeContactInput } from "../CustomizeInput";
import BigOrangeButton from "../BigOrangeButton";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import XIcon from "@mui/icons-material/X";
import { motion } from "framer-motion";
import TelegramIcon from "@mui/icons-material/Telegram";
import emailjs from "@emailjs/browser";
import NotificationModal from "../NotificationModal/NotificationModal";
const LandingPageFour = () => {
  const [textCopied, setTextCopied] = useState(false);
  const [loading, setloading] = useState(false);
  const form = useRef();
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const sendEmail = (e) => {
    e.preventDefault();
    setloading(true);
    emailjs
      .sendForm("service_7m860rq", "template_a0x3fql", form.current, {
        publicKey: "RDW4aiJBoX9_3ipnl",
      })
      .then(
        () => {
          setloading(false);
          setnotificationProps({
            modal: true,
            message: "Message successfuly sent.",
            error: false,
          });
        },
        (error) => {
          setloading(false);
          setnotificationProps({
            modal: true,
            message: error.text,
            error: true,
          });
        }
      );
  };
  return (
    <>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Box
        sx={{
          background: "#F68800",
          pb: 3,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              backgroundColor: "#301B00",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <Box>
              <motion.div
                initial={{ scaleX: 0.5, opacity: 0.3, scaleY: 0.5 }}
                whileInView={{ scaleX: 0.9, opacity: 1, scaleY: 0.9 }}
                transition={{
                  duration: 3, // duration of each animation cycle in seconds
                  yoyo: Infinity, // repeat animation indefinitely
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#fff",
                    fontSize: { md: "40px", xs: "15px" },
                    wordWrap: "break-word",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  HELP YOURSELF
                </Typography>
              </motion.div>
              <form ref={form} onSubmit={sendEmail}>
                <Typography
                  variant="h6"
                  color="#fff"
                  sx={{
                    color: "#fff",

                    fontSize: { md: "30px", xs: "15px" },
                  }}
                >
                  Enter Your Email
                </Typography>
                <CustomizeContactInput
                  fullWidth
                  placeholder="Enter email"
                  type="email"
                  required
                  name="from_name"
                />
                <CustomizeContactInput
                  multiline
                  rows={8}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Message Here"
                  type="text"
                  required
                  name="message"
                  sx={{
                    marginTop: "20px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <BigOrangeButton
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Send
                  </BigOrangeButton>
                </Box>
              </form>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "20px",
                gap: "10px",
              }}
            >
              <IconButton
                LinkComponent={"a"}
                href="https://t.me/bogdanoffmemeofficialgroup"
                target="_blank"
              >
                <TelegramIcon sx={{ color: "#fff" }} />
              </IconButton>
              <CopyToClipboard
                text={window.origin}
                onCopy={() => {
                  setTextCopied(true);
                  setTimeout(() => {
                    setTextCopied(false);
                  }, 1000);
                }}
              >
                <Tooltip
                  title={textCopied ? "Copied!" : "Copy Website Link"}
                  arrow
                >
                  <ContentCopyIcon
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </CopyToClipboard>
              <IconButton
                LinkComponent={"a"}
                href="https://x.com/Bogdanofflab"
                target="_blank"
              >
                <XIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LandingPageFour;
