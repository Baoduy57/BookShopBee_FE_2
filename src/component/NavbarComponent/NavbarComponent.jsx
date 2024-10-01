import React from "react";
import {
  WrapperContent,
  WrapperContentPrice,
  WrapperLabelText,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
  const onChange = {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
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
        return options.map((option) => {
          return (
            <div style={{ display: "flex" }}>
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
        return options.map((option) => {
          return <WrapperContentPrice>{option}</WrapperContentPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>
        {renderContent("text", [
          "Sách Tình cảm",
          "Sách Bí ẩn",
          "Sách Kinh dị, giật gân",
          "Sách truyền cảm hứng",
        ])}
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
