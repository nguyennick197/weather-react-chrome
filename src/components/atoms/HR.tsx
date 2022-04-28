import styled from "@emotion/styled";

export const HR = styled.hr<{
  color?: string;
  opacity?: number;
}>`
  height: 1px;
  width: 100%;
  border-width: 0px;
  background-color: ${(props) => props.color || "grey"};
  opacity: ${(props) => props.opacity || 1};
`;
