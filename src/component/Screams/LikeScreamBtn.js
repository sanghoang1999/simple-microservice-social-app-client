import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { deleteScream, likeScream, unlikeScream } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
import { Link } from "react-router-dom";
//MUI
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const LikeScreamBtn = ({
  user,
  screamId,
  handle,
  likeScream,
  unlikeScream
}) => {
  const handleLikeScream = () => {
    console.log("mmmm", handle);
    likeScream(screamId, handle);
  };
  const HandleUnLikeScream = () => {
    unlikeScream(screamId, user.credentials.handle);
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
