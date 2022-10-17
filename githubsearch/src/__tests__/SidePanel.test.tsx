import { MockedProvider } from "@apollo/client/testing";
import { Matcher, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import { SidePanelComponent } from "../components/SidePanel.component";

const mockLabels = [
  {
    node: {
      name: "Status: Unconfirmed",
    },
  },
];

const mockupParticipants = {
  totalCount: 2,
  nodes: [
    {
      avatarUrl:
        "https://avatars.githubusercontent.com/u/2440089?u=fce440640002476dda4407828fe8ed0e8885823e&v=4",
    },
    {
      avatarUrl: "https://avatars.githubusercontent.com/u/100952840?v=4",
    },
  ],
};

const renderApp = () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <SidePanelComponent
          labels={mockLabels}
          participants={mockupParticipants}
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

describe("test the side panel component", () => {
  it("should have a assignee", () => {
    const selectedItem = getItem(/assignee/i);
    expect(selectedItem).toBeInTheDocument();
  });
  it("should have labels", () => {
    const selectedItem = getItem(/labels/i);
    expect(selectedItem).toBeInTheDocument();
  });
  it("should have milestones", () => {
    const selectedItem = getItem(/milestones/i);
    expect(selectedItem).toBeInTheDocument();
  });
  it("should have participants", () => {
    const selectedItem = getItem(/participants/i);
    expect(selectedItem).toBeInTheDocument();
  });
});
