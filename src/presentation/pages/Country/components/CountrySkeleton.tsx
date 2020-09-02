import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Title, InfoList } from "./styles";

const CountrySkeleton: React.FC = () => {
  return (
    <div>
      <Card>
        <Skeleton height={260} animation="wave" variant="rect" />
        <CardContent>
          <Title>
            <Typography gutterBottom variant="h3" component="h3">
              <Skeleton animation="wave" />
            </Typography>
          </Title>
          <InfoList>
            <Typography gutterBottom variant="h5" component="h5">
              <Skeleton animation="wave" />
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              <Skeleton animation="wave" />
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              <Skeleton animation="wave" />
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              <Skeleton animation="wave" />
            </Typography>
          </InfoList>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountrySkeleton;
