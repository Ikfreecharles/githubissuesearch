import { Badge } from "@nextui-org/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ICardComponent } from "../../types/Types";
import { MetadataComponent } from "./Metadata.component";

export const CardComponent: FC<ICardComponent> = ({ data }) => {
  return (
    <>
      {data.map(
        ({
          node: { id, title, createdAt, author, comments, labels, number },
        }) => (
          <CustomCard key={id}>
            {labels.edges &&
              labels.edges.map(({ node: { name } }) => (
                <Badge size="xs" variant="flat" key={name}>
                  {name}
                </Badge>
              ))}
            <Link to={`/${encodeURIComponent(title)}/${number}`}>
              <h6 className="title" data-testid="title">
                {title}
              </h6>
            </Link>
            <MetadataComponent
              author={author}
              commentTotalCount={comments.totalCount}
              createdAt={createdAt}
            />
          </CustomCard>
        )
      )}
    </>
  );
};

const CustomCard = styled.div`
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
  .title {
    margin: 0;
    padding: 0;
    color: var(--color-blue);
  }
`;
