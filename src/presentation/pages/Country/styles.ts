import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  > div {
    top: 10vh;
    width: 80%;
    position: absolute;

    @media (max-width: 500px) {
      width: 100%;
      top: 0;
      height: 100vh;
    }
  }
`;
