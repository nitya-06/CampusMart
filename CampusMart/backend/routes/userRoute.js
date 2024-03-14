const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserProfileAdmin,
  deleteUser,
} = require("../controllers/userController");
const {authoriseRoles, isAuthenticatedUser} = require("../middleware/auth")

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/Password/update").put(isAuthenticatedUser,updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser,updateUserProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/admin/users").get(isAuthenticatedUser,authoriseRoles("admin"),getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authoriseRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authoriseRoles("admin"), updateUserProfileAdmin)
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteUser);



module.exports = router;
