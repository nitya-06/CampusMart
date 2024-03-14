import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/loader/Loader.js";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants.js";
import MetaData from "../layout/MetaData.js"

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    // console.log("first");
    dispatch(updateProfile(myForm));
    // console.log("first");
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [error, dispatch, alert, navigate, isUpdated, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <PermIdentityIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
