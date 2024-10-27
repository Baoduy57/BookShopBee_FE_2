import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperContentPrice,
  WrapperLabelText,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";
import TypeProduct from "../TypeProduct/TypeProduct";
import * as ProductService from "../../services/ProductService";

const NavbarComponent = () => {
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const onChange = {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, index) => {
          return <WrapperTextValue key={index}>{option}</WrapperTextValue>;
        });

      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );

      case "star":
        return options.map((option, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <Rate
                style={{ fontSize: "13px" }}
                disabled
                defaultValue={option}
              />
              <span> {` từ ${option} sao`}</span>
            </div>
          );
        });

      case "price":
        return options.map((option, index) => {
          return (
            <WrapperContentPrice key={index}>{option}</WrapperContentPrice>
          );
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>
        {typeProducts.map((item) => {
          return <TypeProduct name={item} key={item}></TypeProduct>;
        })}
      </WrapperContent>

      <WrapperContent>
        {renderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
          { value: "d", label: "D" },
        ])}
      </WrapperContent>

      <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>

      <WrapperContent>
        {renderContent("price", [
          "dưới 40.000đ",
          "50.000 -> 100.000",
          "100.000 -> 400.000",
          "trên 500.000đ",
        ])}
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
