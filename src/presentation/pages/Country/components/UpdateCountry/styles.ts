import styled from "styled-components";

export const Main = styled.div`
  position: absolute;
  width: 40%;

  @media (max-width: 1000px) {
    width: 60%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }

  @media (max-width: 460px) {
    width: 100%;
    top: 25%;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
`;

export const FormTop = styled.div`
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    margin-bottom: 4px;
  }
`;

export const FormBottom = styled.div`
  display: flex;
  align-items: center;

  > div {
    width: 50%;
  }
`;
