import React, { useState, useEffect } from "react";

import {
  Layout,
  Select,
  Space,
  Button,
  ConfigProvider,
  Modal,
  Drawer,
} from "antd";
import { createStyles } from "antd-style";
import { useCrypto } from "../context/crypto-context";
import CoinIfoModal from "../CryptoInfoModal";
import AddAssetForm from "../AddAssetForm";
import CoinInfo from "../CoinInfo";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: "60px",
  padding: "1rem",
  border: "1px solid #2f485c",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(90deg,#009ca0, #1abc9c, #1f2c51)",
  borderLeft: "0px",
};

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const AppHeader = () => {
  const { crypto } = useCrypto();
  const { styles } = useStyle();
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onChange={handleSelect} // замените onSelect на onChange
        style={{ width: 250 }}
        placeholder="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />

      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
      >
        <Space>
          <Button type="primary" size="large" onClick={() => setDrawer(true)}>
            Add Asset
          </Button>
        </Space>
      </ConfigProvider>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinIfoModal coin={coin} />
      </Modal>

      <Drawer
        destroyOnHidden
        style={{
          background: "linear-gradient(90deg, #ffffff,#adecff",
          border: "1px solid #2f485c",
        }}
        title="Add Asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
