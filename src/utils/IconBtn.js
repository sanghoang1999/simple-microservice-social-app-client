import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
export const IconBtn = ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName
}) => (
  <Tooltip
    placement="top"
    onClick={onClick}
    title={tip}
    className={tipClassName}
  >
    <IconButton className={btnClassName}>{children}</IconButton>
  </Tooltip>
);
