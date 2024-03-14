const express = require("express");
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { authoriseRoles, isAuthenticatedUser } = require("../middleware/auth");


const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,createOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
router.route("/admin/orders").get(isAuthenticatedUser,authoriseRoles("admin"),getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authoriseRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteOrder);

module.exports = router;