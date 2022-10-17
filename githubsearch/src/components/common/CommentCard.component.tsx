import { Avatar } from "@nextui-org/react";
import React, { FC } from "react";
import styled from "styled-components";
import { MetadataComponent } from "./Metadata.component";

interface ICommentCard {
  avatar: string;
  comment: string;
  author: {
    avatarUrl: string;
    login: string;
  };
  createdAt: string;
}

export const CommentCardComponent: FC<ICommentCard> = ({
  avatar,
  comment,
  author,
  createdAt,
}) => {
  return (
    <CustomContainer>
      <div className="inner-container">
        <Avatar src={avatar} data-testid="avatar" />
        <div className="body-details">
          <div className="metadata" data-testid="metadata">
            <MetadataComponent
              author={author}
              createdAt={createdAt}
              commentedOn
              noAvatar
            />
          </div>
          <div className="comment-body">
            <div
              dangerouslySetInnerHTML={{ __html: comment }}
              data-testid="comment"
            />
          </div>
        </div>
      </div>
    </CustomContainer>
  );
};

const CustomContainer = styled.article`
  width: 100%;
  margin: 0 0 1rem;
  .inner-container {
    display: flex;
    gap: 1rem;
    width: 100%;
    .body-details {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      overflow: hidden;
      width: 100%;
      .metadata {
        background-color: var(--color-grey);
        padding: 0.4rem 1rem;
        border-bottom: 1px solid var(--color-border);
      }
      .comment-body {
        padding: 1rem;
        p,
        li {
          font-size: 14px;
        }
        pre {
          background-color: var(--color-grey);
        }
      }
    }
  }
`;
