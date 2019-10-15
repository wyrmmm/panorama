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

let titleStyle = css`
  font-weight: 700;
  font-size: 16px;
`;

const MapCard = props => {
  const { title, children } = props;
  return (
    <Card css={cardStyle}>
      <p css={titleStyle}>{title}</p>
      {children}
    </Card>
  );
};

MapCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default MapCard;
