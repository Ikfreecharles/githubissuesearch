import { MockedProvider } from "@apollo/client/testing";
import { Matcher, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import { CommentCardComponent } from "../components/common/CommentCard.component";

const renderApp = () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <CommentCardComponent
          avatar=""
          comment=""
          author={{ avatarUrl: "", login: "" }}
          createdAt={new Date("")}
        />
      </MockedProvider>
    </Provider>,
    { wrapper: BrowserRouter }
  );
};

const getItem = (id: Matcher) => {
  renderApp();
  const selectedItem = screen.getByTestId(id);
  return selectedItem;
};

describe("test the comment component", () => {
  it("should be visible", () => {
    const selecteditem = getItem(/avatar/i);
    expect(selecteditem).toBeInTheDocument();
  });
  it("should have a metadata", () => {
    const selectedItem = getItem(/metadata/i);
    expect(selectedItem).toBeInTheDocument();
  });
  it("should have a content", () => {
    const selectedItem = getItem(/comment/i);
    expect(selectedItem).toBeInTheDocument();
  });
  it.todo("should have a tag");
});
