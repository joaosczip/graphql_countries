import styled from "styled-components";

export const Container = styled.div`
  flex-grow: 1;
`;

export const Search = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  margin: 0 auto;
  width: 60%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    cursor: text;
  }
`;
