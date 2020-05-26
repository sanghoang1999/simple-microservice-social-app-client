import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const images = [
  "https://placekitten.com/500/500",
  "https://placekitten.com/1500/500",
  "https://placekitten.com/4000/3000",
  "https://placekitten.com/800/1200",
  "https://placekitten.com/1500/1500",
];
const ImageBox = ({ image }) => {
  const [open, SetOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <Fragment>
      <img
        onClick={() => SetOpen(true)}
        style={{ width: 100, height: 100 }}
        src={image}
        alt=""
      />
      {open && (
        <div>
          <Lightbox
            mainSrc={image}
            onCloseRequest={() => SetOpen(false)}
            // onMovePrevRequest={() =>
            //   setPhotoIndex(
            //     (photoIndex) => (photoIndex + images.length - 1) % images.length
            //   )
            // }
            // onMoveNextRequest={() =>
            //   setPhotoIndex((photoIndex) => (photoIndex + 1) % images.length)
            // }
          />
        </div>
      )}
    </Fragment>
  );
};

ImageBox.propTypes = {};

export default ImageBox;
