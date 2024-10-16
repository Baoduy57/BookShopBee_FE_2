import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
  width: 200px;
  &img {
    height: 200px;
    width: 200px;
  }
  backgroud-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const StyleNameProduct = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 13px;
  color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
    font-weight: 11px;
  align-items: center;
  display: flex
  color: rgb(128, 128, 137);
  margin: 8px 0 0 0;
`;

export const WrapperPriceText = styled.div`
  color: rgb(255, 66, 78);
  font-size: 18px;
  font-weight: 500;
`;

export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 14px;
  font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 25px;
  color: rgb(120, 120, 120);
`;
