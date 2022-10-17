import sliceReducer, {
  IInitalState,
  editSearchTerm,
  editIssueState,
  editSearchLocation,
  setPagination,
} from "./issueSlice";

describe("issue slice test", () => {
  const initialState: IInitalState = {
    searchTerm: "",
    issueState: "OPEN",
    searchLocation: "title",
    searchError: "",
    pagination: 15,
    endCursor: "",
  };
  it("should test the initial state", () => {
    expect(sliceReducer(undefined, { type: "unknown" })).toEqual({
      searchTerm: "",
      issueState: "OPEN",
      searchLocation: "title",
      searchError: "",
      pagination: 15,
      endCursor: "",
    });
  });
  it("should change the search term", () => {
    const newValue = sliceReducer(initialState, editSearchTerm("useEffect"));
    expect(newValue.searchTerm).toBe("useEffect");
  });

  it("should change the issue state", () => {
    const newValue = sliceReducer(initialState, editIssueState("CLOSED"));
    expect(newValue.issueState).toBe("CLOSED");
  });

  it("should change the search location state", () => {
    const newValue = sliceReducer(initialState, editSearchLocation("body"));
    expect(newValue.searchLocation).toBe("body");
  });
  it("should change the pagination to 2", () => {
    const newValue = sliceReducer(initialState, setPagination(2));
    expect(newValue.pagination).toBe(30);
  });
});
