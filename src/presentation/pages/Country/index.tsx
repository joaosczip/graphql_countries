import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { setCurrentError } from "@/presentation/redux/actions";
import { Container } from "./styles";

type Props = {
  showCountry: ShowCountry;
};

type Country = ShowCountry.Result;

const Country: React.FC<Props> = ({ showCountry }) => {
  const [country, setCountry] = useState<Country>();
  const [loading, setLoading] = useState<boolean>(true);
  const { countryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadCountry() {
      try {
        const queryResult = await showCountry.find(countryId);
        setCountry(queryResult);
      } catch (error) {
        dispatch(setCurrentError(error));
        history.replace("/");
      } finally {
        setLoading(false);
      }
    }
    loadCountry();
  }, [countryId, showCountry, history, dispatch]);

  const formatNum = (num: number): string =>
    new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0 }).format(num);

  return (
    <Container>
      {loading ? (
        <CountrySkeleton />
      ) : (
        <Card data-testid="country-container">
          <CardMedia component="img" image={country?.flag} height="260" />
          <CardContent>
            <Typography
              data-testid="country-name"
              gutterBottom
              variant="h3"
              component="h3"
            >
              {country?.name}
            </Typography>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <CenterFocusStrongOutlined />
                </ListItemIcon>
                <ListItemText
                  data-testid="capital"
                  primary={`Capital: ${country?.capital}`}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutlined />
                </ListItemIcon>
                <ListItemText
                  data-testid="population"
                  primary={`População: ${formatNum(country?.population)}`}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AspectRatio />
                </ListItemIcon>
                <ListItemText
                  data-testid="area"
                  primary={`Área: ${formatNum(country?.area)} m²`}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LanguageOutlined />
                </ListItemIcon>
                <ListItemText
                  data-testid="top-level"
                  primary={`Domínio de topo: ${country?.topLevelDomain}`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Country;
