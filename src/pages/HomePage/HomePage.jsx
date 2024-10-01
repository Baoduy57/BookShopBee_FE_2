import React from "react";
import TypeProduct from "../../component/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from "./style";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import CardComponent from "../../component/CardComponent/CardComponent";
import NavbarComponent from "../../component/NavbarComponent/NavbarComponent";

const HomePage = () => {
  const arr = [
    "Sách Tình cảm",
    "Sách Bí ẩn",
    "Sách Kinh dị, giật gân",
    "Sách truyền cảm hứng",
  ];
  return (
    <>
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
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
          </WrapperProduct>
          {/* <NavbarComponent></NavbarComponent> */}

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
    </>
  );
};

export default HomePage;
