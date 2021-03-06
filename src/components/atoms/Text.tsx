import styled from "@emotion/styled";

interface TextProps {
  size?: number;
  color?: string;
  weight?: string | number;
  textAlign?: string;
  padding?: number;
}

export const P = styled.p<TextProps>`
  font-weight: ${(props) => props.weight || "normal"};
  font-size: ${(props) => props.size || 14}px;
  color: ${(props) => props.color || "white"};
  text-align: ${(props) => props.textAlign || ""};
  margin: 0;
  padding: ${(props) => props.padding || 0}px;
`;
