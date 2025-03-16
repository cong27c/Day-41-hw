import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList.jsx";
import Loading from "../../components/Loading";
import "./Search.css";
import { data } from "react-router-dom";

let timeout;

const Search = () => {
  const pageLimit = 5;
  const params = new URLSearchParams(location.search);

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [perPage, setPerPage] = useState(params.get("per_page") || 10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState(params.get("q") || "");
  const [filterPost, setFilterPost] = useState([]);

  const searchMode = searchInput.trim().length >= 3;
  const displayPost = searchMode ? filterPost : post;

  useEffect(() => {
    if (searchMode) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsLoading(true);
        fetch(
          `https://api01.f8team.dev/api/products?q=${searchInput}&page=${page}&per_page=${perPage}`
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("faile to fetch", res.statusText);
            }
            return res.json();
          })
          .then((res) => {
            console.log(res);
            setFilterPost(res.data);
            params.set("q", searchInput);
            history.replaceState(null, null, `?${params}`);
          })
          .catch((error) => console.log(error))
          .finally(() => setIsLoading(false));
      }, 500);
    } else {
      params.delete("q");
      history.replaceState(null, null, `?${params}`);
    }
  }, [searchInput, searchMode, page, perPage]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api01.f8team.dev/api/products?page=${page}&per_page=${perPage}`
    )
      .then((res) => res.json())
      .then((datas) => {
        setPost(datas.data);
        setTotalPages(datas.last_page);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [page, perPage]);

  useEffect(() => {
    params.set("page", page);
    history.replaceState(null, null, `?${params}`);
  }, [page]);

  useEffect(() => {
    params.set("per_page", perPage);
    history.replaceState(null, null, `?${params}`);
  }, [perPage]);

  const handleRenderPages = () => {
    const pages = [];
    let startPage = Math.max(1, page - Math.floor(pageLimit / 2));
    let endPage = Math.min(totalPages, startPage + pageLimit - 1);

    if (startPage > 1) {
      pages.push(
        <button className="page-number" key={1} onClick={() => setPage(1)}>
          1
        </button>
      );
    }
    if (startPage > 2) {
      pages.push(<span key="left-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`page-number ${page === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="right-ellipsis">...</span>);
      }
      pages.push(
        <button
          className="page-number"
          key={totalPages}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page-container">
      <h1 className="search-title">Tìm kiếm sản phẩm</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          className="search-input"
          placeholder="Nhập tên sản phẩm..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-button">Tìm kiếm</button>
      </div>

      <ProductList
        searchMode={searchMode}
        post={displayPost}
        page={page}
        perPage={perPage}
        handleRenderPages={handleRenderPages}
        totalPages={totalPages}
        setPerPage={setPerPage}
        setPage={setPage}
      />
    </div>
  );
};

export default Search;
