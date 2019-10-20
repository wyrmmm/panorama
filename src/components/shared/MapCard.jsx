/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { Card } from "@blueprintjs/core";
import PropTypes from "prop-types";
import { useHover, useDraggable } from "hooks/hooks";

let cardStyle = css`
  background-color: #273d56;
  opacity: 0.9;
  color: #fff;
  position: fixed;
`;

let spanStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px 3px 0 0;
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.75);
`;

let titleStyle = css`
  font-weight: 700;
  font-size: 16px;
`;

const MapCard = props => {
  const { title, children } = props;
  // const [hoverRef, isHover] = useHover();
  const [draggableRef, draggableStyle] = useDraggable({ top: 0, left: 0 });

  return (
    <Card css={cardStyle} style={{ ...draggableStyle }}>
      <span css={spanStyle} ref={draggableRef} />
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
