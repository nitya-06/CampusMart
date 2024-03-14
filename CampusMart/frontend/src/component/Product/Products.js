import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader.js";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData.js";

const categories = ["All","beauty", "accessories", "laptop", "phones", "sports","bikes"];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000000]);
  const [category, setCategory] = useState();
  const [ratings, setRatings] = useState(0)

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);
  const { keyword } = useParams();
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(keyword);
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    console.log(keyword);
  }, [dispatch, keyword, currentPage, price, category, ratings,alert,error]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE"/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={1000000}
            />

            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((categoryy) => (
                <li
                  className="category-link"
                  key={categoryy}
                  onClick={() => setCategory(categoryy)}
                  style={{
                    color:
                      category && category === categoryy ? "tomato" : "inherit",
                  }}
                >
                  {categoryy}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count ? (
            <div className="pagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
