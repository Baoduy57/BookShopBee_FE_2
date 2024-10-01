import React from "react";
import { WrapperTextStyle } from "./style";

const InputForm = (props) => {
  const { placeholder = "Input Enter", ...rests } = props;
  const handleOnchangeInput = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <WrapperTextStyle
      placeholder={placeholder}
      value={props.value}
      {...rests}
      onChange={handleOnchangeInput}
    />
  );
};

export default InputForm;
