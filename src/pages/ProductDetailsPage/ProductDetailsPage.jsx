import React from "react";
import ProductDetailsComponent from "../../component/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{ padding: "0 120px", background: "#efefef", height: "1000px" }}
    >
      <h4>
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Home
        </span>
        - Product details
      </h4>
      <ProductDetailsComponent idProduct={id}></ProductDetailsComponent>
    </div>
  );
};

export default ProductDetailsPage;
