import { fireEvent, Matcher, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import { MockedProvider } from "@apollo/client/testing";

const renderApp = () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <App />
      </MockedProvider>
    </Provider>
  );
};

const getItem = (id: Matcher) => {
  renderApp();
  const searchInput = screen.getByTestId(id);
  return searchInput;
};

describe("test input field", () => {
  it("should be present", () => {
    renderApp();
    const searchInput = screen.getByTestId(/search-input/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("should have a placeholder", () => {
    const searchInput = getItem(/search-input/i);
    expect(searchInput).toHaveAttribute(
      "placeholder",
      "Search an issue on github..."
    );
  });

  it("should have an initial value of empty", () => {
    const searchInput = getItem(/search-input/i);
    expect(searchInput).toHaveDisplayValue("");
  });

  it("should handle onchange event", () => {
    const searchInput = getItem(/search-input/i);
    fireEvent.change(searchInput, { target: { value: "useEffect" } });
    expect(searchInput).toHaveDisplayValue("useEffect");
  });

  it.todo("should have issue type as only open or closed");
});
