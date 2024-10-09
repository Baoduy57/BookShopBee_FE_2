import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../component/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from "./style";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import CardComponent from "../../component/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../component/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);

  const searchDebounce = useDebounce(searchProduct, 1000);

  const refSearch = useRef();

  const [loading, setLoading] = useState(false);

  const [stateProducts, setStateProducts] = useState([]);
  const arr = [
    "Sách Tình cảm",
    "Sách Bí ẩn",
    "Sách Kinh dị, giật gân",
    "Sách truyền cảm hứng",
  ];

  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search);
    if (search?.length > 0 || refSearch.current) {
      setStateProducts(res?.data);
      return [];
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      setLoading(true);
      fetchProductAll(searchDebounce);
    }
    setLoading(false);
    refSearch.current = true;
  }, [searchDebounce]);

  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 2000,
  });

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProducts(products?.data);
    }
  }, [products]);

  return (
    <Loading isPending={isLoading || loading}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item}></TypeProduct>;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        <div
          id="container"
          style={{
            backgroundColor: "#efefef",
            margin: "0 auto",
            height: "2000px",
            width: "1270px",
          }}
        >
          <SliderComponent
            arrImages={[slider1, slider2, slider3]}
          ></SliderComponent>

          <WrapperProduct>
            {stateProducts?.map((product) => {
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
                ></CardComponent>
              );
            })}
          </WrapperProduct>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <WrapperButtonMore
              textButton="Xem thêm"
              type="outline"
              styleButton={{
                border: "1px solid rgb(11,116,229)",
                color: "rgb(11,116,229)",
                width: "240px",
                height: "38px",
                borderRadius: "5px",
              }}
              styleTextButton={{ fontWeight: "500" }}
            ></WrapperButtonMore>
          </div>
        </div>
      </div>
      HomePage
    </Loading>
  );
};

export default HomePage;
