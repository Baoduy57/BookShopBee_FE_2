import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;

  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/Product-Details/${id}`);
  };

  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
      disabled={countInStock === 0}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "11px", color: "yellow" }} />
        </span>

        <WrapperStyleTextSell> | Đã bán {selled || 0}+</WrapperStyleTextSell>
      </WrapperReportText>

      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
        <WrapperDiscountText>- {discount || 0}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
