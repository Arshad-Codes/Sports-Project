import React from "react";
import { render,screen } from "@testing-library/react";
import Home from "../src/pages/Home";

test('should render the Home Page', () => {
  render(<Home/>);
});
