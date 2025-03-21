import { useState } from "react";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import PropTypes from "prop-types";

const ProductForm = ({ submitTitle = "Submit" }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
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
    setIsLoading(true);
    fetch("https://api01.f8team.dev/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formValues,
        tags: formValues.tags.split(",").map((value) => value.trim()),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid", res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        if (res.errors) {
          const newErrors = {};
          Object.entries(res.errors).forEach(([fieldName, [message]]) => {
            newErrors[fieldName] = message;
          });
          setErrors(newErrors);
        }
        navigate("/Products");
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
          {errors.title && <p className="error-message">{errors.title}</p>}
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
          {errors.description && (
            <p className="error-message">{errors.description}</p>
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
          {errors.category && (
            <p className="error-message">{errors.category}</p>
          )}{" "}
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
          {errors.price && <p className="error-message">{errors.price}</p>}
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
          {errors.discountPercentage && (
            <p className="error-message">{errors.discountPercentage}</p>
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
          {errors.rating && <p className="error-message">{errors.rating}</p>}
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
          {errors.stock && <p className="error-message">{errors.stock}</p>}
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
          {errors.tags && <p className="error-message">{errors.tags}</p>}
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
          {errors.brand && <p className="error-message">{errors.brand}</p>}
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
          {errors.sku && <p className="error-message">{errors.sku}</p>}
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
          {errors.weight && <p className="error-message">{errors.weight}</p>}
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
          {errors.minimumOrderQuantity && (
            <p className="error-message">{errors.minimumOrderQuantity}</p>
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
          {errors.thumbnail && (
            <p className="error-message">{errors.thumbnail}</p>
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
ProductForm.propTypes = {
  submitTitle: PropTypes.string,
};
export default ProductForm;
