import styled from "styled-components";

export const Container = styled.div`
  flex-basis: 25%;

  @media (max-width: 1200px) {
    flex-basis: 50%;
  }

  @media (max-width: 600px) {
    flex-basis: 100%;
  }

  > div {
    margin: 16px;
  }
`;
