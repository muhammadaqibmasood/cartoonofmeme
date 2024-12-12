import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { adminPublickey } from "./constants";

let initialState = {
  admin: false,
};
export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
  const { publicKey } = useWallet();
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (publicKey) {
      setState({
        admin:
          publicKey.toString().toLowerCase() ===
          adminPublickey.toString().toLowerCase(),
      });
    }
  }, [publicKey]);

  return (
    <AppContext.Provider
      value={{
        admin: state.admin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
