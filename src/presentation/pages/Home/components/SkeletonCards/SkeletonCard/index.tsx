import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container } from "./styles";

const SkeletonCard: React.FC = () => {
  return (
    <Container>
      <Card style={{ height: "280px" }}>
        <CardActionArea>
          <Skeleton height={140} animation="wave" variant="rect" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Skeleton animation="wave" />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ marginLeft: "8px" }}>
          <Skeleton animation="wave">
            <Button />
          </Skeleton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default SkeletonCard;
