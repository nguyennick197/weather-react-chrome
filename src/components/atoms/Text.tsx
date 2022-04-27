import styled from "@emotion/styled";

interface TextProps {
  size?: number;
  color?: string;
  weight?: string | number;
}

export const P = styled.p<TextProps>`
  font-weight: ${(props) => props.weight || "normal"};
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => props.color || "white"};
  margin: 0;
  padding 0;
`;
