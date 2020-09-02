import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

export const Container = styled.div`
  align-items: center;
  position: absolute;
  top: 10vh;
`;

export const CountriesContainer = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
`;
