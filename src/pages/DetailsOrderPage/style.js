import styled from "styled-components";

// Wrapper for the user's information and order details
export const WrapperHeaderUser = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #f5f5fa;
  padding: 20px;
  border-radius: 10px;
`;

// Individual section within the header (Address, Shipping, Payment)
export const WrapperInfoUser = styled.div`
  width: 32%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Label for each section
export const WrapperLabel = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
`;

// Container for each section's content
export const WrapperContentInfo = styled.div`
  .name-info {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .address-info,
  .phone-info,
  .delivery-info,
  .payment-info {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
  }

  .status-payment {
    color: #ff9900;
    font-weight: bold;
  }

  .delivery-info .name-delivery {
    color: #ff5722;
    font-weight: bold;
  }

  .delivery-fee {
    font-size: 14px;
    color: #666;
  }
`;

// Styling for the product list
export const WrapperStyleContent = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Wrapper for individual product details
export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

// Product name and image
export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  width: 700px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 1px solid #eee;
    padding: 2px;
    margin-right: 15px;
  }
  div {
    font-weight: bold;
    font-size: 16px;
    color: #333; // Màu chữ đậm hơn
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    max-width: 580px; // Điều chỉnh lại chiều rộng tối đa để tên sản phẩm không bị quá dài
  }
`;

// Labels for each column
export const WrapperItemLabel = styled.div`
  font-weight: bold;
  color: #666;
  font-size: 14px;
  width: 100px;
  text-align: center;
`;

// Individual data items (price, quantity, discount, total, etc.)
export const WrapperItem = styled.div`
  flex-grow: 1; // Sử dụng flex-grow để các cột tự động điều chỉnh kích thước
  text-align: center;
  font-size: 16px; // Tăng cỡ chữ
  font-weight: bold; // Đậm hơn để nổi bật
  color: #ff5722; // Màu sắc nổi bật hơn cho giá
  display: flex;
  justify-content: center; // Đảm bảo căn giữa nội dung bên trong
  align-items: center;
`;

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
