import { Radio, Spacer } from "@nextui-org/react";
import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  editIssueState,
  editSearchLocation,
} from "../../features/issues/issueSlice";
import { SubtitleComponent } from "../common/Subtitle.component";

export const SearchSidePanelComponent = () => {
  const { issueState, searchLocation } = useAppSelector((state) => state.issue);
  const dispatch = useAppDispatch();
  return (
    <CustomContainer>
      <SubtitleComponent>Term location</SubtitleComponent>
      <Radio.Group
        size="xs"
        value={searchLocation}
        onChange={(value) => {
          dispatch(editSearchLocation(value as "title" | "body"));
        }}
        data-testid="radio-location-value"
      >
        <Radio
          value="title"
          description="Search for term in the title"
          data-testid="radio-title"
          aria-label="title"
          isSquared
        >
          Title
        </Radio>
        <Radio
          value="body"
          description="Surf the issue body for search term"
          data-testid="radio-body"
          aria-label="body"
          isSquared
        >
          Body
        </Radio>
      </Radio.Group>
      <Spacer x={2} />

      <SubtitleComponent>Issue State</SubtitleComponent>
      <Radio.Group
        size="xs"
        value={issueState}
        onChange={(value) => {
          dispatch(editIssueState(value as "OPEN" | "CLOSED"));
        }}
      >
        <Radio
          value="OPEN"
          description="Filter search by opened issue status"
          data-testid="radio-open"
          aria-label="open"
          isSquared
        >
          Open
        </Radio>
        <Radio
          value="CLOSED"
          description="Filter search by closed issue status"
          data-testid="radio-closed"
          aria-label="closed"
          isSquared
        >
          Closed
        </Radio>
      </Radio.Group>
    </CustomContainer>
  );
};

const CustomContainer = styled.div`
  position: sticky;
  top: 40px;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  width: 100%;
  padding: 1rem;
  span {
    letter-spacing: -0.3px;
  }
`;
