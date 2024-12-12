import "./App.css";
import React from "react";
import LandingPageOne from "./components/Home/LandingPageOne";
import LandingPageTwo from "./components/Home/LandingPageTwo";
import LandingPageThree from "./components/Home/LandingPageThree";
import Presale from "./components/PresaleSwap/Presale";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
// import LandingPageFour from "./components/Home/LandingPageFour";
import {
  adminPublickey,
  feeOwnerPublickey,
  mint,
} from "./components/utils/constants";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import OwnerPrevilege from "./components/OwnerPrevilege/OwnerPrevilege";
import { findAssociatedTokenAccountPublicKey } from "./components/utils/hooks";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import LandingPageFour1 from "./components/Home/LandingPageFour1";
import TransferFeePrevilege from "./components/TransferFeePrevilege/TransferFeePrevilege";
import Footer from "./components/PresaleSwap/Footer";

function App() {
  const [adminState, setadminState] = useState(false);
  const [feeOwnerState, setfeeOwnerState] = useState(false);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (connection && publicKey) {
      let admin = publicKey.equals(adminPublickey);
      let feeOwner = publicKey.equals(feeOwnerPublickey);

      if (admin) {
        setadminState(true);
      } else {
        setadminState(false);
      }
      console.log(feeOwner, "feeOwner");
      if (feeOwner) {
        setfeeOwnerState(true);
      } else {
        setfeeOwnerState(false);
      }
    }
  }, [publicKey, connection]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPageOne />
              <LandingPageThree />
              <LandingPageTwo />
              {/* <LandingPageFour /> */}
              <LandingPageFour1 />
              {adminState && <OwnerPrevilege />}
              {feeOwnerState && <TransferFeePrevilege />}
              <Presale />
              <Footer/>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
