import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface IParagraph {
  children: ReactNode | string;
  className?: string;
}

export const ParagraphComponent: FC<IParagraph> = ({ children, className }) => {
  return <CustomParagraph className={className}>{children}</CustomParagraph>;
};

const CustomParagraph = styled.p`
  font-size: 14px;
`;
