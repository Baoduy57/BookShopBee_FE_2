import { Col, Row, Image, Rate } from "antd";
import React, { useState } from "react";
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
  WrapperStyleDetailsProduct,
} from "./style";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";

const ProductDetailsComponent = ({ idProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });
  console.log("productDetails", productDetails);

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/Sign-In", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInStock: productDetails?.countInStock,
          },
        })
      );
    }
  };

  return (
    <Loading isPending={isLoading}>
      <Row
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "4px",
          minHeight: "100vh", // Đặt chiều cao tối thiểu cho trang là 80% chiều cao của viewport
        }}
      >
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
        >
          <Image
            src={productDetails?.image}
            alt="image product"
            preview={false}
          ></Image>
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
            {productDetails?.name}
          </WrapperStyleNameProduct>

          <div>
            <Rate
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            ></Rate>
            <WrapperStyleTextSell>
              {" "}
              | Đã bán {productDetails?.selled || 0}+
            </WrapperStyleTextSell>
          </div>

          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>

          <WrapperAddressProduct>
            <span>Giao đến</span>
            <span className="address">{user?.address}</span>
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
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("decrease")}
              >
                <MinusOutlined
                  style={{ color: "black", fontSize: "20px" }}
                ></MinusOutlined>
              </button>

              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                value={numProduct}
                size="small"
              ></WrapperInputNumber>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("increase")}
              >
                <PlusOutlined
                  style={{ color: "black", fontSize: "20px" }}
                ></PlusOutlined>
              </button>
            </WrapperQualityProduct>
          </div>

          <div style={{ marginBottom: "10px" }}>Mô tả sản phẩm</div>
          <WrapperStyleDetailsProduct>
            {productDetails?.description}
          </WrapperStyleDetailsProduct>

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
              onClick={handleAddOrderProduct}
              textButton={"Chọn để mua"}
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
    </Loading>
  );
};

export default ProductDetailsComponent;
