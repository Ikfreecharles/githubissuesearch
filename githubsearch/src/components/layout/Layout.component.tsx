import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface ILayout {
  children: ReactNode;
  padded?: boolean;
}

export const LayoutComponent: FC<ILayout> = ({ children, padded }) => {
  return <CustomContainer $padded={padded}>{children}</CustomContainer>;
};

const CustomContainer = styled.main<{ $padded?: boolean }>`
  width: ${(props) => (props.$padded ? "75vw" : "95vw")};
  margin: 0 auto;
  max-width: 1300px;
  padding-top: 2rem;
`;
