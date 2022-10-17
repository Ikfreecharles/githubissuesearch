import { Avatar } from "@nextui-org/react";
import React, { FC } from "react";
import styled from "styled-components";
import { ParagraphComponent } from "./Paragraph.component";

interface IMetaData {
  author: {
    avatarUrl: string;
    login: string;
  };
  commentTotalCount?: number;
  createdAt: string;
  commentedOn?: boolean;
  noAvatar?: boolean;
}

export const MetadataComponent: FC<IMetaData> = ({
  author,
  commentTotalCount,
  createdAt,
  commentedOn,
  noAvatar,
}) => {
  const renderDate = (): number | string => {
    const date1 = new Date(createdAt);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    if (diffInDays < 14) {
      return diffInDays;
    } else {
      return new Date(createdAt).toDateString();
    }
  };

  return (
    <CustomContainer>
      {noAvatar ? "" : <Avatar src={author.avatarUrl} size="xs" />}

      <ParagraphComponent className="author">
        {commentedOn
          ? `${author.login} ${
              typeof renderDate() === "number"
                ? `commented ${renderDate()} ${
                    renderDate() > 1 ? "days" : "day"
                  } ago`
                : `commented on ${renderDate()}`
            }`
          : author.login}
      </ParagraphComponent>
      <ParagraphComponent className="comment-count">
        {commentTotalCount}{" "}
        {commentedOn
          ? ""
          : commentTotalCount && commentTotalCount > 1
          ? "comments"
          : "comment"}
      </ParagraphComponent>
      {commentedOn ? (
        ""
      ) : (
        <ParagraphComponent className="data-opened">{`${
          typeof renderDate() === "number"
            ? `opened ${renderDate()} ${renderDate() > 1 ? "days" : "day"} ago`
            : `opened on ${renderDate()}`
        }`}</ParagraphComponent>
      )}
    </CustomContainer>
  );
};

const CustomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .author {
    font-weight: 700;
  }
`;
