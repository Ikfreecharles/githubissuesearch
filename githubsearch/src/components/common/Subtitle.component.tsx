import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface ISubtitle {
  children: ReactNode | string;
}

export const SubtitleComponent: FC<ISubtitle> = ({ children }) => {
  return <CustomHeading>{children}</CustomHeading>;
};

const CustomHeading = styled.h6`
  margin: 0 0 0.1rem;
  font-weight: 800;
`;
