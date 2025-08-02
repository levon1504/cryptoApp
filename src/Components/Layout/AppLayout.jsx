import React, { useContext } from "react";
import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSlider from "./AppSlider";
import AppContent from "./AppContent";
import CryptoContext from "../context/crypto-context";

const AppLayout = () => {
  const {loading} = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <AppSlider />
      <Layout>
        <AppHeader />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
