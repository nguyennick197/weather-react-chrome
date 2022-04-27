import styled from "@emotion/styled";

export const Container = styled.div<{
  justifyContent?: string;
  alignItems?: string;
  width?: string | number;
  row?: boolean;
  padding?: number;
  borderRadius?: number;
  backgroundColor?: string;
}>`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent}};`}
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.padding && `padding: ${props.padding}px;`}
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`}
  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`}
`;
