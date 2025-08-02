import React from "react";
import { Typography } from "antd";

const CoinInfo = ({ coin, withSymbol }) => {
  return (
    <Typography.Title
      level={2}
      style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
    >
      <img width={40} src={coin.icon} alt={coin.Title} />{" "}
      {withSymbol && <span>({coin.symbol})</span>} {coin.name}
    </Typography.Title>
  );
};

export default CoinInfo;
