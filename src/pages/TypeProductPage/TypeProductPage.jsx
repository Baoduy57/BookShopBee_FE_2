import React, { useEffect, useState } from "react";
import NavbarComponent from "../../component/NavbarComponent/NavbarComponent";
import CardComponent from "../../component/CardComponent/CardComponent";
import { Row, Col, Pagination } from "antd";
import { WrapperNavbar, WrapperProduct } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../component/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
  return (
    <Loading isPending={loading}>
      <div
        style={{
          width: "100%",
          background: "#efefef",
          height: "calc(150vh - 65px)",
        }}
      >
        <div style={{ width: "1270px", margin: "0 auto", height: "100%" }}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100% - 20px)",
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
                {products
                  ?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        ?.toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
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
                defaultCurrent={panigate?.page + 1}
                total={panigate?.total}
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
