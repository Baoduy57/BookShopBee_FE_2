import { Menu } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getItem } from "../../utils";
import HeaderComponent from "../../component/HeaderComponent/HeaderComponent";
import AdminUser from "../../component/AdminUser/AdminUser";
import AdminProduct from "../../component/AdminProduct/AdminProduct";
import OrderAdmin from "../../component/OrderAdmin/OrderAdmin";

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Đơn hàng", "order", <ShoppingCartOutlined />),
  ];

  const [selectedKeys, setSelectedKeys] = useState("");
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <OrderAdmin />;
      default:
        return;
    }
  };

  const handleOnClick = ({ key }) => {
    setSelectedKeys(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart></HeaderComponent>
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            boxShadow: "1px 1px 2px #ccc",
            width: 256,
            height: "100vh",
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(selectedKeys)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
