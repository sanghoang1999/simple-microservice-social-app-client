import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import File from "./File";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  uploadWrap: {
    color: "#00000087",
    padding: "0 0 2px 3px",
    "& svg": {
      fontSize: 19,
      marginRight: 4,
      cursor: "pointer",
    },
  },
}));
const Upload = ({ handleSetImage }) => {
  const classes = useStyles();
  return (
    <div className={classes.uploadWrap}>
      <Image handleSetImage={handleSetImage} />
      <File />
    </div>
  );
};

Upload.propTypes = {};

export default Upload;
