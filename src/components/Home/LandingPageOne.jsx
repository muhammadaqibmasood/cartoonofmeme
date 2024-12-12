import { Box, Container, Grid, Hidden, useMediaQuery } from "@mui/material";
import React from "react";
import landing1 from "../../assets/landing1.png";
import landing1mobile from "../../assets/landing1mobile.png";
// import moon from "../../assets/moon.png";
import rocketgif from "../../assets/moon.gif";
import { motion } from "framer-motion";
const LandingPageOne = () => {
  const match = useMediaQuery("(max-width:900px)");
  console.log(match, "match");
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${landing1})`,
          backgroundPosition: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          overflow: "hidden",
          width: "100%",
          height: match ? "250px" : "800px",
        }}
      >
        {/* <Box
          sx={{
            backgroundImage: `url(${rocketgif})`,
            backgroundPosition: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            overflow: "hidden",
            width: "100%",
            height: match ? "280px" : "800px",
          }}
        > */}
        <img src={rocketgif} width={"100%"} height="100%" />
        {/* <Container
          maxWidth="xl"
          sx={{
            pt: match ? "0px" : "50px",
          }}
        >
          <Grid container>
            <Grid item sm={12} md={4} lg={4}>
              <motion.div
                transition={{
                  type: "spring",
                  damping: 100,
                  stiffness: 200,
                }}
                initial={{ x: 5, opacity: 0, y: 0 }}
                whileInView={{ y: [-10, 0], opacity: 1 }}
              >
                <motion.div
                  animate={{ y: ["0%", "5%", "0%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <Box textAlign={match ? "left" : "center"}>
                  </Box>
                </motion.div>
              </motion.div>
              <Box
                sx={{
                  marginLeft: match ? "40%" : "60%",
                  marginTop: { md: "0px", sm: "-250px", xs: "-100px" },
                }}
              >
                <motion.div
                  animate={{
                    y: match ? ["0%", "-65%"] : ["0%", "-150%"],
                    x: match ? ["0%", "-100%"] : ["0%", "-100%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    // repeatType: "loop",
                  }}
                >
                  <Box textAlign="center">
                    <img src={rocket} width={match ? "30%" : "100%"} />
                  </Box>
                </motion.div>
              </Box>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <motion.div
                transition={{
                  type: "spring",
                  damping: 100,
                  stiffness: 200,
                }}
                initial={{ x: 5, opacity: 0, y: 0 }}
                whileInView={{ y: [-10, 0], opacity: 1 }}
              >
                <Box textAlign="center">
                  <img src={bogdanoff} width={match ? "50%" : "100%"} />
                </Box>
              </motion.div>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
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
                  <img src={brothers} width={match ? "50%" : "100%"} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container> */}
        {/* </Box> */}
      </Box>
    </>
  );
};

export default LandingPageOne;
