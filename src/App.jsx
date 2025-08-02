import React from "react";
import { CryptoContextProvider } from "./Components/context/crypto-context";
import AppLayout from "./Components/Layout/AppLayout";

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
