import React, { Fragment, useRef } from "react";
import PropTypes from "prop-types";
import ImageIcon from "@material-ui/icons/Image";
const Image = ({ handleSetImage }) => {
  const selectImage = () => {
    imageRef.current.click();
  };
  const handleChangeImage = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
      handleSetImage(e.target.result);
    };
    reader.readAsDataURL(imageRef.current.files[0]);
  };
  const imageRef = useRef(null);
  return (
    <Fragment>
      <ImageIcon onClick={selectImage} />
      <input
        type="file"
        onChange={handleChangeImage}
        ref={imageRef}
        hidden="hidden"
      ></input>
    </Fragment>
  );
};

Image.propTypes = {};

export default Image;
