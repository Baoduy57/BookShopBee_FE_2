import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

// Điều chỉnh kích thước và viền của ảnh sản phẩm nhỏ
export const WrapperStyleImageSmall = styled(Image)`
  height: 80px; // Tăng chiều cao
  width: 80px; // Tăng chiều rộng
  border: 1px solid #e5e5e5; // Thêm viền nhẹ
  border-radius: 4px; // Bo góc để nhìn mềm mại hơn
`;

// Điều chỉnh layout cho hình ảnh sản phẩm
export const WrapperStyleColImage = styled(Col)`
  flex-basis: auto; // Sửa lại lỗi "flex-basics: unset;"
  display: flex;
  justify-content: center; // Căn giữa nội dung
  padding: 4px; // Thêm khoảng cách giữa các ảnh
`;

// Thay đổi style cho tên sản phẩm
export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 28px; // Tăng kích thước chữ
  font-weight: 500; // Tăng độ đậm để nổi bật hơn
  line-height: 36px;
  word-break: break-word;
  margin-bottom: 12px; // Thêm khoảng cách dưới
`;

// Tối ưu hóa style cho phần mô tả sản phẩm
export const WrapperStyleDetailsProduct = styled.p`
  color: rgb(36, 36, 36);
  font-size: 16px; // Tăng nhẹ kích thước chữ
  font-weight: 400; // Giảm độ đậm để dễ đọc hơn
  line-height: 28px;
  word-break: break-word;
  margin-top: 10px;
`;

// Tăng kích thước text bán hàng
export const WrapperStyleTextSell = styled.span`
  font-size: 16px; // Tăng nhẹ kích thước chữ
  line-height: 26px;
  color: rgb(120, 120, 120);
`;

// Cải thiện style cho phần giá sản phẩm
export const WrapperPriceProduct = styled.div`
  background: rgb(250, 250, 250);
  border-radius: 8px;
  padding: 8px; // Giảm padding từ 10px xuống 8px
  margin: 8px 0; // Giảm khoảng cách trên và dưới từ 16px xuống 8px
`;

// Thay đổi kích thước chữ và căn chỉnh cho giá
export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px; // Duy trì kích thước chữ hiện tại
  line-height: 40px;
  font-weight: 600;
  padding: 5px; // Giảm padding bên trong
  margin-top: 0px; // Loại bỏ margin top để không có khoảng cách lớn bên trên
`;

// Cải thiện bố cục địa chỉ giao hàng
export const WrapperAddressProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // Tăng khoảng cách giữa các phần tử

  span.address {
    text-decoration: underline;
    font-size: 16px; // Tăng kích thước
    line-height: 26px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 16px;
    font-weight: 500;
    cursor: pointer; // Thêm con trỏ chỉ tay khi hover
  }
`;

// Tối ưu hóa phần điều chỉnh số lượng sản phẩm
export const WrapperQualityProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // Tăng khoảng cách giữa các phần tử
  width: 150px; // Tăng chiều rộng
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px; // Thêm khoảng cách bên trong
`;

// Tối ưu style cho phần input số lượng sản phẩm
export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 50px; // Tăng chiều rộng
    border-top: none;
    border-bottom: none;
    text-align: center; // Căn giữa số lượng
    .ant-input-number-handler-wrap {
      display: none !important;
    }
  }
`;
