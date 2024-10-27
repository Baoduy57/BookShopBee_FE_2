import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeaderProfile = styled.h1`
  color: #000;
  font-size: 24px;
  margin: 6px 0;
  text-align: left;
  font-weight: 700;
`;

export const WrapperContentProfile = styled.div`
  dispay: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 500px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 8px;
  gap: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

export const WrapperLabel = styled.label`
  color: #333;
  font-size: 16px;
  line-height: 30px;
  font-weight: 600;
  width: 80px;
  text-align: left;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px dashed #1890ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1890ff;
    cursor: pointer;
  }
  & .ant-upload-list-item-container {
    display: none;
  }
`;
