import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
`;

export const CountriesContainer = styled(InfiniteScroll)`
  > div {
    display: flex;
    flex-wrap: wrap;
  }
`;
