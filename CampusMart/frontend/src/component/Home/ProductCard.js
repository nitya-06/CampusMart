import React from "react";
import { Link } from "react-router-dom"; // to make a component link
import Rating from "@mui/material/Rating";

import "./Home.css"


const ProductCard = ({ product }) => {

    const options = {
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {/* to attribute to specify the destination URL or path. */}
      <img src={product.images[0].url} alt="product iamge" />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
      </div>
      <span>&#8377;{product.price}</span>
    </Link>
  );
};

export default ProductCard;
