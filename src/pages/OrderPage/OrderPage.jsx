import React from "react";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { Checkbox } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
const OrderPage = ({ count = 1 }) => {
  const onChange = (e) => {};
  const handleChangeCount = () => {};

  const handleOnchangeCheckAll = () => {};

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Shopping cart</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox onChange={handleOnchangeCheckAll}></Checkbox>
                <span>All ({count} product)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Unit price</span>
                <span>Quantity</span>
                <span>Total amount</span>
                <DeleteOutlined style={{ cursor: "pointer" }}></DeleteOutlined>
              </div>
            </WrapperStyleHeader>

            <WrapperListOrder>
              <WrapperItemOrder>
                <div
                  style={{
                    width: "390px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Checkbox onChange={onChange}></Checkbox>
                  <img
                    src="../../assets/images/detail1.webp"
                    style={{
                      width: "77px",
                      height: "79px",
                      objectFit: "cover",
                    }}
                  ></img>
                  <div>Name Product</div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    <span style={{ fontSize: "13px", color: "#242424" }}>
                      211
                    </span>
                    <WrapperPriceDiscount>230</WrapperPriceDiscount>
                  </span>

                  <WrapperCountOrder>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeCount("decrease")}
                    >
                      <MinusOutlined
                        style={{ color: "#000", fontSize: "10px" }}
                      ></MinusOutlined>
                    </button>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeCount("increase")}
                    >
                      <PlusOutlined
                        style={{ color: "#000", fontSize: "10px" }}
                      ></PlusOutlined>
                    </button>
                  </WrapperCountOrder>

                  <span
                    style={{
                      color: "rgb(255,66,78)",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    1212
                  </span>
                  <DeleteOutlined
                    style={{ cursor: "pointer" }}
                  ></DeleteOutlined>
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>

          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Provisional</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    0
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Discount</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    0
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tax</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    0
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Shipping fee</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    0
                  </span>
                </div>
              </WrapperInfo>

              <WrapperTotal>
                <span>Total amount</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{ color: "rgb(254,56,52)", fontSize: "24px" }}
                  ></span>
                  <span style={{ color: "#000", fontSize: "11px" }}></span>
                </span>
              </WrapperTotal>
            </div>

            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(225,57,69)",
                height: "48px",
                width: "220px",
                borderRadius: "5px",
                border: "none",
              }}
              textButton={"Purchase"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
