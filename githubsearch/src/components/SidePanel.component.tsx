import { Avatar, Badge } from "@nextui-org/react";
import React, { FC } from "react";
import styled from "styled-components";
import { ParagraphComponent } from "./common/Paragraph.component";
import { SubtitleComponent } from "./common/Subtitle.component";

interface ISidePanel {
  labels: { node: { name: string } }[];
  participants: {
    totalCount: number;
    nodes: {
      avatarUrl: string;
    }[];
  };
}

export const SidePanelComponent: FC<ISidePanel> = ({
  labels,
  participants,
}) => {
  return (
    <CustomContainer>
      <div className="side-item assignee" data-testid="assignee">
        <SubtitleComponent>Assignees</SubtitleComponent>
        <ParagraphComponent>No one assigned</ParagraphComponent>
      </div>
      <div className="side-item labels" data-testid="labels">
        <SubtitleComponent>Labels</SubtitleComponent>
        {labels.length < 1 ? (
          <ParagraphComponent>No Labels found</ParagraphComponent>
        ) : (
          labels.map(({ node: { name } }, idx) => (
            <Badge size="sm" key={idx} color="error">
              {name}
            </Badge>
          ))
        )}
      </div>
      <div className="side-item milestones" data-testid="milestones">
        <SubtitleComponent>Milestones</SubtitleComponent>
        <ParagraphComponent>No milestones</ParagraphComponent>
      </div>
      <div className="side-item participants" data-testid="participants">
        <SubtitleComponent>
          {participants.totalCount}{" "}
          {participants.totalCount < 1 ? "participant" : "participants"}
        </SubtitleComponent>

        {participants.nodes.length < 1 ? (
          ""
        ) : (
          <Avatar.Group animated={false}>
            {participants.nodes.map(({ avatarUrl }, idx) => (
              <Avatar
                key={idx}
                src={avatarUrl}
                bordered
                borderWeight="light"
                size="sm"
              />
            ))}
          </Avatar.Group>
        )}
      </div>
    </CustomContainer>
  );
};

const CustomContainer = styled.div`
  width: 100%;
  .side-item {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid var(--color-border);
    width: 100%;
  }
`;
