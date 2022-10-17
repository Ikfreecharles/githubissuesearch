import { Matcher, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { CardComponent } from "../components/common/Card.component";
import { MockedProvider } from "@apollo/client/testing";
import { ICardComponent } from "../types/Types";
import { BrowserRouter } from "react-router-dom";

const mockData: ICardComponent = {
  data: [
    {
      node: {
        id: "I_kwDOAJy2Ks5TESe0",
        title:
          "eslint-plugin-react-hooks: lint rule to enforce that `useMemo` returns a value",
        createdAt: new Date("2022-10-02T04:01:58Z"),
        state: "OPEN",
        number: 25379,
        author: {
          avatarUrl:
            "https://avatars.githubusercontent.com/u/3335181?u=bcc591417a50454dffef85a2d537e293ca7df827&v=4",
          login: "JoshuaKGoldberg",
        },
        comments: {
          totalCount: 3,
        },
        labels: {
          edges: [
            {
              node: {
                name: "Type: Feature Request",
              },
            },
            {
              node: {
                name: "Component: ESLint Rules",
              },
            },
          ],
        },
      },
    },
  ],
};

const renderApp = () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <CardComponent data={mockData.data} />
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

describe("test the card", () => {
  it("should have a title", () => {
    const selectedItem = getItem(/title/i);
    expect(selectedItem).toBeInTheDocument();
  });
  it.todo("should have a description if available");
  it.todo("should have a meta data");
  it.todo("should be clickable");
});
