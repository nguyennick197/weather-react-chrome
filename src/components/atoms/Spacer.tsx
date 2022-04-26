import styled from "@emotion/styled";

export const Spacer = styled.div<{
  size?: number;
}>`
  min-height: ${(props) => props.size || 8}px;
  min-width: ${(props) => props.size || 8}px;
  flex-basis: ${(props) => props.size || 8}px;
`;
