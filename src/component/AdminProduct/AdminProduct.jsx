import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../component/AdminProduct/style";
import { getBase64 } from "../../utils";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService";
import Loading from "../LoadingComponent/Loading";
import * as Message from "../../component/Message/Message";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
    countInStock: "",
    rating: "",
    image: "",
  });

  const mutation = useMutationHooks((data) => {
    const { name, price, description, type, countInStock, rating, image } =
      data;
    // Gọi đúng thứ tự tham số: id, data, access_token
    const res = ProductService.createProduct({
      name,
      price,
      description,
      type,
      countInStock,
      rating,
      image,
    });
    return res;
  });

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success();
      handleCancel();
    } else if (isError) {
      Message.error();
    }
  }, [isSuccess, isError]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      type: "",
      countInStock: "",
      rating: "",
      image: "",
    });
  };

  const onFinish = () => {
    mutation.mutate(stateProduct);
    console.log("finish", stateProduct);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    // Kiểm tra file đầu tiên có tồn tại không
    const file = fileList?.[0];
    if (file) {
      // Kiểm tra xem file đã có url hoặc preview chưa
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj); // Chuyển file thành base64
      }
      // Cập nhật state avatar với ảnh preview
      setStateProduct((prevState) => ({
        ...prevState, // Giữ nguyên các thuộc tính khác của state
        image: file.preview, // Cập nhật ảnh mới
      }));
    }
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <WrapperHeader>Product Management</WrapperHeader>

      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <TableComponent></TableComponent>
      </div>

      <Modal
        title="Create Product"
        open={isModalOpen}
        onCancel={handleCancel}
        okText=""
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="Type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <InputComponent
                value={stateProduct.type}
                onChange={handleOnchange}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="Price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="Rating"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <InputComponent
                value={stateProduct.rating}
                onChange={handleOnchange}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="Description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <InputComponent
                value={stateProduct.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="Image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "25px",
                    }}
                    alt="avatar"
                  ></img>
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default AdminProduct;
