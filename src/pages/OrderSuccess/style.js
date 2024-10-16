import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;

export const WrapperContainer = styled.div`
  width: 100%;
`;

export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 4px;
`;

export const WrapperListOrder = styled.div``;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 12px; // Thêm padding cho các sản phẩm
  background: #fff;
  margin-top: 12px;
  justify-content: space-between; // Tạo khoảng cách giữa thông tin sản phẩm và giá tiền
  border-radius: 8px; // Bo góc nhẹ cho khối sản phẩm
`;

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const WrapperInfo = styled.div`
  padding: 20px; // Thêm padding để tạo khoảng cách bên trong
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-radius: 6px; // Thêm bo tròn góc
  margin-top: 15px; // Thêm khoảng cách giữa các khối
  width: 100%;
`;

export const WrapperItemOrderInfo = styled.div`
  padding: 20px; // Tăng khoảng cách giữa các sản phẩm
  background: #fff;
  border-radius: 6px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); // Hiển thị theo lưới
  gap: 20px; // Tạo khoảng cách giữa các sản phẩm
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // Đẩy phần tổng tiền về phía bên phải
  padding: 20px; // Thêm padding
  background: #fff;
  font-size: 20px; // Tăng kích thước chữ cho phần tổng tiền
  color: red; // Màu đỏ cho phần tổng tiền
  font-weight: bold; // Tạo sự nổi bật
  border-radius: 6px;
`;

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold;
`;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 10px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 100%; // Căn chiều rộng đầy đủ
  max-width: 500px; // Giới hạn chiều rộng
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;
