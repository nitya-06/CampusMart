const express = require("express");
const {
  getAllProducts,
  createProduct,
  upadteProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAdminProducts,
  deleteReview,
  getProductReviews,
} = require("../controllers/productController");
const { isAuthenticatedUser, authoriseRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authoriseRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authoriseRoles("admin"), upadteProduct)
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authoriseRoles("admin"), getAdminProducts);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
