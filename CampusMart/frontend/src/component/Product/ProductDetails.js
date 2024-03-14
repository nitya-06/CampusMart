import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { clearErrors, getProductDetails } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/loader/Loader.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import { addItemsToCart } from "../../actions/cartAction.js";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { newReview } from "../../actions/productAction.js";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";

const ProductDetails = () => {
  // match is like req of backend
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  console.log(product.ratings);
  const options = {
    value: product.ratings,
    size: "large",
    readOnly:true,
    precision:0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  };
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      const qty = quantity + 1;
      setQuantity(qty);
    }
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to Cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    // const productid = match.params.id;;
    // console.log(id);

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div className="ProductDetails">
            <div>
              <Carousel
                id="carousel"
                sx={{  padding: " 50px 100px",display:"flex", justifyContent:"center",textAlign:"center",height:"70%", width:"80%"}}
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarousalImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating className="detailsBlock-2-span" {...options} />
                <span>( {product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>&#8377;{product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading"> REVIEWS </h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
