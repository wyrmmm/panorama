/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import Card from "components/shared/MapCard";

export default {
  title: "MapCard"
};

export const MapCard = () => (
  <Card
    title="Card Title"
    css={css`
      top: 20px;
      left: 20px;
    `}
  >
    Hello there
  </Card>
);
