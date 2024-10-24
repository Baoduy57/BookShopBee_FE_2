import React from "react";
import ProductDetailsComponent from "../../component/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", background: "#efefef" }}>
      <div style={{ padding: "0 120px", background: "#efefef" }}>
        <h4>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/")}
          >
            Trang chủ
          </span>
          - Chi tiết sản phẩm
        </h4>
        <ProductDetailsComponent idProduct={id}></ProductDetailsComponent>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
