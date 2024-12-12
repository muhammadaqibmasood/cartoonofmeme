import React, { useEffect, useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import footerImg from "../../assets/footer.png";
import desktop2 from "../../assets/desktop2.png";
const Footer = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const matches = useMediaQuery("(min-width:900px)");
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.mailerlite.com/js/universal.js";
    script.async = true;

    script.onload = () => {
      if (window.ml) {
        window.ml("account", "1075544");
        setIsScriptLoaded(true); // Mark script as loaded
      } else {
        console.error("MailerLite script failed to initialize.");
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return matches ? (
    <Box
      sx={{
        backgroundImage: `url(${footerImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: { lg: "100vh", xs: "400px" },
      }}
    >
      <iframe
        src="https://dashboard.mailerlite.com/forms/1075544/139879042668037736/share"
        width="100%"
        height="600"
        style={{
          border: "none",
          maxWidth: "400px",
          height: "306px",
          borderRadius: "10px",
        }}
        title="MailerLite Form"
      ></iframe>
    </Box>
  ) : (
    <>
      <Container
        maxWidth="sm"
        sx={{
          backgroundImage: `url(${desktop2})`,
          backgroundPosition: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          overflow: "hidden",
          pt: 3,
        }}
      >
        <iframe
          src="https://dashboard.mailerlite.com/forms/1075544/139879042668037736/share"
          width="100%"
          height="600"
          style={{
            border: "none",
            maxWidth: "400px",
            height: "306px",
            borderRadius: "10px",
          }}
          title="MailerLite Form"
        ></iframe>
      </Container>
      <Box
        sx={{
          backgroundImage: `url(${footerImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: { lg: "100vh", xs: "400px" },
        }}
      ></Box>
    </>
  );
};

export default Footer;
