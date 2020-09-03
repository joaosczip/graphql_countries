import styled from "styled-components";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";

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

export const AutoComplete = styled(Card)`
  position: absolute;
  width: 100%;
  z-index: 1000000;
`;

export const SearchList = styled(List)`
  width: 100%;
  padding: 0;
`;
