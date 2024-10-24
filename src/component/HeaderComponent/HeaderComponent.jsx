import { Badge, Col, message, Popover } from "antd";
import React, { useEffect } from "react";
import {
  WrapperAccountHeader,
  WrapperContentPopover,
  WrapperHeader,
  WrapperTextHeader,
  WrapperTextSmallHeader,
} from "./style";

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
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/Sign-In");
  };
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);

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

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopover
        onClick={() => {
          handleClickNavigate("Profile");
        }}
      >
        Thông tin người dùng
      </WrapperContentPopover>
      {user?.isAdmin && (
        <WrapperContentPopover
          onClick={() => {
            handleClickNavigate("Admin");
          }}
        >
          Quản lý hệ thống
        </WrapperContentPopover>
      )}
      <WrapperContentPopover
        onClick={() => {
          handleClickNavigate("MyOrder");
        }}
      >
        Đơn hàng của tôi
      </WrapperContentPopover>
      <WrapperContentPopover onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopover>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "Profile") {
      navigate("/Profile-User");
    } else if (type === "Admin") {
      navigate("/System/Admin");
    } else if (type === "MyOrder") {
      navigate("/MyOrderPage", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();

      setIsOpenPopup(false);
    }
  };
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div
      style={{
        width: "100%",
        background: "rgb(26,148,255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <WrapperTextHeader to="/">BookShopBee</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              textbutton="Tìm kiếm"
              border={false}
              placeholder="input search text"
              onChange={onSearch}
            />
          </Col>
        )}
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isPending={loading}>
            <WrapperAccountHeader>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}

              {user?.access_token ? (
                <>
                  <Popover
                    content={content}
                    trigger={"click"}
                    open={isOpenPopup}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsOpenPopup((prev) => !prev)}
                    >
                      {userName?.length ? userName : user?.email}
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
          {!isHiddenCart && (
            <div
              onClick={() => navigate("/OrderPage")}
              style={{ cursor: "pointer" }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "white" }}
                />
              </Badge>
              <WrapperTextSmallHeader>Giỏ hàng </WrapperTextSmallHeader>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
