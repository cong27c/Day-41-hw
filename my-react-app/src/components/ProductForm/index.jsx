import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import React from "react";
import "./ProductForm.css";

const ProductForm = ({ submitTitle = "Thêm sản phẩm" }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: "",
    brand: "",
    sku: "",
    weight: "",
    minimumOrderQuantity: "",
    thumbnail: "",
  });

  const setFormValue = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    const formattedData = {
      title: formValues.title,
      description: formValues.description,
      category: formValues.category,
      price: formValues.price ? parseFloat(formValues.price) : 0,
      discountPercentage: formValues.discountPercentage
        ? parseFloat(formValues.discountPercentage)
        : 0,
      rating: formValues.rating ? parseFloat(formValues.rating) : 0,
      stock: formValues.stock ? parseInt(formValues.stock, 10) : 0,
      tags: formValues.tags
        ? formValues.tags.split(",").map((tag) => tag.trim())
        : [],
      brand: formValues.brand,
      sku: formValues.sku,
      weight: formValues.weight ? parseFloat(formValues.weight) : 0,
      minimumOrderQuantity: formValues.minimumOrderQuantity
        ? parseInt(formValues.minimumOrderQuantity, 10)
        : 1,
      thumbnail: formValues.thumbnail || "https://via.placeholder.com/150",
    };
    setIsLoading(true);
    fetch("https://api01.f8team.dev/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid", res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMessage("✅ Thêm sản phẩm thành công");
        setTimeout(() => {
          navigate("/Products");
        }, 1000);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
        setMessage("❌ Thêm sản phẩm thất bại");
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={formValues.title}
            className="form-input"
            placeholder="Tên sản phẩm"
            onChange={setFormValue}
            required
          />
          {formValues.title.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <textarea
            name="description"
            value={formValues.description}
            className="form-textarea"
            placeholder="Mô tả sản phẩm"
            onChange={setFormValue}
            required
          />
          {formValues.description.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={formValues.category}
            name="category"
            className="form-input"
            placeholder="Danh mục"
            onChange={setFormValue}
            required
          />
          {formValues.category.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            value={formValues.price}
            name="price"
            className="form-input"
            placeholder="Giá ($)"
            onChange={setFormValue}
            required
          />
          {formValues.price.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            value={formValues.discountPercentage}
            name="discountPercentage"
            className="form-input"
            placeholder="Giảm giá (%)"
            onChange={setFormValue}
            required
          />
          {formValues.discountPercentage.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            value={formValues.rating}
            name="rating"
            className="form-input"
            placeholder="Đánh giá (0-5)"
            onChange={setFormValue}
            required
          />
          {formValues.rating.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            value={formValues.stock}
            name="stock"
            className="form-input"
            placeholder="Tồn kho"
            onChange={setFormValue}
            required
          />
          {formValues.stock.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={formValues.tags}
            name="tags"
            className="form-input"
            placeholder="Tags (cách nhau bằng dấu phẩy)"
            onChange={setFormValue}
            required
          />
          {formValues.tags.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={formValues.brand}
            name="brand"
            className="form-input"
            placeholder="Thương hiệu"
            onChange={setFormValue}
            required
          />
          {formValues.brand.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={formValues.sku}
            name="sku"
            className="form-input"
            placeholder="Mã SKU"
            onChange={setFormValue}
            required
          />
          {formValues.sku.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            value={formValues.weight}
            name="weight"
            className="form-input"
            placeholder="Trọng lượng (kg)"
            onChange={setFormValue}
            required
          />
          {formValues.weight.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            value={formValues.minimumOrderQuantity}
            name="minimumOrderQuantity"
            className="form-input"
            placeholder="Số lượng tối thiểu"
            onChange={setFormValue}
            required
          />
          {formValues.minimumOrderQuantity.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={formValues.thumbnail}
            name="thumbnail"
            className="form-input"
            placeholder="URL hình ảnh"
            onChange={setFormValue}
            required
          />
          {formValues.thumbnail.trim() === "" && (
            <p className="error-message">Trường này không được để trống.</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          {submitTitle}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
