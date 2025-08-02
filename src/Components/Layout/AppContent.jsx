import React, { useState } from "react";
import { Layout, Typography, Tabs } from "antd";
import { useCrypto } from "../context/crypto-context";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";
import CryptoTable from "./CryptoTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  padding: "1rem",
  color: "#fff",
  background: "linear-gradient(90deg, #34a6a8,#1b2b65,#490a66,#970da0)",
};

const AppContent = () => {
  const { assets, crypto } = useCrypto();
  const [activeTab, setActiveTab] = useState("portfolio");

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  const totalPortfolioValue = assets
    .map((asset) => {
      return asset.amount * cryptoPriceMap[asset.id];
    })
    .reduce((acc, v) => (acc += v), 0)
    .toFixed(2);

  const items = [
    {
      key: "portfolio",
      label: "Портфолио",
      children: (
        <div>
          <Typography.Title
            level={3}
            style={{ textAlign: "left", color: "white", marginBottom: "20px" }}
          >
            Общая стоимость портфолио: ${totalPortfolioValue}
          </Typography.Title>
          <PortfolioChart />
          <AssetsTable />
        </div>
      ),
    },
    {
      key: "crypto",
      label: "Криптовалюты",
      children: <CryptoTable />,
    },
  ];

  return (
    <Layout.Content style={contentStyle}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          padding: "20px",
          margin: "20px",
        }}
        tabBarStyle={{
          color: "white",
          marginBottom: "20px",
        }}
      />
    </Layout.Content>
  );
};

export default AppContent;
