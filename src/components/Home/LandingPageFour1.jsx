import React, { useRef, useState } from "react";
import tokenomicsBg from "../../assets/tokenomicsBg.png";
import tokenomicsPercent from "../../assets/tokenomicsPercent.png";
import fairSale from "../../assets/fairSale.png";
import liquidityCoins from "../../assets/liquidityCoins.png";
import influencers from "../../assets/influencers.png";
import team from "../../assets/team.png";
import devFee from "../../assets/devFee.png";
import sale from "../../assets/sale.png";
import saleBg from "../../assets/saleBg.png";
import socialBg from "../../assets/socialBg.png";
import emailBg from "../../assets/emailBg.png";
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import twitter from "../../assets/twitter.svg";
import telegram from "../../assets/telegram.svg";
import email from "../../assets/email.svg";
import Chart1 from "../../assets/Chart1.png";
import Chart2 from "../../assets/Chart2.png";
import Chart3 from "../../assets/Chart 3.png";
import { CustomizeInput } from "../CustomizeInput1";
import SendButton from "../SendButton";
import emailjs from "@emailjs/browser";
import NotificationModal from "../NotificationModal/NotificationModal";
function LandingPageFour1() {
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
            message: "Subscription successful.",
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
          backgroundImage: `url(${tokenomicsBg})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: { xs: "cover", md: "100% 100%" },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl" sx={{ py: "70px", textAlign: "center" }}>
          {/* <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "18px",
              textAlign: "center",
              fontFamily: "poppins",
              fontWeight: "600",
            }}
          >
            You may get free coins here
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              fontFamily: "Uchrony",
              fontSize: { xs: "40px", md: "50px", lg: "60px" },
              color: "#FFFFFF",
              lineHeight: "50px",
              my: { xs: "17px", md: "30px" },
            }}
          >
            We made history{" "}
            <span style={{ color: "#26D88B" }}>together with BTC First</span>
          </Typography>
          <form ref={form} onSubmit={sendEmail}>
            <Box
              sx={{
                maxWidth: "sm",
                mx: "auto",
              }}
            >
              <CustomizeInput
                placeholder="Enter Your Email Address"
                fullWidth
                type="email"
                required
                name="from_name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SendButton loading={loading} disabled={loading}>
                        Send
                      </SendButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "poppins",
                  fontWeight: "600",
                  mt: "13px",
                  textAlign: "left",
                }}
              >
                Add Your email for a chance to get free tokens!
              </Typography>
            </Box>
          </form> */}
          <Typography
            textAlign="center"
            sx={{
              fontFamily: "Uchrony",
              fontSize: { xs: "40px", md: "50px", lg: "60px" },
              color: "#FFFFFF",
              mt: "15px",
            }}
          >
            Tokenomics
          </Typography>
          <Grid container spacing={5} sx={{ pb: "50px", pt: "30px" }}>
            <Grid item xs={6} md={4} lg={2}>
              <Box
                sx={{
                  backgroundImage: `url(${tokenomicsPercent})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: { xs: "30px", md: "40px" },
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${fairSale})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    width: { xs: "116px", md: "156px" },
                    height: { xs: "116px", md: "156px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#F68701",
                    }}
                  >
                    10%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", md: "14px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#666666",
                    }}
                  >
                    Fair sale
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Box
                sx={{
                  backgroundImage: `url(${saleBg})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: { xs: "30px", md: "40px" },
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${sale})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    width: { xs: "116px", md: "156px" },
                    height: { xs: "116px", md: "156px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#F68701",
                    }}
                  >
                    10%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", md: "14px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#666666",
                    }}
                  >
                    Sale
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Box
                sx={{
                  backgroundImage: `url(${tokenomicsPercent})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: { xs: "30px", md: "40px" },
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${liquidityCoins})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    width: { xs: "116px", md: "156px" },
                    height: { xs: "116px", md: "156px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#F68701",
                    }}
                  >
                    50%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", md: "14px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#666666",
                    }}
                  >
                    Liquidity coins
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Box
                sx={{
                  backgroundImage: `url(${tokenomicsPercent})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: { xs: "30px", md: "40px" },
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${influencers})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    width: { xs: "116px", md: "156px" },
                    height: { xs: "116px", md: "156px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#F68701",
                    }}
                  >
                    15%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", md: "14px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#666666",
                    }}
                  >
                    Influencers
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Box
                sx={{
                  backgroundImage: `url(${tokenomicsPercent})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: { xs: "30px", md: "40px" },
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${team})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    width: { xs: "116px", md: "156px" },
                    height: { xs: "116px", md: "156px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#F68701",
                    }}
                  >
                    15%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", md: "14px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#666666",
                    }}
                  >
                    Team
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Box
                sx={{
                  backgroundImage: `url(${tokenomicsPercent})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: { xs: "30px", md: "40px" },
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${devFee})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    width: { xs: "116px", md: "156px" },
                    height: { xs: "116px", md: "156px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#F68701",
                    }}
                  >
                    01%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", md: "14px" },
                      fontFamily: "poppins",
                      fontWeight: "600",
                      color: "#666666",
                    }}
                  >
                    Dev Fee
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              background: "#B2EFD5",
              border: "1px solid #26D88B",
              borderRadius: "10px",
              padding: "15px",
              display: "inline-block",
              my: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontFamily: "poppins",
                fontWeight: "600",
                color: "#009E78",
              }}
            >
              NO MORE MINTING - No More Coins Will Be Ever Created!#
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "30px",
              mt: "40px",
            }}
          >
            <Typography
              sx={{
                color: "#FFFFFF",
                fontFamily: "Uchrony",
                fontWeight: "600",
                fontSize: { xs: "30px", md: "40px" },
              }}
            >
              Follow us for more info!  
            </Typography>
            <Box
              sx={{
                backgroundImage: `url(${socialBg})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                width: "197px",
                height: "71px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
              }}
              component={"a"}
              href="https://t.me/cartoonofmemeofficialgroup"
              target="_blank"
            >
              <Box>
                <img src={telegram} alt="telegram" width="30" height="30" />
              </Box>

              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: "600",
                  fontSize: { xs: "14", md: "18px" },
                  color: "#333333",
                  marginLeft: "7px",
                }}
              >
                Telegram
              </Typography>
            </Box>
            <Box
              component={"a"}
              href="https://x.com/Cartoonofmeme"
              target="_blank"
              sx={{
                backgroundImage: `url(${socialBg})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                width: "197px",
                height: "71px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box>
                <img src={twitter} alt="telegram" width="30" height="30" />
              </Box>

              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: "600",
                  fontSize: { xs: "14", md: "18px" },
                  color: "#333333",
                  marginLeft: "7px",
                }}
              >
                x.com
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage: `url(${emailBg})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                height: "71px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{ marginLeft: { xs: "10px", md: "20px" } }}
                LinkComponent={"a"}
                href="mailto:support@cartoonofmeme.com"
              >
                <img src={email} alt="telegram" width="30" height="30" />
              </IconButton>
              <a
                href="mailto:support@cartoonofmeme.com"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontWeight: "600",
                    fontSize: { xs: "14", md: "18px" },
                    color: "#333333",
                    marginLeft: "7px",
                    marginRight: { xs: "25px", md: "35px" },
                  }}
                >
                  support@cartoonofmeme.com
                </Typography>
              </a>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default LandingPageFour1;
