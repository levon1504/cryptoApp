import React, { useState } from "react";
import { Table, Tag, Space, Typography, Input, Select } from "antd";
import { useCrypto } from "../context/crypto-context";

const { Text } = Typography;
const { Search } = Input;

const CryptoTable = () => {
  const { crypto, loading } = useCrypto();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("rank");
  const [sortOrder, setSortOrder] = useState("ascend");

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

  // Фильтрация и сортировка данных
  const filteredData = crypto
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "name" || sortField === "symbol") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "ascend") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const columns = [
    {
      title: "Ранг",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (rank) => (
        <Tag color="blue" style={{ minWidth: "40px", textAlign: "center" }}>
          #{rank}
        </Tag>
      ),
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={record.icon}
            alt={text}
            style={{ width: 32, height: 32, borderRadius: "50%" }}
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
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text strong>{formatCurrency(price)}</Text>,
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Изменение 1ч",
      dataIndex: "priceChange1h",
      key: "priceChange1h",
      render: (change) => formatPercentage(change),
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Изменение 24ч",
      dataIndex: "priceChange1d",
      key: "priceChange1d",
      render: (change) => formatPercentage(change),
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Изменение 7д",
      dataIndex: "priceChange1w",
      key: "priceChange1w",
      render: (change) => formatPercentage(change),
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Рыночная капитализация",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (marketCap) => <Text>{formatCurrency(marketCap)}</Text>,
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Объем (24ч)",
      dataIndex: "volume",
      key: "volume",
      render: (volume) => <Text>{formatCurrency(volume)}</Text>,
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Циркулирующее предложение",
      dataIndex: "availableSupply",
      key: "availableSupply",
      render: (supply) => <Text>{formatNumber(supply)}</Text>,
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
  ];

  // Обработчик изменения сортировки
  const handleTableChange = (pagination, filters, sorter) => {
    setSortField(sorter.field);
    setSortOrder(sorter.order);
  };

  // Настройки пагинации
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredData.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} из ${total} криптовалют`,
    pageSizeOptions: ["10", "20", "50", "100"],
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
        <h2>Криптовалюты</h2>
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <Search
            placeholder="Поиск по названию или символу..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            placeholder="Сортировка по..."
            value={sortField}
            onChange={setSortField}
            style={{ width: 200 }}
            options={[
              { label: "Ранг", value: "rank" },
              { label: "Название", value: "name" },
              { label: "Цена", value: "price" },
              { label: "Рыночная капитализация", value: "marketCap" },
              { label: "Объем", value: "volume" },
            ]}
          />
        </div>
        <Text type="secondary">
          Всего криптовалют: {crypto.length} | Показано: {filteredData.length}
        </Text>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={paginationConfig}
        loading={loading}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 1400 }}
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

export default CryptoTable;
