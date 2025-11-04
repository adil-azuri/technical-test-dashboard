"use client";

import { useCallback, useState } from "react";
import type { ProductType } from "../hooks/useProductData";
import ProductsTable from "../components/ProductsTable";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import Sidebar from "../components/Sidebar";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function Products() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  const handleEdit = useCallback((product: ProductType) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  }, []);

  const handleAdd = useCallback(() => {
    setAddModalVisible(true);
  }, []);

  const handleAddSuccess = useCallback(() => {
    window.location.reload();
  }, []);

  const handleEditSuccess = useCallback(() => {
    window.location.reload();
  }, []);

  const handleAddClose = useCallback(() => {
    setAddModalVisible(false);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditModalVisible(false);
    setSelectedProduct(null);
  }, []);

  const handleSidebarToggle = useCallback((minimized: boolean) => {
    setSidebarMinimized(minimized);
  }, []);

  return (
    <ProtectedRoute>
      <div
        className={`transition-all duration-300 ease-in-out flex ${
          sidebarMinimized ? "ml-20" : "ml-60"
        }`}
      >
        <Sidebar onToggle={handleSidebarToggle} />
        <ProductsTable onEdit={handleEdit} onAdd={handleAdd} />
        <AddProductModal
          visible={addModalVisible}
          onClose={handleAddClose}
          onSuccess={handleAddSuccess}
        />
        <EditProductModal
          visible={editModalVisible}
          product={selectedProduct}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      </div>
    </ProtectedRoute>
  );
}
