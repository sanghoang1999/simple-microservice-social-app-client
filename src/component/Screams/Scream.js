import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ListLike from "./ListLike";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import Card from "@material-ui/core/Card";
import { IconBtn } from "../../utils/IconBtn";
import { likeScream, unlikeScream } from "../../actions/scream";
import LikeScreamBtn from "./LikeScreamBtn";
import ProgressiveImage from "react-progressive-image";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//MUI
import ChatIcon from "@material-ui/icons/Chat";

import Typography from "@material-ui/core/Typography";

import Moment from "react-moment";
const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    position: "relative",
    marginBottom: theme.spacing(2),
    height: "180px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 5px"
    }
  },

  image: {
    width: "180px"
  },
  detail: {
    padding: "5px 0 0 10px",
    flex: 2.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  likeWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  likeCount: {
    marginLeft: 10
  }
}));
const Scream = ({
  scream: {
    body,
    createdAt,
    userImage,
    userHandle,
    id,
    likeCount,
    commentCount
  },
  user,
  openDialog,
  rdNum
}) => {
  const matches = useMediaQuery("(min-width:600px)");
  const low_image = userImage.replace("_high", "_low");
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <ProgressiveImage src={userImage} placeholder={low_image}>
          {src => <img src={src} alt="an image" className={classes.image} />}
        </ProgressiveImage>
        <div className={classes.detail}>
          <div>
            <Typography
              component={Link}
              to={`/user/${userHandle}`}
              variant="subtitle1"
              gutterBottom
              color="primary"
            >
              {userHandle}
            </Typography>
            {!user.loading ? (
              <DeleteScream user={user} screamId={id} userHandle={userHandle} />
            ) : null}
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
              gutterBottom
              gutterBottom
            >
              <Moment fromNow>{createdAt}</Moment>
            </Typography>
            <Typography variant="body2">{body}</Typography>
          </div>
          <div style={{ margin: "32px 0 0 -12px", display: "flex" }}>
            <span className={classes.likeWrap}>
              <LikeScreamBtn screamId={id} />
              <ListLike
                className={likeCount}
                screamId={id}
                likeCount={likeCount}
              />
            </span>
            <span style={{ flex: 1 }}>
              <IconBtn tip="comments">
                <ChatIcon color="primary" />
              </IconBtn>
              <span>
                {commentCount} {matches ? "comments" : null}
              </span>
            </span>
            <span>
              <ScreamDialog
                screamProps={{
                  body,
                  createdAt,
                  userImage,
                  userHandle,
                  id,
                  likeCount,
                  commentCount
                }}
                openDialog={openDialog}
                rdNum={rdNum}
              />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

Scream.propTypes = {};

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(Scream);
