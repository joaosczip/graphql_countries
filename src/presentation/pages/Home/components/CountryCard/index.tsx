import React from "react";
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

const CountryCard: React.FC<Props> = ({ name, capital }) => {
  return (
    <Container>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://i.pinimg.com/originals/43/61/ce/4361ce8cd3b72490e39e1d9ed4693f5f.jpg"
            title="Contemplative Reptile"
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
          <Button size="small" color="primary">
            Detalhes
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default CountryCard;
