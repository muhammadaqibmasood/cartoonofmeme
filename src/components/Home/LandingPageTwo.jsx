import { Box, Container, Grid, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import slap from "../../assets/slap.png";
import button from "../../assets/button.png";
import bogdanoff from "../../assets/bogdanoff2.png";
import text from "../../assets/text.png";
import car from "../../assets/car.gif";
import { motion } from "framer-motion";
const LandingPageTwo = () => {
  const match = useMediaQuery("(max-width:900px)");
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${car})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          overflow: "hidden",
          objectFit: "contain",
          position: "relative",
        }}
      >
        {/* <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
            zIndex: "0",
          }}
        >
          <Box width="100%" height="100%">
            <video autoPlay loop muted>
              <source
                src={car}
                type="video/mp4"
                style={{ objectFit: "contain" }}
                width="100%"
              />
            </video>
          </Box>
        </Box> */}
        <Stack
          height="100%"
          pt={{ xs: 2, sm: 30, md: 50 }}
          // spacing={5}
          alignItems={{
            xs: "space-between",
            sm: "space-between",
          }}
          justifyContent="center"
        >
          <Container
            maxWidth="xl"
            sx={{
              paddingTop: "100px",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ x: 0, opacity: 0, y: 0 }}
              whileInView={{ x: [150, 10], opacity: 1 }}
              transition={{
                type: "spring",
                damping: 100,
                stiffness: 200,
              }}
            >
              <Stack
                sx={{
                  cursor: "pointer",
                  alignItems: { xs: "center", sm: "center", md: "flex-end" },

                  mb: 6,
                  width: "100%",
                }}
                component="a"
                href="#buy"
              >
                <img src={slap} style={{ width: match ? "80px" : "300px" }} />
                <img
                  src={button}
                  style={{
                    width: match ? "100px" : "300px",
                    height: match ? "30px" : "70px",
                  }}
                />
              </Stack>
            </motion.div>
          </Container>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F68800",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "20vh",
          }}
        >
          <motion.div
            transition={{
              type: "spring",
              damping: 100,
              stiffness: 200,
            }}
            initial={{ x: -300, opacity: 0, y: 0 }}
            whileInView={{ x: [-10, 0], y: [0, 0], opacity: 1 }}
          >
            <Box
              sx={{
                width: "200px",
                position: "absolute",
                marginTop: match ? "-30px" : "-50px",
              }}
            >
              <img
                src={bogdanoff}
                alt=""
                sizes=""
                style={{
                  width: match ? "100px" : "200px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0.5, opacity: 0.3, scaleY: 0.5 }}
            whileInView={{ scaleX: 0.9, opacity: 1, scaleY: 0.9 }}
            transition={{
              duration: 3, // duration of each animation cycle in seconds
              yoyo: Infinity, // repeat animation indefinitely
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "50px",
              }}
            >
              <Box
                sx={{
                  width: "200px",
                  marginTop: { md: "0px", xs: "50px" },
                }}
              >
                <img
                  src={text}
                  alt=""
                  sizes=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default LandingPageTwo;
