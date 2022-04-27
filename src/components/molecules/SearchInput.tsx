import styled from "@emotion/styled";
import SearchIcon from "../../icons/search_icon.png";

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    width: 90%;
    border 1px solid black;
    height: 50px;
    border-radius: 5px;
    padding: 8px;

    input {
        flex: 1;
        border: none;
        font-size: 16px;
        padding-left: 8px;
    
        &:focus {
            outline: none;
            border: none;
        }
    }
`;

export function SearchInput(props: React.HTMLProps<HTMLInputElement>) {
  return (
    <InputWrapper>
      <img src={SearchIcon} height={24} width={24} alt="Search" />
      <input placeholder="Enter a city..." {...props} />
    </InputWrapper>
  );
}
