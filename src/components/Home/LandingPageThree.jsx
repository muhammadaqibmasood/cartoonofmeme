import {
  Box,
  Container,
  DialogContent,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import landing3 from "../../assets/landing3.png";
// import buysell from "../../assets/buysell.png";
// import dialog from "../../assets/dialog1.png";
import brothertokenomics from "../../assets/brothertokenomics.png";
import tokenomics from "../../assets/tokenomics.png";
import tokenaddress from "../../assets/tokenaddress.png";
import tokenomicstext from "../../assets/tokenomicstext.png";
import { motion } from "framer-motion";
import { mint } from "../utils/constants";
const LandingPageThree = () => {
  const match = useMediaQuery("(max-width:900px)");
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${landing3})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            sx={{
              alignItems: "flex-end",
            }}
          >
            <Grid item md={8} sm={12} xs={12} sx={{ pb: 10 }}>
              <Box>
                <motion.div
                  transition={{
                    type: "spring",
                    damping: 100,
                    stiffness: 200,
                  }}
                  initial={{ x: -100, opacity: 0, y: 0 }}
                  whileInView={{ x: [-100, 10], y: [0, 0], opacity: 1 }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={tokenomics}
                      alt=""
                      style={{
                        width: "60%",

                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </motion.div>
                <Box
                  sx={{
                    padding: { xs: "10px", sm: "20px" },
                    backgroundColor: "#432400",
                    borderRadius: "20px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <Box
                        sx={{
                          backgroundColor: "#4F320F",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: { xs: "10px", sm: "20px" },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "30px", xs: "15px" },
                          }}
                        >
                          Symbol
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "20px", xs: "12px" },
                          }}
                        >
                          Cartoon
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box
                        sx={{
                          backgroundColor: "#4F320F",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: { xs: "10px", sm: "20px" },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "30px", xs: "15px" },
                          }}
                        >
                          Token Name
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "20px", xs: "12px" },
                          }}
                        >
                          Cartoon
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={8} xs={12}>
                      <Box
                        sx={{
                          backgroundColor: "#4F320F",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: { md: "row" },
                          justifyContent: "space-between",
                          padding: { xs: "10px", sm: "20px" },
                          alignItems: "center",
                          gap: { md: "0px", xs: "5px" },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "30px", xs: "13px" },
                          }}
                        >
                          Total Supply
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "20px", xs: "12px" },
                          }}
                        >
                          1000000000
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Box
                        sx={{
                          backgroundColor: "#4F320F",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: { xs: "10px", sm: "20px" },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "30px", xs: "15px" },
                          }}
                        >
                          Tax:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "20px", xs: "12px" },
                          }}
                        >
                          1%
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          backgroundColor: "#4F320F",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                          padding: { xs: "10px", sm: "20px" },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "30px", xs: "15px" },
                          }}
                        >
                          Token Address
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#fff",

                            fontSize: { md: "20px", xs: "12px" },
                            wordWrap: "break-word",
                          }}
                        >
                          {mint.toString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
              <motion.div
                initial={{ x: 0, opacity: 0, y: 0 }}
                whileInView={{ x: [100, 0], opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 100,
                  stiffness: 200,
                }}
              >
                <Box textAlign="center">
                  <img src={brothertokenomics} width={match ? "60%" : "100%"} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default LandingPageThree;
