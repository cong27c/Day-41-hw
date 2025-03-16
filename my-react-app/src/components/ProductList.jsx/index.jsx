import { data } from "react-router-dom";
import "./ProductList.css";
import Loading from "../Loading";
import React, { useEffect, useState } from "react";

function ProductList({
  post,
  perPage,
  page,
  handleRenderPages,
  totalPages,
  setPerPage,
  setPage,
  searchMode,
}) {
  return (
    <div className="product-list-container">
      <ul className="product-list">
        {post.length > 0 ? (
          post.map((item) => (
            <li className="product-item" key={item.id}>
              <img src={item.thumbnail} alt="" className="product-image" />
              <div className="product-info">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-price">{item.price} $</p>
                <p className="product-stock">Còn {item.stock} sản phẩm</p>
              </div>
            </li>
          ))
        ) : searchMode ? (
          <p>Không tìm thấy sản phẩm</p>
        ) : (
          <p>Danh sách trống</p>
        )}
      </ul>

      <div className="pagination-container">
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Hiển thị:</label>
          <select
            id="itemsPerPage"
            className="items-select"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="pagination">
          <button
            className="page-button"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            ⬅ Trước
          </button>

          <div className="page-numbers">{handleRenderPages()}</div>

          <button
            className="page-button"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Tiếp ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
