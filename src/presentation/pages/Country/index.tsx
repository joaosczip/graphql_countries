import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import {
  CenterFocusStrongOutlined,
  PeopleOutlined,
  AspectRatio,
  LanguageOutlined,
} from "@material-ui/icons";
import { ShowCountry } from "@/domain/usecases";
import { CountrySkeleton, UpdateCountry } from "./components";
import {
  setCurrentError,
  setCurrentCountry,
} from "@/presentation/redux/actions";
import { selectCurrentCountry } from "@/presentation/redux/selectors";
import { Container } from "./styles";

type Props = {
  showCountry: ShowCountry;
};

type Country = ShowCountry.Result;

const Country: React.FC<Props> = ({ showCountry }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { countryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const country = useSelector(selectCurrentCountry);

  useEffect(() => {
    async function loadCountry() {
      try {
        const queryResult = await showCountry.find(countryId);
        dispatch(setCurrentCountry(queryResult));
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
      <UpdateCountry openModal={openModal} setOpenModal={setOpenModal} />
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
          <CardActions>
            <Button onClick={() => setOpenModal(true)} data-testid="update">
              Editar
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default Country;
