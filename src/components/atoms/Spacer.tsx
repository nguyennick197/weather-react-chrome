import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface SpacerProps {
  size?: number;
}

export const spacerStyles = (props: SpacerProps) => {
  const { size } = props;
  return css`
    min-height: ${size || 8}px;
    min-width: ${size || 8}px;
    flex-basis: ${size || 8}px;
  `;
};

export const Spacer = styled.div`
  ${spacerStyles}
`;
