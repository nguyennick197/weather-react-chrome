import styled from "@emotion/styled";

interface ContainerProps {
  justifyContent?: string;
  alignItems?: string;
  width?: string | number;
  row?: boolean;
  padding?: number;
  borderRadius?: number;
  backgroundColor?: string;
  flex?: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  align-items: ${(props) => props.alignItems && props.alignItems};
  flex: ${(props) => props.flex && props.flex};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${(props) => props.width && `width: ${props.width}px;`}
  ${(props) => props.padding && `padding: ${props.padding}px;`}
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`}
  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`}
`;
