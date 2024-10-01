import { Col, Row, Image, InputNumber } from "antd";
import React from "react";
import imageProduct from "../../assets/images/detail1.webp";
import imageProductSmall from "../../assets/images/detail2.webp";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperBtnQualityProduct,
} from "./style";
import { StarFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailsComponent = () => {
  const onChange = () => {};
  return (
    <Row
      style={{ padding: "16px", backgroundColor: "#fff", borderRadius: "4px" }}
    >
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
      >
        <Image src={imageProduct} alt="image product" preview={false}></Image>
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>

          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperStyleNameProduct>
          Trọn bộ 5 quyển Dekiru Nihongo Sơ cấp (Kèm CD)
        </WrapperStyleNameProduct>
        <div>
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253,216,54" }}
          ></StarFilled>
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253,216,54" }}
          ></StarFilled>
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253,216,54" }}
          ></StarFilled>
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253,216,54" }}
          ></StarFilled>
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253,216,54" }}
          ></StarFilled>

          <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
        </div>

        <WrapperPriceProduct>
          <WrapperPriceTextProduct>500.000</WrapperPriceTextProduct>
        </WrapperPriceProduct>

        <WrapperAddressProduct>
          <span>Giao đến</span>
          <span className="address">Thành Phố Quy Nhơn, Tỉnh Bình Định</span>
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>

        <div
          style={{
            margin: "10px 0",
            padding: "10px 0",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Số lượng</div>
          <WrapperQualityProduct>
            <button style={{ border: "none", background: "transparent" }}>
              <MinusOutlined
                style={{ color: "black", fontSize: "20px" }}
              ></MinusOutlined>
            </button>

            <WrapperInputNumber
              defaultValue={3}
              onChange={onChange}
              size="small"
            ></WrapperInputNumber>

            <button style={{ border: "none", background: "transparent" }}>
              <PlusOutlined
                style={{ color: "black", fontSize: "20px" }}
              ></PlusOutlined>
            </button>
          </WrapperQualityProduct>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: "rgb(225,57,69)",
              height: "48px",
              width: "220px",
              borderRadius: "5px",
            }}
            textButton={"Chọn mua"}
            styleTextButton={{ color: "#fff" }}
          ></ButtonComponent>

          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: "#fff",
              height: "48px",
              width: "220px",
              borderRadius: "5px",
              border: "1px solid rgb(13,92,182)",
            }}
            textButton={"Mua trả sau"}
            styleTextButton={{ color: "rgb(13,92,182)" }}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
