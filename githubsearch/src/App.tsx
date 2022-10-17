import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutComponent } from "./components/layout/Layout.component";
import { SearchPage } from "./pages/Search.page";
import { SingleIssuePage } from "./pages/SingleIssue.page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutComponent padded>
          <SearchPage />
        </LayoutComponent>
      ),
    },
    {
      path: "/:title/:number",
      element: (
        <LayoutComponent>
          <SingleIssuePage />
        </LayoutComponent>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
