import React, { useState } from "react";
import { Table, Tag, Space, Typography } from "antd";
import { useCrypto } from "../context/crypto-context";

const { Text } = Typography;

const AssetsTable = () => {
  const { assets, loading } = useCrypto();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Функция для форматирования чисел
  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + "B";
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    }
    return num.toFixed(2);
  };

  // Функция для форматирования валюты
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Функция для форматирования процентов
  const formatPercentage = (value) => {
    const color = value >= 0 ? "green" : "red";
    const sign = value >= 0 ? "+" : "";
    return (
      <Text type={color}>
        {sign}
        {value.toFixed(2)}%
      </Text>
    );
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={
              record.icon ||
              `https://static.coinstats.app/coins/${record.id}.png`
            }
            alt={text}
            style={{ width: 24, height: 24, borderRadius: "50%" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{text}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.symbol}
            </div>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Количество",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <Text strong>{amount.toFixed(4)}</Text>,
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Цена покупки",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Текущая цена",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (_, record) => {
        const currentPrice = record.totalAmount / record.amount;
        return formatCurrency(currentPrice);
      },
      sorter: (a, b) => a.totalAmount / a.amount - b.totalAmount / b.amount,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Общая стоимость",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => (
        <Text strong>{formatCurrency(totalAmount)}</Text>
      ),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Прибыль/Убыток",
      dataIndex: "totalProfit",
      key: "totalProfit",
      render: (totalProfit, record) => (
        <Space direction="vertical" size={0}>
          <Text type={totalProfit >= 0 ? "success" : "danger"}>
            {formatCurrency(totalProfit)}
          </Text>
          {formatPercentage(record.growProcent)}
        </Space>
      ),
      sorter: (a, b) => a.totalProfit - b.totalProfit,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Статус",
      dataIndex: "grow",
      key: "grow",
      render: (grow) => (
        <Tag color={grow ? "green" : "red"}>
          {grow ? "📈 Растет" : "📉 Падает"}
        </Tag>
      ),
      filters: [
        { text: "Растет", value: true },
        { text: "Падает", value: false },
      ],
      onFilter: (value, record) => record.grow === value,
    },
    {
      title: "Дата покупки",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString("ru-RU"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
    },
  ];

  // Настройки пагинации
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: assets.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} активов`,
    pageSizeOptions: ["5", "10", "20", "50"],
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
    },
    onShowSizeChange: (current, size) => {
      setCurrentPage(1);
      setPageSize(size);
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h2>Мои активы</h2>
        <Text type="secondary">
          Всего активов: {assets.length} | Общая стоимость:{" "}
          {formatCurrency(
            assets.reduce((sum, asset) => sum + asset.totalAmount, 0)
          )}
        </Text>
      </div>

      <Table
        columns={columns}
        dataSource={assets}
        pagination={false}
        loading={loading}
        rowKey="id"
        scroll={{ x: 1200 }}
        size="middle"
        bordered
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

export default AssetsTable;
