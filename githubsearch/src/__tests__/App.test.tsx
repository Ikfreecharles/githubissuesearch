import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import { MockedProvider } from "@apollo/client/testing";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <App />
      </MockedProvider>
    </Provider>
  );

  const renderedApp = screen.getByTestId(/page-title/i);
  expect(renderedApp).toBeVisible();
});
