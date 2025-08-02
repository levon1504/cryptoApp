import React from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Card,
  Statistic,
  List,
  Typography,
  Tag,
  Button,
  Spin,
} from "antd";
import { capitalaiz } from "../../UtilFn";
import { useContext } from "react";
import CryptoContext from "../context/crypto-context";

const siderStyle = {
  padding: "1rem",
  background: "linear-gradient(90deg, #8c11fa,#009ca0)",
  boxShadow: "2px 0 8px 0 rgba(0,0,0,0.08)",
  border: "1px solid #2f485c",
};

const AppSlider = () => {
  const { loading, assets, removeAsset } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card
          key={asset.id}
          style={{
            border: "2px solid #2f485c",
            marginBottom: "1rem",
            background: "linear-gradient(90deg, #ffffff,#adecff)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)", // тень вокруг карточки
          }}
          extra={
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeAsset(asset.id)}
              style={{ padding: 0 }}
            />
          }
        >
          <Statistic
            title={capitalaiz(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />

          <List
            size="large"
            dataSource={[
              {
                title: "Total profit :",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Asset Amount :", value: asset.amount, isPlane: true },
              { title: "Difference :", value: asset.growProcent },
            ]}
            renderItem={(item, idx) => (
              <List.Item key={idx}>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growProcent} %
                    </Tag>
                  )}
                  {item.isPlane && item.value}
                  {!item.isPlane && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)} $
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSlider;
