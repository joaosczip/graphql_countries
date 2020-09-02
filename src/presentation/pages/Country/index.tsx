import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  CenterFocusStrongOutlined,
  PeopleOutlined,
  AspectRatio,
  LanguageOutlined,
} from "@material-ui/icons";
import { Container } from "./styles";

const Country: React.FC = () => {
  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          image="https://restcountries.eu/data/ala.svg"
          height="260"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h3">
            Brasil
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <CenterFocusStrongOutlined />
              </ListItemIcon>
              <ListItemText primary={`Capital: Buenos Aires`} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleOutlined />
              </ListItemIcon>
              <ListItemText primary={`População: 500 milhoes`} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AspectRatio />
              </ListItemIcon>
              <ListItemText primary={`Área: 500 m²`} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LanguageOutlined />
              </ListItemIcon>
              <ListItemText primary={`Domínio de topo: .br`} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Country;
