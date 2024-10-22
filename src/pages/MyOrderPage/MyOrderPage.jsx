import React, { useEffect } from "react";
import Loading from "../../component/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import {
  WrapperContainer,
  WrapperFooterItem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperStatus,
  WrapperStyleHeader,
} from "./style";
import { convertPrice } from "../../utils";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as Message from "../../component/Message/Message";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    console.log("res", res);
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrder,
    enabled: !!(state?.id && state?.token), // Chỉ kích hoạt khi user id và access_token tồn tại
  });
  const { isLoading, data } = queryOrder;
  console.log("data", data);

  const handleDetailsOrder = (id) => {
    navigate(`/Details-Order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks((data) => {
    // const { id, orderItems } = data;
    const { id, token, orderItems } = data;
    const res = OrderService.cancelOrder(id, token, orderItems);
    // const res = OrderService.cancelOrder(id, orderItems);
    return res;
  });

  const handleCancelOrder = (order) => {
    // console.log("Cancelling order:", order);
    // console.log("Using token:", state?.token);
    mutation.mutate(
      // { id: order._id, orderItems: order?.orderItems },
      { id: order._id, token: state?.token, orderItems: order?.orderItems },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancel,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "SUCCESS") {
      Message.success("Hủy đơn hàng thành công");
    } else if (isErrorCancel) {
      Message.error("Hủy đơn hàng thất bại");
    }
  }, [isSuccessCancel, isErrorCancel, dataCancel]);
  console.log("Order data:", data);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperStyleHeader>
          <img
            src={order?.image}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              border: "1px solid rgb(238,238,238)",
              padding: "2px",
            }}
          ></img>
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{
              fontSize: "13px",
              color: "#242424",
              marginLeft: "auto",
            }}
          >
            {convertPrice(order?.price)}
          </span>
        </WrapperStyleHeader>
      );
    });
  };

  return (
    <Loading isPending={isLoading}>
      <WrapperContainer>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h4>Đơn hàng của tôi</h4>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Trạng thái
                    </span>
                    <div>
                      <span style={{ color: "rgb(255,66,78)" }}>
                        Giao hàng:{" "}
                      </span>
                      {`${
                        order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                      }`}
                    </div>
                    <div>
                      <span style={{ color: "rgb(255,66,78)" }}>
                        Thanh toán:{" "}
                      </span>
                      {`${order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}`}
                    </div>
                  </WrapperStatus>

                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: "rgb(255,66,78)" }}>Tổng tiền</span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgb(56,56,61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleCancelOrder(order)}
                        styleButton={{
                          height: "36px",
                          border: "1px solid rgb(11,116,29)",
                          borderRadius: "5px",
                        }}
                        size={40}
                        textButton={"Hủy đơn hàng"}
                        styleTextButton={{
                          color: "rgb(11,116,229)",
                          fontSize: "15px",
                        }}
                      ></ButtonComponent>

                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        styleButton={{
                          height: "36px",
                          border: "1px solid rgb(11,116,29)",
                          borderRadius: "5px",
                        }}
                        size={40}
                        textButton={"Xem chi tiết"}
                        styleTextButton={{
                          color: "rgb(11,116,229)",
                          fontSize: "15px",
                        }}
                      ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
