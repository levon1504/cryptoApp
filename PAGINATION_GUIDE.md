# Руководство по пагинации в React приложении

## Что такое пагинация?

**Пагинация** - это техника разделения большого количества данных на отдельные страницы для улучшения производительности и пользовательского опыта.

### Преимущества пагинации:

1. **Производительность** - загружается меньше данных одновременно
2. **UX** - пользователю легче ориентироваться в данных
3. **Скорость загрузки** - страница загружается быстрее
4. **Снижение нагрузки** - меньше нагрузка на сервер

## Реализация пагинации в нашем проекте

### 1. Таблица активов (AssetsTable.jsx)

```javascript
// Состояние для пагинации
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

// Конфигурация пагинации
const paginationConfig = {
  current: currentPage,
  pageSize: pageSize,
  total: assets.length,
  showSizeChanger: true, // Показать селектор размера страницы
  showQuickJumper: true, // Показать быстрый переход к странице
  showTotal: (
    total,
    range // Показать общую информацию
  ) => `${range[0]}-${range[1]} из ${total} активов`,
  pageSizeOptions: ["5", "10", "20", "50"], // Варианты размера страницы
  onChange: (page, size) => {
    // Обработчик изменения страницы
    setCurrentPage(page);
    setPageSize(size);
  },
  onShowSizeChange: (current, size) => {
    // Обработчик изменения размера
    setCurrentPage(1);
    setPageSize(size);
  },
};
```

### 2. Таблица криптовалют (CryptoTable.jsx)

Дополнительные возможности:

- **Поиск** - фильтрация по названию или символу
- **Сортировка** - сортировка по различным полям
- **Расширенная пагинация** - больше опций настройки

```javascript
// Фильтрация данных
const filteredData = crypto
  .filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchText.toLowerCase())
  )
  .sort((a, b) => {
    // Логика сортировки
  });

// Пагинация с фильтрованными данными
const paginationConfig = {
  current: currentPage,
  pageSize: pageSize,
  total: filteredData.length, // Используем отфильтрованные данные
  // ... остальные настройки
};
```

## Компоненты пагинации

### Основные элементы:

1. **Номера страниц** - для перехода между страницами
2. **Селектор размера страницы** - выбор количества элементов на странице
3. **Быстрый переход** - поле для ввода номера страницы
4. **Информация о количестве** - показывает текущий диапазон и общее количество

### Настройки Ant Design Table:

```javascript
<Table
  columns={columns}
  dataSource={data}
  pagination={paginationConfig}
  loading={loading}
  rowKey="id"
  scroll={{ x: 1200 }} // Горизонтальная прокрутка
  size="middle" // Размер таблицы
  bordered // Границы
/>
```

## Лучшие практики

### 1. Состояние пагинации

```javascript
// Всегда сохраняйте состояние пагинации
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
```

### 2. Обработка изменений

```javascript
// Обработчик изменения страницы
onChange: (page, size) => {
  setCurrentPage(page);
  setPageSize(size);
};
```

### 3. Сброс на первую страницу при изменении фильтров

```javascript
// При изменении размера страницы сбрасываем на первую
onShowSizeChange: (current, size) => {
  setCurrentPage(1);
  setPageSize(size);
};
```

### 4. Информативные сообщения

```javascript
showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} элементов`;
```

## Примеры использования

### Простая пагинация:

```javascript
const simplePagination = {
  current: 1,
  pageSize: 10,
  total: 100,
  showSizeChanger: true,
  showQuickJumper: true,
};
```

### Расширенная пагинация:

```javascript
const advancedPagination = {
  current: currentPage,
  pageSize: pageSize,
  total: filteredData.length,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
  pageSizeOptions: ["10", "20", "50", "100"],
  onChange: (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  },
};
```

## Заключение

Пагинация - это важный инструмент для работы с большими наборами данных. В нашем проекте мы реализовали:

1. **Таблицу активов** с базовой пагинацией
2. **Таблицу криптовалют** с расширенными возможностями
3. **Поиск и фильтрацию** данных
4. **Сортировку** по различным полям
5. **Адаптивный дизайн** с горизонтальной прокруткой

Это обеспечивает отличный пользовательский опыт при работе с большими объемами данных.
