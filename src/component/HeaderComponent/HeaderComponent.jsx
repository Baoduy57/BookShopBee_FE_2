import { Badge, Button, Col, message, Popover } from "antd";
import React from "react";
import {
  WrapperAccountHeader,
  WrapperContentPopover,
  WrapperHeader,
  WrapperTextHeader,
  WrapperTextSmallHeader,
} from "./style";
import Search from "antd/es/transfer/search";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import { useState } from "react";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/Sign-In");
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const handleLogout = async () => {
  //   setLoading(true);
  //   await UserService.logoutUser();
  //   dispatch(resetUser());
  //   setLoading(false);
  // };

  const handleLogout = async () => {
    setLoading(true); // Bắt đầu loading khi thực hiện đăng xuất

    try {
      localStorage.removeItem("access_token"); // Xóa token khỏi localStorage (nếu cần)
      // localStorage.removeItem("refresh_token");  Xóa refresh token (nếu cần)
      await UserService.logoutUser(); // Gọi API đăng xuất
      dispatch(resetUser()); // Reset trạng thái người dùng

      // Có thể thêm điều hướng về trang đăng nhập sau khi đăng xuất thành công
      navigate("/Sign-In");
    } catch (error) {
      console.error("Logout failed: ", error); // In ra lỗi để debug
      // Có thể thêm thông báo cho người dùng nếu lỗi xảy ra
      message.error("Logout failed. Please try again.");
    } finally {
      setLoading(false); // Kết thúc loading sau khi quá trình kết thúc (thành công hoặc thất bại)
    }
  };

  const content = (
    <div>
      <WrapperContentPopover onClick={handleLogout}>
        Log out
      </WrapperContentPopover>
      <WrapperContentPopover
        onClick={() => {
          navigate("/Profile-User");
        }}
      >
        User information
      </WrapperContentPopover>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        background: "rgb(26,148,255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>BookShopBee</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            border={false}
            placeholder="input search text"
            // onSearch={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isPending={loading}>
            <WrapperAccountHeader>
              <UserOutlined style={{ fontSize: "30px" }} />
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger={"click"}>
                    <div style={{ cursor: "pointer" }}>
                      {user?.name?.length ? user?.name : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextSmallHeader>
                    Đăng nhập/Đăng ký
                  </WrapperTextSmallHeader>
                  <div>
                    <WrapperTextSmallHeader>Tài khoản</WrapperTextSmallHeader>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperAccountHeader>
          </Loading>
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "white" }}
              />
            </Badge>
            <WrapperTextSmallHeader>Giỏ hàng </WrapperTextSmallHeader>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
