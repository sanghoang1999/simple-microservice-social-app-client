import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import { postComment } from "../../actions/scream";
const useStyles = makeStyles(theme => ({
  commentWrapper: {
    display: "flex",
    marginBottom: 12
  },
  input: {
    width: "100%",
    borderRadius: "16px",
    border: "1px solid #0000001f",
    backgroundColor: "#f2f3f5",
    outline: "none",
    marginLeft: "7px",
    fontSize: 16,
    paddingLeft: 16,
    "&::placeholder": {
      font: theme.typography.caption
    },
    "$::focus": {
      font: theme.typography.fontWeightLight,
      fontSize: 16
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "inherit"
    }
  }
}));

const PostComment = ({
  user: { handle, imageurl },
  postComment,
  screamId,
  userHandle
}) => {
  const classes = useStyles();
  const [body, SetBody] = useState("");
  const [isComment, SetIsComemnt] = useState(false);
  const handleChange = e => {
    SetBody(e.target.value);
  };
  const handlePressEnter = e => {
    if (body !== "") {
      if (e.keyCode == 13) {
        SetIsComemnt(true);
        postComment({ body }, screamId, userHandle).then(() => {
          SetBody("");
          SetIsComemnt(false);
        });
      }
    }
  };
  return (
    <div className={classes.commentWrapper}>
      <Avatar src={imageurl} className={classes.avatar} />

      <input
        id="body"
        name="body"
        value={body}
        className={classes.input}
        type="textField"
        placeholder="Write comment..."
        onChange={handleChange}
        onKeyDown={handlePressEnter}
        style={{ cursor: isComment ? "progress" : "inherit" }}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.credentials
});

export default connect(mapStateToProps, { postComment })(PostComment);
