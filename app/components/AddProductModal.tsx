import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import { next_api } from "../utils/axios";
import { div } from "framer-motion/client";

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        product_title: values.product_title,
        product_price: values.product_price,
        product_description: values.product_description,
        product_category: values.product_category,
      };
      await next_api.post("/api/product", payload);
      message.success("Product added successfully!");
      onSuccess();
      onClose();
      form.resetFields();
    } catch (error: any) {
      message.error(
        "Failed to add product: " +
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
      title="Add New Product"
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
          Add Product
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="product_title"
          label="Product Title"
          rules={[
            {
              required: true,
              min: 5,
              message: "Please enter product title at least 5 characters",
            },
          ]}
        >
          <Input placeholder="Insert Product Title" />
        </Form.Item>
        <Form.Item
          name="product_price"
          label="Product Price"
          rules={[
            {
              type: "number",
              min: 1,
              required: true,
              message: "Please enter product price at least 1$",
            },
          ]}
        >
          <InputNumber
            min={0}
            step={0.1}
            placeholder="Insert product price"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item name="product_description" label="Product Description">
          <Input.TextArea rows={3} placeholder="Insert Product" />
        </Form.Item>
        <Form.Item name="product_category" label="Product Category">
          <Input placeholder="Insert Product Category" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
