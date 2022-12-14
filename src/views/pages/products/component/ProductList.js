import "./ProductList.scss";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../../actions/product.actions";
import { PaginationCustom } from "../../../component/PaginationCustom";
import { ProductComponent } from "../../../component/product-component/ProductComponent";

function ProductList(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = props.products;
  const [sortProduct, setSortProduct] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const elementPerPage = 8;
  const isLoading = useSelector((state) => state.productReducer.isLoading);

  if (sortProduct !== "0") {
    ///sort
    switch (sortProduct) {
      case "name":
        products.sort(function (a, b) {
          return (
            a.name.toLowerCase().charCodeAt(0) -
            b.name.toLowerCase().charCodeAt(0)
          );
        });
        break;
      case "cheapest":
        products.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case "mostExpensive":
        products.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case "salest":
        products.sort(function (a, b) {
          return a.hasSold - b.hasSold;
        });
        break;
      case "newest":
        products.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        break;
      default:
        break;
    }
  }

  const productsInPage = products.slice(
    (currentPage - 1) * elementPerPage,
    currentPage * elementPerPage
  );
  const getAllProduct = () => {
    navigate("/san-pham");
    dispatch(productActions.getList({ productType: "wine" }));
  };
  return isLoading ? (
    <h1 style={{ marginTop: "12rem" }}>Loading............</h1>
  ) : (
    <Container className="product-list-wrapper">
      <Container className="product-list-header-wrapper">
        <div className="product-list-header">
          <div className="product-sort">
            <label>S???p x???p theo: </label>
            <select
              onChange={(e) => {
                setSortProduct(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value={"name"}>T??n A-Z</option>
              <option value={"cheapest"}>Gi?? th???p nh???t</option>
              <option value={"mostExpensive"}>Gi?? cao nh???t</option>
              <option value={"salest"}>B??n ch???y nh???t</option>
              <option value={"newest"}>M???i nh???t</option>
            </select>
            <button onClick={() => getAllProduct()}>X??a b??? l???c</button>
          </div>

          <div className="result-filter">
            <p>
              T??m ???????c <b>{products.length}</b> s???n ph???m
            </p>
          </div>
        </div>
      </Container>

      {products.length > 0 && (
        <Container className="product-list">
          {Array.from({ length: productsInPage.length }).map((_, idx) => (
            <div key={idx} className="py-3 px-3">
              <ProductComponent product={productsInPage[idx]} />
            </div>
          ))}
          <div className="product-list-footer">
            <PaginationCustom
              numberOfElement={products.length}
              elementPerPage={elementPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </Container>
      )}
    </Container>
  );
}

export { ProductList };
