import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT__DETAILS_REQUEST,
  PRODUCT__DETAILS_SUCCESS,
  PRODUCT__DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
} from "../constants/productConstants";

export const getProduct =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 1000000],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      console.log(keyword);

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category && category !== "All") {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      // console.log(link);
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get all products admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST,
    });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT__DETAILS_REQUEST,
    });
    // console.log("hihi");
    // console.log(id);
    // console.log("hihih");
    // const link = `http://localhost:3000/api/v1/product/${id}`;
    // const link = `http://localhost:4000/api/v1/product/${id}`;
    // console.log(`/api/v1/product/${id}`);
    const { data } = await axios.get(`/api/v1/product/${id}`);
    // console.log("hihihi");
    // console.log(data);
    dispatch({
      type: PRODUCT__DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT__DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// new review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });
    const config = {
      headers: { "content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    // console.log(id);
    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    // console.log(data);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


//  create new product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });
    const config = {
      headers: { "content-Type": "application/json" },
    };
    console.log(productData);
    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
      );
      console.log(data);
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//  update product
export const updateProduct = (id,productData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });
    const config = {
      headers: { "content-Type": "application/json" },
    };
    console.log(id);
    console.log(productData);
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    console.log(data);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//  delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
