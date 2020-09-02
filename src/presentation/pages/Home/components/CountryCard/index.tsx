import React from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  CardActionArea,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { BasicCountry } from "@/domain/models";
import { Container } from "./styles";

type Props = BasicCountry;

const CountryCard: React.FC<Props> = ({ id, name, capital, flag }) => {
  const history = useHistory();
  const redirectToCountryPage = () => history.replace(`/country/${id}`);

  return (
    <Container>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={`${name} flag`}
            height="140"
            image={flag}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Capital: {capital}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={redirectToCountryPage}>
            Detalhes
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default CountryCard;
