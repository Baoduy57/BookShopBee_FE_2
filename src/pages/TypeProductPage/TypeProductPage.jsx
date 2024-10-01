import React from "react";
import NavbarComponent from "../../component/NavbarComponent/NavbarComponent";
import CardComponent from "../../component/CardComponent/CardComponent";
import { Row, Col, Pagination } from "antd";
import { WrapperNavbar, WrapperProduct } from "./style";

const TypeProductPage = () => {
  const onChange = () => {};
  return (
    <div style={{ width: "100%", background: "#efefef" }}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <Row
          style={{
            flexWrap: "nowrap",
            paddingTop: "10px",
          }}
        >
          <WrapperNavbar span={4}>
            <NavbarComponent></NavbarComponent>
          </WrapperNavbar>
          <Col span={20}>
            <WrapperProduct>
              <CardComponent></CardComponent>
              <CardComponent></CardComponent>
              <CardComponent></CardComponent>
              <CardComponent></CardComponent>
              <CardComponent></CardComponent>
              <CardComponent></CardComponent>
              <CardComponent></CardComponent>
            </WrapperProduct>
            <Pagination
              defaultCurrent={2}
              total={100}
              onChange={onChange}
              style={{ justifyContent: "center", marginTop: "15px" }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TypeProductPage;
