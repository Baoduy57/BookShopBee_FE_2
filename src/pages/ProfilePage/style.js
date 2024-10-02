import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeaderProfile = styled.h1`
  color: #000;
  font-size: 24px;
  margin: 6px 0;
`;

export const WrapperContentProfile = styled.div`
  dispay: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  gap: 30px;
`;

export const WrapperLabel = styled.label`
  color: black;
  font-size: 16px;
  line-height: 30px;
  font-weight: 600;
  width: 60px;
  text-align: left;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 10px 0;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & .ant-upload-list-item-container {
    display: none;
  }
`;
