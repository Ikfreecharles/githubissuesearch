import { useLazyQuery } from "@apollo/client";
import { Button, Grid, Input, Pagination, Spacer } from "@nextui-org/react";
import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CardComponent } from "../components/common/Card.component";
import { SearchSidePanelComponent } from "../components/searchpage/SearchSidePanel.component";
import {
  editSearchError,
  editSearchTerm,
  setPagination,
} from "../features/issues/issueSlice";
import { GET_ISSUES_LIMITED } from "../graphQL/query";

export const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, searchLocation, issueState, searchError, pagination } =
    useAppSelector((state) => state.issue);

  const [getIssues, { loading, error, data, refetch, fetchMore }] =
    useLazyQuery(GET_ISSUES_LIMITED, {
      variables: {
        userInput: `repo:facebook/react is:issue is:${issueState} in:title ${
          searchLocation === "title"
            ? `in:title ${searchTerm}`
            : `in:body ${searchTerm}`
        } `,
        pagination: pagination,
      },
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });

  React.useEffect(() => {
    if (searchTerm) {
      refetch({
        userInput: `repo:facebook/react is:issue is:${issueState} in:title ${
          searchLocation === "title"
            ? `in:title ${searchTerm}`
            : `in:body ${searchTerm}`
        } `,
      });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.length > 3 && searchLocation && issueState) {
      await getIssues();
      dispatch(editSearchError(""));
    } else {
      dispatch(
        editSearchError("Search term is too short or some params are missing")
      );
    }
  };

  const renderResult = React.useCallback(() => {
    if (data) {
      return (
        <div>
          <h5>
            {data.search.issueCount} issues found relating to "{searchTerm}"
          </h5>
          <CardComponent data={data.search.edges} /> <Spacer y={2} />
          {/* <Pagination
            initialPage={1}
            total={Math.ceil(data.search.issueCount / 15)}
            siblings={2}
            onChange={(number) => {
              if (data.search.pageInfo.hasNextPage)
                fetchMore({
                  variables: {
                    pagination: number * 15,
                    after: data.search.pageInfo.endCursor,
                  },
                });
            }}
          /> */}
          <button
            onClick={() => {
              if (data.search.pageInfo.hasNextPage)
                fetchMore({
                  variables: {
                    pagination: data.search.edges.length + 15,
                    after: data.search.pageInfo.endCursor,
                  },
                });
            }}
          >
            Load more
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }, [data, fetchMore, searchTerm]);

  return (
    <section>
      <h2 data-testid="page-title">
        Search through React repo for react related issues
      </h2>
      <CustomForm onSubmit={handleSubmit}>
        <Input
          data-testid="search-input"
          aria-label="search input"
          onChange={(e) => dispatch(editSearchTerm(e.target.value))}
          value={searchTerm}
          placeholder="Search an issue on github..."
          fullWidth
          bordered={searchError === "" ? true : false}
          borderWeight="light"
          clearable
          animated={false}
          helperText={searchError ? searchError : ""}
          status={searchError ? "error" : "default"}
          helperColor="error"
        />

        <Button data-testid="submit-btn" type="submit" auto>
          Search
        </Button>
      </CustomForm>
      <Grid.Container gap={2}>
        <Grid xs={3}>
          <SearchSidePanelComponent />
        </Grid>
        <Grid xs={9}>
          <div>{renderResult()}</div>
        </Grid>
      </Grid.Container>
    </section>
  );
};

const CustomForm = styled.form`
  display: flex;
  gap: 0.5rem;
  position: relative;
  margin: 0 0 1rem;
  .select {
    border: none !important;
    position: absolute;
    right: 120px;
  }
`;
