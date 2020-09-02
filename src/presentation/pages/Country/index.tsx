import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { ShowCountry } from "@/domain/usecases";
import CountrySkeleton from "./components/CountrySkeleton";
import { Container } from "./styles";

type Props = {
  showCountry: ShowCountry;
};

const Country: React.FC<Props> = ({ showCountry }) => {
  const [loading] = useState<boolean>(true);
  const { countryId } = useParams();

  useEffect(() => {
    async function loadCountry() {
      await showCountry.find(countryId);
    }
    loadCountry();
  }, [countryId, showCountry]);

  return (
    <Container>
      {loading ? (
        <CountrySkeleton />
      ) : (
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
      )}
    </Container>
  );
};

export default Country;
