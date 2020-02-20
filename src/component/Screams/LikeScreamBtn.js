import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { deleteScream, likeScream, unlikeScream } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
import { Link } from "react-router-dom";
//MUI
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";

const LikeScreamBtn = ({ user, screamId, likeScream, unlikeScream }) => {
  const handleLikeScream = () => {
    console.log(user.isAuthenticated);
    likeScream(screamId);
  };
  const HandleUnLikeScream = () => {
    unlikeScream(screamId);
  };
  const likeBtn = !user.isAuthenticated ? (
    <IconBtn tip="like">
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </IconBtn>
  ) : user.likes.length != 0 &&
    user.likes.find(like => like.screamId === screamId) ? (
    <IconBtn tip="UnLike" onClick={HandleUnLikeScream}>
      <FavoriteIcon color="primary" />
    </IconBtn>
  ) : (
    <IconBtn tip="like" onClick={handleLikeScream}>
      <FavoriteBorderIcon color="primary" />
    </IconBtn>
  );
  return likeBtn;
};

deleteScream.propTypes = {};

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(
  LikeScreamBtn
);
