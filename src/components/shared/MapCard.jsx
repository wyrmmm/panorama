/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { Card } from "@blueprintjs/core";
import PropTypes from "prop-types";

let cardStyle = css`
  background-color: #273d56;
  opacity: 0.9;
  color: #fff;
  position: absolute;
`;

const MapCard = props => {
  const { children } = props;
  return <Card css={cardStyle}>{children}</Card>;
};

MapCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default MapCard;
