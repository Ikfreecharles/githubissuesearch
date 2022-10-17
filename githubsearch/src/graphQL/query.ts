import { gql } from "@apollo/client";

export const GET_ISSUES_LIMITED = gql`
  query SearchResultItemConnection(
    $userInput: String!
    $pagination: Int!
    $after: String
  ) {
    search(query: $userInput, type: ISSUE, last: $pagination, after: $after) {
      issueCount
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ... on Issue {
            id
            title
            createdAt
            number
            author {
              avatarUrl
              login
            }
            comments {
              totalCount
            }
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_TOPIC_DETAILS = gql`
  query Repository($issueNumber: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $issueNumber) {
        title
        author {
          avatarUrl
          login
        }
        createdAt
        bodyHTML
        state
        comments(first: 10) {
          totalCount
          edges {
            node {
              bodyHTML
              author {
                login
                avatarUrl
              }
              createdAt
            }
          }
        }
        assignees(first: 10) {
          edges {
            node {
              avatarUrl
            }
          }
        }
        labels(first: 10) {
          edges {
            node {
              name
            }
          }
        }
        milestone {
          progressPercentage
          state
        }
        participants(first: 10) {
          totalCount
          nodes {
            avatarUrl
          }
        }
      }
    }
  }
`;
