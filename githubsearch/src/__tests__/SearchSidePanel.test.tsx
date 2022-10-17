import { MockedProvider } from "@apollo/client/testing";
import { Matcher, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import { SearchSidePanelComponent } from "../components/searchpage/SearchSidePanel.component";
import { SidePanelComponent } from "../components/SidePanel.component";
import userEvent from "@testing-library/user-event";
import sliceReducer, {
  IInitalState,
  editSearchTerm,
  editIssueState,
  editSearchLocation,
} from "../features/issues/issueSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const renderApp = () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <SearchSidePanelComponent />
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

const checkRadioValue = (
  id: Matcher,
  action: ActionCreatorWithPayload<any>,
  payload: string,
  expectedValue: string,
  stateToSearch: "searchLocation" | "issueState"
) => {
  const initialState: IInitalState = {
    searchTerm: "",
    issueState: "OPEN",
    searchLocation: "title",
  };
  const selectedItem = getItem(id);
  expect(selectedItem).toBeInTheDocument();
  userEvent.click(selectedItem);
  const radioValue = sliceReducer(initialState, action(payload));
  expect(radioValue[stateToSearch]).toBe(expectedValue);
};

describe("test search side panel options", () => {
  it("should test the title radio", () => {
    checkRadioValue(
      /radio-title/i,
      editSearchLocation,
      "title",
      "title",
      "searchLocation"
    );
  });

  it("should test the body radio", () => {
    checkRadioValue(
      /radio-body/i,
      editSearchLocation,
      "body",
      "body",
      "searchLocation"
    );
  });

  it("should test the issue open state", () => {
    checkRadioValue(
      /radio-open/i,
      editIssueState,
      "OPENED",
      "OPENED",
      "issueState"
    );
  });

  it("should test the issue closed state", () => {
    checkRadioValue(
      /radio-closed/i,
      editIssueState,
      "CLOSED",
      "CLOSED",
      "issueState"
    );
  });
});
