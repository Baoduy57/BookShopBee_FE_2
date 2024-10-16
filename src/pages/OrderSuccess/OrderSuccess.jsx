import React from "react";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrder,
  WrapperCountOrder,
  WrapperItemOrderInfo,
} from "./style";

import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      {/* <Loading isPending={isLoadingAddOrder}> */}
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Đơn hàng đặt thành công</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperContainer
            style={{
              maxWidth: "1200px", // Giới hạn chiều rộng
              margin: "0 auto", // Căn giữa khối chứa
              padding: "20px", // Thêm khoảng cách
            }}
          >
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderContant.delivery[state?.delivery]}
                  </span>
                  Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>

            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>

                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>

            <WrapperItemOrderInfo>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div
                      style={{
                        width: "300px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <img
                        src={order.image}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      ></img>
                      <div
                        style={{
                          width: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Canh giữa
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "14px", color: "#242424" }}>
                          Số lượng: {order?.amount}
                        </span>
                      </span>

                      <span>
                        <span style={{ fontSize: "14px", color: "#242424" }}>
                          Giá tiền: {convertPrice(order?.price)}
                        </span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfo>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <span
                style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}
              >
                Tổng tiền: {convertPrice(state?.totalPrice)}
              </span>
            </div>
          </WrapperContainer>
        </div>
      </div>

      {/* </Loading> */}
    </div>
  );
};

export default OrderSuccess;
