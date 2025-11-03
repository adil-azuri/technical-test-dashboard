"use client";

import { useEffect } from "react";
import { useProductData } from "../hooks/useProductData";
// --- ANT DESIGN IMPORTS ---
import { Table, Space, Button, Typography, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { ProductType } from "../hooks/useProductData";

const { Paragraph } = Typography;

// Handler aksi dummy (ganti dengan logika navigasi/modal nyata)
const handleEdit = (id: string) => {
  console.log(`Edit Product ID: ${id}`);
  // Implementasi: Buka modal edit atau navigasi ke halaman edit
};

const handleDelete = (id: string) => {
  console.log(
    `Delete Product ID: ${id}. Confirmation modal should be implemented here.`
  );
  // Implementasi: Tampilkan Antd Modal.confirm sebelum memanggil API delete
};

// Definisi Kolom untuk Antd Table
const columns: ColumnsType<ProductType> = [
  {
    title: "Product Title",
    dataIndex: "product_title",
    key: "product_title",
    // Gunakan sorter bawaan Antd
    sorter: (a, b) => a.product_title.localeCompare(b.product_title),
    // Menjadikan title bold
    render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
  },
  {
    title: "Price",
    dataIndex: "product_price",
    key: "product_price",
    align: "right",
    render: (price: number) => {
      return `$ ${price.toLocaleString("id-ID")}`;
    },
    sorter: (a, b) => a.product_price - b.product_price,
  },
  {
    title: "Category",
    dataIndex: "product_category",
    key: "product_category",
    // Tampilkan kategori menggunakan Antd Tag
    render: (category: string) => {
      return category ? <Tag color="blue">{category}</Tag> : "-";
    },
  },
  {
    title: "Description",
    dataIndex: "product_description",
    key: "product_description",
    // Truncate dan izinkan expand menggunakan Typography.Paragraph
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
    // Render tombol Edit dan Delete
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => handleEdit(record.product_id)}
          size="small"
        >
          Edit
        </Button>
        <Button
          danger
          onClick={() => handleDelete(record.product_id)}
          size="small"
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

export default function Products() {
  const { data, loading, error } = useProductData();

  useEffect(() => {
    if (error) {
      console.error("API Fetch Error:", error);
    }
  }, [error]);

  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          fontSize: "18px",
          color: "#4A5568",
        }}
      >
        <p>Loading products...</p>
        <div
          style={{
            marginTop: "10px",
            border: "4px solid rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #3B82F6",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            animation: "spin 1s linear infinite",
            margin: "0 auto",
          }}
        ></div>
        <style jsx global>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#FEE2E2",
          border: "1px solid #EF4444",
          color: "#EF4444",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Gagal memuat produk.</h2>
        <p>Silakan coba login ulang, atau hubungi administrator.</p>
        <p>Detail Error: {error}</p>
      </div>
    );
  }

  const products: ProductType[] = (data || []) as ProductType[];

  if (products.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#4B5563" }}>
        <p style={{ fontSize: "1.25rem" }}>
          Tidak ada produk yang tersedia saat ini.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
          borderBottom: "2px solid #E5E7EB",
          paddingBottom: "10px",
        }}
      >
        Daftar Produk ({products.length})
      </h1>

      {/* Implementasi Antd Table */}
      <Table
        columns={columns}
        dataSource={products}
        rowKey="product_id" // Wajib ada untuk performa
        pagination={{ pageSize: 10 }} // Paginasi 10 item per halaman
        scroll={{ x: "max-content" }} // Memastikan responsif pada layar kecil
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
}
