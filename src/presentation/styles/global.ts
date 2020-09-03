import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    background: #f1f1f1;
    height: 100%;
  }

  h1, h2, h3, h4, h5, span, p {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
