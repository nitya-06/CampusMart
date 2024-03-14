import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/loader/Loader.js";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [email, setEmail] = useState("");

  const { error, loading, message } = useSelector((state) => state.forgotPassword);

    const forgotPasswordSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("email", email);
      // console.log("first");
      dispatch(forgotPassword(myForm));
      // console.log("first");
    };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (message) {
          alert.success(message);
        }
      }, [error, dispatch, alert, message]);



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Profile" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
