import React, { useEffect, useState } from "react";
import NavbarComponent from "../../component/NavbarComponent/NavbarComponent";
import CardComponent from "../../component/CardComponent/CardComponent";
import { Row, Col, Pagination } from "antd";
import { WrapperNavbar, WrapperProduct } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../component/LoadingComponent/Loading";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductType = async (type) => {
    setLoading(true);
    const res = await ProductService.getProductType(type);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
      console.log("res", res);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);

  const onChange = () => {};
  return (
    <Loading isPending={loading}>
      <div
        style={{
          width: "100%",
          background: "#efefef",
          height: "calc(150vh - 65px)",
        }}
      >
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
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <WrapperProduct>
                {products?.map((product) => {
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      discount={product.discount}
                      selled={product.selled}
                      id={product._id}
                    ></CardComponent>
                  );
                })}
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
    </Loading>
  );
};

export default TypeProductPage;
