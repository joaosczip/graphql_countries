import React from "react";
import { Card, CardContent } from "@material-ui/core";
import errorImage from "@/presentation/assets/error.png";
import { Container, Main } from "./styles";

type Props = {
  error: Error;
};

const Error: React.FC<Props> = ({ error }) => {
  return (
    <Container data-testid="error-container">
      <Card style={{ backgroundColor: "#e04141" }}>
        <CardContent>
          <Main>
            <span data-testid="error-message">{error.message}</span>
            <img src={errorImage} alt="Imagem de Erro" />
          </Main>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Error;