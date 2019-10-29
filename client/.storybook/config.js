import { configure } from "@storybook/react";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module);
