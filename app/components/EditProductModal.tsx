import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import { ProductType } from "../hooks/useProductData";
import { next_api } from "../utils/axios";

interface EditProductModalProps {
  visible: boolean;
  product: ProductType | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  product,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && product) {
      form.setFieldsValue({
        product_title: product.product_title,
        product_price: product.product_price,
        product_description: product.product_description || "",
        product_category: product.product_category || "",
      });
    }
  }, [visible, product, form]);

  const handleSubmit = async (values: any) => {
    if (!product) return;
    setLoading(true);
    try {
      const payload = {
        product_id: product.product_id,
        ...values,
      };
      await next_api.put("/api/product", payload);
      message.success("Product updated successfully!");
      onSuccess();
      onClose();
    } catch (error: any) {
      message.error(
        "Failed to update product: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Edit Product"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="product_title"
          label="Product Title"
          rules={[{ required: true, message: "Please enter product title" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>
        <Form.Item
          name="product_price"
          label="Product Price"
          rules={[{ required: true, message: "Please enter product price" }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            placeholder="Enter product price"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item name="product_description" label="Product Description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>
        <Form.Item name="product_category" label="Product Category">
          <Input placeholder="Enter product category" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
