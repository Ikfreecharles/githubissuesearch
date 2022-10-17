import { useQuery } from "@apollo/client";
import { Badge, Grid } from "@nextui-org/react";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BadgeComponent } from "../components/common/Badge.component";
import { CommentCardComponent } from "../components/common/CommentCard.component";
import { MetadataComponent } from "../components/common/Metadata.component";
import { SidePanelComponent } from "../components/SidePanel.component";
import { GET_TOPIC_DETAILS } from "../graphQL/query";

interface IIssueTopic {
  title: string;
  author: {
    avatarUrl: string;
    login: string;
  };
  createdAt: string;
  bodyHTML: any;
  state: "OPEN" | "CLOSED";
  comments: {
    totalCount: number;
    edges: {
      node: {
        bodyHTML: any;
        author: {
          login: string;
          avatarUrl: string;
        };
        createdAt: string;
      };
    }[];
  };
  assignees: {
    edges: {
      node: {
        avatarUrl: string;
      }[];
    };
  };
  labels: {
    edges: {
      node: {
        name: string;
      };
    }[];
  };
  milestone: {
    progressPercentage: number;
    state: "OPEN" | "CLOSED";
  };
  participants: {
    totalCount: number;
    nodes: {
      avatarUrl: string;
    }[];
  };
}

export const SingleIssuePage = () => {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_TOPIC_DETAILS, {
    variables: { issueNumber: params.number && parseInt(params.number) },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  const {
    title,
    author,
    createdAt,
    bodyHTML,
    comments,
    state,
    labels,
    participants,
  }: IIssueTopic = data.repository.issue;

  return (
    <CustomContainer>
      <div className="heading">
        <h3 className="title-heading">{title}</h3>
        <Grid.Container alignItems="center">
          <Grid css={{ marginRight: "1rem" }}>
            <BadgeComponent state={state} size="lg" />
          </Grid>

          <Grid>
            <MetadataComponent
              author={author}
              createdAt={createdAt}
              commentTotalCount={comments.totalCount}
            />
          </Grid>
        </Grid.Container>
      </div>
      <Grid.Container gap={2}>
        <Grid xs={9}>
          <div>
            <CommentCardComponent
              avatar={author.avatarUrl}
              comment={bodyHTML}
              author={author}
              createdAt={createdAt}
            />
            {comments &&
              comments.edges.map(
                ({ node: { bodyHTML, author, createdAt } }, idx) => (
                  <CommentCardComponent
                    avatar={author.avatarUrl}
                    comment={bodyHTML}
                    author={author}
                    createdAt={createdAt}
                    key={idx}
                  />
                )
              )}
          </div>
        </Grid>
        <Grid xs={3}>
          <SidePanelComponent
            labels={labels.edges}
            participants={participants}
          />
        </Grid>
      </Grid.Container>
    </CustomContainer>
  );
};

const CustomContainer = styled.div`
  .heading {
    border-bottom: 1px solid var(--color-border);
    padding: 1rem 0;
    margin-bottom: 1rem;
    .title-heading {
      margin: 0;
      width: 80%;
    }
  }
`;
