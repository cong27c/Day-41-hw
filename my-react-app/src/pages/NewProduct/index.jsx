import React from "react";
import ProductForm from "../../components/ProductForm";
import Loading from "../../components/Loading";

const NewProduct = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Tạo Sản Phẩm Mới</h1>

      {/* Loading nhé */}
      {/* <Loading /> */}

      <ProductForm heading="Tạo Sản Phẩm Mới" submitTitle="Tạo sản phẩm" />
    </div>
  );
};

export default NewProduct;
