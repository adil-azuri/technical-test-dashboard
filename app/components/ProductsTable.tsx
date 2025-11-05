"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useProductData } from "../hooks/useProductData";
import {
  Table,
  Space,
  Button,
  Typography,
  Tag,
  Pagination,
  Input,
  Empty,
  Spin,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ProductType } from "../hooks/useProductData";

const { Paragraph } = Typography;
const { Option } = Select;

interface ProductsTableProps {
  onEdit: (product: ProductType) => void;
  onAdd: () => void;
}

export default function ProductsTable({ onEdit, onAdd }: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { data, loading, error } = useProductData(
    debouncedSearchText || undefined
  );

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setCurrentPage(1);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchText]);

  useEffect(() => {
    if (error) {
      console.error("API Fetch Error:", error);
    }
  }, [error]);

  const allProducts: ProductType[] = useMemo(
    () => (data || []) as ProductType[],
    [data]
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allProducts.slice(startIndex, endIndex);
  }, [allProducts, currentPage, pageSize]);

  const totalProducts = allProducts.length;

  const handlePaginationChange = useCallback(
    (page: number, newPageSize?: number) => {
      setCurrentPage(page);
      if (newPageSize && newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    },
    [pageSize]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const handleSearch = useCallback((value: string) => {
    setSearchText(value.trim());
  }, []);

  const columns: ColumnsType<ProductType> = useMemo(
    () => [
      {
        title: "Product Title",
        dataIndex: "product_title",
        key: "product_title",
        sorter: (a, b) => a.product_title.localeCompare(b.product_title),
        render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
      },
      {
        title: "Price",
        dataIndex: "product_price",
        key: "product_price",
        align: "left",
        render: (price: number) => `$ ${price.toLocaleString("id-ID")}`,
        sorter: (a, b) => a.product_price - b.product_price,
      },
      {
        title: "Category",
        dataIndex: "product_category",
        key: "product_category",
        render: (category: string) =>
          category ? <Tag color="blue">{category}</Tag> : "-",
      },
      {
        title: "Description",
        dataIndex: "product_description",
        key: "product_description",
        render: (description: string) => {
          if (!description) return "-";
          return (
            <Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
              style={{ maxWidth: "350px", margin: 0 }}
            >
              {description}
            </Paragraph>
          );
        },
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => onEdit(record)}
              size="small"
              style={{ backgroundColor: "#d97706", borderColor: "#d97706" }}
            >
              Edit
            </Button>
          </Space>
        ),
        style: { border: "1px solid #d97706", color: "black" },
      },
    ],
    [onEdit]
  );

  if (error) {
    return (
      <div className="p-5 text-center bg-red-50 border border-red-400 text-red-600 rounded-lg">
        <h2 className="mb-2.5">Gagal memuat produk.</h2>
        <p>Silakan coba login ulang, atau hubungi administrator.</p>
        <p>Detail Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-3">
      {/* Header */}
      <h1 className="font-bold text-3xl text-amber-600 pt-3 mb-2">Products</h1>

      {/* Head Bar */}
      <div className="p-3 rounded-xl border-amber-500 border-2 mb-3">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <span className="font-bold  text-center py-1 text-amber-700">
                Search
              </span>
              <Input
                placeholder="Cari Judul, Deskripsi, atau Kategori Produk"
                allowClear
                value={searchText}
                onChange={handleSearchChange}
                onPressEnter={() => handleSearch(searchText)}
                style={{ width: 350 }}
              />
            </div>
            <Space size="large">
              <Button
                type="primary"
                onClick={onAdd}
                style={{ backgroundColor: "#d97706" }}
              >
                + Add new Data
              </Button>
            </Space>
          </div>
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey="product_id"
        pagination={false}
        size="small"
        className="custom-product-table"
        scroll={{ x: "max-content" }}
        loading={{
          spinning: loading,
          indicator: <Spin size="large" />,
          tip: "Loading products...",
        }}
        locale={{
          emptyText: debouncedSearchText ? (
            <Empty
              description={`Tidak ada produk yang cocok dengan "${debouncedSearchText}"`}
              style={{ padding: "40px 0" }}
            />
          ) : (
            <Empty description="Tidak ada produk yang tersedia saat ini" />
          ),
        }}
        components={{
          header: {
            cell: (props) => <th {...props} />,
          },
        }}
      />
      <div className=" flex  justify-between mt-2 mb-5">
        <p>Total Products: {totalProducts}</p>
        <div className="flex">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePaginationChange}
            style={{ color: "#d97706" }}
          />
          <Select
            value={pageSize}
            onChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
            style={{ width: 70 }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}
