import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: space-between; /* Đảm bảo căn chỉnh chính xác */
  /* Đặt ảnh và tên sản phẩm sang bên trái */
  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border: 1px solid rgb(238, 238, 238);
    padding: 2px;
  }
  span {
    color: rgb(36, 36, 36);
    font-weight: 700;
    font-size: 13px;
    margin-left: auto; /* Đảm bảo giá nằm bên phải */
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    width: 260px;
    white-space: normal; /* Cho phép xuống dòng */
  }
`;

export const WrapperStyleHeaderDelivery = styled.div`
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
  margin-bottom: 7px;
`;

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
`;

export const WrapperLeft = styled.div`
  width: 910px;
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
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
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #fff;
  margin: 12px auto;
  width: 100%;
  max-width: 950px;
  border-radius: 6px;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.1);
`;

export const WrapperStatus = styled.div`
  display: flex;
  align-item: flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(235, 235, 240);
  flex-direction: column;
`;

export const WrapperFooterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column; /* Các nút nằm dưới */
  border-top: 1px solid rgb(235, 235, 240);
  padding-top: 10px;
  margin-top: 10px;
  gap: 10px;
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
